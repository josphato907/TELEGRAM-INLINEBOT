# Deploy to Vercel in 5 Minutes

Quick deployment guide for impatient developers.

## Step 1: Push to GitHub (1 min)
```bash
git push origin master
```

## Step 2: Deploy to Vercel (2 min)

### Option A: Vercel Dashboard (Easiest)
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Select "TELEGRAM-INLINEBOT" from GitHub
4. Click "Deploy"

### Option B: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

## Step 3: Add Environment Variables (1 min)

In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add these variables:
   ```
   TELEGRAM_BOT_TOKEN=8705352429:AAFEnwVGYhdodm1V7iDItiCXycEy-WZfL_o
   ADMIN_USERNAME=rosaharveys
   GROUP_INVITE_LINK=https://t.me/+FqcBQjNAaRdhMzlk
   ```
3. Save and redeploy

## Step 4: Setup Webhook (1 min)

Get your Vercel URL from the deployment (looks like: `your-project.vercel.app`)

Then run:
```bash
VERCEL_URL=your-project.vercel.app npm run setup-webhook
```

Or manually:
```bash
curl -X POST https://api.telegram.org/bot8705352429:AAFEnwVGYhdodm1V7iDItiCXycEy-WZfL_o/setWebhook \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://your-project.vercel.app/api/telegram/webhook"}'
```

## Step 5: Test (1 min)

1. Add bot to your Telegram group
2. Invite a new member
3. Bot sends welcome message ✅

## Done! 🎉

Your bot is now live on Vercel!

## Troubleshooting

**Bot not responding?**
- Check webhook: `curl https://api.telegram.org/bot{TOKEN}/getWebhookInfo`
- Check logs: `vercel logs --prod`
- Make sure bot is admin in group

**Webhook setup fails?**
- Verify VERCEL_URL format (no `https://`, no trailing slash)
- Check bot token is correct
- Try manual setup with curl above

## Full Guide
See `VERCEL_DEPLOYMENT.md` for detailed setup and troubleshooting.
