/**
 * Bot Startup Script
 * Run this file to start the Telegram bot
 * Usage: npx ts-node bot/start.ts
 */

import { initializeBot, getBotStatus } from './index';
import { botConfig } from './config';

/**
 * Main startup function
 */
async function main(): Promise<void> {
  console.log('🚀 Starting Telegram Welcome Bot...\n');
  console.log('Configuration:');
  console.log(`  - Debug Mode: ${botConfig.debug}`);
  console.log(`  - Group Rules URL: ${botConfig.groupRulesUrl}`);
  console.log(`  - Website URL: ${botConfig.websiteUrl}`);
  console.log(`  - Channel URL: ${botConfig.channelUrl}`);
  console.log(`  - Admin URL: ${botConfig.adminUrl}\n`);

  try {
    // Initialize the bot
    const bot = await initializeBot();

    // Get and display bot status
    const status = await getBotStatus();
    console.log('✅ Bot Status:');
    console.log(`  - Username: @${status.username}`);
    console.log(`  - Bot ID: ${status.id}`);
    console.log(`  - Name: ${status.firstName}\n`);

    console.log('🎉 Bot is running! Press Ctrl+C to stop.\n');
    console.log('Listening for:');
    console.log('  ✓ New members joining the group');
    console.log('  ✓ Button callbacks (verify, etc.)');
    console.log('  ✓ Error handling and logging\n');
  } catch (error) {
    console.error('❌ Failed to start bot:', error);
    process.exit(1);
  }
}

// Run the main function
main();
