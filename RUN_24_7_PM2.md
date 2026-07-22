# How to Run Bot 24/7 Using PM2

## What is PM2?
PM2 is a production process manager for Node.js apps. It keeps your bot running forever, auto-restarts on crash, and survives server reboots.

## Quick Start (Option 1: Recommended)

### 1. Install PM2 (One-time)
```bash
npm install -g pm2
```

### 2. Start the Bot
```bash
cd /vercel/share/v0-project
pm2 start ecosystem.config.js
```

### 3. Make it Run on Server Boot
```bash
pm2 startup
pm2 save
```

### 4. Check Status
```bash
pm2 status              # See all processes
pm2 logs telegram-bot   # View bot logs
pm2 monit              # Real-time monitoring
```

---

## Commands

### Start
```bash
pm2 start ecosystem.config.js
```

### Stop
```bash
pm2 stop telegram-bot
```

### Restart
```bash
pm2 restart telegram-bot
```

### Delete
```bash
pm2 delete telegram-bot
```

### View Logs
```bash
pm2 logs telegram-bot           # Live logs
pm2 logs telegram-bot --lines 100  # Last 100 lines
tail -f logs/error.log          # Error logs
tail -f logs/output.log         # Output logs
```

### Monitor
```bash
pm2 monit          # Dashboard view
pm2 web            # Web dashboard at http://localhost:9615
```

---

## Option 2: Using `nohup` (Simple but less reliable)

```bash
cd /vercel/share/v0-project
nohup node bot-manager.js > bot.log 2>&1 &
```

Then save the process ID and monitor manually.

---

## Option 3: Using systemd (For Linux servers)

Create `/etc/systemd/system/telegram-bot.service`:

```ini
[Unit]
Description=Telegram Bot Service
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/vercel/share/v0-project
ExecStart=/usr/bin/node /vercel/share/v0-project/bot-manager.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Then:
```bash
sudo systemctl daemon-reload
sudo systemctl enable telegram-bot
sudo systemctl start telegram-bot
sudo systemctl status telegram-bot
```

---

## Current Setup

✓ Bot is running with PM2 (PID: 1822)
✓ Process name: `telegram-bot`
✓ Status: Online
✓ Memory: 64 MB
✓ Auto-restart: Enabled
✓ Logs: `logs/output.log` and `logs/error.log`

---

## Troubleshooting

### Bot keeps crashing?
```bash
pm2 logs telegram-bot
```

### Too many restarts?
```bash
pm2 delete telegram-bot
# Fix the issue, then:
pm2 start ecosystem.config.js
```

### Want to see real-time monitoring?
```bash
pm2 monit
```

### Kill all PM2 processes?
```bash
pm2 kill
```

---

## Best Practice for Production

1. Use **PM2** on your server
2. Enable **startup** with `pm2 startup && pm2 save`
3. Monitor with `pm2 monit` or `pm2 web`
4. Check logs regularly: `pm2 logs telegram-bot`
5. Keep bot-manager.js updated in your code

Bot will now run 24/7 and auto-restart on any crashes!
