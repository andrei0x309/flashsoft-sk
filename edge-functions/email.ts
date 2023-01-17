import { json } from '@sveltejs/kit';
import { Config } from "https://edge.netlify.com"
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const ret = JSON.stringify(SmtpClient)

export default async () => {
   return json({data: ret})
}

export const config: Config = {
  path: "/email"
}
