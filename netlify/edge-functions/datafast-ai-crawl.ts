import type { Config, Context } from '@netlify/edge-functions';
import { trackAICrawlerRequest } from '@datafast/ai-crawl';

// AI crawlers request raw HTML and never run the frontend tracker in Base.astro,
// so this is the only place their visits can be recorded. Same website ID as the
// client-side script.
const WEBSITE_ID = 'dfid_jTHVbOl3p4o4Ik23a7UaA';

export default async (request: Request, context: Context) => {
  trackAICrawlerRequest(request, context, {
    websiteId: WEBSITE_ID,
    domain: 'chriscolborne.com',
    // Netlify resolves the real client IP for us; the package's header sniffing
    // doesn't know about x-nf-client-connection-ip.
    getIp: () => context.ip,
    authToken: Netlify.env.get('DATAFAST_BOT_TOKEN'),
  });

  // Return nothing so the request falls through to the static asset untouched -
  // returning a Response here would skip the redirects declared in netlify.toml.
  return undefined;
};

export const config: Config = {
  path: '/*',
  excludedPath: ['/_astro/*', '/favicon.png', '/og-card.png', '/profile-pic.jpg'],
  method: ['GET', 'HEAD'],
  onError: 'continue',
};
