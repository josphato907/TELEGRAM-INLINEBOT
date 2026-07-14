import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const VERCEL_URL = process.env.VERCEL_URL || process.env.DEPLOYMENT_URL;

if (!TELEGRAM_BOT_TOKEN) {
  console.error('❌ TELEGRAM_BOT_TOKEN is not set');
  process.exit(1);
}

if (!VERCEL_URL) {
  console.error('❌ VERCEL_URL is not set');
  console.log('ℹ️  Set VERCEL_URL in your environment or pass it as argument');
  process.exit(1);
}

const WEBHOOK_URL = `https://${VERCEL_URL}/api/telegram/webhook`;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

async function setupWebhook() {
  console.log('🔧 Setting up Telegram webhook...');
  console.log(`📍 Webhook URL: ${WEBHOOK_URL}`);

  try {
    // Remove old webhook first
    console.log('🗑️  Removing old webhook...');
    const deleteResponse = await fetch(`${TELEGRAM_API}/deleteWebhook`, {
      method: 'POST',
    });

    if (!deleteResponse.ok) {
      const error = await deleteResponse.text();
      console.warn('⚠️  Warning deleting old webhook:', error);
    } else {
      console.log('✓ Old webhook removed');
    }

    // Set new webhook
    console.log('⚙️  Setting new webhook...');
    const setResponse = await fetch(`${TELEGRAM_API}/setWebhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: WEBHOOK_URL,
        drop_pending_updates: true,
      }),
    });

    if (!setResponse.ok) {
      const error = await setResponse.text();
      console.error('❌ Error setting webhook:', error);
      process.exit(1);
    }

    const result = (await setResponse.json()) as Record<string, unknown>;
    if (!result.ok) {
      console.error('❌ Webhook setup failed:', result);
      process.exit(1);
    }

    console.log('✅ Webhook configured successfully!');
    console.log(`📍 Webhook URL: ${WEBHOOK_URL}`);

    // Get webhook info
    console.log('\n📊 Webhook Info:');
    const infoResponse = await fetch(`${TELEGRAM_API}/getWebhookInfo`, {
      method: 'POST',
    });

    if (infoResponse.ok) {
      const info = (await infoResponse.json()) as Record<string, unknown>;
      const result = info.result as Record<string, unknown>;
      console.log('  URL:', result.url);
      console.log('  Has Custom Certificate:', result.has_custom_certificate);
      console.log('  Pending Update Count:', result.pending_update_count);
    }
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Run setup
setupWebhook();
