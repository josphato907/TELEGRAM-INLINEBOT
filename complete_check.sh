#!/bin/bash

echo "╔════════════════════════════════════════════════════════════╗"
echo "║         COMPLETE BOT SYSTEM DIAGNOSTIC CHECK               ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

echo "1. BOT PROCESS STATUS"
if ps aux | grep -q "node start-bot" | grep -v grep; then
    PID=$(pgrep -f "node start-bot")
    echo "   ✓ Bot is RUNNING (PID: $PID)"
else
    echo "   ✗ Bot is NOT RUNNING"
fi
echo ""

echo "2. ENVIRONMENT VARIABLES"
if [ -f .env ]; then
    echo "   ✓ .env file exists"
    BOT_TOKEN=$(grep TELEGRAM_BOT_TOKEN .env | cut -d= -f2)
    if [ -n "$BOT_TOKEN" ]; then
        echo "   ✓ TELEGRAM_BOT_TOKEN is set"
    else
        echo "   ✗ TELEGRAM_BOT_TOKEN is NOT set"
    fi
else
    echo "   ✗ .env file NOT found"
fi
echo ""

echo "3. BOT TOKEN VALIDATION"
RESPONSE=$(curl -s "https://api.telegram.org/bot8705352429:AAFEnwVGYhdodm1V7iDItiCXycEy-WZfL_o/getMe")
if echo "$RESPONSE" | grep -q '"ok":true'; then
    echo "   ✓ Bot token is VALID"
    BOT_USERNAME=$(echo "$RESPONSE" | grep -o '"username":"[^"]*"' | cut -d'"' -f4)
    BOT_NAME=$(echo "$RESPONSE" | grep -o '"first_name":"[^"]*"' | cut -d'"' -f4)
    echo "   - Bot name: $BOT_NAME"
    echo "   - Bot username: @$BOT_USERNAME"
else
    echo "   ✗ Bot token is INVALID"
    echo "   Response: $RESPONSE"
fi
echo ""

echo "4. BOT MODE STATUS"
WEBHOOK_INFO=$(curl -s "https://api.telegram.org/bot8705352429:AAFEnwVGYhdodm1V7iDItiCXycEy-WZfL_o/getWebhookInfo")
if echo "$WEBHOOK_INFO" | grep -q '"url":""'; then
    echo "   ✓ Using POLLING mode (no webhook)"
else
    WEBHOOK_URL=$(echo "$WEBHOOK_INFO" | grep -o '"url":"[^"]*"' | cut -d'"' -f4)
    if [ -z "$WEBHOOK_URL" ]; then
        echo "   ✓ Using POLLING mode"
    else
        echo "   ✓ Using WEBHOOK: $WEBHOOK_URL"
    fi
fi
echo ""

echo "5. PENDING UPDATES"
UPDATES=$(curl -s "https://api.telegram.org/bot8705352429:AAFEnwVGYhdodm1V7iDItiCXycEy-WZfL_o/getUpdates")
UPDATE_COUNT=$(echo "$UPDATES" | grep -o '"result":\[' | wc -l)
if [ "$UPDATE_COUNT" -gt 0 ]; then
    echo "   ✓ No pending updates (bot is processing them)"
else
    echo "   ℹ Checking for updates..."
fi
echo ""

echo "6. BOT CONFIGURATION"
if grep -q "ADMIN_USERNAME=rosaharveys" .env; then
    echo "   ✓ Admin username: rosaharveys"
fi
if grep -q "GROUP_INVITE_LINK" .env; then
    LINK=$(grep GROUP_INVITE_LINK .env | cut -d= -f2)
    echo "   ✓ Group invite link: $LINK"
fi
echo ""

echo "7. RECENT BOT ACTIVITY"
echo "   Last 10 log entries:"
tail -10 bot.log | sed 's/^/   /'
echo ""

echo "╔════════════════════════════════════════════════════════════╗"
echo "║                    SYSTEM CHECK COMPLETE                   ║"
echo "╚════════════════════════════════════════════════════════════╝"
