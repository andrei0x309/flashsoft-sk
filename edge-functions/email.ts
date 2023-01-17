import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const ret = JSON.stringify(SmtpClient)

export default async () => {
   return Response.json({data: ret})
}
