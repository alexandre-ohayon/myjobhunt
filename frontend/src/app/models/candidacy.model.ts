export interface Candidacy {
  id?: number;
  company: string;
  jobName: string;
  interviewStatus: string[];  // <- Changement ici pour un tableau
  jobDescriptionLink?: string;
  recruiterName?: string;
  stack?: string;
  interviewDate?: string;
  notes?: string;
}
  