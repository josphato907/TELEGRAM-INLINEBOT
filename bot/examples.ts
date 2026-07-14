/**
 * Usage Examples
 * Demonstrates how to use the bot modules in different scenarios
 */

import { initializeBot, getBot, stopBot, getBotStatus } from './index';
import { generateWelcomeMessage, generateWelcomeMessageWithMention } from './welcomeMessage';
import { buildWelcomeKeyboard } from './keyboards';
import { resetDuplicatePrevention } from './newMemberHandler';
import { User } from 'telegraf/types';

/**
 * Example 1: Basic Bot Startup
 */
export async function exampleBasicStartup(): Promise<void> {
  console.log('Example 1: Basic Bot Startup');
  console.log('----------------------------\n');

  try {
    const bot = await initializeBot();
    console.log('✅ Bot initialized successfully!\n');

    // Get bot information
    const status = await getBotStatus();
    console.log('Bot Information:');
    console.log(`  Username: @${status.username}`);
    console.log(`  ID: ${status.id}`);
    console.log(`  Name: ${status.firstName}\n`);

    // In a real scenario, you would keep the bot running
    // For this example, we'll stop it after 5 seconds
    console.log('Bot is running. Stopping in 5 seconds...\n');
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await stopBot();
  } catch (error) {
    console.error('Error in example 1:', error);
  }
}

/**
 * Example 2: Generate Welcome Messages
 */
export function exampleGenerateMessages(): void {
  console.log('Example 2: Generate Welcome Messages');
  console.log('-----------------------------------\n');

  // Sample user object
  const user: User = {
    id: 123456789,
    is_bot: false,
    first_name: "John",
    last_name: "Doe",
    username: "johndoe",
    language_code: "en",
  };

  // Generate basic welcome message
  const basicMessage = generateWelcomeMessage(user);
  console.log('Basic Message:');
  console.log(basicMessage);
  console.log('\n---\n');

  // Generate welcome message with mention
  const mentionMessage = generateWelcomeMessageWithMention(user);
  console.log('Message with User Mention:');
  console.log(mentionMessage);
  console.log('\n---\n');

  // Generate for user with special characters
  const specialUser: User = {
    id: 987654321,
    is_bot: false,
    first_name: "Maria_Silva",
    username: "maria.silva",
    language_code: "pt",
  };

  const specialMessage = generateWelcomeMessageWithMention(specialUser);
  console.log('Message with Special Characters:');
  console.log(specialMessage);
  console.log('\n');
}

/**
 * Example 3: Keyboard Builder
 */
export function exampleKeyboardBuilder(): void {
  console.log('Example 3: Inline Keyboard Builder');
  console.log('----------------------------------\n');

  const keyboard = buildWelcomeKeyboard();

  console.log('Keyboard Structure:');
  console.log('Row 1: Group Rules | Official Website');
  console.log('Row 2: Join Channel | Contact Admin');
  console.log('Row 3: Verify Yourself\n');

  console.log('Keyboard Markup:');
  console.log(JSON.stringify(keyboard.reply_markup, null, 2));
  console.log('\n');
}

/**
 * Example 4: Duplicate Prevention Management
 */
export function exampleDuplicatePrevention(): void {
  console.log('Example 4: Duplicate Prevention Management');
  console.log('----------------------------------------\n');

  console.log('Duplicate prevention features:');
  console.log('  • Tracks messages by user_id:chat_id');
  console.log('  • 5-second window for duplicate check');
  console.log('  • Auto-cleanup for entries older than 1 minute');
  console.log('  • Hard limit of 10,000 entries\n');

  console.log('To reset the cache:');
  console.log('  resetDuplicatePrevention();\n');

  // Example: Clear cache (useful during testing)
  console.log('Clearing duplicate prevention cache...');
  resetDuplicatePrevention();
  console.log('✅ Cache cleared\n');
}

/**
 * Example 5: Error Handling Patterns
 */
export async function exampleErrorHandling(): Promise<void> {
  console.log('Example 5: Error Handling Patterns');
  console.log('---------------------------------\n');

  console.log('The bot handles various error scenarios:\n');

  console.log('1. Configuration Errors:');
  console.log('   - Missing TELEGRAM_BOT_TOKEN');
  console.log('   - Throws immediately at startup\n');

  console.log('2. Telegram API Errors:');
  console.log('   - Network timeouts');
  console.log('   - Invalid permissions');
  console.log('   - Logged but dont stop the bot\n');

  console.log('3. Message Sending Errors:');
  console.log('   - User blocked the bot');
  console.log('   - Invalid message format');
  console.log('   - Continue processing other members\n');

  console.log('4. Callback Errors:');
  console.log('   - Unknown callback data');
  console.log('   - Database connection issues');
  console.log('   - User notified with error message\n');
}

/**
 * Example 6: Environment Configuration
 */
export function exampleConfiguration(): void {
  console.log('Example 6: Environment Configuration');
  console.log('------------------------------------\n');

  console.log('Required Environment Variables:');
  console.log('  TELEGRAM_BOT_TOKEN - Your bot token from @BotFather\n');

  console.log('Optional Button URLs:');
  console.log('  GROUP_RULES_URL - Where group rules are hosted');
  console.log('  WEBSITE_URL - Your main website');
  console.log('  CHANNEL_URL - Telegram channel to join');
  console.log('  ADMIN_URL - Contact admin (full URL)');
  console.log('  ADMIN_USERNAME - Admin username (fallback)\n');

  console.log('Optional Settings:');
  console.log('  TELEGRAM_GROUP_CHAT_ID - For logging/debugging');
  console.log('  DEBUG - Set to "true" for verbose logging\n');

  console.log('Create .env file:');
  console.log('  cp .env.example .env');
  console.log('  # Edit .env with your values\n');
}

/**
 * Run all examples
 */
export async function runAllExamples(): Promise<void> {
  console.log('╔════════════════════════════════════════════╗');
  console.log('║  Telegram Welcome Bot - Usage Examples    ║');
  console.log('╚════════════════════════════════════════════╝\n');

  try {
    // Example 2-6 can run immediately
    exampleGenerateMessages();
    exampleKeyboardBuilder();
    exampleDuplicatePrevention();
    await exampleErrorHandling();
    exampleConfiguration();

    console.log('╔════════════════════════════════════════════╗');
    console.log('║  Examples completed!                       ║');
    console.log('╚════════════════════════════════════════════╝\n');

    console.log('Next steps:');
    console.log('1. Set up your .env file with bot token');
    console.log('2. Run: npx ts-node bot/start.ts');
    console.log('3. Add the bot to your Telegram group');
    console.log('4. Make the bot an admin');
    console.log('5. Send a test message to see it in action!\n');
  } catch (error) {
    console.error('Error running examples:', error);
  }
}

// Uncomment to run:
// runAllExamples();
