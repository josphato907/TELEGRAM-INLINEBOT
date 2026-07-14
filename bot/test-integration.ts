/**
 * Integration Test Example
 * Demonstrates how to test the bot in different scenarios
 * Run with: npx ts-node bot/test-integration.ts
 */

import { User } from 'telegraf/types';
import {
  generateWelcomeMessage,
  generateWelcomeMessageWithMention,
  generateWelcomeMessageHtml,
  escapeMarkdown,
  escapeHtml,
} from './welcomeMessage';
import { buildWelcomeKeyboard } from './keyboards';
import { botConfig } from './config';

/**
 * Test 1: Message Generation
 */
function testMessageGeneration(): void {
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║ Test 1: Message Generation            ║');
  console.log('╚════════════════════════════════════════╝\n');

  // Regular user
  const user1: User = {
    id: 123456789,
    is_bot: false,
    first_name: 'John',
    language_code: 'en',
  };

  console.log('Test Case 1: Regular User\n');
  console.log('User:', JSON.stringify(user1, null, 2));
  console.log('\nMessage Generated:');
  console.log(generateWelcomeMessageWithMention(user1));
  console.log('\n---\n');

  // User with special characters
  const user2: User = {
    id: 987654321,
    is_bot: false,
    first_name: "José_María",
    last_name: "O'Brien",
    username: 'jose.maria',
    language_code: 'es',
  };

  console.log('Test Case 2: User with Special Characters\n');
  console.log('User:', JSON.stringify(user2, null, 2));
  console.log('\nMessage Generated:');
  console.log(generateWelcomeMessageWithMention(user2));
  console.log('\n---\n');

  // User with emoji in name
  const user3: User = {
    id: 555555555,
    is_bot: false,
    first_name: '👨‍💻 Developer',
    language_code: 'en',
  };

  console.log('Test Case 3: User with Emoji\n');
  console.log('User:', JSON.stringify(user3, null, 2));
  console.log('\nMessage Generated:');
  console.log(generateWelcomeMessageWithMention(user3));
  console.log('\n---\n');

  // Bot account (should still generate message)
  const botUser: User = {
    id: 999999999,
    is_bot: true,
    first_name: 'Test Bot',
    language_code: 'en',
  };

  console.log('Test Case 4: Bot Account\n');
  console.log('User:', JSON.stringify(botUser, null, 2));
  console.log('\nMessage Generated (for demonstration):');
  console.log(generateWelcomeMessageWithMention(botUser));
  console.log('\n✓ Test 1 Complete\n');
}

/**
 * Test 2: Character Escaping
 */
function testCharacterEscaping(): void {
  console.log('╔════════════════════════════════════════╗');
  console.log('║ Test 2: Character Escaping            ║');
  console.log('╚════════════════════════════════════════╝\n');

  const testStrings = [
    'Regular text',
    'Text with [brackets]',
    'Text with (parentheses)',
    'Text with _underscores_',
    '*Bold* text',
    'Text with `code`',
    'Text with > quote',
    "Text with 'quotes'",
    'Text with & ampersand',
    'Text with <html> tags',
  ];

  console.log('Markdown Escaping:\n');
  testStrings.forEach((str) => {
    console.log(`  Input:  "${str}"`);
    console.log(`  Output: "${escapeMarkdown(str)}"`);
    console.log('');
  });

  console.log('---\n');

  console.log('HTML Escaping:\n');
  testStrings.forEach((str) => {
    console.log(`  Input:  "${str}"`);
    console.log(`  Output: "${escapeHtml(str)}"`);
    console.log('');
  });

  console.log('✓ Test 2 Complete\n');
}

/**
 * Test 3: Keyboard Generation
 */
function testKeyboardGeneration(): void {
  console.log('╔════════════════════════════════════════╗');
  console.log('║ Test 3: Keyboard Generation           ║');
  console.log('╚════════════════════════════════════════╝\n');

  console.log('Current Configuration:');
  console.log(`  Group Rules URL: ${botConfig.groupRulesUrl}`);
  console.log(`  Website URL: ${botConfig.websiteUrl}`);
  console.log(`  Channel URL: ${botConfig.channelUrl}`);
  console.log(`  Admin URL: ${botConfig.adminUrl}\n`);

  const keyboard = buildWelcomeKeyboard();

  console.log('Generated Keyboard:');
  console.log(JSON.stringify(keyboard.reply_markup, null, 2));

  console.log('\nKeyboard Structure:');
  console.log('  Row 1: 📖 Group Rules | 🌐 Official Website');
  console.log('  Row 2: 👥 Join Channel | 💬 Contact Admin');
  console.log('  Row 3: ✅ Verify Yourself');

  console.log('\n✓ Test 3 Complete\n');
}

/**
 * Test 4: Configuration Validation
 */
function testConfiguration(): void {
  console.log('╔════════════════════════════════════════╗');
  console.log('║ Test 4: Configuration Validation      ║');
  console.log('╚════════════════════════════════════════╝\n');

  console.log('Current Configuration:');
  console.log(`  Token Present: ${botConfig.token ? '✓ Yes' : '✗ No'}`);
  console.log(`  Group Chat ID: ${botConfig.groupChatId || '(not set)'}`);
  console.log(`  Group Rules URL: ${botConfig.groupRulesUrl}`);
  console.log(`  Website URL: ${botConfig.websiteUrl}`);
  console.log(`  Channel URL: ${botConfig.channelUrl}`);
  console.log(`  Admin URL: ${botConfig.adminUrl}`);
  console.log(`  Admin Username: ${botConfig.adminUsername}`);
  console.log(`  Debug Mode: ${botConfig.debug ? 'Enabled' : 'Disabled'}\n`);

  if (!botConfig.token) {
    console.error('⚠️  Warning: TELEGRAM_BOT_TOKEN not set!');
    console.error('   Set the token in .env file before running the bot\n');
  } else {
    console.log('✓ Token is configured\n');
  }

  console.log('✓ Test 4 Complete\n');
}

/**
 * Test 5: Batch User Processing
 */
function testBatchProcessing(): void {
  console.log('╔════════════════════════════════════════╗');
  console.log('║ Test 5: Batch User Processing         ║');
  console.log('╚════════════════════════════════════════╝\n');

  // Simulate multiple users joining
  const newMembers: User[] = [
    {
      id: 111111111,
      is_bot: false,
      first_name: 'Alice',
      language_code: 'en',
    },
    {
      id: 222222222,
      is_bot: false,
      first_name: 'Bob',
      language_code: 'en',
    },
    {
      id: 333333333,
      is_bot: true,
      first_name: 'Bot Assistant',
      language_code: 'en',
    },
    {
      id: 444444444,
      is_bot: false,
      first_name: 'Charlie',
      language_code: 'en',
    },
  ];

  console.log(`Processing ${newMembers.length} new members:\n`);

  let messageCount = 0;
  let skippedCount = 0;

  newMembers.forEach((member, index) => {
    console.log(`Member ${index + 1}:`);
    console.log(`  ID: ${member.id}`);
    console.log(`  Name: ${member.first_name}`);
    console.log(`  Is Bot: ${member.is_bot}`);

    if (member.is_bot) {
      console.log('  Action: ✗ Skipped (bot account)\n');
      skippedCount++;
    } else {
      console.log('  Action: ✓ Welcome message queued\n');
      messageCount++;
    }
  });

  console.log(`Summary:`);
  console.log(`  Messages to send: ${messageCount}`);
  console.log(`  Skipped (bots): ${skippedCount}`);
  console.log(`  Total processed: ${newMembers.length}\n`);

  console.log('✓ Test 5 Complete\n');
}

/**
 * Test 6: Performance Simulation
 */
function testPerformanceSimulation(): void {
  console.log('╔════════════════════════════════════════╗');
  console.log('║ Test 6: Performance Simulation        ║');
  console.log('╚════════════════════════════════════════╝\n');

  // Generate 100 welcome messages
  const userCount = 100;
  const startTime = Date.now();

  for (let i = 0; i < userCount; i++) {
    const user: User = {
      id: 1000000 + i,
      is_bot: false,
      first_name: `User${i}`,
      language_code: 'en',
    };
    // Generate message
    generateWelcomeMessageWithMention(user);
    // Generate keyboard
    buildWelcomeKeyboard();
  }

  const endTime = Date.now();
  const totalTime = endTime - startTime;
  const timePerMessage = totalTime / userCount;

  console.log(`Generated ${userCount} welcome messages and keyboards`);
  console.log(`Total time: ${totalTime}ms`);
  console.log(`Time per message: ${timePerMessage.toFixed(2)}ms`);
  console.log(`Messages per second: ${(1000 / timePerMessage).toFixed(0)}\n`);

  console.log('✓ Test 6 Complete\n');
}

/**
 * Run all tests
 */
function runAllTests(): void {
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║  Telegram Bot Integration Tests       ║');
  console.log('╚════════════════════════════════════════╝');

  try {
    testConfiguration();
    testCharacterEscaping();
    testMessageGeneration();
    testKeyboardGeneration();
    testBatchProcessing();
    testPerformanceSimulation();

    console.log('╔════════════════════════════════════════╗');
    console.log('║  ✓ All Tests Completed Successfully   ║');
    console.log('╚════════════════════════════════════════╝\n');

    console.log('Next Steps:');
    console.log('1. Review the test results above');
    console.log('2. Ensure TELEGRAM_BOT_TOKEN is set in .env');
    console.log('3. Run: npx ts-node bot/start.ts');
    console.log('4. Add the bot to your Telegram group');
    console.log('5. Test with real user joins\n');
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

// Run tests
runAllTests();
