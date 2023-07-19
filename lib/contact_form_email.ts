'use server';

export const sendEmail = async (data:FormData) => {

    const emailContent = {
        sender:{  
            "name":`${data.get("name")}`,
            "email":'noreply@williamarice.com'
         },
         to:[  
            {  
               "email":"billyrice12@live.com",
               "name":"William Rice"
            }
         ],
         subject:`${data.get('email')} wants to connect with you`,
         htmlContent:`<html><head></head><body><p>${data.get('message')}</p></body></html>`
    }


    const headers = new Headers();
    headers.append("accept","application/json");
    headers.append("api-key", "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");
    headers.append("content-type", "application/json")
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: headers, 
        body: JSON.stringify(emailContent)

    })

    console.log(response);
    
}