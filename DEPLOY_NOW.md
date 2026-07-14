# Deploy Your Bot to Vercel NOW

Your bot is ready to deploy! Follow these exact steps.

## 🚀 Deploy to Vercel (5 minutes)

### Step 1: Go to Vercel Dashboard
https://vercel.com/dashboard

### Step 2: Deploy
- Click "Add New..." → "Project"
- Select "TELEGRAM-INLINEBOT" from your GitHub
- Click "Deploy"

Wait for the build to complete. You'll get a URL like:
```
https://your-project-abc123.vercel.app
```

### Step 3: Add Environment Variables
1. Go to "Project Settings" → "Environment Variables"
2. Add these three variables:

| Key | Value |
|-----|-------|
| `TELEGRAM_BOT_TOKEN` | `8705352429:AAFEnwVGYhdodm1V7iDItiCXycEy-WZfL_o` |
| `ADMIN_USERNAME` | `rosaharveys` |
| `GROUP_INVITE_LINK` | `https://t.me/+FqcBQjNAaRdhMzlk` |

3. Save → Redeploy

### Step 4: Setup Webhook

Copy your deployment URL (the one you got in Step 2) and run:

```bash
VERCEL_URL=your-project-abc123.vercel.app npm run setup-webhook
```

You should see:
```
✅ Webhook configured successfully!
📍 Webhook URL: https://your-project-abc123.vercel.app/api/telegram/webhook
```

### Step 5: Test
1. Add your bot to a Telegram group
2. Invite a new member
3. Watch it work! 🎉

## 📋 What Changes from Local to Vercel

| Aspect | Local | Vercel |
|--------|-------|--------|
| How it runs | Long polling | Webhook |
| Address | Localhost | HTTPS URL |
| Availability | While running locally | Always on (24/7) |
| URL needed | No | Yes |
| Setup time | 1 minute | 5 minutes |

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables added
- [ ] Deployment completed
- [ ] Webhook URL noted
- [ ] Webhook configured
- [ ] Bot added to group
- [ ] Tested with new member

## 🔧 If Something Goes Wrong

### Webhook fails to set
```bash
# Check your URL is correct
curl https://your-project-abc123.vercel.app/api/telegram/webhook

# Should return:
# {"status":"Telegram bot webhook is running","timestamp":"..."}
```

### Bot doesn't respond
```bash
# Check logs
vercel logs --prod

# Check webhook status
curl https://api.telegram.org/bot8705352429:AAFEnwVGYhdodm1V7iDItiCXycEy-WZfL_o/getWebhookInfo
```

### Make sure:
- ✓ Environment variables are set in Vercel
- ✓ Bot is admin in the group
- ✓ Webhook URL is correct (no trailing slash)
- ✓ Vercel deployment is successful (green checkmark)

## 📚 Full Guides

- `VERCEL_QUICK_START.md` - 5 minute version
- `VERCEL_DEPLOYMENT.md` - Complete with troubleshooting

---

**Ready? Go to https://vercel.com/dashboard and click "Add New" → "Project"**
