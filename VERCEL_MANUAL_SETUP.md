# Manual Vercel Setup Guide

Since auto-deployment might need additional configuration, here's how to manually deploy and configure:

## Step 1: Deploy on Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Select your GitHub repo: `TELEGRAM-INLINEBOT`
4. Click "Import"

## Step 2: Add Environment Variables

In the Vercel dashboard during setup, add these environment variables:

```
TELEGRAM_BOT_TOKEN=8705352429:AAFEnwVGYhdodm1V7iDItiCXycEy-WZfL_o
ADMIN_USERNAME=rosaharveys
GROUP_INVITE_LINK=https://t.me/+FqcBQjNAaRdhMzlk
DEBUG=false
```

## Step 3: Deploy

Click "Deploy" and wait for it to finish (~2 minutes)

## Step 4: Configure Webhook

Once deployed, get your Vercel deployment URL. It will be something like:
```
https://telegram-inlinebot.vercel.app
```

Then run this command to set the webhook:

```bash
curl -X POST "https://api.telegram.org/bot8705352429:AAFEnwVGYhdodm1V7iDItiCXycEy-WZfL_o/setWebhook" \
  -d "url=https://telegram-inlinebot.vercel.app/api/telegram/webhook" \
  -H "Content-Type: application/x-www-form-urlencoded"
```

Expected response:
```json
{
  "ok": true,
  "result": true,
  "description": "Webhook was set"
}
```

## Step 5: Verify Webhook

Check webhook status:
```bash
curl "https://api.telegram.org/bot8705352429:AAFEnwVGYhdodm1V7iDItiCXycEy-WZfL_o/getWebhookInfo"
```

Should show:
```json
{
  "ok": true,
  "result": {
    "url": "https://telegram-inlinebot.vercel.app/api/telegram/webhook",
    "has_custom_certificate": false,
    "pending_update_count": 0,
    "max_connections": 40,
    "ip_address": "..."
  }
}
```

## Step 6: Test It!

Add your bot to a Telegram group as admin and have someone join - you should see the welcome message!

## Troubleshooting

### Webhook returns 404
- Make sure deployment is complete
- Check that environment variables are set
- Try clearing Vercel cache: Project Settings → Storage → Purge Cache

### Bot not responding
1. Check webhook status: `getWebhookInfo`
2. Check Vercel logs: Dashboard → Project → Logs
3. Ensure bot token is correct
4. Make sure bot is admin in the group

### Wrong response from webhook
- Check .env variables are properly set
- Verify route file exists: `app/api/telegram/webhook/route.ts`
- Try redeploying

## Alternative: Deploy from Command Line

If you prefer using Vercel CLI:

```bash
npm i -g vercel
vercel login
vercel --env TELEGRAM_BOT_TOKEN=your_token --env ADMIN_USERNAME=rosaharveys
```

## Files Deployed

When you deploy to Vercel, these files are key:

- `app/api/telegram/webhook/route.ts` - Webhook handler
- `.env` - Environment variables (not pushed to git for security)
- All other files supporting the app

## Local vs. Vercel

**Local** (`npm run dev` + `npx ts-node bot/start.ts`):
- Bot polls Telegram every second
- Always running on your computer
- Good for development and testing

**Vercel** (webhook):
- Telegram sends updates to your webhook endpoint
- Instant response (no polling delay)
- 24/7 availability without keeping your PC on
- Scales automatically
- Free tier includes generous limits

---

Next: Once deployed and working, check the webhook status to confirm it's receiving updates!
