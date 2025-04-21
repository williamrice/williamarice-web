/**
 * Verifies a reCAPTCHA token with Google's verification API
 * @param token The reCAPTCHA token to verify
 * @returns A promise that resolves to a boolean indicating if the verification was successful
 */
export async function verifyRecaptcha(token: string): Promise<boolean> {
  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${process.env.GOOGLE_CAPTCHA_SECRET_KEY}&response=${token}`,
    }
  );

  const data = await response.json();
  return data.success;
}
