/**
 * Inline Keyboard Builder
 * Constructs the InlineKeyboardMarkup for welcome messages
 */

import { Markup } from 'telegraf';
import { botConfig } from './config';

/**
 * Build the welcome message inline keyboard with 5 buttons in 3 rows
 * Row 1: Group Rules | Official Website
 * Row 2: Join Channel | Contact Admin
 * Row 3: Verify Yourself
 */
export function buildWelcomeKeyboard() {
  return Markup.inlineKeyboard([
    // Row 1: Group Rules and Official Website
    [
      Markup.button.url('📖 Group Rules', botConfig.groupRulesUrl),
      Markup.button.url('🌐 Official Website', botConfig.websiteUrl),
    ],
    // Row 2: Join Channel and Contact Admin
    [
      Markup.button.url('👥 Join Channel', botConfig.channelUrl),
      Markup.button.url('💬 Contact Admin', botConfig.adminUrl),
    ],
    // Row 3: Verify Yourself (callback)
    [Markup.button.callback('✅ Verify Yourself', 'verify_user')],
  ]);
}

/**
 * Alternative keyboard builder that opens admin URL from username
 * Useful if ADMIN_URL is not provided but ADMIN_USERNAME is
 */
export function buildWelcomeKeyboardWithUsername() {
  const adminUrlButton = botConfig.adminUsername
    ? Markup.button.url('💬 Contact Admin', `https://t.me/${botConfig.adminUsername}`)
    : Markup.button.url('💬 Contact Admin', botConfig.adminUrl);

  return Markup.inlineKeyboard([
    [
      Markup.button.url('📖 Group Rules', botConfig.groupRulesUrl),
      Markup.button.url('🌐 Official Website', botConfig.websiteUrl),
    ],
    [Markup.button.url('👥 Join Channel', botConfig.channelUrl), adminUrlButton],
    [Markup.button.callback('✅ Verify Yourself', 'verify_user')],
  ]);
}
