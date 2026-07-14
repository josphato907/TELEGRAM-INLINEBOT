import { NextRequest, NextResponse } from 'next/server';
import { Telegraf, Context } from 'telegraf';
import { buildWelcomeKeyboard } from '@/bot/keyboards';
import { generateWelcomeMessageHtml } from '@/bot/welcomeMessage';
import { botConfig } from '@/bot/config';
import { handleCallbackQuery } from '@/bot/callbackHandler';

// Initialize bot
const bot = new Telegraf(botConfig.token);

// Track processed updates to prevent duplicates
const processedUpdates = new Set<number>();

/**
 * Handle new chat member updates
 */
async function handleNewChatMembers(ctx: Context): Promise<void> {
  try {
    const newMembers = ctx.message?.new_chat_members || [];
    const chatId = ctx.chat?.id;

    if (!chatId) {
      if (botConfig.debug) {
        console.log('[webhook] No chat ID found');
      }
      return;
    }

    for (const member of newMembers) {
      // Skip bot joining
      if (member.is_bot) {
        if (botConfig.debug) {
          console.log(`[webhook] Bot ${member.first_name} joined, skipping`);
        }
        continue;
      }

      const firstName = member.first_name || 'User';
      const userId = member.id;

      if (botConfig.debug) {
        console.log(`[webhook] New member: ${firstName} (ID: ${userId}) in chat ${chatId}`);
      }

      try {
        const message = generateWelcomeMessageHtml(member);
        const keyboard = buildWelcomeKeyboard();

        await ctx.telegram.sendMessage(chatId, message, {
          parse_mode: 'HTML',
          reply_markup: keyboard.reply_markup,
        });

        if (botConfig.debug) {
          console.log(`[webhook] Welcome message sent to ${firstName}`);
        }
      } catch (error) {
        console.error(`[webhook] Error sending welcome message to ${firstName}:`, error);
      }
    }
  } catch (error) {
    console.error('[webhook] Error in handleNewChatMembers:', error);
  }
}

/**
 * Handle callback queries (button clicks)
 */
async function handleCallback(ctx: Context): Promise<void> {
  try {
    await handleCallbackQuery(ctx);
  } catch (error) {
    console.error('[webhook] Error in handleCallback:', error);
  }
}

// Register handlers
bot.on('new_chat_members', handleNewChatMembers);
bot.on('callback_query', handleCallback);

/**
 * POST /api/telegram/webhook
 * Receives webhook updates from Telegram
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const updateId = body.update_id;

    // Prevent duplicate processing
    if (processedUpdates.has(updateId)) {
      if (botConfig.debug) {
        console.log(`[webhook] Duplicate update skipped: ${updateId}`);
      }
      return NextResponse.json({ ok: true });
    }

    processedUpdates.add(updateId);

    // Keep the set size manageable (max 1000 entries)
    if (processedUpdates.size > 1000) {
      const iterator = processedUpdates.values();
      processedUpdates.delete(iterator.next().value);
    }

    // Process the update
    await bot.handleUpdate(body);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[webhook] Error processing webhook:', error);
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}

/**
 * GET /api/telegram/webhook
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'Telegram bot webhook is running',
    timestamp: new Date().toISOString(),
  });
}
