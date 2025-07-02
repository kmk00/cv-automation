export type CV = {
  name: string;
  surname: string;
  phone_number: string;
  email: string;
  linkedin: string;
  github: string;
  portfolio: string;
  work_profile: string;
  work_experience: {
    position_name: string;
    company_name: string;
    work_start: string;
    work_end: string;
    responsibilities: string[];
  }[];
  education: {
    subject: string;
    date_start: string;
    date_end?: string;
    school_name: string;
  }[];
  projects: {
    name: string;
    description: string;
    technologies: string[] | string;
  }[];
  soft_skills: string[];
  technical_skills: string[];
  languages: {
    name: string;
    level: string;
  }[];
  interests: string[];
};

export type CVApiResponse = {
  data: CV;
};
