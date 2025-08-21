'use client';

import { SignaturePreviewProps, defaultUserData, socialPlatforms } from '../types/signature';
import { clsx } from 'clsx';
import { Eye, Mail } from 'lucide-react';

// FontAwesome icon mapping
const getFontAwesomeClass = (platform: string) => {
  const icons = {
    twitter: 'fab fa-x-twitter',
    linkedin: 'fab fa-linkedin-in', 
    instagram: 'fab fa-instagram',
    github: 'fab fa-github',
    facebook: 'fab fa-facebook-f'
  };
  return icons[platform as keyof typeof icons] || 'fas fa-link';
};

// Generate preview HTML with FontAwesome icons (for preview only)
const generatePreviewHTML = (userData: any, template: any) => {
  const socialLinks = Object.entries(userData.socialLinks)
    .filter(([_, handle]) => handle && handle.trim())
    .map(([platform, handle]) => {
      const config = socialPlatforms[platform as keyof typeof socialPlatforms];
      if (!config) return '';
      
      const url = `${config.baseUrl}${handle}`;
      const faClass = getFontAwesomeClass(platform);
      
      // Generate FontAwesome version for preview
      switch (template.id) {
        case 'minimal':
          return `<a href="${url}" style="color: #666; text-decoration: none !important; text-decoration-line: none !important; text-decoration-style: none !important; text-decoration-color: transparent !important; margin-right: 12px; font-size: 12px; display: inline-block; vertical-align: middle; border-bottom: none !important;">
            <span style="display: inline-block; width: 18px; height: 18px; background-color: ${config.color}; margin-right: 6px; border-radius: 3px; vertical-align: middle; text-align: center; line-height: 18px; color: white; font-size: 10px;">
              <i class="${faClass}"></i>
            </span><span style="vertical-align: middle;">${config.name}</span>
          </a>`;
        case 'professional':
          return `<a href="${url}" style="display: inline-block; margin-right: 8px; padding: 6px 10px; background: ${config.color}; color: white; text-decoration: none !important; text-decoration-line: none !important; text-decoration-style: none !important; text-decoration-color: transparent !important; border-radius: 4px; font-size: 11px; vertical-align: middle; border-bottom: none !important;">
            <i class="${faClass}" style="margin-right: 6px;"></i><span style="vertical-align: middle;">${config.name}</span>
          </a>`;
        case 'creative':
          return `<a href="${url}" style="color: #666; text-decoration: none !important; text-decoration-line: none !important; text-decoration-style: none !important; text-decoration-color: transparent !important; margin-right: 12px; font-size: 12px; display: inline-block; vertical-align: middle; border-bottom: none !important;">
            <span style="display: inline-block; width: 18px; height: 18px; background-color: ${config.color}; margin-right: 6px; border-radius: 3px; vertical-align: middle; text-align: center; line-height: 18px; color: white; font-size: 10px;">
              <i class="${faClass}"></i>
            </span><span style="vertical-align: middle;">${config.name}</span>
          </a>`;
        case 'compact':
          return `<a href="${url}" style="color: ${config.color}; text-decoration: none !important; text-decoration-line: none !important; text-decoration-style: none !important; text-decoration-color: transparent !important; margin-right: 8px; font-size: 11px; display: inline-block; vertical-align: middle; border-bottom: none !important;">
            <span style="display: inline-block; width: 16px; height: 16px; background-color: ${config.color}; margin-right: 4px; border-radius: 2px; vertical-align: middle; text-align: center; line-height: 16px; color: white; font-size: 9px;">
              <i class="${faClass}"></i>
            </span><span style="vertical-align: middle;">${config.name}</span>
          </a>`;
        default:
          return '';
      }
    })
    .join('');

  // Generate the full signature HTML with FontAwesome icons
  switch (template.id) {
    case 'minimal':
      return `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #333; line-height: 1.4;">
          <div style="border-left: 3px solid #6b7280; padding-left: 16px;">
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 4px;">${userData.name}</div>
            <div style="font-size: 13px; color: #666; margin-bottom: 8px;">${userData.position}</div>
            ${userData.website ? `<div style="font-size: 12px; margin-bottom: 8px;"><a href="https://${userData.website}" style="color: #6b7280; text-decoration: none !important; text-decoration-line: none !important; text-decoration-style: none !important; text-decoration-color: transparent !important; border-bottom: none !important;">${userData.website}</a></div>` : ''}
            <div style="font-size: 12px;">
              ${socialLinks}
            </div>
          </div>
        </div>
      `;
    case 'professional':
      return `
        <table style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; border-collapse: collapse;">
          <tr>
            <td style="padding: 16px; background: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef;">
              <div style="font-size: 18px; font-weight: 700; color: #212529; margin-bottom: 4px;">${userData.name}</div>
              <div style="font-size: 14px; color: #6c757d; margin-bottom: 12px;">${userData.position}</div>
              ${userData.website ? `<div style="font-size: 13px; margin-bottom: 12px;"><a href="https://${userData.website}" style="color: #6b7280; text-decoration: none !important; text-decoration-line: none !important; text-decoration-style: none !important; text-decoration-color: transparent !important; border-bottom: none !important; font-weight: 500;">${userData.website}</a></div>` : ''}
              <div style="margin-top: 8px;">
                ${socialLinks}
              </div>
            </td>
          </tr>
        </table>
      `;
    case 'creative':
      return `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #333; line-height: 1.4; position: relative;">
          <div style="background: linear-gradient(90deg, #6b7280 0%, #9ca3af 100%); height: 3px; width: 60px; margin-bottom: 12px; border-radius: 2px;"></div>
          <div style="font-size: 17px; font-weight: 700; color: #111827; margin-bottom: 4px;">${userData.name}</div>
          <div style="font-size: 13px; color: #6b7280; margin-bottom: 12px; font-weight: 500;">${userData.position}</div>
          ${userData.website ? `<div style="font-size: 12px; margin-bottom: 12px;"><a href="https://${userData.website}" style="color: #4b5563; text-decoration: none !important; text-decoration-line: none !important; text-decoration-style: none !important; text-decoration-color: transparent !important; border-bottom: none !important; font-weight: 500;">${userData.website}</a></div>` : ''}
          <div style="margin-top: 8px;">
            ${socialLinks}
          </div>
        </div>
      `;
    case 'compact':
      return `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; line-height: 1.3; color: #333;">
          <span style="font-weight: 600; font-size: 14px;">${userData.name}</span>
          <span style="color: #666; margin: 0 8px;">•</span>
          <span style="color: #666;">${userData.position}</span>
          ${userData.website ? `<span style="color: #666; margin: 0 8px;">•</span><a href="https://${userData.website}" style="color: #6b7280; text-decoration: none !important; text-decoration-line: none !important; text-decoration-style: none !important; text-decoration-color: transparent !important; border-bottom: none !important;">${userData.website}</a>` : ''}
          ${socialLinks ? `<div style="margin-top: 6px;">${socialLinks}</div>` : ''}
        </div>
      `;
    case 'modern':
      return `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); max-width: 400px;">
          <div style="font-size: 18px; font-weight: 700; color: #111827; margin-bottom: 4px;">${userData.name}</div>
          <div style="font-size: 14px; color: #6b7280; margin-bottom: 16px;">${userData.position}</div>
          ${userData.website ? `<div style="font-size: 13px; margin-bottom: 16px;"><a href="https://${userData.website}" style="color: #4b5563; text-decoration: none !important; text-decoration-line: none !important; text-decoration-style: none !important; text-decoration-color: transparent !important; border-bottom: none !important; font-weight: 500;">${userData.website}</a></div>` : ''}
          <div style="border-top: 1px solid #f3f4f6; padding-top: 12px;">
            ${socialLinks}
          </div>
        </div>
      `;
    case 'executive':
      return `
        <div style="font-family: 'Georgia', 'Times New Roman', serif; color: #1f2937; line-height: 1.5;">
          <div style="border-left: 4px solid #374151; padding-left: 20px;">
            <div style="font-size: 20px; font-weight: 400; color: #111827; margin-bottom: 6px; letter-spacing: 0.5px;">${userData.name}</div>
            <div style="font-size: 14px; color: #6b7280; margin-bottom: 12px; font-style: italic;">${userData.position}</div>
            ${userData.website ? `<div style="font-size: 13px; margin-bottom: 12px;"><a href="https://${userData.website}" style="color: #374151; text-decoration: none !important; text-decoration-line: none !important; text-decoration-style: none !important; text-decoration-color: transparent !important; border-bottom: none !important; font-weight: 500;">${userData.website}</a></div>` : ''}
            <div style="font-size: 12px;">
              ${socialLinks}
            </div>
          </div>
        </div>
      `;
    default:
      return template.render(userData);
  }
};

export default function SignaturePreviewWithIcons({ 
  userData, 
  template, 
  className 
}: SignaturePreviewProps) {
  // Use default data if user hasn't entered anything yet
  const displayData = userData.name ? userData : defaultUserData;
  
  return (
    <div className={clsx("space-y-4", className)}>
      <div className="flex items-center gap-2 text-white">
        <Eye size={20} />
        <h2 className="text-lg font-semibold">Live Preview</h2>
        <span className="px-2 py-1 bg-gray-600/50 rounded text-xs text-gray-300">{template.name}</span>
      </div>
      
      {/* Email client simulation */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        {/* Mock email header */}
        <div className="bg-white/10 px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Mail size={16} />
            <span>Email Preview</span>
          </div>
        </div>
        
        {/* Mock email content */}
        <div className="p-6 bg-white">
          <div className="text-gray-800 mb-6">
            <p className="mb-4">Hi there,</p>
            <p className="mb-4">
              Thanks for your email. I'll get back to you soon!
            </p>
            <p className="mb-6">Best regards,</p>
          </div>
          
          {/* Signature preview with FontAwesome icons */}
          <div className="border-t border-gray-200 pt-4">
            <div 
              dangerouslySetInnerHTML={{ 
                __html: generatePreviewHTML(displayData, template) 
              }} 
            />
          </div>
        </div>
      </div>
      
      {/* Preview notes */}
      <div className="text-xs text-gray-400 space-y-1">
        <p>• Preview shows how your signature will appear in email clients</p>
        <p>• Icons are optimized for maximum email client compatibility</p>
        {!userData.name && (
          <p className="text-yellow-400">• Using sample data - start typing to see your signature</p>
        )}
      </div>
    </div>
  );
}
