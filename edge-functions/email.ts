import buffer from "https://esm.sh/buffer@6.0.3"
import nodemailer from "https://esm.sh/nodemailer@6.9.0";

const SMTP_HOST = Deno.env.get('SECRET_SMTP_HOST')
const SMTP_PORT = Deno.env.get('SECRET_SMTP_PORT')
const SMTP_USERNAME = Deno.env.get('SECRET_SMTP_USERNAME')
const SMTP_PASSWORD = Deno.env.get('SECRET_SMTP_PASSWORD')

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

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
        text: message,
      };
    
    const transport = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: SMTP_USERNAME,
          pass: SMTP_PASSWORD,
        },
      });
    
    transport.sendMail(emailMessage).catch(err => console.error(err));
    
      return Response.json({data: 'ok'})
    } catch (e) {
      return Response.json({error: 'Internal Server Error'}, {status: 500})
    }
}
