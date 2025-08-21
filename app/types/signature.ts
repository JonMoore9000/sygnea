export interface UserData {
  name: string;
  position: string;
  website: string;
  socialLinks: SocialLinks;
}

export interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
  facebook?: string;
}

export interface SignatureTemplate {
  id: string;
  name: string;
  description: string;
  preview: string; // Base64 image or component preview
  render: (data: UserData) => string; // Returns HTML string
}

export interface ExportOptions {
  format: 'html' | 'text';
  includeImages: boolean;
}

export interface SignaturePreviewProps {
  userData: UserData;
  template: SignatureTemplate;
  className?: string;
}

export interface UserInputProps {
  userData: UserData;
  onChange: (data: UserData) => void;
  className?: string;
}

export interface TemplatePickerProps {
  templates: SignatureTemplate[];
  selectedTemplate: SignatureTemplate;
  onTemplateChange: (template: SignatureTemplate) => void;
  userData: UserData;
  className?: string;
}

export interface ExportButtonsProps {
  userData: UserData;
  template: SignatureTemplate;
  onExport: (format: 'html' | 'text') => void;
  className?: string;
}

// Default user data for initial state and template previews
export const defaultUserData: UserData = {
  name: "Alex Johnson",
  position: "Senior Product Designer",
  website: "alexjohnson.design",
  socialLinks: {
    twitter: "alexjohnson",
    linkedin: "alexjohnson",
    instagram: "alexjohnson.design"
  }
};

// Social platform configurations
export const socialPlatforms = {
  twitter: {
    name: "Twitter",
    baseUrl: "https://twitter.com/",
    color: "#1DA1F2",
    icon: "Twitter"
  },
  linkedin: {
    name: "LinkedIn", 
    baseUrl: "https://linkedin.com/in/",
    color: "#0077B5",
    icon: "Linkedin"
  },
  instagram: {
    name: "Instagram",
    baseUrl: "https://instagram.com/",
    color: "#E4405F", 
    icon: "Instagram"
  },
  github: {
    name: "GitHub",
    baseUrl: "https://github.com/",
    color: "#333",
    icon: "Github"
  },
  facebook: {
    name: "Facebook",
    baseUrl: "https://facebook.com/",
    color: "#1877F2",
    icon: "Facebook"
  }
} as const;

export type SocialPlatform = keyof typeof socialPlatforms;
