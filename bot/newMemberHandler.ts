/**
 * New Member Handler
 * Listens for new_chat_members event and sends welcome messages
 */

import { Context } from 'telegraf';
import { ChatMemberUpdated, User } from 'telegraf/types';
import { generateWelcomeMessageWithMention } from './welcomeMessage';
import { buildWelcomeKeyboard } from './keyboards';
import { botConfig } from './config';

// Track sent welcome messages to prevent duplicates
// Maps user_id:chat_id to timestamp of last welcome message
const sentWelcomeMessages = new Map<string, number>();

// Configuration for duplicate prevention
const DUPLICATE_CHECK_WINDOW_MS = 5000; // 5 seconds window

/**
 * Handle new members joining the group
 * Sends a personalized welcome message to each new member
 * @param ctx - Telegraf context
 */
export async function handleNewMembers(ctx: Context): Promise<void> {
  try {
    // Extract new chat members from context
    const newMembers = ctx.message?.new_chat_members;

    if (!newMembers || newMembers.length === 0) {
      if (botConfig.debug) {
        console.log('[newMemberHandler] No new members found in message');
      }
      return;
    }

    const chatId = ctx.chat?.id;
    if (!chatId) {
      console.error('[newMemberHandler] Could not determine chat ID');
      return;
    }

    if (botConfig.debug) {
      console.log(
        `[newMemberHandler] Processing ${newMembers.length} new member(s) in chat ${chatId}`
      );
    }

    // Process each new member
    for (const member of newMembers) {
      await sendWelcomeMessage(ctx, member, chatId);
    }
  } catch (error) {
    console.error('[newMemberHandler] Error handling new members:', error);
    // Log error but don't throw - we want the bot to continue running
  }
}

/**
 * Send a welcome message to a new member
 * Includes duplicate prevention logic
 * @param ctx - Telegraf context
 * @param member - New member User object
 * @param chatId - ID of the chat
 */
async function sendWelcomeMessage(ctx: Context, member: User, chatId: number): Promise<void> {
  try {
    // Skip bot accounts
    if (member.is_bot) {
      if (botConfig.debug) {
        console.log(`[newMemberHandler] Skipping bot account: ${member.id}`);
      }
      return;
    }

    const messageKey = `${member.id}:${chatId}`;
    const now = Date.now();
    const lastMessageTime = sentWelcomeMessages.get(messageKey);

    // Check for duplicate messages within time window
    if (lastMessageTime && now - lastMessageTime < DUPLICATE_CHECK_WINDOW_MS) {
      if (botConfig.debug) {
        console.log(
          `[newMemberHandler] Duplicate prevention: Skipping welcome for user ${member.id}`
        );
      }
      return;
    }

    // Generate welcome message
    const welcomeText = generateWelcomeMessageWithMention(member);
    const keyboard = buildWelcomeKeyboard();

    // Send the welcome message
    await ctx.telegram.sendMessage(chatId, welcomeText, {
      parse_mode: 'Markdown',
      reply_markup: keyboard.reply_markup,
    });

    // Record that we sent this message
    sentWelcomeMessages.set(messageKey, now);

    // Cleanup old entries (older than 1 minute)
    cleanupOldMessages(now);

    if (botConfig.debug) {
      console.log(
        `[newMemberHandler] Welcome message sent to ${member.first_name || 'User'} (ID: ${member.id})`
      );
    }
  } catch (error) {
    console.error(`[newMemberHandler] Error sending welcome message:`, error);
    // Don't throw - continue processing other members
  }
}

/**
 * Clean up old entries from the duplicate prevention cache
 * Keeps memory usage manageable
 * @param now - Current timestamp in milliseconds
 */
function cleanupOldMessages(now: number): void {
  const MAX_AGE_MS = 60000; // 1 minute

  for (const [key, timestamp] of sentWelcomeMessages.entries()) {
    if (now - timestamp > MAX_AGE_MS) {
      sentWelcomeMessages.delete(key);
    }
  }

  // Also implement a hard limit to prevent memory issues
  if (sentWelcomeMessages.size > 10000) {
    // Sort by timestamp and remove oldest half
    const sorted = Array.from(sentWelcomeMessages.entries()).sort((a, b) => a[1] - b[1]);
    const removeCount = Math.floor(sentWelcomeMessages.size / 2);

    for (let i = 0; i < removeCount; i++) {
      sentWelcomeMessages.delete(sorted[i][0]);
    }

    if (botConfig.debug) {
      console.log(`[newMemberHandler] Cleaned up old messages. Current cache size: ${sentWelcomeMessages.size}`);
    }
  }
}

/**
 * Reset the duplicate prevention cache
 * Useful for testing or manual cache clearing
 */
export function resetDuplicatePrevention(): void {
  sentWelcomeMessages.clear();
  console.log('[newMemberHandler] Duplicate prevention cache cleared');
}
