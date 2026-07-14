import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'Telegram Bot API',
    timestamp: new Date().toISOString(),
  });
}
