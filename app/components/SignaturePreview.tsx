'use client';

import { SignaturePreviewProps, defaultUserData } from '../types/signature';
import { clsx } from 'clsx';
import { Eye, Mail } from 'lucide-react';

export default function SignaturePreview({ 
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
              Thanks for your email. I&apos;ll get back to you soon!
            </p>
            <p className="mb-6">Best regards,</p>
          </div>
          
          {/* Signature preview */}
          <div className="border-t border-gray-200 pt-4">
            <div 
              dangerouslySetInnerHTML={{ 
                __html: template.render(displayData) 
              }} 
            />
          </div>
        </div>
      </div>
      
      {/* Preview notes */}
      <div className="text-xs text-gray-400 space-y-1">
        <p>• Preview shows how your signature will appear in email clients</p>
        <p>• Some email clients may render styles slightly differently</p>
        {!userData.name && (
          <p className="text-yellow-400">• Using sample data - start typing to see your signature</p>
        )}
      </div>
    </div>
  );
}
