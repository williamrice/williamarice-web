import { consumers } from "stream";

import * as SibApiV3Sdk from "@sendinblue/client";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: Request) {
  //get the data from the request and write it to console
  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  let apiKey = apiInstance.authentications["apiKey"];
  apiKey.apiKey =
    "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 ";

  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  const data: ContactFormData = {
    name: "test",
    email: "test@test.com",
    message: "next sucks",
  };

  sendSmtpEmail.subject = "Contact Form Submission From williamarice.com";
  sendSmtpEmail.sender = { name: data.name, email: data.email };
  sendSmtpEmail.htmlContent = `<html><body><p>${data.message}</p></body></html>`;
  sendSmtpEmail.to = [{ email: "billyrice12@live.com" }];

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log(
        "API called successfully. Returned data: " + JSON.stringify(data)
      );
    },
    function (error) {
      console.error(error);
    }
  );

  console.log(await request.text());

  return new Response("OK");
}
