import { validateEmail } from './edge-utils'
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const SMTP_HOST = Deno.env.get('SECRET_SMTP_HOST')
const SMTP_PORT = Deno.env.get('SECRET_SMTP_PORT')
const SMTP_USERNAME = Deno.env.get('SECRET_SMTP_USERNAME')
const SMTP_PASSWORD = Deno.env.get('SECRET_SMTP_PASSWORD')

const client = new SmtpClient()

export default async (request: Request) => {
    let  name, email, message;
    // hCaptcha
    try {
      // , hCaptcha
      ({ name, email, message } = await request.json());
    } catch (error) {
      return Response.json({error: 'Missing required fields, email, hCaptcha, message'}, {status: 400})
    }
    // || !hCaptcha
    if(!email || !message ) {
        return Response.json({error: 'Missing required fields, email, hCaptcha, message'}, {status: 400})
    }
    if(message.length > 2000) {
        return Response.json({error: 'Message too long'}, {status: 400})
    }
    if(message.length < 10) {
        return Response.json({error: 'Message too short'}, {status: 400})
    }
    if(name?.length > 150) {
        return Response.json({error: 'Name too long'}, {status: 400})
    }
    if(!validateEmail(email)) {
        return Response.json({error: 'Invalid email'}, {status: 400})
    }
    
    try{
      const emailMessage = {
        from: "website@flashsoft.eu",
        to: "andrei@flashsoft.eu",
        subject: "Website contact from " + name + " " + email,
        content: message,
      };
    
    
      client.connect({
        hostname: SMTP_HOST,
        port: SMTP_PORT,
        username: SMTP_USERNAME,
        password: SMTP_PASSWORD,
      }).then(() => {
        client.send(emailMessage).then(() => {
          client.close().catch(err => console.error(err))
        }).catch(err => console.error(err))
      }).catch(err => console.error(err))
      return Response.json({data: 'ok'})
    } catch (e) {
      return Response.json({error: 'Internal Server Error'}, {status: 500})
    }
}
