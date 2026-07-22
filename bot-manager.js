#!/usr/bin/env node

/**
 * Bot Manager - Keeps the Telegram bot running 24/7
 * Automatically restarts bot if it crashes
 * Prevents duplicate instances
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const BOT_SCRIPT = path.join(__dirname, 'start-bot.js');
const PID_FILE = path.join(__dirname, '.bot.pid');
const LOG_FILE = path.join(__dirname, 'bot-manager.log');

let botProcess = null;
let restartCount = 0;
const MAX_RESTARTS_PER_MINUTE = 5;
let restartTimes = [];

function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  console.log(logMessage);
  fs.appendFileSync(LOG_FILE, logMessage + '\n');
}

function writePID(pid) {
  fs.writeFileSync(PID_FILE, pid.toString());
}

function removePID() {
  try {
    fs.unlinkSync(PID_FILE);
  } catch (e) {
    // File doesn't exist
  }
}

function checkRateLimit() {
  const now = Date.now();
  const oneMinuteAgo = now - 60000;
  
  // Remove old restart times
  restartTimes = restartTimes.filter(time => time > oneMinuteAgo);
  
  if (restartTimes.length >= MAX_RESTARTS_PER_MINUTE) {
    log(`ERROR: Too many restarts (${restartTimes.length}/${MAX_RESTARTS_PER_MINUTE}) in the last minute. Waiting...`);
    return false;
  }
  
  return true;
}

function startBot() {
  if (!checkRateLimit()) {
    setTimeout(startBot, 30000); // Wait 30 seconds before retrying
    return;
  }

  log('Starting bot process...');
  
  botProcess = spawn('node', [BOT_SCRIPT], {
    stdio: ['ignore', 'pipe', 'pipe'],
    detached: false,
  });

  writePID(botProcess.pid);
  log(`Bot started with PID ${botProcess.pid}`);
  restartTimes.push(Date.now());

  // Capture stdout
  botProcess.stdout.on('data', (data) => {
    log(`[BOT] ${data.toString().trim()}`);
  });

  // Capture stderr
  botProcess.stderr.on('data', (data) => {
    log(`[BOT ERROR] ${data.toString().trim()}`);
  });

  // Handle process exit
  botProcess.on('exit', (code, signal) => {
    log(`Bot process exited with code ${code} and signal ${signal}`);
    removePID();
    
    // Restart bot after 5 seconds
    log('Restarting bot in 5 seconds...');
    setTimeout(startBot, 5000);
  });

  // Handle errors
  botProcess.on('error', (error) => {
    log(`Bot process error: ${error.message}`);
  });
}

// Handle signals
process.on('SIGINT', () => {
  log('Received SIGINT, shutting down...');
  if (botProcess) {
    botProcess.kill();
  }
  removePID();
  process.exit(0);
});

process.on('SIGTERM', () => {
  log('Received SIGTERM, shutting down...');
  if (botProcess) {
    botProcess.kill();
  }
  removePID();
  process.exit(0);
});

// Start the bot
log('🤖 Bot Manager Started');
log(`PID: ${process.pid}`);
log('Keeping bot running 24/7...');
startBot();

// Keep process alive
setInterval(() => {
  if (!botProcess || botProcess.killed) {
    log('Bot process is dead, restarting...');
    startBot();
  }
}, 5000);
