import { GoogleGenAI, Chat, Modality } from "@google/genai";

// As per guidelines, the API key must be from process.env.API_KEY.
// The exclamation mark is a non-null assertion, assuming the key is always present.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

// We maintain a single chat instance to preserve conversation history.
let chat: Chat | null = null;

/**
 * Generates an image based on a text prompt and aspect ratio.
 * @param prompt The text description for the image.
 * @param aspectRatio The desired aspect ratio (e.g., "1:1", "16:9").
 * @returns A base64 encoded data URL for the generated image, or null if failed.
 */
export const generateImage = async (prompt: string, aspectRatio: string): Promise<string | null> => {
  try {
    // Per guidelines, use 'imagen-4.0-generate-001' for high-quality images.
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        // Casting aspectRatio to the required literal type.
        aspectRatio: aspectRatio as "1:1" | "3:4" | "4:3" | "9:16" | "16:9",
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    }
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    // Re-throw the error to be handled by the calling component.
    throw error;
  }
};

/**
 * Creates or continues a chat session, returning a stream of responses.
 * @param message The user's message.
 * @returns An async iterable stream of GenerateContentResponse chunks.
 */
export const streamChatResponse = async (message: string) => {
  // Initialize chat on first call.
  if (!chat) {
    chat = ai.chats.create({
      // Per guidelines, use 'gemini-2.5-flash' for basic text tasks like chat.
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: 'Você é a Cabelleira.IA, uma assistente virtual especializada em colorimetria capilar para cabeleireiros profissionais. Forneça respostas diretas, técnicas e práticas. Foco em fórmulas, correções de cor e diagnósticos rápidos para o dia a dia do salão.',
      },
    });
  }
  const response = await chat.sendMessageStream({ message });
  return response;
};

/**
 * Generates a realistic preview of a hairstyle on a person's photo based on a text prompt.
 * @param baseImage The client's current hair photo.
 * @param prompt A detailed description of the desired hair transformation.
 * @returns A base64 encoded data URL for the generated image, or null if failed.
 */
export const generateHairPreview = async (
  baseImage: { data: string, mimeType: string },
  prompt: string
): Promise<string | null> => {
  try {
    const imagePart = {
      inlineData: {
        data: baseImage.data,
        mimeType: baseImage.mimeType,
      },
    };
    const textPart = {
      text: prompt,
    };

    // Per guidelines, use 'gemini-2.5-flash-image' for image editing.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [imagePart, textPart] },
    });

    // Per guidelines, iterate through parts to find inlineData for the image.
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating hair preview:", error);
    throw error;
  }
};


/**
 * Analyzes one or more reference images and user observations to generate a technical hair coloring plan.
 * @param images An array of objects, each containing base64 image data and MIME type.
 * @param observations A string with additional notes or context from the user.
 * @returns A string containing the AI's technical plan in Markdown format.
 */
export const getTechnicalPlanFromImages = async (
  images: { data: string, mimeType: string }[], 
  observations: string
): Promise<string> => {
    try {
        const imageParts = images.map(img => ({
            inlineData: {
                data: img.data,
                mimeType: img.mimeType,
            },
        }));

        const textPart = {
            text: `Observações adicionais do profissional: ${observations || 'Nenhuma.'}`,
        };
        
        const allParts = [...imageParts, textPart];

        // Per guidelines, use 'gemini-2.5-pro' for complex text/image tasks.
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: { parts: allParts },
            config: {
              systemInstruction: `Você é uma especialista em colorimetria capilar. Sua tarefa é analisar as imagens (Cabelo Atual vs Objetivo) e gerar um plano técnico prático para o cabeleireiro.

Seja direta e objetiva. Responda em Markdown seguindo esta estrutura:

### 1. Diagnóstico
Descreva brevemente a base natural, cor cosmética e saúde aparente do fio.

### 2. Plano de Ação
Passo a passo resumido para atingir a cor (ex: limpeza de cor, descoloração, pré-pigmentação). Identifique o fundo de clareamento necessário.

### 3. Fórmulas Sugeridas
Indique as misturas de coloração/tonalizante e volumagem de OX.

### 4. Dica de Cuidados
Recomendação breve de tratamento pós-química.`
            }
        });

        // Per guidelines, use the .text property to extract the response.
        return response.text;
    } catch (error) {
        console.error("Error analyzing image:", error);
        throw error;
    }
};