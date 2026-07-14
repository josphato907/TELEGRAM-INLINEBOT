# Telegram Welcome Bot

A production-ready Telegram bot that automatically welcomes new members with personalized messages and interactive inline buttons.

## Features

- ✅ **Automatic Welcome Messages** - Greets every new member who joins the group
- ✅ **Personalized Greetings** - Mentions new members by their first name and Telegram ID
- ✅ **Interactive Buttons** - 5 customizable inline buttons for quick actions
- ✅ **Duplicate Prevention** - Prevents duplicate welcome messages for the same user
- ✅ **Error Handling** - Gracefully handles Telegram API errors
- ✅ **Modular Architecture** - Clean separation of concerns with dedicated modules
- ✅ **Debug Logging** - Optional verbose logging for troubleshooting
- ✅ **Environment Configuration** - All URLs and settings configurable via environment variables

## Welcome Message Format

```
🎉 Congratulations, {first_name}!

Welcome to our community! We're glad to have you here.

Please use the buttons below to get started.
```

### Inline Buttons (3 Rows)

**Row 1:**
- 📖 Group Rules → Opens GROUP_RULES_URL
- 🌐 Official Website → Opens WEBSITE_URL

**Row 2:**
- 👥 Join Channel → Opens CHANNEL_URL
- 💬 Contact Admin → Opens ADMIN_URL or https://t.me/{admin_username}

**Row 3:**
- ✅ Verify Yourself → Triggers verification callback

## Project Structure

```
bot/
├── index.ts                 # Main bot entry point
├── config.ts               # Configuration management
├── keyboards.ts            # Inline keyboard builders
├── welcomeMessage.ts       # Message generators and formatters
├── newMemberHandler.ts     # New member event handler
├── callbackHandler.ts      # Button callback handlers
├── start.ts                # Startup script
├── README.md               # This file
└── types.ts                # TypeScript type definitions (optional)
```

## Installation

### 1. Prerequisites

- Node.js 16+ (recommended 18+)
- npm or pnpm package manager
- A Telegram bot token from [@BotFather](https://t.me/botfather)
- Administrator permissions in your Telegram group

### 2. Setup

```bash
# Install dependencies (already done in this project)
pnpm add telegraf dotenv

# Copy environment template
cp .env.example .env

# Edit .env with your configuration
nano .env  # or use your preferred editor
```

### 3. Configuration

Edit `.env` and set the following variables:

```env
# Required
TELEGRAM_BOT_TOKEN=YOUR_BOT_TOKEN_FROM_BOTFATHER

# Button URLs (customize for your needs)
GROUP_RULES_URL=https://your-domain.com/rules
WEBSITE_URL=https://your-domain.com
CHANNEL_URL=https://t.me/your_channel
ADMIN_URL=https://t.me/your_admin_username
ADMIN_USERNAME=your_admin_username

# Optional
DEBUG=true  # Set to true for verbose logging
```

### 4. Running the Bot

```bash
# Start the bot
npx ts-node bot/start.ts

# Or if using a compiled version
node bot/dist/start.js
```

## Module Documentation

### `config.ts`
Centralized configuration management with environment variable validation.

**Key Functions:**
- `botConfig` - Configuration object with all settings
- `validateConfig()` - Validates required environment variables

### `keyboards.ts`
Builds the inline keyboard markup for welcome messages.

**Key Functions:**
- `buildWelcomeKeyboard()` - Returns inline keyboard with all buttons
- `buildWelcomeKeyboardWithUsername()` - Alternative builder using admin username

### `welcomeMessage.ts`
Generates personalized welcome messages with proper character escaping.

**Key Functions:**
- `generateWelcomeMessage(user)` - Basic welcome message
- `generateWelcomeMessageHtml(user)` - HTML-formatted version
- `generateWelcomeMessageWithMention(user)` - Message with user mention link
- `escapeMarkdown(text)` - Escapes Markdown special characters
- `escapeHtml(text)` - Escapes HTML special characters

### `newMemberHandler.ts`
Listens for new chat members and sends welcome messages.

**Key Features:**
- Processes multiple simultaneous joins
- Prevents duplicate messages within 5-second window
- Skips bot accounts automatically
- Implements memory-efficient cache cleanup

**Key Functions:**
- `handleNewMembers(ctx)` - Main event handler
- `resetDuplicatePrevention()` - Clear the cache (for testing)

### `callbackHandler.ts`
Handles inline button callbacks and user interactions.

**Key Functions:**
- `handleCallbackQuery(ctx)` - Main callback handler
- `handleVerifyUser(ctx)` - Processes verify button clicks
- `registerCallbackHandlers(bot)` - Registers handlers with bot

### `index.ts`
Main bot initialization and orchestration.

**Key Functions:**
- `initializeBot()` - Creates and starts the bot
- `getBot()` - Returns bot instance
- `stopBot()` - Gracefully stops the bot
- `getBotStatus()` - Returns bot status information

## Usage Examples

### Basic Startup
```typescript
import { initializeBot } from './bot/index';

async function main() {
  const bot = await initializeBot();
  console.log('Bot is running!');
}

main();
```

### Get Bot Status
```typescript
import { getBotStatus } from './bot/index';

const status = await getBotStatus();
console.log(`Bot username: @${status.username}`);
```

### Reset Duplicate Prevention Cache
```typescript
import { resetDuplicatePrevention } from './bot/newMemberHandler';

// Useful during testing
resetDuplicatePrevention();
```

## Error Handling

The bot implements comprehensive error handling:

- **Configuration Errors**: Missing required environment variables throw at startup
- **Telegram API Errors**: Caught and logged without stopping the bot
- **Message Sending Errors**: Logged but don't affect other members
- **Callback Errors**: Gracefully handled with user feedback

## Duplicate Prevention

The bot prevents duplicate welcome messages using:

1. **Time Window Check**: 5-second window for the same user in the same chat
2. **Memory-Efficient Cache**: Auto-cleanup for entries older than 1 minute
3. **Hard Limit**: Removes oldest entries when cache exceeds 10,000 items

## Character Escaping

The bot properly escapes special characters:

- **Markdown**: `_`, `*`, `[`, `]`, `(`, `)`, `~`, `` ` ``, `>`, `#`, `+`, `-`, `.`, `!`
- **HTML**: `&`, `<`, `>`, `"`, `'`

This prevents formatting issues and injection attacks.

## Callback Data

Supported callback data values:

- `verify_user` - Triggered by the "Verify Yourself" button

New callbacks can be added by:
1. Adding a button to the keyboard builder
2. Handling it in the callback handler switch statement

## Logging

Enable debug logging by setting `DEBUG=true` in `.env`:

```env
DEBUG=true
```

Debug output includes:
- Bot initialization
- New member processing
- Message sending confirmations
- Callback handling
- Error details
- Cache cleanup events

## Performance Considerations

- **Memory Usage**: Duplicate cache is auto-cleaned (max 10,000 entries)
- **API Rate Limits**: Bot respects Telegram rate limiting
- **Concurrent Joins**: Handles multiple simultaneous joins correctly
- **Bot Accounts**: Automatically skips welcome messages for bot accounts

## Troubleshooting

### Bot not responding
1. Verify `TELEGRAM_BOT_TOKEN` is correct
2. Check bot has admin permissions in the group
3. Enable `DEBUG=true` and check logs

### Duplicate messages appearing
1. Check the 5-second window timing
2. Try running `resetDuplicatePrevention()`
3. Verify bot only has one instance running

### Buttons not working
1. Verify all URLs are valid and accessible
2. Check `ADMIN_USERNAME` format (without @)
3. Test with `DEBUG=true` enabled

### Character encoding issues
1. Verify `.env` file is UTF-8 encoded
2. Check that special characters are properly escaped
3. Test with different message content

## Security Considerations

- **API Token**: Never commit `.env` file to version control
- **User Data**: Message data is not stored permanently
- **Injection Prevention**: Special characters are properly escaped
- **Rate Limiting**: Respects Telegram API rate limits
- **Error Messages**: Error details not exposed to users

## Future Enhancements

Potential features to add:
- Admin notification when user clicks verify button
- Database storage for member information
- Role assignment for new members
- Custom welcome message templates
- Multiple group support
- Statistics and analytics

## License

This code is provided as-is for use in your projects.

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Enable debug logging and review the output
3. Verify all configuration is correct
4. Review Telegram Bot API documentation

## References

- [Telegraf.js Documentation](https://telegraf.dev/)
- [Telegram Bot API Reference](https://core.telegram.org/bots/api)
- [@BotFather on Telegram](https://t.me/botfather)
