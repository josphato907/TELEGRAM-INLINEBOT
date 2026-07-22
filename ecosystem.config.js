module.exports = {
  apps: [
    {
      name: 'telegram-bot',
      script: './bot-manager.js',
      instances: 1,
      exec_mode: 'cluster',
      watch: false,
      max_memory_restart: '500M',
      error_file: './logs/error.log',
      out_file: './logs/output.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      env: {
        NODE_ENV: 'production',
        DEBUG: 'false'
      },
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      merge_logs: true
    }
  ],
  deploy: {
    production: {
      user: 'node',
      host: 'your-server.com',
      ref: 'origin/master',
      repo: 'https://github.com/josphato907/TELEGRAM-INLINEBOT.git',
      path: '/var/www/telegram-bot',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js --env production'
    }
  }
};
