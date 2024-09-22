"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { uploadFile } from "@/actions/upload";
import { useState } from "react";

const schema = z.object({
  file: z.instanceof(FileList),
});

type FormData = z.infer<typeof schema>;

export default function FileUploadForm() {
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setUploadStatus("Uploading...");
    const file = data.file[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const fileData = e.target?.result as string;
        const result = await uploadFile(fileData, file.name, file.type);

        if (result.success) {
          setUploadStatus(`File uploaded successfully: ${result.fileName}`);
        } else {
          setUploadStatus(`Upload failed: ${result.error}`);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setUploadStatus("No file selected");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen pt-20">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" {...register("file")} />
        <button type="submit">Upload</button>
        {uploadStatus && <p>{uploadStatus}</p>}
      </form>
    </div>
  );
}
