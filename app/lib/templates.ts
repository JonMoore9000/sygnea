import { SignatureTemplate, UserData, socialPlatforms } from '../types/signature';

// Helper function to get better Unicode symbols for email compatibility
const getPlatformIcon = (platform: string) => {
  const icons = {
    twitter: '𝕏',     // Modern X symbol
    linkedin: '𝗶𝗻',    // Bold "in"
    instagram: '◉',    // Circle (camera-like)
    github: '⚡',     // Lightning bolt
    facebook: '𝗳'     // Bold "f"
  };
  return icons[platform as keyof typeof icons] || platform.charAt(0).toUpperCase();
};

// Helper function to generate social links HTML with actual icons
const generateSocialLinks = (socialLinks: UserData['socialLinks'], style: 'minimal' | 'professional' | 'social' | 'compact') => {
  const links = Object.entries(socialLinks)
    .filter(([, handle]) => handle && handle.trim())
    .map(([platform, handle]) => {
      const config = socialPlatforms[platform as keyof typeof socialPlatforms];
      if (!config) return '';

      const url = `${config.baseUrl}${handle}`;
      const symbol = getPlatformIcon(platform);

      switch (style) {
        case 'minimal':
          return `<a href="${url}" style="color: #666; text-decoration: none !important; margin-right: 12px; font-size: 12px; display: inline-block; vertical-align: middle;">
            <span style="display: inline-block; width: 18px; height: 18px; background-color: ${config.color}; margin-right: 6px; border-radius: 3px; vertical-align: middle; text-align: center; line-height: 18px; color: white; font-size: 10px; font-weight: bold;">${symbol}</span><span style="vertical-align: middle;">${config.name}</span>
          </a>`;
        case 'professional':
          return `<a href="${url}" style="display: inline-block; margin-right: 8px; padding: 6px 10px; background: ${config.color}; color: white; text-decoration: none !important; border-radius: 4px; font-size: 11px; vertical-align: middle;">
            <span style="display: inline-block; width: 16px; height: 16px; background-color: rgba(255,255,255,0.2); margin-right: 6px; border-radius: 2px; vertical-align: middle; text-align: center; line-height: 16px; color: white; font-size: 9px; font-weight: bold;">${symbol}</span><span style="vertical-align: middle;">${config.name}</span>
          </a>`;
        case 'social':
          return `<a href="${url}" style="display: inline-block; margin-right: 10px; background: ${config.color}; border-radius: 50%; text-align: center; text-decoration: none !important; width: 32px; height: 32px; line-height: 32px; color: white; font-size: 14px; font-weight: bold;">
            ${symbol}
          </a>`;
        case 'compact':
          return `<a href="${url}" style="color: ${config.color}; text-decoration: none !important; margin-right: 8px; font-size: 11px; display: inline-block; vertical-align: middle;">
            <span style="display: inline-block; width: 16px; height: 16px; background-color: ${config.color}; margin-right: 4px; border-radius: 2px; vertical-align: middle; text-align: center; line-height: 16px; color: white; font-size: 9px; font-weight: bold;">${symbol}</span><span style="vertical-align: middle;">${config.name}</span>
          </a>`;
        default:
          return '';
      }
    });

  return links.join('');
};

// Template 1: Minimal
const minimalTemplate: SignatureTemplate = {
  id: 'minimal',
  name: 'Minimal',
  description: 'Clean and simple design',
  preview: 'minimal-preview',
  render: (data: UserData) => `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #333; line-height: 1.4;">
      <div style="border-left: 3px solid #6b7280; padding-left: 16px;">
        <div style="font-size: 16px; font-weight: 600; margin-bottom: 4px;">${data.name}</div>
        <div style="font-size: 13px; color: #666; margin-bottom: 8px;">${data.position}</div>
        ${data.website ? `<div style="font-size: 12px; margin-bottom: 8px;"><a href="https://${data.website}" style="color: #6b7280; text-decoration: none !important;">${data.website}</a></div>` : ''}
        <div style="font-size: 12px;">
          ${generateSocialLinks(data.socialLinks, 'minimal')}
        </div>
      </div>
    </div>
  `
};

// Template 2: Professional
const professionalTemplate: SignatureTemplate = {
  id: 'professional',
  name: 'Professional',
  description: 'Corporate and polished look',
  preview: 'professional-preview',
  render: (data: UserData) => `
    <table style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; border-collapse: collapse;">
      <tr>
        <td style="padding: 16px; background: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef;">
          <div style="font-size: 18px; font-weight: 700; color: #212529; margin-bottom: 4px;">${data.name}</div>
          <div style="font-size: 14px; color: #6c757d; margin-bottom: 12px;">${data.position}</div>
          ${data.website ? `<div style="font-size: 13px; margin-bottom: 12px;"><a href="https://${data.website}" style="color: #6b7280; text-decoration: none !important; font-weight: 500;">${data.website}</a></div>` : ''}
          <div style="margin-top: 8px;">
            ${generateSocialLinks(data.socialLinks, 'professional')}
          </div>
        </td>
      </tr>
    </table>
  `
};

// Template 3: Creative
const creativeTemplate: SignatureTemplate = {
  id: 'creative',
  name: 'Creative',
  description: 'Artistic design with accent colors',
  preview: 'creative-preview',
  render: (data: UserData) => `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #333; line-height: 1.4; position: relative;">
      <div style="background: linear-gradient(90deg, #6b7280 0%, #9ca3af 100%); height: 3px; width: 60px; margin-bottom: 12px; border-radius: 2px;"></div>
      <div style="font-size: 17px; font-weight: 700; color: #111827; margin-bottom: 4px;">${data.name}</div>
      <div style="font-size: 13px; color: #6b7280; margin-bottom: 12px; font-weight: 500;">${data.position}</div>
      ${data.website ? `<div style="font-size: 12px; margin-bottom: 12px;"><a href="https://${data.website}" style="color: #4b5563; text-decoration: none !important; font-weight: 500;">${data.website}</a></div>` : ''}
      <div style="margin-top: 8px;">
        ${generateSocialLinks(data.socialLinks, 'minimal')}
      </div>
    </div>
  `
};

// Template 4: Compact
const compactTemplate: SignatureTemplate = {
  id: 'compact',
  name: 'Compact',
  description: 'Space-efficient design',
  preview: 'compact-preview',
  render: (data: UserData) => `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; line-height: 1.3; color: #333;">
      <span style="font-weight: 600; font-size: 14px;">${data.name}</span>
      <span style="color: #666; margin: 0 8px;">•</span>
      <span style="color: #666;">${data.position}</span>
      ${data.website ? `<span style="color: #666; margin: 0 8px;">•</span><a href="https://${data.website}" style="color: #6b7280; text-decoration: none !important;">${data.website}</a>` : ''}
      ${Object.keys(data.socialLinks).length > 0 ? `<div style="margin-top: 6px;">${generateSocialLinks(data.socialLinks, 'compact')}</div>` : ''}
    </div>
  `
};

// Template 5: Modern Card
const modernTemplate: SignatureTemplate = {
  id: 'modern',
  name: 'Modern',
  description: 'Clean card design with subtle shadow',
  preview: 'modern-preview',
  render: (data: UserData) => `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); max-width: 400px;">
      <div style="font-size: 18px; font-weight: 700; color: #111827; margin-bottom: 4px;">${data.name}</div>
      <div style="font-size: 14px; color: #6b7280; margin-bottom: 16px;">${data.position}</div>
      ${data.website ? `<div style="font-size: 13px; margin-bottom: 16px;"><a href="https://${data.website}" style="color: #4b5563; text-decoration: none !important; font-weight: 500;">${data.website}</a></div>` : ''}
      <div style="border-top: 1px solid #f3f4f6; padding-top: 12px;">
        ${generateSocialLinks(data.socialLinks, 'minimal')}
      </div>
    </div>
  `
};

// Template 6: Executive
const executiveTemplate: SignatureTemplate = {
  id: 'executive',
  name: 'Executive',
  description: 'Sophisticated design for leadership',
  preview: 'executive-preview',
  render: (data: UserData) => `
    <div style="font-family: 'Georgia', 'Times New Roman', serif; color: #1f2937; line-height: 1.5;">
      <div style="border-left: 4px solid #374151; padding-left: 20px;">
        <div style="font-size: 20px; font-weight: 400; color: #111827; margin-bottom: 6px; letter-spacing: 0.5px;">${data.name}</div>
        <div style="font-size: 14px; color: #6b7280; margin-bottom: 12px; font-style: italic;">${data.position}</div>
        ${data.website ? `<div style="font-size: 13px; margin-bottom: 12px;"><a href="https://${data.website}" style="color: #374151; text-decoration: none !important; font-weight: 500;">${data.website}</a></div>` : ''}
        <div style="font-size: 12px;">
          ${generateSocialLinks(data.socialLinks, 'compact')}
        </div>
      </div>
    </div>
  `
};

export const signatureTemplates: SignatureTemplate[] = [
  minimalTemplate,
  professionalTemplate,
  creativeTemplate,
  compactTemplate,
  modernTemplate,
  executiveTemplate
];

export const getTemplateById = (id: string): SignatureTemplate | undefined => {
  return signatureTemplates.find(template => template.id === id);
};
