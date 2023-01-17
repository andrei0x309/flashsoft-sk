const SmtpClient = (await import('https://deno.land/x/smtp@v0.7.0/mod.ts')).SmtpClient;

export const client = new SmtpClient();
