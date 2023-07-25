import { sendEmail } from "@/lib/contact_form_email";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { name, email, message } = data;
  const result = await sendEmail(name, email, message);

  return NextResponse.json(result);
}
