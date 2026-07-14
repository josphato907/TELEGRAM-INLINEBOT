# Telegram Welcome Bot - Quick Start

Get your bot running in 5 minutes! ⚡

## 1️⃣ Get Bot Token (2 minutes)

```
1. Open Telegram → Search @BotFather
2. Send: /newbot
3. Follow prompts (choose bot name & username)
4. Copy the token provided
```

**Token looks like**: `5123456789:ABCdefGHIjklmnOPQRstuvWXYZabcdefGHI`

## 2️⃣ Configure Bot (.env)

```bash
# Copy template
cp .env.example .env

# Edit and add your token
TELEGRAM_BOT_TOKEN=YOUR_TOKEN_HERE
```

## 3️⃣ Start Bot

```bash
npx ts-node bot/start.ts
```

**Expected output**:
```
✅ Bot Status:
  - Username: @your_bot_name
  🎉 Bot is running!
```

## 4️⃣ Add Bot to Group

1. Create/open Telegram group
2. Add bot (search by username)
3. Make bot Admin
4. Enable "Post Messages" permission

## 5️⃣ Test It! 

- Have someone join the group
- Bot sends welcome message with buttons
- ✅ Done!

## 📋 Common Commands

```bash
# Start bot
npx ts-node bot/start.ts

# Start with debug logging
DEBUG=true npx ts-node bot/start.ts

# Run examples
npx ts-node bot/examples.ts
```

## ⚙️ Customize

### Change Button URLs

Edit `.env`:
```env
GROUP_RULES_URL=https://your-site.com/rules
WEBSITE_URL=https://your-site.com
CHANNEL_URL=https://t.me/your_channel
ADMIN_URL=https://t.me/admin
```

### Change Welcome Message

Edit `bot/welcomeMessage.ts`:
```typescript
export function generateWelcomeMessageWithMention(user: User): string {
  const firstName = user.first_name ? escapeMarkdown(user.first_name) : 'User';
  
  // Customize this message:
  const message = `🎉 Congratulations, ${firstName}!
  
Welcome to our community!
...`;
  
  return message;
}
```

### Change Buttons

Edit `bot/keyboards.ts`:
```typescript
export function buildWelcomeKeyboard() {
  return Markup.inlineKeyboard([
    // Add/remove buttons here
    [
      Markup.button.url('📖 Rules', botConfig.groupRulesUrl),
      Markup.button.url('🌐 Website', botConfig.websiteUrl),
    ],
    // ... more rows
  ]);
}
```

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Bot doesn't send messages | Make bot Admin in group + enable "Post Messages" |
| "Token required" error | Add `TELEGRAM_BOT_TOKEN` to `.env` |
| Buttons don't work | Check URLs in `.env` are valid |
| Duplicate messages | Enable `DEBUG=true` to see what's happening |

## 🚀 Deploy to Production

### Option 1: PM2 (Recommended)
```bash
npm install -g pm2
pm2 start "npx ts-node bot/start.ts" --name "telegram-bot"
pm2 startup
pm2 save
```

### Option 2: Vercel
1. Push to GitHub
2. Connect to https://vercel.com
3. Set `TELEGRAM_BOT_TOKEN` environment variable
4. Deploy

### Option 3: Docker
```bash
docker build -t telegram-bot .
docker run -e TELEGRAM_BOT_TOKEN=your_token telegram-bot
```

## 📚 Learn More

- Full setup guide: `TELEGRAM_BOT_SETUP.md`
- Module docs: `bot/README.md`
- Code examples: `bot/examples.ts`
- Type definitions: `bot/types.ts`

## 📁 Project Structure

```
bot/
├── index.ts              # Main bot entry point
├── config.ts             # Configuration management
├── keyboards.ts          # Button builder
├── welcomeMessage.ts     # Message generator
├── newMemberHandler.ts   # New member logic
├── callbackHandler.ts    # Button click handler
├── start.ts              # Startup script
├── types.ts              # TypeScript definitions
├── examples.ts           # Code examples
└── README.md             # Full documentation
```

---

**Questions?** Check `bot/README.md` or review the code comments in each module! 💬
