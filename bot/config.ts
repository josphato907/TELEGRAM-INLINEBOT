/**
 * Bot Configuration
 * Centralized configuration for all bot settings and URLs
 */

import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const botConfig = {
  // Telegram Bot Token
  token: process.env.TELEGRAM_BOT_TOKEN || '',

  // Group Chat ID (optional, for logging/debugging)
  groupChatId: process.env.TELEGRAM_GROUP_CHAT_ID || '',

  // URLs for welcome message buttons
  groupRulesUrl: process.env.GROUP_RULES_URL || 'https://example.com/rules',
  websiteUrl: process.env.WEBSITE_URL || 'https://example.com',
  channelUrl: process.env.CHANNEL_URL || 'https://t.me/examplechannel',
  adminUrl: process.env.ADMIN_URL || 'https://t.me/exampleadmin',
  adminUsername: process.env.ADMIN_USERNAME || 'exampleadmin',

  // Enable debug logging
  debug: process.env.DEBUG === 'true',
};

/**
 * Validate configuration
 * Ensures all required environment variables are set
 */
export function validateConfig(): void {
  if (!botConfig.token) {
    throw new Error('TELEGRAM_BOT_TOKEN environment variable is required');
  }
}
