# Telegram Welcome Bot - Setup Guide

Complete step-by-step guide to set up and run the Telegram welcome bot.

## Prerequisites

- ✅ Node.js 16 or higher
- ✅ pnpm (or npm/yarn)
- ✅ A Telegram account
- ✅ Administrator access to a Telegram group

## Step 1: Create a Telegram Bot

### 1.1 Open Telegram and Find BotFather

1. Open Telegram app or go to https://web.telegram.org/
2. Search for `@BotFather` (official Telegram bot creation service)
3. Click on the BotFather result

### 1.2 Create a New Bot

1. Send the command: `/newbot`
2. Follow the prompts:
   - **Question**: What should your bot be called?
     - **Answer**: Enter a friendly name (e.g., "Community Welcome Bot")
   - **Question**: Give your bot a username
     - **Answer**: Enter a unique username ending with "bot" (e.g., `my_welcome_bot`)

### 1.3 Copy Your Bot Token

After creation, BotFather will send you a message containing:
```
Use this token to access the HTTP API:
5123456789:ABCdefGHIjklmnOPQRstuvWXYZabcdefGHI
```

**⚠️ Important**: Keep this token secret! Never share it or commit it to version control.

## Step 2: Configure the Bot Token

### 2.1 Get the Bot Token from BotFather

1. If you lost the token, message `/token` to @BotFather
2. Select your bot from the list
3. Copy the token

### 2.2 Set Up Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file
nano .env  # or use your preferred editor
```

### 2.3 Add Your Bot Token to .env

Edit `.env` and update:

```env
# Replace YOUR_BOT_TOKEN_HERE with your actual token
TELEGRAM_BOT_TOKEN=5123456789:ABCdefGHIjklmnOPQRstuvWXYZabcdefGHI
```

## Step 3: Configure Button URLs

Edit `.env` and customize the button URLs:

```env
# Group Rules button - where your group rules are published
GROUP_RULES_URL=https://yoursite.com/rules

# Official Website button
WEBSITE_URL=https://yoursite.com

# Join Channel button - your Telegram channel
CHANNEL_URL=https://t.me/yourchannel

# Contact Admin button - can be a URL or username
ADMIN_URL=https://t.me/youradmin
ADMIN_USERNAME=youradmin
```

## Step 4: Add Bot to Your Telegram Group

### 4.1 Create or Open a Test Group

1. Open Telegram
2. Create a new group or use an existing one
3. Note: If it's a private group, only you can add the bot

### 4.2 Add the Bot to the Group

1. Open the group
2. Click the group name at the top to open group info
3. Click the plus icon (➕) or "Add members"
4. Search for your bot by username (e.g., `@my_welcome_bot`)
5. Select it and confirm

### 4.3 Make the Bot an Admin

**This is required for the bot to send messages!**

1. In the group, go to **Group Info**
2. Scroll down to **Members** or **Administrators**
3. Find your bot in the list
4. Tap on it to open options
5. Select "Promote to Admin"
6. Enable permission: ✅ **Post Messages**
7. You can leave other permissions unchecked

## Step 5: Install Dependencies

The dependencies are already installed in this project, but if needed:

```bash
pnpm add telegraf dotenv
```

## Step 6: Start the Bot

### Quick Start

```bash
# Start the bot
npx ts-node bot/start.ts
```

### Expected Output

```
🚀 Starting Telegram Welcome Bot...

Configuration:
  - Debug Mode: false
  - Group Rules URL: https://yoursite.com/rules
  - Website URL: https://yoursite.com
  - Channel URL: https://t.me/yourchannel
  - Admin URL: https://t.me/youradmin

✅ Bot Status:
  - Username: @my_welcome_bot
  - Bot ID: 5123456789
  - Name: Community Welcome Bot

🎉 Bot is running! Press Ctrl+C to stop.

Listening for:
  ✓ New members joining the group
  ✓ Button callbacks (verify, etc.)
  ✓ Error handling and logging
```

## Step 7: Test the Bot

### 7.1 Test with a Friend

1. Ask a friend to join your group
2. When they join, the bot should send them a welcome message with buttons
3. The friend can click the buttons to test them

### 7.2 Test Locally (Without Adding Users)

If you're testing alone, you can:

1. Create a private group with just you and the bot
2. Leave the group and rejoin
3. You should receive the welcome message

## Step 8: Enable Debug Mode (Optional)

For troubleshooting, enable detailed logging:

```env
DEBUG=true
```

Restart the bot to see verbose output:
```
[bot] Initializing Telegram bot...
[bot] Event handlers registered
[bot] Bot started successfully
[newMemberHandler] Processing 1 new member(s) in chat -1001234567890
[newMemberHandler] Welcome message sent to John (ID: 123456789)
...
```

## Step 9: Customize Welcome Message (Optional)

To change the welcome message or buttons, edit the appropriate files:

- **Message text**: Edit `bot/welcomeMessage.ts` function `generateWelcomeMessageWithMention()`
- **Buttons**: Edit `bot/keyboards.ts` function `buildWelcomeKeyboard()`
- **Button URLs**: Edit `.env` variables

## Step 10: Keep the Bot Running 24/7 (Production)

For production use, you have several options:

### Option A: Use PM2 (Node.js Process Manager)

```bash
# Install PM2 globally
npm install -g pm2

# Start bot with PM2
pm2 start "npx ts-node bot/start.ts" --name "telegram-bot"

# Make it restart on system reboot
pm2 startup
pm2 save

# View logs
pm2 logs telegram-bot
```

### Option B: Use Vercel (Free Hosting)

This project is a Next.js app, so it can be deployed to Vercel:

```bash
# Push to GitHub first
git add .
git commit -m "Add Telegram bot"
git push origin main

# Deploy to Vercel
# Go to https://vercel.com and import your GitHub repository
```

Then set environment variables in Vercel dashboard:
- Settings → Environment Variables
- Add `TELEGRAM_BOT_TOKEN` and other variables

### Option C: Use Systemd (Linux)

Create `/etc/systemd/system/telegram-bot.service`:

```ini
[Unit]
Description=Telegram Welcome Bot
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/path/to/project
ExecStart=/usr/bin/npx ts-node bot/start.ts
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Then:
```bash
sudo systemctl enable telegram-bot
sudo systemctl start telegram-bot
sudo systemctl status telegram-bot
```

### Option D: Use Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npx", "ts-node", "bot/start.ts"]
```

Build and run:
```bash
docker build -t telegram-bot .
docker run -e TELEGRAM_BOT_TOKEN=your_token telegram-bot
```

## Troubleshooting

### Problem: "TELEGRAM_BOT_TOKEN is required"

**Solution**: 
- Verify `.env` file exists in project root
- Check `TELEGRAM_BOT_TOKEN` is set correctly
- No spaces before/after the token value

```env
# ✅ Correct
TELEGRAM_BOT_TOKEN=5123456789:ABCdef...

# ❌ Wrong
TELEGRAM_BOT_TOKEN = 5123456789:ABCdef...
TELEGRAM_BOT_TOKEN=5123456789:ABCdef...  # with trailing space
```

### Problem: Bot doesn't send welcome messages

**Solutions**:
1. Check bot is an admin in the group
2. Check bot has "Post Messages" permission
3. Enable `DEBUG=true` and check logs
4. Test bot token with @BotFather: `/mybots` → select bot → look for errors

### Problem: "Not enough rights to send text messages to the chat"

**Solution**:
1. Go to group settings
2. Tap on bot name
3. Ensure bot is promoted to Admin
4. Ensure "Post Messages" permission is enabled

### Problem: Buttons don't work

**Solution**:
1. Verify URLs in `.env` are valid
2. Test URLs in a browser to ensure they work
3. Check callback data matches handler in `bot/callbackHandler.ts`

### Problem: Bot doesn't start / Connection refused

**Solution**:
1. Check internet connection
2. Verify bot token is correct
3. Check if bot was deleted (@BotFather can deactivate old bots)
4. Check system firewall (shouldn't be needed for outbound)

## Useful Commands

### Get Your Bot ID
Message @BotFather: `/mybots`

### Change Bot Settings
Message @BotFather: `/mybots` → select bot → look for options

### Get Group/Chat ID
Add @username_to_id_bot to your group

### Monitor Bot Logs in PM2
```bash
pm2 logs telegram-bot
pm2 logs telegram-bot --lines 100
```

### Clear All Environment Variables
```bash
rm .env
```

## Next Steps

- Read `bot/README.md` for detailed module documentation
- Check `bot/examples.ts` for code examples
- Explore `bot/types.ts` for TypeScript definitions
- Customize the message in `bot/welcomeMessage.ts`
- Add more buttons in `bot/keyboards.ts`

## Security Reminders

⚠️ **Important Security Notes**:

1. **Never commit `.env` file** to version control
   - Add `.env` to `.gitignore`
   - Add `.env.example` instead

2. **Keep bot token secret**
   - If token is leaked, create a new bot
   - Delete the old one from @BotFather

3. **Use environment variables** for all secrets
   - Never hardcode tokens or URLs

4. **Validate user input**
   - Bot implements HTML/Markdown escaping
   - Don't display raw user data

## Getting Help

1. **Check the README**: `bot/README.md`
2. **Review examples**: `bot/examples.ts`
3. **Enable debug mode**: `DEBUG=true`
4. **Read Telegraf docs**: https://telegraf.dev/
5. **Telegram Bot API docs**: https://core.telegram.org/bots/api

---

**You're all set! Your Telegram welcome bot is ready to greet new members! 🎉**
