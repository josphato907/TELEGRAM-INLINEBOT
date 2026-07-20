# Telegram Bot Troubleshooting Guide

## Issue: Bot is Not Working on Telegram

If your bot is not sending welcome messages when new members join, follow this guide.

---

## ✓ Verification Checklist

### 1. Bot Process is Running
```bash
ps aux | grep "node start-bot" | grep -v grep
```
**Status: Currently Running (PID 2227)**

### 2. Bot Connection to Telegram
```bash
curl "https://api.telegram.org/bot8705352429:AAFEnwVGYhdodm1V7iDItiCXycEy-WZfL_o/getMe"
```
**Status: ✓ Connected (Bot name: George, Username: @Innbbbbbbb_bot)**

---

## Most Common Issues & Solutions

### Issue 1: Bot Not Added to Group
**Symptoms:** Bot runs but doesn't send messages

**Solution:**
1. Open Telegram
2. Go to your group
3. Click group name → Members → Add member
4. Search for `@Innbbbbbbb_bot`
5. Add the bot to the group

---

### Issue 2: Bot Doesn't Have Admin Permissions
**Symptoms:** Bot is in group but no messages appear

**Solution:**
1. Open your Telegram group
2. Go to group info
3. Find `@Innbbbbbbb_bot` in members list
4. Tap on the bot → Make Admin
5. Grant these permissions:
   - ✓ Send Messages
   - ✓ Delete Messages
   - ✓ Pin Messages
   - ✓ Manage Members (optional)

---

### Issue 3: Bot Process is Not Running
**Symptoms:** Bot stopped responding

**Solution:**
```bash
# Check if bot is running
ps aux | grep "node start-bot"

# If not running, restart:
cd /vercel/share/v0-project
nohup node start-bot.js > bot.log 2>&1 &

# Verify it started:
ps aux | grep "node start-bot" | grep -v grep
```

---

### Issue 4: No One Has Joined Yet
**Symptoms:** Bot is set up but you haven't tested it

**Solution:**
1. Create a test group
2. Add the bot as admin
3. Have a friend join the group
4. Friend should receive welcome message in 1-2 seconds

---

## Debugging Steps

### Check Bot Logs
```bash
tail -50 /vercel/share/v0-project/bot.log
```

### Enable Debug Mode
```bash
cd /vercel/share/v0-project
DEBUG=true node start-bot.js
```

### Check for Error Messages
```bash
grep -i "error" /vercel/share/v0-project/bot.log
```

### Verify Bot Token
```bash
cat /vercel/share/v0-project/.env | grep TELEGRAM_BOT_TOKEN
```

---

## Bot Configuration

**Bot Username:** @Innbbbbbbb_bot  
**Admin Username:** @rosaharveys  
**Group Invite Link:** https://t.me/+FqcBQjNAaRdhMzlk  
**Token:** 8705352429:AAFEnwVGYhdodm1V7iDItiCXycEy-WZfL_o  

---

## What the Bot Does

When a new member joins your group:

1. Bot detects the join event
2. Sends personalized welcome message mentioning the member
3. Shows 2 buttons:
   - "💬 TALK WITH ADMIN" → Opens chat with @rosaharveys
   - "👥 INVITE FRIENDS" → Sends group invite link

---

## Still Not Working?

If you've followed all steps above, the issue might be:

1. **Bot token is invalid** - Regenerate from @BotFather
2. **Group is restricted** - Some groups block bots
3. **Network/firewall issues** - Check internet connection
4. **Bot doesn't have right permissions** - Make it a full admin

---

## Quick Status Check

Run this to verify everything:

```bash
cd /vercel/share/v0-project

echo "=== Bot Process ==="
ps aux | grep "node start-bot" | grep -v grep

echo ""
echo "=== Bot Connection ==="
curl -s "https://api.telegram.org/bot8705352429:AAFEnwVGYhdodm1V7iDItiCXycEy-WZfL_o/getMe" | grep -E '"ok"|username'

echo ""
echo "=== Recent Bot Activity ==="
tail -10 bot.log
```

If all three show green, your bot is ready!
