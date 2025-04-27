export const prerender = true;
import type { RequestHandler } from './$types';
import { generatePaths } from '@/lib/sitemap/index';

const website = 'https://flashsoft.eu';

export const GET: RequestHandler = async () => {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8" ?>
	<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
		${(await generatePaths())
      .map(
        (page) => `<url>
			<loc>${website}/${page.url}</loc>
			<changefreq>monthly</changefreq>
			<priority>${page.priority ?? 0.5}</priority>
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
