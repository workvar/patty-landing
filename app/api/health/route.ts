import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
    };

    // Optional: Check critical dependencies
    const checks: Record<string, boolean> = {
      supabase: !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      recaptcha: !!process.env.RECAPTCHA_SECRET_KEY,
    };

    const allChecksPass = Object.values(checks).every(check => check === true);

    return NextResponse.json(
      {
        ...healthStatus,
        checks,
        healthy: allChecksPass,
      },
      { status: allChecksPass ? 200 : 503 }
    );
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
      },
      { status: 503 }
    );
  }
}

