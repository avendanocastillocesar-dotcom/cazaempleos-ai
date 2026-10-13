export interface WorkExperience {
  role: string;
  company: string;
  period: string;
  highlights: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
}

export interface CandidateProfile {
  fullName: string;
  email: string;
  headline: string;
  yearsOfExperience: string;
  location: string;
  professionalSummary: string;
  topSkills: string[];
  softSkills: string[];
  targetJobTitles: string[];
  recommendedSearchQueries: string[];
  workHistory: WorkExperience[];
  education: EducationItem[];
  languages: string[];
  uniqueSellingPoints: string[];
}

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  platform: 'Computrabajo' | 'Indeed' | 'LinkedIn' | 'OCCMundial' | 'Glassdoor' | string;
  platformLogo?: string;
  location: string;
  modality: 'Remoto' | 'Híbrido' | 'Presencial' | string;
  estimatedSalary?: string;
  postedDate?: string;
  applyUrl: string;
  descriptionSnippet: string;
  keyRequirements: string[];
  companyPainPoints: string[];
  matchScore: number;
  matchReason: string;
}

export interface TailoredWorkHistory {
  role: string;
  company: string;
  period: string;
  bulletPoints: string[];
}

export interface TailoredResume {
  tailoredHeadline: string;
  atsMatchPercentage: number;
  strategySummary: string;
  tailoredSummary: string;
  topMatchingSkills: string[];
  targetedWorkHistory: TailoredWorkHistory[];
  education: EducationItem[];
  languages: string[];
  recommendedInterviewPoints: string[];
  markdownCV: string;
}

export interface PainPointSolution {
  painPoint: string;
  howCandidateSolvesIt: string;
  expectedImpact: string;
}

export interface SalesPitch {
  catchyHeadline: string;
  elevatorPitch: string;
  applicationMessage: string;
  inmailMessage: string;
  painPointSolutions: PainPointSolution[];
  whyMeOver100Applicants: string[];
  callToAction: string;
}
