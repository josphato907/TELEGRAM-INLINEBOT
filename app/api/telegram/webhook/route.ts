import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'rosaharveys';
const GROUP_INVITE_LINK = process.env.GROUP_INVITE_LINK || 'https://t.me/+FqcBQjNAaRdhMzlk';
const DEBUG = process.env.DEBUG === 'true';

// Track processed updates to prevent duplicates
const processedUpdates = new Set<number>();

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Send a Telegram message
 */
async function sendMessage(
  chatId: number,
  text: string,
  options: any = {}
): Promise<void> {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const payload = {
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
    ...options,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Telegram API error: ${error}`);
  }
}

/**
 * Answer callback query
 */
async function answerCallbackQuery(
  callbackQueryId: string,
  text: string,
  showAlert: boolean = false
): Promise<void> {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/answerCallbackQuery`;
  const payload = {
    callback_query_id: callbackQueryId,
    text,
    show_alert: showAlert,
  };

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

/**
 * Handle new chat member updates
 */
async function handleNewChatMembers(update: any): Promise<void> {
  try {
    const message = update.message;
    if (!message || !message.new_chat_members || message.new_chat_members.length === 0) {
      return;
    }

    const chatId = message.chat.id;
    const newMembers = message.new_chat_members;

    for (const member of newMembers) {
      // Skip bot joining
      if (member.is_bot) {
        if (DEBUG) {
          console.log(`[webhook] Bot ${member.first_name} joined, skipping`);
        }
        continue;
      }

      const firstName = member.first_name || 'User';
      const userId = member.id;

      if (DEBUG) {
        console.log(`[webhook] New member: ${firstName} (ID: ${userId}) in chat ${chatId}`);
      }

      try {
        // Generate welcome message
        const welcomeText = `Welcome ${escapeHtml(firstName)}! 👋

I AM <b>GEORGE</b>, THE DEVELOPER. I CAN HELP YOU IN CREATING ANY WEBSITE, APPS, POS AND ANY INTEGRATIONS OF STK MPESA PUSH. ALSO CREDIT/MASTERCARD PAYMENTS GATEWAYS.

Feel free to reach out using the buttons below!`;

        // Build inline keyboard
        const replyMarkup = {
          inline_keyboard: [
            [
              {
                text: '💬 TALK WITH ADMIN',
                url: `https://t.me/${ADMIN_USERNAME}`,
              },
              {
                text: '👥 INVITE FRIENDS',
                callback_data: 'invite_friends',
              },
            ],
          ],
        };

        await sendMessage(chatId, welcomeText, {
          reply_markup: replyMarkup,
        });

        if (DEBUG) {
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
async function handleCallback(update: any): Promise<void> {
  try {
    const callbackQuery = update.callback_query;
    if (!callbackQuery) return;

    const callbackData = callbackQuery.data;
    const userId = callbackQuery.from.id;
    const firstName = callbackQuery.from.first_name || 'User';
    const callbackQueryId = callbackQuery.id;

    if (DEBUG) {
      console.log(`[webhook] Callback ${callbackData} from ${firstName} (ID: ${userId})`);
    }

    if (callbackData === 'invite_friends') {
      // Answer callback with notification
      await answerCallbackQuery(
        callbackQueryId,
        'Here is your group link! Share it with your friends.',
        false
      );

      // Send the group invitation link via private message
      const inviteText = `Hi ${escapeHtml(firstName)}! 👋

Here is our group invitation link:

${escapeHtml(GROUP_INVITE_LINK)}

Share it with your friends and let them join our community!`;

      await sendMessage(userId, inviteText);

      if (DEBUG) {
        console.log(`[webhook] Invitation link sent to user ${userId}`);
      }
    } else {
      await answerCallbackQuery(callbackQueryId, 'Unknown action', false);
    }
  } catch (error) {
    console.error('[webhook] Error in handleCallback:', error);
  }
}

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
      if (DEBUG) {
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

    if (DEBUG) {
      console.log('[webhook] Processing update:', updateId);
    }

    // Process new chat members
    if (body.message?.new_chat_members) {
      await handleNewChatMembers(body);
    }

    // Process callback queries
    if (body.callback_query) {
      await handleCallback(body);
    }

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
    status: 'Telegram bot webhook is running correctly',
    botToken: TELEGRAM_BOT_TOKEN ? 'Configured' : 'Missing',
    timestamp: new Date().toISOString(),
  });
}
