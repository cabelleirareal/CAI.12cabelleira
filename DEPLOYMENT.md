# 🚀 Deployment Guide - Cabelleira Real IA

## Overview
This guide contains all necessary steps to deploy the Cabelleira Real IA application on **Easypanel** with **Hostinger** hosting.

**Domain:** https://www.cabelleiraia.cloud
**Framework:** Vite + React
**API:** Google Gemini AI
**Hosting:** Hostinger + Easypanel

---

## Prerequisites

✅ Completed Items:
- GitHub repository: https://github.com/cabelleirareal/CAI.12cabelleira
- - Hostinger account with VPS/Server
  - - Easypanel installed on server
    - - Domain registered: cabelleiraia.cloud
      - - DNS access in Hostinger
       
        - ---

        ## Step 1: DNS Configuration (Hostinger)

        1. Go to **hpanel.hostinger.com**
        2. 2. Navigate to **Domains** → **cabelleiraia.cloud**
           3. 3. Find DNS records section
              4. 4. Create/Update records:
                
                 5. ```
                    Type: A      | Name: @   | Value: YOUR_SERVER_IP | TTL: 3600
                    Type: A      | Name: www | Value: YOUR_SERVER_IP | TTL: 3600
                    Type: CNAME  | Name: *   | Value: cabelleiraia.cloud | TTL: 3600
                    ```

                    5. Wait for DNS propagation (usually 5-30 minutes)
                   
                    6. Verify with:
                    7. ```bash
                       nslookup cabelleiraia.cloud
                       nslookup www.cabelleiraia.cloud
                       ```

                       ---

                       ## Step 2: Easypanel Configuration

                       ### 2.1 Connect GitHub Repository

                       1. Access Easypanel dashboard
                       2. 2. Click **Applications** → **Create New**
                          3. 3. Choose **Git Repository**
                             4. 4. Select **GitHub**
                                5. 5. Authorize & select: `cabelleirareal/CAI.12cabelleira`
                                   6. 6. Branch: `main`
                                      7. 7. Click **Create**
                                        
                                         8. ### 2.2 Configure Build & Deploy
                                        
                                         9. **Application Settings:**
                                        
                                         10. | Setting | Value |
                                         11. |---------|-------|
                                         12. | Build Command | `npm install && npm run build` |
                                         13. | Start Command | `npm start` |
                                         14. | Port | `3000` |
                                         15. | Node Version | `20.x` |
                                         16. | Output Directory | `dist` |
                                        
                                         17. ### 2.3 Add Environment Variables
                                        
                                         18. In Easypanel, go to **Environment Variables** and add:
                                        
                                         19. ```
                                             GEMINI_API_KEY=sk-...YOUR_ACTUAL_KEY...
                                             NODE_ENV=production
                                             VITE_API_BASE_URL=https://www.cabelleiraia.cloud
                                             ```

                                             ### 2.4 Configure Domains

                                             1. Go to **Domains** section
                                             2. 2. Add domain: `cabelleiraia.cloud`
                                                3. 3. Add domain: `www.cabelleiraia.cloud`
                                                   4. 4. Enable **Auto SSL/TLS** (Let's Encrypt)
                                                      5. 5. Save
                                                        
                                                         6. ### 2.5 Deploy
                                                        
                                                         7. 1. Click **Redeploy** or wait for webhook trigger
                                                            2. 2. Monitor logs for build status
                                                               3. 3. Check application health
                                                                 
                                                                  4. ---
                                                                 
                                                                  5. ## Step 3: Verify Deployment
                                                                 
                                                                  6. ### 3.1 Check Domain Access
                                                                 
                                                                  7. ```bash
                                                                     # Basic test
                                                                     curl -I https://www.cabelleiraia.cloud

                                                                     # Expected response:
                                                                     # HTTP/2 200
                                                                     # content-type: text/html; charset=UTF-8
                                                                     # strict-transport-security: max-age=31536000; includeSubDomains
                                                                     ```

                                                                     ### 3.2 Test HTTPS Certificate

                                                                     ```bash
                                                                     openssl s_client -connect www.cabelleiraia.cloud:443 -servername www.cabelleiraia.cloud
                                                                     ```

                                                                     ### 3.3 Check API Endpoints

                                                                     Visit in browser:
                                                                     - https://www.cabelleiraia.cloud/ (main app)
                                                                     - - Check browser console for API calls
                                                                       - - Verify Gemini API integration
                                                                        
                                                                         - ### 3.4 Monitor Logs
                                                                        
                                                                         - In Easypanel:
                                                                         - 1. Go to your application
                                                                           2. 2. Click **Logs**
                                                                              3. 3. Verify no errors during startup
                                                                                 4. 4. Check for "listening on port 3000" message
                                                                                   
                                                                                    5. ---
                                                                                   
                                                                                    6. ## Step 4: Auto-Deployment from GitHub
                                                                                   
                                                                                    7. ### 4.1 Webhook Configuration
                                                                                   
                                                                                    8. Easypanel automatically creates a webhook. Verify:
                                                                                   
                                                                                    9. 1. Go to GitHub repo → **Settings** → **Webhooks**
                                                                                       2. 2. You should see a webhook for Easypanel
                                                                                          3. 3. If missing, add manually:
                                                                                             4.    - URL: `https://YOUR_EASYPANEL_URL/webhooks/github`
                                                                                                   -    - Events: `Push`
                                                                                                        -    - Content type: `application/json`
                                                                                                         
                                                                                                             - ### 4.2 Test Auto-Deploy
                                                                                                         
                                                                                                             - 1. Make a small change to repo
                                                                                                               2. 2. Commit and push to `main`
                                                                                                                  3. 3. Check Easypanel logs
                                                                                                                     4. 4. Application should redeploy automatically
                                                                                                                       
                                                                                                                        5. ---
                                                                                                                       
                                                                                                                        6. ## Troubleshooting
                                                                                                                       
                                                                                                                        7. ### Build Fails - "npm command not found"
                                                                                                                        8. - Ensure Node 20.x is selected in Easypanel
                                                                                                                           - - Clear build cache and redeploy
                                                                                                                            
                                                                                                                             - ### App runs but not accessible
                                                                                                                             - - Check if port 3000 is open
                                                                                                                               - - Verify DNS propagation
                                                                                                                                 - - Check firewall rules in Hostinger
                                                                                                                                  
                                                                                                                                   - ### SSL Certificate not working
                                                                                                                                   - - Wait 5 minutes for certificate generation
                                                                                                                                     - - Manually trigger renewal in Easypanel
                                                                                                                                       - - Check certificate in **Domains** settings
                                                                                                                                        
                                                                                                                                         - ### Environment variables not loaded
                                                                                                                                         - - Confirm variables are in Easypanel UI
                                                                                                                                           - - Redeploy application
                                                                                                                                             - - Check application logs for variable loading
                                                                                                                                              
                                                                                                                                               - ### API Key issues
                                                                                                                                               - - Ensure GEMINI_API_KEY is set in Easypanel
                                                                                                                                                 - - Verify key is valid and not revoked
                                                                                                                                                   - - Check Google Cloud project is active
                                                                                                                                                    
                                                                                                                                                     - ---
                                                                                                                                                     
                                                                                                                                                     ## Environment Variables Reference
                                                                                                                                                     
                                                                                                                                                     ```env
                                                                                                                                                     # Production
                                                                                                                                                     GEMINI_API_KEY=sk-...your-key...
                                                                                                                                                     NODE_ENV=production
                                                                                                                                                     VITE_API_BASE_URL=https://www.cabelleiraia.cloud

                                                                                                                                                     # Application
                                                                                                                                                     APP_NAME=Cabelleira Real
                                                                                                                                                     APP_PORT=3000
                                                                                                                                                     ```
                                                                                                                                                     
                                                                                                                                                     ---
                                                                                                                                                     
                                                                                                                                                     ## Files Created for Deployment
                                                                                                                                                     
                                                                                                                                                     - ✅ `.env.example` - Environment template
                                                                                                                                                     - - ✅ `easypanel.config.json` - Easypanel configuration
                                                                                                                                                       - - ✅ `DEPLOYMENT.md` - This guide
                                                                                                                                                         - - ✅ `package.json` - Already configured
                                                                                                                                                           - - ✅ `vite.config.ts` - Build configuration
                                                                                                                                                            
                                                                                                                                                             - ---
                                                                                                                                                             
                                                                                                                                                             ## Post-Deployment Checklist
                                                                                                                                                             
                                                                                                                                                             - [ ] Domain resolves (DNS propagated)
                                                                                                                                                             - [ ] - [ ] HTTPS certificate installed
                                                                                                                                                             - [ ] - [ ] Application loads without errors
                                                                                                                                                             - [ ] - [ ] Gemini API connects successfully
                                                                                                                                                             - [ ] - [ ] All pages load correctly
                                                                                                                                                             - [ ] - [ ] No console errors in browser
                                                                                                                                                             - [ ] - [ ] Auto-redeploy works with git push
                                                                                                                                                             - [ ] - [ ] Performance is acceptable (< 3s load time)
                                                                                                                                                             - [ ] - [ ] Logs show no critical errors
                                                                                                                                                            
                                                                                                                                                             - [ ] ---
                                                                                                                                                            
                                                                                                                                                             - [ ] ## Rollback Procedure
                                                                                                                                                            
                                                                                                                                                             - [ ] If something goes wrong:
                                                                                                                                                            
                                                                                                                                                             - [ ] 1. In Easypanel, find previous deployment
                                                                                                                                                             - [ ] 2. Click **Rollback**
                                                                                                                                                             - [ ] 3. Application reverts to previous working version
                                                                                                                                                             - [ ] 4. Fix issue and redeploy
                                                                                                                                                            
                                                                                                                                                             - [ ] ---
                                                                                                                                                            
                                                                                                                                                             - [ ] ## Support Resources
                                                                                                                                                            
                                                                                                                                                             - [ ] - **Easypanel Docs:** https://easypanel.io/docs
                                                                                                                                                             - [ ] - **GitHub Webhooks:** https://docs.github.com/en/developers/webhooks-and-events
                                                                                                                                                             - [ ] - **Let's Encrypt:** https://letsencrypt.org
                                                                                                                                                             - [ ] - **Gemini API:** https://ai.google.dev
                                                                                                                                                            
                                                                                                                                                             - [ ] ---
                                                                                                                                                            
                                                                                                                                                             - [ ] **Last Updated:** March 13, 2026
                                                                                                                                                             - [ ] **Deployment Status:** Ready for production
