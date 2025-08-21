'use client';

import { UserData, UserInputProps, socialPlatforms, SocialPlatform } from '../types/signature';
import { User, Briefcase, Globe, Twitter, Linkedin, Instagram, Github, Facebook } from 'lucide-react';
import { clsx } from 'clsx';

const iconMap = {
  Twitter,
  Linkedin, 
  Instagram,
  Github,
  Facebook
};

export default function UserInputForm({ userData, onChange, className }: UserInputProps) {
  const updateField = (field: keyof UserData, value: string) => {
    onChange({
      ...userData,
      [field]: value
    });
  };

  const updateSocialLink = (platform: SocialPlatform, value: string) => {
    onChange({
      ...userData,
      socialLinks: {
        ...userData.socialLinks,
        [platform]: value
      }
    });
  };

  return (
    <div className={clsx("space-y-6 animate-fade-in", className)}>
      <div className="glass rounded-xl p-4 sm:p-6 transition-all duration-300 hover:bg-white/10">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <User size={20} className="text-gray-400" />
          Personal Information
        </h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={userData.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 hover:bg-white/10"
            />
          </div>

          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-300 mb-2">
              Position / Title
            </label>
            <div className="relative">
              <Briefcase size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="position"
                type="text"
                value={userData.position}
                onChange={(e) => updateField('position', e.target.value)}
                placeholder="Your job title or position"
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 hover:bg-white/10"
              />
            </div>
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-2">
              Website
            </label>
            <div className="relative">
              <Globe size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="website"
                type="text"
                value={userData.website}
                onChange={(e) => updateField('website', e.target.value)}
                placeholder="yourwebsite.com"
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="glass rounded-xl p-4 sm:p-6 transition-all duration-300 hover:bg-white/10">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <div className="bg-gradient-to-r from-gray-600 to-gray-700 p-1 rounded">
            <Twitter size={16} className="text-white" />
          </div>
          Social Links
        </h2>
        <p className="text-sm text-gray-400 mb-4">
          Add your social media handles (without @ or full URLs)
        </p>
        
        <div className="space-y-4">
          {Object.entries(socialPlatforms).map(([platform, config]) => {
            const IconComponent = iconMap[config.icon as keyof typeof iconMap];
            return (
              <div key={platform}>
                <label htmlFor={platform} className="block text-sm font-medium text-gray-300 mb-2">
                  {config.name}
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3 flex items-center justify-center w-5 h-5 z-10">
                    <IconComponent
                      size={18}
                      className="text-gray-400 flex-shrink-0"
                    />
                  </div>
                  <input
                    id={platform}
                    type="text"
                    value={userData.socialLinks[platform as SocialPlatform] || ''}
                    onChange={(e) => updateSocialLink(platform as SocialPlatform, e.target.value)}
                    placeholder={`Your ${config.name} handle`}
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 hover:bg-white/10"
                  />
                  {userData.socialLinks[platform as SocialPlatform] && (
                    <div className="mt-1 text-xs text-gray-400">
                      Preview: {config.baseUrl}{userData.socialLinks[platform as SocialPlatform]}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
