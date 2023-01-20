
export default async (request: Request) => {
    setTimeout(() => { 
        console.log('Hello world')
        }, 1000);
    new Response.json('Hello world', {status: 200})
}
