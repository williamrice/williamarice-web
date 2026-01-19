import { Prisma } from "@/prisma/generated/prisma/client";

export type ResumeType = Prisma.ResumeGetPayload<{
  include: {
    profiles: true;
    skills: true;
    work: true;
    education: true;
    certificates: true;
    projects: true;
    volunteer: true;
    interests: true;
  };
}>;
