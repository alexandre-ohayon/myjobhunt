export interface Candidacy {
  id?: number;
  company: string;
  jobTitle: string;            // Changement de 'jobName' à 'jobTitle'
  interviewStatus: string[];   // Tableau de statuts
  jobDescriptionLink?: string;
  recruiterName?: string;
  techStack?: string;          // Changement de 'stack' à 'techStack'
  interviewDate?: string;
  notes?: string;
}