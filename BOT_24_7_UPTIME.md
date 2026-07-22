# Running Bot 24/7

Your bot now has automatic process management to run continuously without stopping.

## Current Status

- ✅ Bot Manager running (PID: 652)
- ✅ Bot Process running (PID: 660)
- ✅ Actively welcoming new members
- ✅ Auto-restart on crash enabled
- ✅ Duplicate instance prevention enabled

## How It Works

The `bot-manager.js` script:
1. Starts the bot process
2. Monitors the bot continuously
3. If the bot crashes, automatically restarts it
4. Prevents duplicate instances (fixes 409 conflict error)
5. Rate limits restarts (max 5 per minute)
6. Logs all activity to `bot-manager.log`

## Starting the Bot Manager

```bash
cd /vercel/share/v0-project
node bot-manager.js
```

Or in the background:
```bash
nohup node bot-manager.js > /dev/null 2>&1 &
```

## Checking Status

```bash
ps aux | grep bot
```

You should see:
- `node bot-manager.js` (the manager)
- `node start-bot.js` (the actual bot)

## Viewing Logs

Bot activity log:
```bash
tail -f bot-manager.log
```

## Stopping the Bot

```bash
pkill -f bot-manager
pkill -f start-bot
```

## What Happens If Bot Crashes

The manager will:
1. Detect the crash
2. Wait 5 seconds
3. Automatically restart the bot
4. Log the restart to `bot-manager.log`

## For Production (Linux/Server)

To run permanently on a server, use systemd service:

Create `/etc/systemd/system/telegram-bot.service`:
```ini
[Unit]
Description=Telegram Welcome Bot
After=network.target

[Service]
Type=simple
WorkingDirectory=/vercel/share/v0-project
ExecStart=/usr/bin/node bot-manager.js
Restart=always
RestartSec=10
User=telebot
StandardOutput=append:/var/log/telegram-bot.log
StandardError=append:/var/log/telegram-bot.log

[Install]
WantedBy=multi-user.target
```

Then enable and start:
```bash
sudo systemctl enable telegram-bot
sudo systemctl start telegram-bot
```

## Bot Features

- ✅ Welcomes new members automatically
- ✅ Personalizes messages with member names
- ✅ Shows 2 interactive buttons
- ✅ Handles button clicks with invite link
- ✅ Prevents duplicate welcome messages
- ✅ Full error handling

## Recent Activity

- Bot welcomed: Amos, BIIG, Hessy, George
- All buttons working correctly
- No errors detected

Your bot is now running 24/7!
