#!/usr/bin/env node

require('dotenv').config();
const { Telegraf } = require('telegraf');

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error('ERROR: TELEGRAM_BOT_TOKEN is not set in .env file');
  process.exit(1);
}

const bot = new Telegraf(token);
const adminUsername = process.env.ADMIN_USERNAME || 'rosaharveys';
const groupInviteLink = process.env.GROUP_INVITE_LINK || 'https://t.me/+FqcBQjNAaRdhMzlk';

// Welcome message cache to prevent duplicates
const recentWelcomes = new Set();

// Escape HTML special characters
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Listen for new members
bot.on('new_chat_members', async (ctx) => {
  try {
    const chatId = ctx.chat.id;
    const members = ctx.message.new_chat_members;

    for (const member of members) {
      if (member.is_bot) continue; // Skip bot users

      const userId = member.id;
      const firstName = member.first_name ? escapeHtml(member.first_name) : 'User';
      
      // Create a unique key for this welcome message
      const welcomeKey = `${chatId}-${userId}-${Date.now()}`;
      
      // Check if we recently welcomed this user
      if (recentWelcomes.has(`${chatId}-${userId}`)) {
        console.log(`[Bot] Skipping duplicate welcome for ${firstName} (ID: ${userId})`);
        continue;
      }

      // Add to recent welcomes
      recentWelcomes.add(`${chatId}-${userId}`);
      
      // Remove from cache after 60 seconds
      setTimeout(() => {
        recentWelcomes.delete(`${chatId}-${userId}`);
      }, 60000);

      // Create welcome message with mention
      const mentionUrl = `tg://user?id=${userId}`;
      const welcomeMessage = `Welcome <a href="${mentionUrl}">${firstName}</a>! 👋

I AM <b>GEORGE</b>, THE DEVELOPER. I CAN HELP YOU IN CREATING ANY WEBSITE, APPS, POS AND ANY INTEGRATIONS OF STK MPESA PUSH. ALSO CREDIT/MASTERCARD PAYMENTS GATEWAYS.

Feel free to reach out using the buttons below!`;

      // Send welcome message with inline buttons
      await ctx.telegram.sendMessage(chatId, welcomeMessage, {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: '💬 TALK WITH ADMIN',
                url: `https://t.me/${adminUsername}`,
              },
              {
                text: '👥 INVITE FRIENDS',
                callback_data: 'invite_friends',
              },
            ],
          ],
        },
      });

      console.log(`[Bot] Welcome message sent to ${firstName} (ID: ${userId})`);
    }
  } catch (error) {
    console.error('[Bot] Error handling new members:', error.message);
  }
});

// Handle callback queries (button clicks)
bot.on('callback_query', async (ctx) => {
  try {
    const callbackData = ctx.callbackQuery.data;
    const userId = ctx.from.id;
    const firstName = ctx.from.first_name || 'User';
    const chatId = ctx.chat?.id;

    if (callbackData === 'invite_friends') {
      // Show notification
      await ctx.answerCbQuery('Group link copied! Share it with your friends.', {
        show_alert: false,
      });

      // Try to send private message, if it fails, send it in the group
      try {
        const inviteMessage = `Hi ${firstName}! 👋\n\nHere is our group invitation link:\n\n${groupInviteLink}\n\nShare it with your friends and let them join our community!`;
        await ctx.telegram.sendMessage(userId, inviteMessage);
        console.log(`[Bot] Invitation link sent to ${firstName} (ID: ${userId}) via DM`);
      } catch (dmError) {
        // If DM fails, send it as a reply in the group
        if (chatId) {
          const groupInviteMessage = `${firstName}, here's the group invite link for you to share:\n\n${groupInviteLink}`;
          await ctx.telegram.sendMessage(chatId, groupInviteMessage);
          console.log(`[Bot] Invitation link sent to ${firstName} in group (DM failed: ${dmError.message})`);
        }
      }
    } else {
      await ctx.answerCbQuery('Unknown action', { show_alert: false });
    }
  } catch (error) {
    console.error('[Bot] Error handling callback query:', error.message);
  }
});

// Start the bot
bot.launch();

console.log('========================================');
console.log('🤖 Telegram Welcome Bot is LIVE!');
console.log('========================================');
console.log(`Bot Token: ${token.substring(0, 10)}...`);
console.log(`Admin: @${adminUsername}`);
console.log(`Group Link: ${groupInviteLink}`);
console.log('');
console.log('Listening for new members...');
console.log('========================================');

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
