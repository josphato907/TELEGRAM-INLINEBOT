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
      case 'invite_friends':
        await handleInviteFriends(ctx);
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
 * Handle the "INVITE FRIENDS" button click
 * Sends the group invitation link to the user
 * @param ctx - Telegraf context
 */
async function handleInviteFriends(ctx: Context): Promise<void> {
  try {
    const userId = ctx.from?.id;
    const firstName = ctx.from?.first_name || 'User';

    if (botConfig.debug) {
      console.log(`[callbackHandler] Invite friends clicked by ${firstName} (ID: ${userId})`);
    }

    // Send acknowledgment notification (toast at bottom)
    await ctx.answerCbQuery('Here is your group link! Share it with your friends.', {
      show_alert: false,
    });

    // Send the group invitation link
    const inviteMessage = `Hi ${firstName}! 👋\n\nHere is our group invitation link:\n\n${botConfig.groupInviteLink}\n\nShare it with your friends and let them join our community!`;

    await ctx.telegram.sendMessage(userId, inviteMessage);

    if (botConfig.debug) {
      console.log(`[callbackHandler] Invitation link sent to user ${userId}`);
    }
  } catch (error) {
    console.error('[callbackHandler] Error in handleInviteFriends:', error);
    try {
      await ctx.answerCbQuery('Error processing your request', { show_alert: true });
    } catch (e) {
      console.error('[callbackHandler] Error answering callback:', e);
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
