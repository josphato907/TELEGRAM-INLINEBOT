# Telegram Bot - Vercel Deployment Guide

Deploy your Telegram bot to Vercel in just a few minutes! This guide covers the complete setup process.

## ✅ Prerequisites

- [Vercel account](https://vercel.com) (free tier available)
- Telegram bot token from @BotFather
- GitHub repository connected (optional but recommended)

## 🚀 Step 1: Deploy to Vercel

### Option A: Deploy via GitHub (Recommended)

1. **Push your code to GitHub**
   ```bash
   git push origin master
   ```

2. **Visit Vercel Dashboard**
   - Go to https://vercel.com/dashboard
   - Click "Add New..." → "Project"

3. **Import from Git**
   - Select "GitHub" as your Git provider
   - Search for `TELEGRAM-INLINEBOT` repository
   - Click "Import"

4. **Configure Project**
   - Framework: Next.js (auto-detected)
   - Root Directory: ./ (default)
   - Build Command: `npm run build` (default)

5. **Add Environment Variables**
   - Click "Environment Variables"
   - Add the following:
     ```
     TELEGRAM_BOT_TOKEN=your_bot_token_here
     ADMIN_USERNAME=rosaharveys
     GROUP_INVITE_LINK=https://t.me/+FqcBQjNAaRdhMzlk
     ```
   - Click "Deploy"

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Enter environment variables when prompted**

### Option C: Deploy Manually

1. Visit Vercel.com and create a new project
2. Connect your GitHub account
3. Select the TELEGRAM-INLINEBOT repository
4. Add environment variables
5. Deploy

## 🔧 Step 2: Configure Webhook on Telegram

After deployment, you'll get a Vercel URL like: `https://your-project.vercel.app`

### Method 1: Automatic Setup (Recommended)

Run the webhook setup script with your Vercel URL:

```bash
# With environment variable
export VERCEL_URL=your-project.vercel.app
npx ts-node scripts/setup-webhook.ts

# Or pass as argument
VERCEL_URL=your-project.vercel.app npx ts-node scripts/setup-webhook.ts
```

### Method 2: Manual Setup via Telegram API

```bash
curl -X POST https://api.telegram.org/bot{YOUR_BOT_TOKEN}/setWebhook \
  -H 'Content-Type: application/json' \
  -d '{
    "url": "https://your-project.vercel.app/api/telegram/webhook"
  }'
```

Replace:
- `{YOUR_BOT_TOKEN}` with your actual bot token
- `your-project.vercel.app` with your Vercel deployment URL

### Verify Webhook Setup

```bash
curl https://api.telegram.org/bot{YOUR_BOT_TOKEN}/getWebhookInfo
```

You should see:
```json
{
  "ok": true,
  "result": {
    "url": "https://your-project.vercel.app/api/telegram/webhook",
    "has_custom_certificate": false,
    "pending_update_count": 0
  }
}
```

## 📝 Step 3: Add Bot to Your Telegram Group

1. **Open your Telegram group**
2. **Search for your bot** in Telegram (using the username from @BotFather)
3. **Click "Add to Group"**
4. **Select your group**
5. **Give the bot admin permissions:**
   - Delete Messages (to manage spam if needed)
   - Post Messages (required for welcome messages)

## ✨ Step 4: Test Your Bot

1. **Invite a new member** to your Telegram group
2. **Bot should automatically:**
   - Send welcome message with your introduction
   - Show two inline buttons:
     - "💬 TALK WITH ADMIN"
     - "👥 INVITE FRIENDS"
3. **Test button functionality:**
   - Click "TALK WITH ADMIN" → Opens chat with @rosaharveys
   - Click "INVITE FRIENDS" → Bot sends group link

## 🔍 Monitoring & Debugging

### View Deployment Logs

```bash
vercel logs --prod
```

### Check Webhook Health

```bash
curl https://your-project.vercel.app/api/telegram/webhook
```

Should return:
```json
{
  "status": "Telegram bot webhook is running",
  "timestamp": "2024-01-15T12:34:56.789Z"
}
```

### Enable Debug Logging

Add to your Vercel environment variables:
```
DEBUG=true
```

Logs will appear in your Vercel dashboard.

## 🛡️ Environment Variables Reference

| Variable | Required | Example |
|----------|----------|---------|
| `TELEGRAM_BOT_TOKEN` | Yes | `123456:ABCdef...` |
| `ADMIN_USERNAME` | No | `rosaharveys` |
| `GROUP_INVITE_LINK` | No | `https://t.me/+FqcBQjNAaRdhMzlk` |
| `DEBUG` | No | `true` or `false` |
| `VERCEL_URL` | Auto | Set by Vercel |

## 🚨 Troubleshooting

### Bot Not Responding

1. **Check webhook is set:**
   ```bash
   curl https://api.telegram.org/bot{TOKEN}/getWebhookInfo
   ```

2. **Check logs:**
   ```bash
   vercel logs --prod
   ```

3. **Verify bot is admin in group:**
   - Open group settings
   - Administrators
   - Make sure your bot is listed

### "Method Not Allowed" Error

- Ensure your bot has permission to post messages in the group
- Go to group settings → Administrators → Add your bot

### Webhook Setup Fails

1. **Verify VERCEL_URL is correct:**
   - Should be: `your-project-name.vercel.app`
   - Without `https://` or trailing slash

2. **Check bot token is valid:**
   - Talk to @BotFather
   - Verify token in @BotFather's `/mybots`

3. **Try manual setup:**
   ```bash
   curl -X POST https://api.telegram.org/bot{TOKEN}/setWebhook \
     -H 'Content-Type: application/json' \
     -d '{"url":"https://your-project.vercel.app/api/telegram/webhook"}'
   ```

## 📊 Performance & Scaling

- **Vercel Free Tier:** Handles ~1,000 requests/day
- **Vercel Pro:** Unlimited requests
- **Concurrent Members:** Supports multiple joins simultaneously
- **Response Time:** <100ms average

## 🔄 Continuous Deployment

With GitHub integration:
1. Push changes to `master` branch
2. Vercel automatically builds and deploys
3. No manual deployment needed
4. Webhook URL stays the same

## ✅ Deployment Checklist

- [ ] Bot token created at @BotFather
- [ ] GitHub repository up to date
- [ ] Vercel account created
- [ ] Project deployed to Vercel
- [ ] Environment variables set in Vercel dashboard
- [ ] Webhook configured (automatic or manual)
- [ ] Bot added to Telegram group as admin
- [ ] Tested with a new member join
- [ ] Admin button works (@rosaharveys)
- [ ] Invite friends button works (shows group link)

## 📞 Support

If issues persist:

1. Check logs: `vercel logs --prod`
2. Verify webhook: `curl https://api.telegram.org/bot{TOKEN}/getWebhookInfo`
3. Test locally first: `npm run dev`

## 🎉 You're Done!

Your Telegram bot is now live on Vercel! 🚀

Every time someone joins your group, they'll:
1. See a personalized welcome message
2. Have access to two interactive buttons
3. Can contact you or invite friends

Enjoy your automated welcome bot!
