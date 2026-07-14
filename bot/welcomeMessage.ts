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

  const message = `Welcome ${firstName}! 👋

I AM GEORGE, THE DEVELOPER. I CAN HELP YOU IN CREATING ANY WEBSITE, APPS, POS AND ANY INTEGRATIONS OF STK MPESA PUSH. ALSO CREDIT/MASTERCARD PAYMENTS GATEWAYS.

Feel free to reach out using the buttons below!`;

  return message;
}

/**
 * Generate a welcome message with HTML formatting
 * @param user - Telegram User object
 * @returns Welcome message with HTML formatting
 */
export function generateWelcomeMessageHtml(user: User): string {
  const firstName = user.first_name ? escapeHtml(user.first_name) : 'User';

  const message = `Welcome <b>${firstName}</b>! 👋

I AM <b>GEORGE</b>, THE DEVELOPER. I CAN HELP YOU IN CREATING ANY WEBSITE, APPS, POS AND ANY INTEGRATIONS OF STK MPESA PUSH. ALSO CREDIT/MASTERCARD PAYMENTS GATEWAYS.

Feel free to reach out using the buttons below!`;

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

  const message = `Welcome [${firstName}](tg://user?id=${userId})! 👋

I AM GEORGE, THE DEVELOPER. I CAN HELP YOU IN CREATING ANY WEBSITE, APPS, POS AND ANY INTEGRATIONS OF STK MPESA PUSH. ALSO CREDIT/MASTERCARD PAYMENTS GATEWAYS.

Feel free to reach out using the buttons below!`;

  return message;
}
