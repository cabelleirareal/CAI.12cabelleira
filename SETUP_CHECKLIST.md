# ✅ Cabelleira Real IA - Setup & Deployment Checklist

**Project:** CAI.12cabelleira
**Domain:** www.cabelleiraia.cloud
**Status:** Ready for Easypanel Deployment
**Last Updated:** March 13, 2026

---

## 📋 Phase 1: Repository Preparation ✅ COMPLETED

### Files Created
- [x] `.env.example` - Environment variables template
- [ ] - [x] `easypanel.config.json` - Easypanel configuration
- [ ] - [x] `DEPLOYMENT.md` - Complete deployment guide
- [ ] - [x] `SETUP_CHECKLIST.md` - This checklist
- [ ] - [x] `.gitignore` - Already exists
- [ ] - [x] `package.json` - Already configured
- [ ] - [x] `Dockerfile` - Already exists
- [ ] - [x] `vite.config.ts` - Build configuration ready

- [ ] ### GitHub Status
- [ ] - [x] Repository is public and accessible
- [ ] - [x] 12+ commits created
- [ ] - [x] Main branch is clean
- [ ] - [x] All files committed successfully
- [ ] - [x] Ready for integration with Easypanel

- [ ] ---

- [ ] ## 📋 Phase 2: Infrastructure Setup - ACTION REQUIRED

- [ ] ### ⏳ NEXT STEPS (You must complete these):

- [ ] #### Step 1: Configure DNS in Hostinger
- [ ] **Status:** ⏳ PENDING

- [ ] 1. [ ] Log in to **hpanel.hostinger.com**
- [ ] 2. [ ] Go to **Domains** → **cabelleiraia.cloud**
- [ ] 3. [ ] Find **DNS Records** section
- [ ] 4. [ ] Update/Create these records:

- [ ]    ```
- [ ]       Type: A      | Name: @   | Value: YOUR_SERVER_IP | TTL: 3600
- [ ]      Type: A      | Name: www | Value: YOUR_SERVER_IP | TTL: 3600
- [ ]     Type: CNAME  | Name: *   | Value: cabelleiraia.cloud | TTL: 3600
- [ ]    ```

- [ ]    5. [ ] **Save changes**
- [ ]    6. [ ] Wait for DNS propagation (5-30 minutes)
- [ ]    7. [ ] Verify with: `nslookup www.cabelleiraia.cloud`

- [ ]    **Important:** Replace `YOUR_SERVER_IP` with your actual Easypanel server IP address

- [ ]    ---

- [ ]    #### Step 2: Connect GitHub to Easypanel
- [ ]    **Status:** ⏳ PENDING

- [ ]    1. [ ] Access **Easypanel Dashboard**
- [ ]    2. [ ] Click **Applications** → **Create New**
- [ ]    3. [ ] Select **Git Repository**
- [ ]    4. [ ] Choose **GitHub**
- [ ]    5. [ ] Authorize Easypanel to access your GitHub account
- [ ]    6. [ ] Select repository: **cabelleirareal/CAI.12cabelleira**
- [ ]    7. [ ] Select branch: **main**
- [ ]    8. [ ] Click **Create**

- [ ]    ---

- [ ]    #### Step 3: Configure Build Settings in Easypanel
- [ ]    **Status:** ⏳ PENDING

- [ ]    Go to **Application Settings** and configure:

- [ ]    - [x] **Build Command:** `npm install && npm run build`
- [ ]    - [x] **Start Command:** `npm start`
- [ ]    - [x] **Port:** `3000`
- [ ]    - [x] **Node Version:** `20.x`
- [ ]    - [x] **Output Directory:** `dist`
- [ ]    - [ ] **Save Configuration**

- [ ]    ---

- [ ]    #### Step 4: Add Environment Variables
- [ ]    **Status:** ⏳ PENDING

- [ ]    In Easypanel, navigate to **Environment Variables** and add:

- [ ]    ```
- [ ]    GEMINI_API_KEY=sk-YOUR_ACTUAL_API_KEY_HERE
- [ ]    NODE_ENV=production
- [ ]    VITE_API_BASE_URL=https://www.cabelleiraia.cloud
- [ ]    ```

- [ ]    Steps:
- [ ]    1. [ ] Click **Add Variable**
- [ ]    2. [ ] Enter `GEMINI_API_KEY` as key
- [ ]    3. [ ] Enter your Gemini API key as value
- [ ]    4. [ ] Mark as **Sensitive** (if available)
- [ ]    5. [ ] Repeat for `NODE_ENV` and `VITE_API_BASE_URL`
- [ ]    6. [ ] Click **Save**

- [ ]    **⚠️ WARNING:** Never commit your real API key to GitHub. Use .env.example for reference only.

- [ ]    ---

- [ ]    #### Step 5: Configure Domains and SSL
- [ ]    **Status:** ⏳ PENDING

- [ ]    1. [ ] Go to **Domains** section in Easypanel
- [ ]    2. [ ] Click **Add Domain**
- [ ]    3. [ ] Add: `cabelleiraia.cloud`
- [ ]    4. [ ] Add: `www.cabelleiraia.cloud`
- [ ]    5. [ ] Enable **Auto SSL/TLS** (Let's Encrypt)
- [ ]    6. [ ] Click **Save**
- [ ]    7. [ ] Wait for SSL certificate generation (usually 5 minutes)

- [ ]    ---

- [ ]    #### Step 6: Start First Deployment
- [ ]    **Status:** ⏳ PENDING

- [ ]    1. [ ] In your application, click **Redeploy**
- [ ]    2. [ ] Monitor the **Logs** section
- [ ]    3. [ ] Watch for messages:
- [ ]       - `npm install` - dependencies installing
- [ ]      - `npm run build` - building the project
- [ ]     - `npm start` - application starting
- [ ]    - `listening on port 3000` - success!
- [ ]    4. [ ] Check **Health Status** turns GREEN
- [ ]    5. [ ] Wait for deployment to complete

- [ ]    ---

- [ ]    ## 📋 Phase 3: Verification - ACTION REQUIRED

- [ ]    ### ⏳ After Deployment is Complete:

- [ ]    #### Test 1: Domain Access
- [ ]    - [ ] Open browser
- [ ]    - [ ] Visit: https://www.cabelleiraia.cloud
- [ ]    - [ ] Expected: Application loads without errors
- [ ]    - [ ] Certificate shows valid (no HTTPS warnings)
- [ ]    - [ ] Page displays content from your app

- [ ]    #### Test 2: HTTPS Certificate
- [ ]    - [ ] Visit https://www.cabelleiraia.cloud
- [ ]    - [ ] Click the padlock icon in address bar
- [ ]    - [ ] Verify certificate is from **Let's Encrypt**
- [ ]    - [ ] Check expiry date (should be 90 days out)
- [ ]    - [ ] No security warnings

- [ ]    #### Test 3: API Integration
- [ ]    - [ ] Open browser DevTools (F12)
- [ ]    - [ ] Go to **Console** tab
- [ ]    - [ ] Look for API calls to Gemini
- [ ]    - [ ] Verify no authentication errors
- [ ]    - [ ] Test core functionality of app

- [ ]    #### Test 4: Performance
- [ ]    - [ ] Use DevTools Network tab
- [ ]    - [ ] Load main page
- [ ]    - [ ] Check load time (should be < 3 seconds)
- [ ]    - [ ] Check no 404 or 500 errors
- [ ]    - [ ] Verify all assets load correctly

- [ ]    #### Test 5: Logs Check
- [ ]    - [ ] In Easypanel, go to **Logs**
- [ ]    - [ ] Check for `ERROR` or `FATAL` messages
- [ ]    - [ ] Verify `NODE_ENV=production`
- [ ]    - [ ] Look for successful API authentication

- [ ]    ---

- [ ]    ## 📋 Phase 4: Auto-Deployment Testing

- [ ]    ### ⏳ Test Webhook Integration:

- [ ]    1. [ ] Make a small change to the repo (e.g., add a comment)
- [ ]    2. [ ] Commit and push to `main` branch:
- [ ]       ```bash
- [ ]      git add .
- [ ]     git commit -m "test: webhook trigger"
- [ ]    git push origin main
- [ ]       ```
- [ ]   3. [ ] Check Easypanel logs within 1 minute
- [ ]   4. [ ] You should see automatic redeploy start
- [ ]   5. [ ] Verify application updates

- [ ]   ---

- [ ]   ## 🔍 Troubleshooting Guide

- [ ]   If you encounter issues, follow this guide:

- [ ]   ### Issue: "Service is not reachable"
- [ ]   - [ ] Check if DNS is propagated: `nslookup www.cabelleiraia.cloud`
- [ ]   - [ ] Verify firewall allows ports 80 and 443
- [ ]   - [ ] Check application logs in Easypanel
- [ ]   - [ ] Ensure health check endpoint is correct

- [ ]   ### Issue: "Cannot find module npm"
- [ ]   - [ ] Verify Node version is 20.x in Easypanel
- [ ]   - [ ] Check build logs for npm errors
- [ ]   - [ ] Clear cache and redeploy
- [ ]   - [ ] Ensure package.json exists in repo root

- [ ]   ### Issue: "API Key not working"
- [ ]   - [ ] Verify GEMINI_API_KEY is set in Easypanel UI
- [ ]   - [ ] Check API key is valid (not expired/revoked)
- [ ]   - [ ] Verify Google Cloud project is active
- [ ]   - [ ] Check for typos in variable name

- [ ]   ### Issue: "SSL Certificate not generating"
- [ ]   - [ ] Wait 5-10 minutes after domain added
- [ ]   - [ ] Check DNS is properly configured
- [ ]   - [ ] Try manual renewal in Easypanel > Domains
- [ ]   - [ ] Verify domain name matches exactly

- [ ]   ### Issue: "Blank page or 404 errors"
- [ ]   - [ ] Check if build output directory is correct (`dist`)
- [ ]   - [ ] Verify start command is correct
- [ ]   - [ ] Check application logs
- [ ]   - [ ] Ensure all environment variables are set

- [ ]   ---

- [ ]   ## 📚 Important Files Reference

- [ ]   | File | Purpose |
- [ ]   |------|---------|
- [ ]   | `.env.example` | Template for environment variables |
- [ ]   | `DEPLOYMENT.md` | Detailed deployment instructions |
- [ ]   | `easypanel.config.json` | Easypanel configuration |
- [ ]   | `package.json` | Node.js dependencies and scripts |
- [ ]   | `vite.config.ts` | Build configuration |
- [ ]   | `Dockerfile` | Container configuration (optional) |

- [ ]   ---

- [ ]   ## 🔐 Security Checklist

- [ ]   - [ ] `.env` file is in `.gitignore` (never commit real keys)
- [ ]   - [ ] `GEMINI_API_KEY` is marked as sensitive in Easypanel
- [ ]   - [ ] API key is not logged in application
- [ ]   - [ ] HTTPS is enabled (Let's Encrypt)
- [ ]   - [ ] Environment variables are only set in Easypanel UI
- [ ]   - [ ] Repository is private (or doesn't contain secrets)
- [ ]   - [ ] Database passwords (if any) are in environment variables

- [ ]   ---

- [ ]   ## 📞 Support Contacts

- [ ]   - **Easypanel:** https://easypanel.io/docs
- [ ]   - **Hostinger:** https://support.hostinger.com
- [ ]   - **GitHub:** https://docs.github.com
- [ ]   - **Let's Encrypt:** https://letsencrypt.org/support/

- [ ]   ---

- [ ]   ## ✨ Final Checklist Before Going Live

- [ ]   - [ ] All DNS records configured
- [ ]   - [ ] GitHub connected to Easypanel
- [ ]   - [ ] Build settings configured correctly
- [ ]   - [ ] Environment variables set securely
- [ ]   - [ ] Domains added with SSL enabled
- [ ]   - [ ] First deployment completed successfully
- [ ]   - [ ] HTTPS certificate valid and installed
- [ ]   - [ ] Application loads without errors
- [ ]   - [ ] API integration working
- [ ]   - [ ] Performance is acceptable
- [ ]   - [ ] Logs show no critical errors
- [ ]   - [ ] Auto-redeploy tested and working
- [ ]   - [ ] Rollback procedure understood

- [ ]   ---

- [ ]   ## 🎉 Completion Status

- [ ]   **Phase 1 (Repository):** ✅ COMPLETED
- [ ]   **Phase 2 (Infrastructure):** ⏳ IN PROGRESS (awaiting your actions)
- [ ]   **Phase 3 (Verification):** ⏳ PENDING
- [ ]   **Phase 4 (Auto-Deploy):** ⏳ PENDING

- [ ]   ### Next Action:
- [ ]   👉 **Start with Step 1: Configure DNS in Hostinger** (listed above in Phase 2)

- [ ]   ---

- [ ]   **Questions?** Refer to `DEPLOYMENT.md` for detailed instructions on each step.
