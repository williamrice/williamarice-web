import { Prisma } from "@prisma/client";

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
