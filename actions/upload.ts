"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadFile(
  fileName: string,
  fileContent: string,
  fileType: string,
  directory: string = "uploads"
) {
  if (!fileName) {
    return { success: false, error: "No file name provided" };
  }

  try {
    const key = `${directory}/${fileName}`;
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET!,
      Key: key,
      Body: Buffer.from(fileContent),
      ContentType: fileType,
      ACL: "public-read",
    });

    const response = await s3Client.send(command);

    if (response.$metadata.httpStatusCode !== 200) {
      throw new Error(
        `Failed to upload file: ${response.$metadata.httpStatusCode}`
      );
    }

    // Construct the public URL for the uploaded file
    const publicUrl = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    return { success: true, publicUrl, key };
  } catch (error) {
    console.error("Error uploading file:", error);
    return { success: false, error: "Failed to upload file" };
  }
}
