/**
 * Callback Query Handler
 * Handles inline button callbacks (e.g., "Verify Yourself" button)
 */

import { Context } from 'telegraf';
import { botConfig } from './config';

/**
 * Handle callback queries from inline buttons
 * @param ctx - Telegraf context
 */
export async function handleCallbackQuery(ctx: Context): Promise<void> {
  try {
    if (!ctx.callbackQuery) {
      return;
    }

    const callbackData = ctx.callbackQuery.data;
    const userId = ctx.from?.id;

    if (botConfig.debug) {
      console.log(`[callbackHandler] Received callback: ${callbackData} from user ${userId}`);
    }

    switch (callbackData) {
      case 'verify_user':
        await handleVerifyUser(ctx);
        break;

      default:
        if (botConfig.debug) {
          console.log(`[callbackHandler] Unknown callback: ${callbackData}`);
        }
        await ctx.answerCbQuery('Unknown action', { show_alert: false });
    }
  } catch (error) {
    console.error('[callbackHandler] Error handling callback query:', error);
    try {
      await ctx.answerCbQuery('An error occurred', { show_alert: true });
    } catch (e) {
      console.error('[callbackHandler] Error answering callback query:', e);
    }
  }
}

/**
 * Handle the "Verify Yourself" button click
 * @param ctx - Telegraf context
 */
async function handleVerifyUser(ctx: Context): Promise<void> {
  try {
    const userId = ctx.from?.id;
    const firstName = ctx.from?.first_name || 'User';

    if (botConfig.debug) {
      console.log(`[callbackHandler] Verify user clicked by ${firstName} (ID: ${userId})`);
    }

    // Send acknowledgment notification
    await ctx.answerCbQuery(`Hello ${firstName}! Verification process initiated.`, {
      show_alert: false,
    });

    // Send a follow-up message with verification instructions
    const verificationMessage = `Hi ${firstName}! 🔐\n\nYour verification process has been initiated.\n\nPlease check your DMs or wait for admin approval.`;

    await ctx.telegram.sendMessage(userId, verificationMessage);

    // Optional: Send notification to admins (implement as needed)
    // You can log this to a channel or send to admin group
    if (botConfig.debug) {
      console.log(`[callbackHandler] Verification initiated for user ${userId}`);
    }
  } catch (error) {
    console.error('[callbackHandler] Error in handleVerifyUser:', error);
    try {
      await ctx.answerCbQuery('Error processing verification', { show_alert: true });
    } catch (e) {
      console.error('[callbackHandler] Error answering verification callback:', e);
    }
  }
}

/**
 * Register all callback handlers with the bot
 * @param bot - Telegraf bot instance
 */
export function registerCallbackHandlers(bot: any): void {
  // Handle all callback queries
  bot.on('callback_query', handleCallbackQuery);

  if (botConfig.debug) {
    console.log('[callbackHandler] Callback handlers registered');
  }
}
