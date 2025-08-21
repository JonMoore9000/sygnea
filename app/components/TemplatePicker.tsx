'use client';

import { TemplatePickerProps } from '../types/signature';
import { clsx } from 'clsx';
import { Check } from 'lucide-react';

export default function TemplatePicker({
  templates,
  selectedTemplate,
  onTemplateChange,
  className
}: Omit<TemplatePickerProps, 'userData'>) {
  return (
    <div className={clsx("space-y-4", className)}>
      <h2 className="text-lg font-semibold text-white mb-4">
        Choose Template
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {templates.map((template) => (
          <div
            key={template.id}
            className={clsx(
              "relative cursor-pointer transition-all duration-200 rounded-xl border-2 p-4",
              selectedTemplate.id === template.id
                ? "border-gray-400 bg-gray-500/10"
                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
            )}
            onClick={() => onTemplateChange(template)}
          >
            {/* Selection indicator */}
            {selectedTemplate.id === template.id && (
              <div className="absolute top-2 right-2 z-10 bg-gray-600 rounded-full p-1">
                <Check size={12} className="text-white" />
              </div>
            )}

            {/* Template info */}
            <div className="pr-6">
              <h3 className="font-semibold text-white text-sm mb-1">{template.name}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{template.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-xs text-gray-400 mt-4">
        Templates are optimized for email clients. Click a template to see the preview above.
      </div>
    </div>
  );
}
