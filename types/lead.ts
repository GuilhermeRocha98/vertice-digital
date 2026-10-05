export interface LeadPayload {
  name: string;
  phone: string;
  email: string;
  company: string;
  businessType: string;
  websiteType: string;
  message?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
  landingPage?: string;
  referrer?: string;
  createdAt: string;
}

export type LeadSubmissionStatus = "idle" | "loading" | "success" | "error";
