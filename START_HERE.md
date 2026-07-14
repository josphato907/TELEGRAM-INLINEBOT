# 🚀 Telegram Welcome Bot - START HERE

**Welcome!** You have a production-ready Telegram welcome bot. Get it running in 10 minutes.

## What You Have

A **fully functional Telegram bot** that:
- ✅ Automatically welcomes new members with personalized messages
- ✅ Shows 5 interactive buttons (Group Rules, Website, Channel, Admin, Verify)
- ✅ Prevents duplicate messages
- ✅ Handles errors gracefully
- ✅ Works 24/7 with proper deployment

All code is **production-ready, modular, and well-documented**.

## Quick Setup (10 Minutes)

### Step 1: Get Bot Token (2 minutes)

1. Open Telegram → Search for **@BotFather**
2. Send `/newbot`
3. Choose a name (e.g., "Welcome Bot")
4. Choose a username ending with "bot" (e.g., `my_welcome_bot`)
5. **Copy the token** you receive

**Token looks like**: `5123456789:ABCdefGHIjklmnOPQRstuvWXYZabcdefGHI`

### Step 2: Configure Bot (2 minutes)

```bash
# Copy configuration template
cp .env.example .env

# Edit .env with your token (use your editor)
# Add: TELEGRAM_BOT_TOKEN=your_token_here
```

### Step 3: Start Bot (1 minute)

```bash
npx ts-node bot/start.ts
```

**You should see:**
```
✅ Bot Status:
  - Username: @your_bot_name
🎉 Bot is running!
```

### Step 4: Add to Group (2 minutes)

1. Create or open a Telegram group
2. Tap the + icon → Add members
3. Search your bot by username
4. Select it and confirm

### Step 5: Make it Admin (2 minutes)

1. In group → Group info
2. Find your bot → Tap it
3. Promote to Admin
4. Enable ✅ "Post Messages"

### Step 6: Test! (1 minute)

1. Have a friend join the group
2. Bot sends them a welcome message with buttons
3. ✅ Done!

## That's It! 🎉

Your bot is now running and welcoming new members automatically.

## Next Steps

### To Customize

**Change Welcome Message:**
Edit `bot/welcomeMessage.ts`

**Change Buttons:**
Edit `bot/keyboards.ts`

**Change Button URLs:**
Edit `.env` file:
```env
GROUP_RULES_URL=https://your-site.com/rules
WEBSITE_URL=https://your-site.com
CHANNEL_URL=https://t.me/your_channel
ADMIN_URL=https://t.me/your_admin
```

### To Deploy (Keep Running 24/7)

**Option 1: PM2** (Recommended, easiest)
```bash
npm install -g pm2
pm2 start "npx ts-node bot/start.ts" --name "telegram-bot"
pm2 startup
pm2 save
```

**Option 2: Vercel** (Free, automated)
1. Push to GitHub
2. Go to vercel.com
3. Connect your GitHub repo
4. Set `TELEGRAM_BOT_TOKEN` environment variable
5. Deploy with one click

**Option 3: Docker**
```bash
docker build -t telegram-bot .
docker run -e TELEGRAM_BOT_TOKEN=your_token telegram-bot
```

[See `TELEGRAM_BOT_SETUP.md` for more deployment options]

### To Learn More

- **Full Setup Guide**: [`TELEGRAM_BOT_SETUP.md`](./TELEGRAM_BOT_SETUP.md)
- **Project Overview**: [`BOT_IMPLEMENTATION_SUMMARY.md`](./BOT_IMPLEMENTATION_SUMMARY.md)
- **Complete Documentation**: [`bot/README.md`](./bot/README.md)
- **Quick Reference**: [`bot/QUICK_START.md`](./bot/QUICK_START.md)
- **File Index**: [`BOT_INDEX.md`](./BOT_INDEX.md)

## 🆘 Common Problems

| Problem | Fix |
|---------|-----|
| Bot doesn't send messages | Make sure bot is Admin + has "Post Messages" permission |
| "TELEGRAM_BOT_TOKEN is required" | Add token to `.env` file |
| Buttons don't work | Check URLs in `.env` are valid |
| Bot crashes on startup | Check token is correct, enable `DEBUG=true` to see errors |

[Full troubleshooting in `TELEGRAM_BOT_SETUP.md`]

## 📁 Project Structure

```
Your Project/
├── bot/                          # Bot source code
│   ├── index.ts                 # Main bot
│   ├── config.ts                # Configuration
│   ├── keyboards.ts             # Buttons
│   ├── welcomeMessage.ts        # Messages
│   ├── newMemberHandler.ts      # New member logic
│   ├── callbackHandler.ts       # Button clicks
│   ├── start.ts                 # Startup script
│   ├── types.ts                 # TypeScript types
│   ├── examples.ts              # Code examples
│   ├── test-integration.ts      # Tests
│   └── README.md                # Documentation
│
├── .env.example                 # Configuration template
├── .env                         # Your configuration (not in git)
│
├── TELEGRAM_BOT_SETUP.md        # Full setup guide
├── BOT_IMPLEMENTATION_SUMMARY.md # What was built
├── BOT_INDEX.md                 # File index
└── START_HERE.md                # This file
```

## 🎯 What Each File Does

- **`bot/index.ts`** - Core bot, handles startup/shutdown
- **`bot/config.ts`** - Reads environment variables
- **`bot/keyboards.ts`** - Creates the 5 inline buttons
- **`bot/welcomeMessage.ts`** - Generates personalized messages
- **`bot/newMemberHandler.ts`** - Listens for new members, sends welcomes
- **`bot/callbackHandler.ts`** - Handles button clicks
- **`bot/start.ts`** - Run this to start the bot

## 📚 Documentation

Start with this: [`TELEGRAM_BOT_SETUP.md`](./TELEGRAM_BOT_SETUP.md)

Then explore:
- [`BOT_IMPLEMENTATION_SUMMARY.md`](./BOT_IMPLEMENTATION_SUMMARY.md) - What was built
- [`bot/README.md`](./bot/README.md) - Complete reference
- [`BOT_INDEX.md`](./BOT_INDEX.md) - File guide

## 🔑 Key Features

✅ **Automatic Welcomes** - Greets every new member
✅ **Personalized** - Uses member's first name
✅ **Interactive** - 5 customizable buttons
✅ **Smart** - Prevents duplicate messages
✅ **Reliable** - Handles errors gracefully
✅ **Configurable** - All settings in `.env`
✅ **Production-Ready** - Modular, typed, well-tested
✅ **Deployable** - Works with PM2, Vercel, Docker, Systemd

## 💡 Pro Tips

1. **Enable debug mode** during setup: `DEBUG=true` in `.env`
2. **Test with multiple joins** to see duplicate prevention working
3. **Customize URLs** in `.env` before deployment
4. **Keep `.env` out of git** - add to `.gitignore`
5. **Monitor logs** after deploying with PM2: `pm2 logs telegram-bot`

## 🔒 Security

- Token never hardcoded - stored in `.env`
- Special characters properly escaped
- No user data stored permanently
- Errors don't expose sensitive info
- Ready for production use

## 📞 Need Help?

1. **Check troubleshooting**: `TELEGRAM_BOT_SETUP.md` → Troubleshooting
2. **Enable debug mode**: Add `DEBUG=true` to `.env`, restart, check logs
3. **Review docs**: Each module in `bot/` has detailed comments
4. **See examples**: Run `npx ts-node bot/examples.ts`
5. **Run tests**: `npx ts-node bot/test-integration.ts`

## 🎓 Learning Path

**If you have 10 minutes:** This file + Step 1-6 above
**If you have 30 minutes:** Add customization section + read `bot/README.md`
**If you have 1 hour:** Read `TELEGRAM_BOT_SETUP.md` fully + deploy

## ✨ You're Ready!

Everything is set up and ready to go. Just:

1. Get your bot token from @BotFather
2. Add it to `.env`
3. Run `npx ts-node bot/start.ts`
4. Add bot to your group as admin
5. Enjoy automatic welcomes! 🎊

---

**Questions?** All answers are in the documentation files. Start with [`TELEGRAM_BOT_SETUP.md`](./TELEGRAM_BOT_SETUP.md).

**Happy coding! 🚀**
