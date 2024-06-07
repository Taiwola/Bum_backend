// src/uploadthing.ts
import { createUploadthing, type FileRouter, UTFiles } from "uploadthing/express";

const f = createUploadthing();

export const uploadRouter = {
  agencyLogo: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
  .onUploadError((error) => console.log(error))
  .onUploadComplete((data) => {
      console.log("Upload completed:", data.file.url);
      return { url: data.file.url };
    }),
  avatar: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .onUploadComplete(async (data) => {
      console.log("Upload completed:", data.file.url);
    }),
  subaccountLogo: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .onUploadComplete((data) => {
      console.log("Upload completed:", data);
    }),
  media: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .onUploadComplete((data) => {
      console.log("Upload completed:", data);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
