'use client';

import { useState } from 'react';
import { ExportButtonsProps, defaultUserData } from '../types/signature';
import { clsx } from 'clsx';
import { Copy, Download, Check, AlertCircle } from 'lucide-react';

export default function ExportButtons({ 
  userData, 
  template, 
  onExport, 
  className 
}: ExportButtonsProps) {
  const [copyStatus, setCopyStatus] = useState<{
    html: 'idle' | 'success' | 'error';
    text: 'idle' | 'success' | 'error';
  }>({
    html: 'idle',
    text: 'idle'
  });

  // Use default data if user hasn't entered anything yet
  const displayData = userData.name ? userData : defaultUserData;

  const generatePlainText = (data: typeof displayData): string => {
    const lines = [
      data.name,
      data.position,
      data.website ? `Website: ${data.website}` : '',
    ];

    const socialLinks = Object.entries(data.socialLinks)
      .filter(([_, handle]) => handle && handle.trim())
      .map(([platform, handle]) => `${platform}: ${handle}`)
      .join(' | ');

    if (socialLinks) {
      lines.push(socialLinks);
    }

    return lines.filter(line => line).join('\n');
  };

  const copyToClipboard = async (content: string, type: 'html' | 'text') => {
    try {
      if (type === 'html') {
        // For HTML, we need to copy both HTML and plain text formats
        const plainTextFallback = generatePlainText(displayData);

        if (navigator.clipboard && navigator.clipboard.write) {
          // Modern approach - copy both HTML and text
          const clipboardItem = new ClipboardItem({
            'text/html': new Blob([content], { type: 'text/html' }),
            'text/plain': new Blob([plainTextFallback], { type: 'text/plain' })
          });
          await navigator.clipboard.write([clipboardItem]);
        } else {
          // Fallback - create a temporary element and use execCommand
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = content;
          tempDiv.style.position = 'absolute';
          tempDiv.style.left = '-9999px';
          document.body.appendChild(tempDiv);

          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(tempDiv);
          selection?.removeAllRanges();
          selection?.addRange(range);

          document.execCommand('copy');
          document.body.removeChild(tempDiv);
          selection?.removeAllRanges();
        }
      } else {
        // For plain text, use the simple method
        await navigator.clipboard.writeText(content);
      }

      setCopyStatus(prev => ({ ...prev, [type]: 'success' }));
      onExport(type);

      // Reset status after 2 seconds
      setTimeout(() => {
        setCopyStatus(prev => ({ ...prev, [type]: 'idle' }));
      }, 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      setCopyStatus(prev => ({ ...prev, [type]: 'error' }));

      // Reset status after 2 seconds
      setTimeout(() => {
        setCopyStatus(prev => ({ ...prev, [type]: 'idle' }));
      }, 2000);
    }
  };

  const handleCopyHTML = () => {
    const htmlContent = template.render(displayData);
    copyToClipboard(htmlContent, 'html');
  };

  const handleCopyText = () => {
    const textContent = generatePlainText(displayData);
    copyToClipboard(textContent, 'text');
  };

  const getButtonContent = (type: 'html' | 'text') => {
    const status = copyStatus[type];
    
    switch (status) {
      case 'success':
        return (
          <>
            <Check size={18} />
            Copied!
          </>
        );
      case 'error':
        return (
          <>
            <AlertCircle size={18} />
            Failed
          </>
        );
      default:
        return (
          <>
            <Copy size={18} />
            Copy {type === 'html' ? 'HTML' : 'Text'}
          </>
        );
    }
  };

  return (
    <div className={clsx("space-y-4", className)}>
      <div className="flex items-center gap-2 text-white mb-4">
        <Download size={20} />
        <h2 className="text-lg font-semibold">Export Signature</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* HTML Export */}
        <button
          onClick={handleCopyHTML}
          disabled={copyStatus.html === 'success'}
          className={clsx(
            "flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium transition-all duration-200",
            copyStatus.html === 'success'
              ? "bg-green-500/20 border-2 border-green-500 text-green-400"
              : copyStatus.html === 'error'
              ? "bg-red-500/20 border-2 border-red-500 text-red-400"
              : "bg-gray-600/20 border-2 border-gray-500 text-gray-300 hover:bg-gray-600/30 hover:border-gray-400 hover:cursor-pointer"
          )}
        >
          {getButtonContent('html')}
        </button>

        {/* Text Export */}
        <button
          onClick={handleCopyText}
          disabled={copyStatus.text === 'success'}
          className={clsx(
            "flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium transition-all duration-200",
            copyStatus.text === 'success'
              ? "bg-green-500/20 border-2 border-green-500 text-green-400"
              : copyStatus.text === 'error'
              ? "bg-red-500/20 border-2 border-red-500 text-red-400"
              : "bg-gray-500/20 border-2 border-gray-500 text-gray-400 hover:bg-gray-500/30 hover:border-gray-400 hover:cursor-pointer"
          )}
        >
          {getButtonContent('text')}
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-white mb-2">How to use:</h3>
        <div className="text-xs text-gray-400 space-y-2">
          <div>
            <p><strong className="text-white">HTML Signature:</strong></p>
            <p>1. Click "Copy HTML" above</p>
            <p>2. Go to your email client's signature settings</p>
            <p>3. Paste (Ctrl+V) directly into the signature editor</p>
            <p>4. The formatting and icons should appear automatically</p>
          </div>
          <div>
            <p><strong className="text-white">Text Fallback:</strong></p>
            <p>Use for plain text emails or when HTML isn't supported</p>
          </div>
          <p className="mt-2 text-yellow-400">
            💡 Works with Gmail, Outlook, Apple Mail, Thunderbird, and most email clients
          </p>
        </div>
      </div>
    </div>
  );
}
