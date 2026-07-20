#!/usr/bin/env node

require('dotenv').config();
const https = require('https');

const token = process.env.TELEGRAM_BOT_TOKEN;

function makeRequest(method, params = {}) {
  return new Promise((resolve, reject) => {
    const url = `https://api.telegram.org/bot${token}/${method}`;
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${url}?${queryString}`;

    https.get(fullUrl, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function runDiagnostics() {
  console.log('=== Telegram Bot Diagnostics ===\n');

  try {
    // 1. Check bot info
    console.log('1. Checking bot info...');
    const botInfo = await makeRequest('getMe');
    if (botInfo.ok) {
      console.log(`   ✓ Bot name: ${botInfo.result.first_name}`);
      console.log(`   ✓ Bot username: @${botInfo.result.username}`);
      console.log(`   ✓ Bot ID: ${botInfo.result.id}`);
    } else {
      console.log('   ✗ Failed to get bot info');
      console.log('   Error:', botInfo.description);
    }

    // 2. Check webhook status
    console.log('\n2. Checking webhook/polling status...');
    const webhookInfo = await makeRequest('getWebhookInfo');
    if (webhookInfo.ok) {
      const webhookUrl = webhookInfo.result.url || 'None (using polling)';
      console.log(`   ✓ Webhook URL: ${webhookUrl}`);
      console.log(`   ✓ Pending updates: ${webhookInfo.result.pending_update_count}`);
    }

    // 3. Check for updates
    console.log('\n3. Checking for pending updates...');
    const updates = await makeRequest('getUpdates', { limit: 1 });
    if (updates.ok) {
      console.log(`   ✓ Total pending updates: ${updates.result.length}`);
      if (updates.result.length > 0) {
        const lastUpdate = updates.result[0];
        console.log(`   ✓ Last update ID: ${lastUpdate.update_id}`);
        if (lastUpdate.message?.new_chat_members) {
          console.log(`   ✓ New members detected in updates`);
        }
      }
    }

    // 4. Check bot commands
    console.log('\n4. Checking bot configuration...');
    const commands = await makeRequest('getMyCommands');
    if (commands.ok) {
      console.log(`   ✓ Commands registered: ${commands.result.length}`);
    }

    console.log('\n=== Diagnostics Complete ===');
    console.log('\nBot Status: READY');
    console.log('Next: Make sure bot is added to your group as an ADMIN');
    console.log('Then invite someone to the group to trigger the welcome message.');
  } catch (error) {
    console.error('Error running diagnostics:', error.message);
  }
}

runDiagnostics();
