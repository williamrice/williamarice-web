"use server";

export const sendEmail = async (
  name: string,
  email: string,
  message: string
): Promise<Response> => {
  const emailContent = {
    sender: {
      name: `${name}`,
      email: "noreply@williamarice.com",
    },
    to: [
      {
        email: "billyrice12@live.com",
        name: "William Rice",
      },
    ],
    subject: `${email} wants to connect with you`,
    htmlContent: `<html><head></head><body><p>${message}</p></body></html>`,
  };

  const headers = new Headers();
  headers.append("accept", "application/json");
  headers.append("api-key", `${process.env.BREVO_API_KEY}`);
  headers.append("content-type", "application/json");
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(emailContent),
  });

  return response;
};
