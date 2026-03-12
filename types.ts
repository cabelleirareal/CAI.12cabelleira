
import type React from 'react';

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

export interface TechCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
}
