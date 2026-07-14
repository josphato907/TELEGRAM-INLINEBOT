/**
 * TypeScript Type Definitions
 * Custom types and interfaces for the bot
 */

import { Context } from 'telegraf';

/**
 * Bot configuration interface
 */
export interface BotConfiguration {
  /** Telegram bot token */
  token: string;

  /** Group chat ID for logging */
  groupChatId: string;

  /** URL for group rules button */
  groupRulesUrl: string;

  /** URL for official website button */
  websiteUrl: string;

  /** URL for channel join button */
  channelUrl: string;

  /** URL for contact admin button */
  adminUrl: string;

  /** Admin username (alternative to adminUrl) */
  adminUsername: string;

  /** Enable debug logging */
  debug: boolean;
}

/**
 * Welcome message options
 */
export interface WelcomeMessageOptions {
  /** Format type: markdown, html, or plain */
  format?: 'markdown' | 'html' | 'plain';

  /** Include user mention link */
  includeMention?: boolean;

  /** Include user ID in message */
  includeUserId?: boolean;
}

/**
 * Keyboard button configuration
 */
export interface KeyboardButton {
  /** Button text/label */
  text: string;

  /** Button action type */
  action: 'url' | 'callback';

  /** Button value (URL or callback data) */
  value: string;

  /** Emoji icon for button */
  emoji?: string;
}

/**
 * Keyboard row configuration
 */
export interface KeyboardRow {
  /** Array of buttons in this row */
  buttons: KeyboardButton[];
}

/**
 * Message cache entry
 */
export interface CacheEntry {
  /** User ID */
  userId: number;

  /** Chat ID */
  chatId: number;

  /** Timestamp of message */
  timestamp: number;

  /** Message ID (if tracking specific message) */
  messageId?: number;
}

/**
 * Callback query handler function type
 */
export type CallbackHandler = (ctx: Context) => Promise<void>;

/**
 * Event handler function type
 */
export type EventHandler = (ctx: Context) => Promise<void>;

/**
 * Bot status information
 */
export interface BotStatus {
  /** Status: 'running', 'not_initialized', 'error' */
  status: 'running' | 'not_initialized' | 'error';

  /** Bot username (without @) */
  username?: string;

  /** Bot user ID */
  id?: number;

  /** Bot first name */
  firstName?: string;

  /** Error message if status is 'error' */
  error?: string;
}

/**
 * Member info for welcome message
 */
export interface MemberInfo {
  /** User ID */
  id: number;

  /** First name */
  firstName: string;

  /** Last name (optional) */
  lastName?: string;

  /** Username (optional, without @) */
  username?: string;

  /** User language code */
  languageCode?: string;

  /** Is this a bot account */
  isBot: boolean;
}

/**
 * Welcome message data
 */
export interface WelcomeMessageData {
  /** Message text content */
  text: string;

  /** Parse mode: HTML or Markdown */
  parseMode: 'HTML' | 'Markdown';

  /** Inline keyboard markup */
  replyMarkup?: any;

  /** Disable web page preview */
  disableWebPagePreview?: boolean;
}

/**
 * Verification request data
 */
export interface VerificationRequest {
  /** User ID to verify */
  userId: number;

  /** Chat ID where verification was requested */
  chatId: number;

  /** Timestamp of request */
  timestamp: number;

  /** User first name */
  firstName: string;

  /** Callback query ID for response */
  callbackQueryId: string;
}

/**
 * Error details for logging
 */
export interface ErrorDetails {
  /** Error code */
  code?: string;

  /** Error message */
  message: string;

  /** Error stack trace */
  stack?: string;

  /** Context where error occurred */
  context?: string;

  /** Related data */
  data?: any;
}
