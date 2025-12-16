'use client'

import { useEffect } from 'react'

/**
 * Component that silently pings Supabase on page load to keep the project active.
 * This runs in the background and doesn't expose any data to the UI.
 */
export default function SupabaseKeepAlive() {
  useEffect(() => {
    // Silently fetch waitlist count to keep Supabase active
    // This runs once per page visit and doesn't expose data to UI
    fetch('/api/waitlist/count', {
      method: 'GET',
      // Don't wait for response, fire and forget
    }).catch(() => {
      // Silently fail - we don't want to expose errors to users
    });
  }, []);

  // This component renders nothing
  return null;
}

