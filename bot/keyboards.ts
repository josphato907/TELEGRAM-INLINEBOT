/**
 * Inline Keyboard Builder
 * Constructs the InlineKeyboardMarkup for welcome messages
 */

import { Markup } from 'telegraf';
import { botConfig } from './config';

/**
 * Build the welcome message inline keyboard with 2 buttons
 * Row 1: Talk With Admin | Invite Friends
 */
export function buildWelcomeKeyboard() {
  return Markup.inlineKeyboard([
    // Row 1: Talk With Admin and Invite Friends
    [
      Markup.button.url('💬 TALK WITH ADMIN', `https://t.me/${botConfig.adminUsername}`),
      Markup.button.callback('👥 INVITE FRIENDS', 'invite_friends'),
    ],
  ]);
}

/**
 * Alternative keyboard builder with extended functionality
 * Includes additional buttons with callbacks
 */
export function buildWelcomeKeyboardExtended() {
  return Markup.inlineKeyboard([
    [
      Markup.button.url('💬 TALK WITH ADMIN', `https://t.me/${botConfig.adminUsername}`),
      Markup.button.callback('👥 INVITE FRIENDS', 'invite_friends'),
    ],
  ]);
}
