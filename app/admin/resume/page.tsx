"use client";

import { useState, useEffect } from "react";
import {
  useForm,
  useFieldArray,
  Controller,
  SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ResumeType } from "@/app/types/resume";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import { ClipLoader } from "react-spinners";

// Define the schema for form validation
const resumeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  label: z.string().min(1, "Label is required"),
  image: z
    .string()
    .url()
    .optional()
    .or(z.literal(""))
    .transform((e) => (e === "" ? null : e)),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  url: z
    .string()
    .url()
    .optional()
    .or(z.literal(""))
    .transform((e) => (e === "" ? null : e)),
  summary: z.string().min(1, "Summary is required"),
  address: z
    .string()
    .optional()
    .transform((e) => (e === "" ? null : e)),
  postalCode: z
    .string()
    .optional()
    .transform((e) => (e === "" ? null : e)),
  city: z.string().min(1, "City is required"),
  countryCode: z.string().min(2, "Country code is required"),
  region: z.string().min(1, "Region is required"),
  profiles: z.array(
    z.object({
      network: z.string().min(1, "Network is required"),
      username: z.string().min(1, "Username is required"),
      url: z
        .string()
        .url()
        .optional()
        .or(z.literal(""))
        .transform((e) => (e === "" ? null : e)),
    })
  ),
  skills: z.array(
    z.object({
      name: z.string().min(1, "Skill name is required"),
      level: z.string().min(1, "Skill level is required"),
      keywords: z.array(z.string()),
    })
  ),
  work: z.array(
    z.object({
      name: z.string().min(1, "Company name is required"),
      location: z.string().min(1, "Location is required"),
      position: z.string().min(1, "Position is required"),
      startDate: z.string().min(1, "Start date is required"),
      endDate: z
        .string()
        .optional()
        .transform((e) => (e === "" ? undefined : e)),
      summary: z.string().min(1, "Summary is required"),
      highlights: z.array(z.string()),
    })
  ),
  education: z.array(
    z.object({
      institution: z.string().min(1, "Institution is required"),
      area: z.string().min(1, "Area of study is required"),
      studyType: z.string().min(1, "Study type is required"),
      startDate: z.string().min(1, "Start date is required"),
      endDate: z.string().min(1, "End date is required"),
      score: z.string().min(1, "Score is required"),
      courses: z.array(z.string()),
    })
  ),
  certificates: z.array(
    z.object({
      name: z.string().min(1, "Certificate name is required"),
      date: z.string().min(1, "Date is required"),
      issuer: z.string().min(1, "Issuer is required"),
    })
  ),
  projects: z.array(
    z.object({
      name: z.string().min(1, "Project name is required"),
      url: z
        .string()
        .url()
        .optional()
        .nullable()
        .or(z.literal(""))
        .transform((e) => (e === "" ? undefined : e)),
      startDate: z.string().min(1, "Start date is required"),
      endDate: z
        .string()
        .optional()
        .transform((e) => (e === "" ? undefined : e)),
      description: z.string().min(1, "Description is required"),
      highlights: z.array(z.string()),
    })
  ),
  volunteer: z.array(
    z.object({
      organization: z.string().min(1, "Organization is required"),
      position: z.string().min(1, "Position is required"),
      startDate: z.string().min(1, "Start date is required"),
      endDate: z
        .string()
        .optional()
        .transform((e) => (e === "" ? undefined : e)),
      summary: z.string().min(1, "Summary is required"),
      highlights: z.array(z.string()),
    })
  ),
  interests: z.array(
    z.object({
      name: z.string().min(1, "Interest name is required"),
      keywords: z.array(z.string()),
    })
  ),
});

type ResumeFormData = z.infer<typeof resumeSchema>;

export default function ResumeForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResumeFormData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {} as ResumeFormData,
  });

  const {
    fields: profileFields,
    append: appendProfile,
    remove: removeProfile,
  } = useFieldArray({ control, name: "profiles" });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({ control, name: "skills" });

  const {
    fields: workFields,
    append: appendWork,
    remove: removeWork,
  } = useFieldArray({ control, name: "work" });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({ control, name: "education" });

  const {
    fields: certificateFields,
    append: appendCertificate,
    remove: removeCertificate,
  } = useFieldArray({ control, name: "certificates" });

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({ control, name: "projects" });

  const {
    fields: volunteerFields,
    append: appendVolunteer,
    remove: removeVolunteer,
  } = useFieldArray({ control, name: "volunteer" });

  const {
    fields: interestFields,
    append: appendInterest,
    remove: removeInterest,
  } = useFieldArray({ control, name: "interests" });

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await fetch("/api/admin/resume");
        if (!response.ok) throw new Error("Failed to fetch resume");
        const data: ResumeType = await response.json();

        // Convert dates to strings
        const formattedData = {
          ...data,
          work: data.work?.map((job) => ({
            ...job,
            startDate: job.startDate
              ? new Date(job.startDate).toISOString().split("T")[0]
              : "",
            endDate: job.endDate
              ? new Date(job.endDate).toISOString().split("T")[0]
              : "",
          })),
          education: data.education?.map((edu) => ({
            ...edu,
            startDate: edu.startDate
              ? new Date(edu.startDate).toISOString().split("T")[0]
              : "",
            endDate: edu.endDate
              ? new Date(edu.endDate).toISOString().split("T")[0]
              : "",
          })),
          certificates: data.certificates?.map((cert) => ({
            ...cert,
            date: cert.date
              ? new Date(cert.date).toISOString().split("T")[0]
              : "",
          })),
          projects: data.projects?.map((proj) => ({
            ...proj,
            startDate: proj.startDate
              ? new Date(proj.startDate).toISOString().split("T")[0]
              : "",
            endDate: proj.endDate
              ? new Date(proj.endDate).toISOString().split("T")[0]
              : "",
          })),
          volunteer: data.volunteer?.map((vol) => ({
            ...vol,
            startDate: vol.startDate
              ? new Date(vol.startDate).toISOString().split("T")[0]
              : "",
            endDate: vol.endDate
              ? new Date(vol.endDate).toISOString().split("T")[0]
              : "",
          })),
        };

        reset(formattedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching resume:", error);
        toast({
          title: "Error",
          description: "Failed to load resume data. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    fetchResume();
  }, [reset]);

  const onSubmit: SubmitHandler<ResumeFormData> = async (data) => {
    setIsSaving(true);
    try {
      const convertedData = {
        ...data,
        work: data.work.map((job) => ({
          ...job,
          startDate: job.startDate ? new Date(job.startDate) : null,
          endDate: job.endDate ? new Date(job.endDate) : null,
        })),
        education: data.education.map((edu) => ({
          ...edu,
          startDate: edu.startDate ? new Date(edu.startDate) : null,
          endDate: edu.endDate ? new Date(edu.endDate) : null,
        })),
        certificates: data.certificates.map((cert) => ({
          ...cert,
          date: cert.date ? new Date(cert.date) : null,
        })),
        projects: data.projects.map((proj) => ({
          ...proj,
          startDate: proj.startDate ? new Date(proj.startDate) : null,
          endDate: proj.endDate ? new Date(proj.endDate) : null,
        })),
        volunteer: data.volunteer.map((vol) => ({
          ...vol,
          startDate: vol.startDate ? new Date(vol.startDate) : null,
          endDate: vol.endDate ? new Date(vol.endDate) : null,
        })),
      };

      const response = await fetch("/api/admin/resume/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(convertedData),
      });

      if (!response.ok) throw new Error("Failed to update resume");

      toast({
        title: "Success",
        description: "Resume updated successfully!",
      });
    } catch (error) {
      console.error("Error updating resume:", error);
      toast({
        title: "Error",
        description: "Failed to update resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#000000" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-4">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="personal-info">
          <AccordionTrigger>Personal Information</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name")} />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="label">Label</Label>
                <Input id="label" {...register("label")} />
                {errors.label && (
                  <p className="text-red-500">{errors.label.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input id="image" {...register("image")} />
                {errors.image && (
                  <p className="text-red-500">{errors.image.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" {...register("email")} />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" {...register("phone")} />
                {errors.phone && (
                  <p className="text-red-500">{errors.phone.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="url">URL</Label>
                <Input id="url" {...register("url")} />
                {errors.url && (
                  <p className="text-red-500">{errors.url.message}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="summary">Summary</Label>
                <Textarea id="summary" {...register("summary")} />
                {errors.summary && (
                  <p className="text-red-500">{errors.summary.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" {...register("address")} />
                {errors.address && (
                  <p className="text-red-500">{errors.address.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input id="postalCode" {...register("postalCode")} />
                {errors.postalCode && (
                  <p className="text-red-500">{errors.postalCode.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" {...register("city")} />
                {errors.city && (
                  <p className="text-red-500">{errors.city.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="countryCode">Country Code</Label>
                <Input id="countryCode" {...register("countryCode")} />
                {errors.countryCode && (
                  <p className="text-red-500">{errors.countryCode.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="region">Region</Label>
                <Input id="region" {...register("region")} />
                {errors.region && (
                  <p className="text-red-500">{errors.region.message}</p>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="profiles">
          <AccordionTrigger>Profiles</AccordionTrigger>
          <AccordionContent>
            {profileFields.map((field, index) => (
              <div key={field.id} className="flex flex-col space-y-2 mb-4">
                <Input
                  {...register(`profiles.${index}.network`)}
                  placeholder="Network"
                />
                {errors.profiles?.[index]?.network && (
                  <p className="text-red-500">
                    {errors.profiles[index]?.network?.message}
                  </p>
                )}
                <Input
                  {...register(`profiles.${index}.username`)}
                  placeholder="Username"
                />
                {errors.profiles?.[index]?.username && (
                  <p className="text-red-500">
                    {errors.profiles[index]?.username?.message}
                  </p>
                )}
                <Input
                  {...register(`profiles.${index}.url`)}
                  placeholder="URL"
                />
                {errors.profiles?.[index]?.url && (
                  <p className="text-red-500">
                    {errors.profiles[index]?.url?.message}
                  </p>
                )}
                <Button
                  type="button"
                  onClick={() => removeProfile(index)}
                  variant="destructive"
                >
                  <MinusIcon className="mr-2 h-4 w-4" /> Remove Profile
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() =>
                appendProfile({ network: "", username: "", url: "" })
              }
            >
              <PlusIcon className="mr-2 h-4 w-4" /> Add Profile
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="skills">
          <AccordionTrigger>Skills</AccordionTrigger>
          <AccordionContent>
            {skillFields.map((field, index) => (
              <div key={field.id} className="flex flex-col space-y-2 mb-4">
                <Input
                  {...register(`skills.${index}.name`)}
                  placeholder="Skill Name"
                />
                {errors.skills?.[index]?.name && (
                  <p className="text-red-500">
                    {errors.skills[index]?.name?.message}
                  </p>
                )}
                <Input
                  {...register(`skills.${index}.level`)}
                  placeholder="Skill Level"
                />
                {errors.skills?.[index]?.level && (
                  <p className="text-red-500">
                    {errors.skills[index]?.level?.message}
                  </p>
                )}
                <Controller
                  name={`skills.${index}.keywords`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Keywords (comma-separated)"
                      onChange={(e) =>
                        field.onChange(e.target.value.split(","))
                      }
                    />
                  )}
                />
                <Button
                  type="button"
                  onClick={() => removeSkill(index)}
                  variant="destructive"
                >
                  <MinusIcon className="mr-2 h-4 w-4" /> Remove Skill
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => appendSkill({ name: "", level: "", keywords: [] })}
            >
              <PlusIcon className="mr-2 h-4 w-4" /> Add Skill
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="work">
          <AccordionTrigger>Work Experience</AccordionTrigger>
          <AccordionContent>
            {workFields.map((field, index) => (
              <div key={field.id} className="flex flex-col space-y-2 mb-4">
                <Input
                  {...register(`work.${index}.name`)}
                  placeholder="Company Name"
                />
                {errors.work?.[index]?.name && (
                  <p className="text-red-500">
                    {errors.work[index]?.name?.message}
                  </p>
                )}
                <Input
                  {...register(`work.${index}.location`)}
                  placeholder="Location"
                />
                {errors.work?.[index]?.location && (
                  <p className="text-red-500">
                    {errors.work[index]?.location?.message}
                  </p>
                )}
                <Input
                  {...register(`work.${index}.position`)}
                  placeholder="Position"
                />
                {errors.work?.[index]?.position && (
                  <p className="text-red-500">
                    {errors.work[index]?.position?.message}
                  </p>
                )}
                <Input
                  {...register(`work.${index}.startDate`)}
                  placeholder="Start Date"
                  type="date"
                />
                {errors.work?.[index]?.startDate && (
                  <p className="text-red-500">
                    {errors.work[index]?.startDate?.message}
                  </p>
                )}
                <Input
                  {...register(`work.${index}.endDate`)}
                  placeholder="End Date"
                  type="date"
                />
                <Textarea
                  {...register(`work.${index}.summary`)}
                  placeholder="Summary"
                />
                {errors.work?.[index]?.summary && (
                  <p className="text-red-500">
                    {errors.work[index]?.summary?.message}
                  </p>
                )}
                <Controller
                  name={`work.${index}.highlights`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Highlights (comma-separated)"
                      onChange={(e) =>
                        field.onChange(e.target.value.split(","))
                      }
                    />
                  )}
                />
                <Button
                  type="button"
                  onClick={() => removeWork(index)}
                  variant="destructive"
                >
                  <MinusIcon className="mr-2 h-4 w-4" /> Remove Work Experience
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() =>
                appendWork({
                  name: "",
                  location: "",
                  position: "",
                  startDate: "",
                  endDate: "",
                  summary: "",
                  highlights: [],
                })
              }
            >
              <PlusIcon className="mr-2 h-4 w-4" /> Add Work Experience
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="education">
          <AccordionTrigger>Education</AccordionTrigger>
          <AccordionContent>
            {educationFields.map((field, index) => (
              <div key={field.id} className="flex flex-col space-y-2 mb-4">
                <Input
                  {...register(`education.${index}.institution`)}
                  placeholder="Institution"
                />
                {errors.education?.[index]?.institution && (
                  <p className="text-red-500">
                    {errors.education[index]?.institution?.message}
                  </p>
                )}
                <Input
                  {...register(`education.${index}.area`)}
                  placeholder="Area of Study"
                />
                {errors.education?.[index]?.area && (
                  <p className="text-red-500">
                    {errors.education[index]?.area?.message}
                  </p>
                )}
                <Input
                  {...register(`education.${index}.studyType`)}
                  placeholder="Study Type"
                />
                {errors.education?.[index]?.studyType && (
                  <p className="text-red-500">
                    {errors.education[index]?.studyType?.message}
                  </p>
                )}
                <Input
                  {...register(`education.${index}.startDate`)}
                  placeholder="Start Date"
                  type="date"
                />
                {errors.education?.[index]?.startDate && (
                  <p className="text-red-500">
                    {errors.education[index]?.startDate?.message}
                  </p>
                )}
                <Input
                  {...register(`education.${index}.endDate`)}
                  placeholder="End Date"
                  type="date"
                />
                {errors.education?.[index]?.endDate && (
                  <p className="text-red-500">
                    {errors.education[index]?.endDate?.message}
                  </p>
                )}
                <Input
                  {...register(`education.${index}.score`)}
                  placeholder="Score"
                />
                {errors.education?.[index]?.score && (
                  <p className="text-red-500">
                    {errors.education[index]?.score?.message}
                  </p>
                )}
                <Controller
                  name={`education.${index}.courses`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Courses (comma-separated)"
                      onChange={(e) =>
                        field.onChange(e.target.value.split(","))
                      }
                    />
                  )}
                />
                <Button
                  type="button"
                  onClick={() => removeEducation(index)}
                  variant="destructive"
                >
                  <MinusIcon className="mr-2 h-4 w-4" /> Remove Education
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() =>
                appendEducation({
                  institution: "",
                  area: "",
                  studyType: "",
                  startDate: "",
                  endDate: "",
                  score: "",
                  courses: [],
                })
              }
            >
              <PlusIcon className="mr-2 h-4 w-4" /> Add Education
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="certificates">
          <AccordionTrigger>Certificates</AccordionTrigger>
          <AccordionContent>
            {certificateFields.map((field, index) => (
              <div key={field.id} className="flex flex-col space-y-2 mb-4">
                <Input
                  {...register(`certificates.${index}.name`)}
                  placeholder="Certificate Name"
                />
                {errors.certificates?.[index]?.name && (
                  <p className="text-red-500">
                    {errors.certificates[index]?.name?.message}
                  </p>
                )}
                <Input
                  {...register(`certificates.${index}.date`)}
                  placeholder="Date"
                  type="date"
                />
                {errors.certificates?.[index]?.date && (
                  <p className="text-red-500">
                    {errors.certificates[index]?.date?.message}
                  </p>
                )}
                <Input
                  {...register(`certificates.${index}.issuer`)}
                  placeholder="Issuer"
                />
                {errors.certificates?.[index]?.issuer && (
                  <p className="text-red-500">
                    {errors.certificates[index]?.issuer?.message}
                  </p>
                )}
                <Button
                  type="button"
                  onClick={() => removeCertificate(index)}
                  variant="destructive"
                >
                  <MinusIcon className="mr-2 h-4 w-4" /> Remove Certificate
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() =>
                appendCertificate({ name: "", date: "", issuer: "" })
              }
            >
              <PlusIcon className="mr-2 h-4 w-4" /> Add Certificate
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="projects">
          <AccordionTrigger>Projects</AccordionTrigger>
          <AccordionContent>
            {projectFields.map((field, index) => (
              <div key={field.id} className="flex flex-col space-y-2 mb-4">
                <Input
                  {...register(`projects.${index}.name`)}
                  placeholder="Project Name"
                />
                {errors.projects?.[index]?.name && (
                  <p className="text-red-500">
                    {errors.projects[index]?.name?.message}
                  </p>
                )}
                <Input
                  {...register(`projects.${index}.url`)}
                  placeholder="Project URL"
                />
                {errors.projects?.[index]?.url && (
                  <p className="text-red-500">
                    {errors.projects[index]?.url?.message}
                  </p>
                )}
                <Input
                  {...register(`projects.${index}.startDate`)}
                  placeholder="Start Date"
                  type="date"
                />
                {errors.projects?.[index]?.startDate && (
                  <p className="text-red-500">
                    {errors.projects[index]?.startDate?.message}
                  </p>
                )}
                <Input
                  {...register(`projects.${index}.endDate`)}
                  placeholder="End Date"
                  type="date"
                />
                <Textarea
                  {...register(`projects.${index}.description`)}
                  placeholder="Description"
                />
                {errors.projects?.[index]?.description && (
                  <p className="text-red-500">
                    {errors.projects[index]?.description?.message}
                  </p>
                )}
                <Controller
                  name={`projects.${index}.highlights`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Highlights (comma-separated)"
                      onChange={(e) =>
                        field.onChange(e.target.value.split(","))
                      }
                    />
                  )}
                />
                <Button
                  type="button"
                  onClick={() => removeProject(index)}
                  variant="destructive"
                >
                  <MinusIcon className="mr-2 h-4 w-4" /> Remove Project
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() =>
                appendProject({
                  name: "",
                  url: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                  highlights: [],
                })
              }
            >
              <PlusIcon className="mr-2 h-4 w-4" /> Add Project
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="volunteer">
          <AccordionTrigger>Volunteer Experience</AccordionTrigger>
          <AccordionContent>
            {volunteerFields.map((field, index) => (
              <div key={field.id} className="flex flex-col space-y-2 mb-4">
                <Input
                  {...register(`volunteer.${index}.organization`)}
                  placeholder="Organization"
                />
                {errors.volunteer?.[index]?.organization && (
                  <p className="text-red-500">
                    {errors.volunteer[index]?.organization?.message}
                  </p>
                )}
                <Input
                  {...register(`volunteer.${index}.position`)}
                  placeholder="Position"
                />
                {errors.volunteer?.[index]?.position && (
                  <p className="text-red-500">
                    {errors.volunteer[index]?.position?.message}
                  </p>
                )}
                <Input
                  {...register(`volunteer.${index}.startDate`)}
                  placeholder="Start Date"
                  type="date"
                />
                {errors.volunteer?.[index]?.startDate && (
                  <p className="text-red-500">
                    {errors.volunteer[index]?.startDate?.message}
                  </p>
                )}
                <Textarea
                  {...register(`volunteer.${index}.summary`)}
                  placeholder="Summary"
                />
                {errors.volunteer?.[index]?.summary && (
                  <p className="text-red-500">
                    {errors.volunteer[index]?.summary?.message}
                  </p>
                )}
                <Controller
                  name={`volunteer.${index}.highlights`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Highlights (comma-separated)"
                      onChange={(e) =>
                        field.onChange(e.target.value.split(","))
                      }
                    />
                  )}
                />
                <Button
                  type="button"
                  onClick={() => removeVolunteer(index)}
                  variant="destructive"
                >
                  <MinusIcon className="mr-2 h-4 w-4" /> Remove Volunteer
                  Experience
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() =>
                appendVolunteer({
                  organization: "",
                  position: "",
                  startDate: "",
                  summary: "",
                  highlights: [],
                })
              }
            >
              <PlusIcon className="mr-2 h-4 w-4" /> Add Volunteer Experience
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="interests">
          <AccordionTrigger>Interests</AccordionTrigger>
          <AccordionContent>
            {interestFields.map((field, index) => (
              <div key={field.id} className="flex flex-col space-y-2 mb-4">
                <Input
                  {...register(`interests.${index}.name`)}
                  placeholder="Interest Name"
                />
                {errors.interests?.[index]?.name && (
                  <p className="text-red-500">
                    {errors.interests[index]?.name?.message}
                  </p>
                )}
                <Controller
                  name={`interests.${index}.keywords`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Keywords (comma-separated)"
                      onChange={(e) =>
                        field.onChange(e.target.value.split(","))
                      }
                    />
                  )}
                />
                <Button
                  type="button"
                  onClick={() => removeInterest(index)}
                  variant="destructive"
                >
                  <MinusIcon className="mr-2 h-4 w-4" /> Remove Interest
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => appendInterest({ name: "", keywords: [] })}
            >
              <PlusIcon className="mr-2 h-4 w-4" /> Add Interest
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button type="submit" disabled={isSaving}>
        {isSaving ? <ClipLoader size={20} color="#ffffff" /> : "Save Resume"}
      </Button>
    </form>
  );
}
