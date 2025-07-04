export const validationSchema = {
  name: {
    required: "Name is required",
    validate: {
      notEmpty: (value: string) =>
        value?.trim().length > 0 ||
        "Name cannot be empty or contain only spaces",
      maxLength: (value: string) =>
        value?.length <= 50 || "Name cannot be longer than 50 characters",
      minLength: (value: string) =>
        value?.length >= 2 || "Name must be at least 2 characters",
    },
  },
  surname: {
    required: "Surname is required",
    validate: {
      notEmpty: (value: string) =>
        value?.trim().length > 0 ||
        "Surname cannot be empty or contain only spaces",
      maxLength: (value: string) =>
        value?.length <= 50 || "Surname cannot be longer than 50 characters",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid email address",
    },
    validate: {
      notEmpty: (value: string) =>
        value?.trim().length > 0 ||
        "Email cannot be empty or contain only spaces",
      maxLength: (value: string) =>
        value?.length <= 50 || "Email cannot be longer than 50 characters",
      minLength: (value: string) =>
        value?.length >= 5 || "Email must be at least 5 characters",
    },
  },
  phone_number: {
    required: "Phone number is required",
    pattern: {
      value: /^\+?[1-9]\d{1,14}$/,
      message: "Invalid phone number",
    },
    validate: {
      notEmpty: (value: string) =>
        value?.trim().length > 0 ||
        "Phone number cannot be empty or contain only spaces",
    },
  },
  linkedin: {
    required: "LinkedIn profile is required",
    pattern: {
      value: /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/,
      message: "Invalid LinkedIn profile URL",
    },
    validate: {
      notEmpty: (value: string) =>
        value?.trim().length > 0 ||
        "LinkedIn profile cannot be empty or contain only spaces",
      minLength: (value: string) =>
        value?.trim().length >= 10 ||
        "LinkedIn profile must be at least 10 characters",
      maxLength: (value: string) =>
        value?.trim().length <= 100 ||
        "LinkedIn profile cannot be longer than 100 characters",
    },
  },
  github: {
    required: "GitHub profile is required",
    pattern: {
      value: /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/,
      message: "Invalid GitHub profile URL",
    },
    validate: {
      notEmpty: (value: string) =>
        value?.trim().length > 0 ||
        "GitHub profile cannot be empty or contain only spaces",
      minLength: (value: string) =>
        value?.trim().length >= 10 ||
        "GitHub profile must be at least 10 characters",
      maxLength: (value: string) =>
        value?.trim().length <= 100 ||
        "GitHub profile cannot be longer than 100 characters",
    },
  },
  portfolio: {
    required: "Portfolio website is required",
    validate: {
      notEmpty: (value: string) =>
        value?.trim().length > 0 ||
        "Portfolio website cannot be empty or contain only spaces",
      minLength: (value: string) =>
        value?.trim().length >= 10 ||
        "Portfolio website must be at least 10 characters",
      maxLength: (value: string) =>
        value?.trim().length <= 100 ||
        "Portfolio website cannot be longer than 100 characters",
    },
  },
  work_profile: {
    required: "Work profile is required",
    validate: {
      notEmpty: (value: string) =>
        value?.trim().length > 0 ||
        "Work profile cannot be empty or contain only spaces",
      minLength: (value: string) =>
        value?.trim().length >= 10 ||
        "Work profile must be at least 10 characters",
      maxLength: (value: string) =>
        value?.trim().length <= 1000 ||
        "Work profile cannot be longer than 1000 characters",
    },
  },
  interests: {
    required: "Interests are required",
    validate: (value: string[]) => {
      if (value.length === 0) {
        return "Enter at least one interest";
      }

      // Check if any interest has empty/whitespace-only fields
      for (let i = 0; i < value.length; i++) {
        if (!value[i]?.trim()) {
          return `Interest ${i + 1} cannot be empty or contain only spaces`;
        }
      }
    },
  },
  work_experience: {
    required: "Work experience is required",
    validate: (value: any) => {
      // TODO: Check if any work experience has empty/whitespace-only fields
    },
  },
  education: {
    required: "Education is required",
    validate: (value: any) => {
      // TODO Check if any education has empty/whitespace-only fields
    },
  },
  projects: {
    required: "Provide valid data for projects",
    validate: (value: any) => {
      // TODO: Check if any project has empty/whitespace-only fields
    },
  },
  soft_skills: {
    required: "Soft skills are required",
    validate: {
      notEmpty: (value: string) =>
        value?.trim().length > 0 ||
        "Soft skills cannot be empty or contain only spaces",
      minLength: (value: string) =>
        value?.trim().length >= 10 ||
        "Soft skills must be at least 10 characters",
    },
  },
  technical_skills: {
    required: "Technical skills are required",
    validate: {
      notEmpty: (value: string) =>
        value?.trim().length > 0 ||
        "Technical skills cannot be empty or contain only spaces",
      minLength: (value: string) =>
        value?.trim().length >= 10 ||
        "Technical skills must be at least 10 characters",
    },
  },
  languages: {
    required: "Languages are required",
    validate: {
      notEmpty: (value: string) =>
        value?.trim().length > 0 ||
        "Languages cannot be empty or contain only spaces",
    },
  },
  responsibilities: {
    required: "Responsibilities are required",
    validate: (value: any) => {
      if (!Array.isArray(value) || value.length === 0) {
        return "At least one responsibility is required";
      }

      // Check if any responsibility is empty or whitespace-only
      for (let i = 0; i < value.length; i++) {
        if (!value[i]?.trim()) {
          return `Responsibility ${
            i + 1
          } cannot be empty or contain only spaces`;
        }
      }

      return true;
    },
  },
};
