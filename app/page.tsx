'use client';

import { useState } from 'react';
import { UserData } from './types/signature';
import { signatureTemplates } from './lib/templates';
import UserInputForm from './components/UserInputForm';
import TemplatePicker from './components/TemplatePicker';
import SignaturePreviewWithIcons from './components/SignaturePreviewWithIcons';
import ExportButtons from './components/ExportButtons';
import { Signature } from 'lucide-react';

export default function Home() {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    position: '',
    website: '',
    socialLinks: {}
  });

  const [selectedTemplate, setSelectedTemplate] = useState(signatureTemplates[0]);

  const handleExport = (format: 'html' | 'text') => {
    console.log(`Exported ${format} signature`);
    // Additional export logic can be added here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-gray-700/50 p-2 rounded-lg">
              <Signature size={24} className="text-gray-300" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Sygnea</h1>
              <p className="text-gray-400 text-sm">Modern Email Signature Generator</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column - User Inputs */}
          <div className="space-y-6">
            <UserInputForm
              userData={userData}
              onChange={setUserData}
            />
          </div>

          {/* Right Column - Preview and Templates */}
          <div className="space-y-6">
            <SignaturePreviewWithIcons
              userData={userData}
              template={selectedTemplate}
            />

            <TemplatePicker
              templates={signatureTemplates}
              selectedTemplate={selectedTemplate}
              onTemplateChange={setSelectedTemplate}
            />
          </div>
        </div>

        {/* Export Section */}
        <div className="mt-8 lg:mt-12">
          <ExportButtons
            userData={userData}
            template={selectedTemplate}
            onExport={handleExport}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-400 text-sm">
            <p>Built with Next.js, React, and TailwindCSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
