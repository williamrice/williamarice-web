export interface GalleryUpload {
  url: string;
  s3Key: string;
}

export interface SecretMessage {
  title: string;
  message: string;
}

export interface Skill {
  name: string;
  iconClass: string;
  category: "frontend" | "backend" | "language" | "tool";
}
