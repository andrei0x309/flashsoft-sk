// export const prerender = true;
import type { RequestHandler } from  './$types';

export const GET: RequestHandler = async ({ url,  }) => { 
    if(url.href.includes('/pt/gtm')) {
      const fethUrl = 'https://www.googletagmanager.com/gtag/js' + url.href.replace(/.*?\/pt\/gmt.*(\??)/, '$1')
      const response = await fetch(fethUrl)
      return new Response(response.body, {
        headers: {
          'Cache-Control': 'max-age=0, s-maxage=3600',
          'Content-Type': 'application/javascript'
        },
        status: 200
      });
    }
    if(url.href.includes('/pt/hcaptcha')) {
      const fethUrl = 'https://js.hcaptcha.com/1/api.js' + url.href.replace(/.*?\/pt\/hcaptcha.*(\??)/, '$1')
      const response = await fetch(fethUrl)
      return new Response(response.body, {
        headers: {
          'Cache-Control': 'max-age=0, s-maxage=3600',
          'Content-Type': 'application/javascript'
        },
        status: 200
      });
    }
    
    return new Response(`Not Found`, {
      headers: {
        'Cache-Control': 'max-age=0, s-maxage=3600',
        'Content-Type': 'application/xml'
      },
      status: 404
    });
}
  
 