/**
 * Welcome Message Generator
 * Generates personalized welcome messages for new members
 */

import { User } from 'telegraf/types';

/**
 * Escape special characters for Markdown parsing in Telegram
 * @param text - Text to escape
 * @returns Escaped text safe for Markdown
 */
export function escapeMarkdown(text: string): string {
  const markdownSpecialChars = /[_*[\]()~`>#+\-.!]/g;
  return text.replace(markdownSpecialChars, '\\$&');
}

/**
 * Escape special characters for HTML parsing in Telegram
 * @param text - Text to escape
 * @returns Escaped text safe for HTML
 */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generate a welcome message for a new member
 * Mentions the user by their first name and Telegram ID
 * @param user - Telegram User object
 * @returns Personalized welcome message
 */
export function generateWelcomeMessage(user: User): string {
  const firstName = user.first_name ? escapeMarkdown(user.first_name) : 'User';
  const userId = user.id;

  const message = `🎉 Congratulations, ${firstName}!

Welcome to our community! We're glad to have you here.

Please use the buttons below to get started.`;

  return message;
}

/**
 * Generate a welcome message with HTML formatting
 * @param user - Telegram User object
 * @returns Welcome message with HTML formatting
 */
export function generateWelcomeMessageHtml(user: User): string {
  const firstName = user.first_name ? escapeHtml(user.first_name) : 'User';

  const message = `🎉 Congratulations, <b>${firstName}</b>!

Welcome to our community! We're glad to have you here.

Please use the buttons below to get started.`;

  return message;
}

/**
 * Generate a welcome message that explicitly mentions the user's ID
 * @param user - Telegram User object
 * @returns Welcome message with user mention by ID
 */
export function generateWelcomeMessageWithMention(user: User): string {
  const firstName = user.first_name ? escapeMarkdown(user.first_name) : 'User';
  const userId = user.id;

  const message = `🎉 Congratulations, [${firstName}](tg://user?id=${userId})!

Welcome to our community! We're glad to have you here.

Please use the buttons below to get started.`;

  return message;
}
