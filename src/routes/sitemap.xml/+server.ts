export const prerender = true;

import { config } from '#/lib/config/config.ts';
import { generatePaths } from '#/lib/sitemap/index.ts';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8" ?>
	<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
		${(await generatePaths())
      .map(
        (page) => `<url>
			<loc>${config.baseSiteUrl}/${page.url?.replace('&', '&amp;')}</loc>
			<changefreq>monthly</changefreq>
			<priority>${page.priority ?? '0.5'}</priority>
		  </url>`
      )
      .join('')}
	</urlset>`,

    {
      headers: {
        'Cache-Control': 'max-age=0, s-maxage=3600',
        'Content-Type': 'application/xml'
      },
      status: 200
    }
  );
};
