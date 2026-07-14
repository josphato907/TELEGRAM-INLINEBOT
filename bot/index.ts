/**
 * Telegram Bot Entry Point
 * Main bot initialization and setup
 */

import { Telegraf } from 'telegraf';
import { botConfig, validateConfig } from './config';
import { handleNewMembers } from './newMemberHandler';
import { registerCallbackHandlers } from './callbackHandler';

let bot: Telegraf | null = null;

/**
 * Initialize and start the bot
 */
export async function initializeBot(): Promise<Telegraf> {
  try {
    // Validate configuration
    validateConfig();

    // Create bot instance
    bot = new Telegraf(botConfig.token);

    if (botConfig.debug) {
      console.log('[bot] Initializing Telegram bot...');
    }

    // Register event handlers
    registerEventHandlers();

    // Start the bot
    await bot.launch();

    if (botConfig.debug) {
      console.log('[bot] Bot started successfully');
    }

    // Graceful shutdown handlers
    process.once('SIGINT', () => {
      if (bot) {
        bot.stop('SIGINT');
      }
    });

    process.once('SIGTERM', () => {
      if (bot) {
        bot.stop('SIGTERM');
      }
    });

    return bot;
  } catch (error) {
    console.error('[bot] Failed to initialize bot:', error);
    throw error;
  }
}

/**
 * Register all event handlers with the bot
 */
function registerEventHandlers(): void {
  if (!bot) {
    throw new Error('Bot not initialized');
  }

  // Handle new chat members (welcome message)
  bot.on('message', handleNewMembers);

  // Register callback handlers for inline buttons
  registerCallbackHandlers(bot);

  // Handle errors
  bot.catch((err, ctx) => {
    console.error(`[bot] Error for ${ctx.updateType}`, err);
  });

  if (botConfig.debug) {
    console.log('[bot] Event handlers registered');
  }
}

/**
 * Get the bot instance
 */
export function getBot(): Telegraf | null {
  return bot;
}

/**
 * Stop the bot gracefully
 */
export async function stopBot(): Promise<void> {
  if (bot) {
    await bot.stop();
    console.log('[bot] Bot stopped');
  }
}

/**
 * Get bot status information
 */
export async function getBotStatus(): Promise<any> {
  if (!bot) {
    return { status: 'not_initialized' };
  }

  try {
    const me = await bot.telegram.getMe();
    return {
      status: 'running',
      username: me.username,
      id: me.id,
      firstName: me.first_name,
    };
  } catch (error) {
    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
