import { useState } from 'react';

function ShareModal({ code, language, onClose }) {
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);

  // Generate shareable link (encode code in URL)
  const generateShareLink = () => {
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify({ code, language }))));
    const link = `${window.location.origin}?shared=${encoded}`;
    setShareLink(link);
  };

  useState(() => {
    generateShareLink();
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🔗</div>
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Share Your Code!
          </h2>
          <p className="text-gray-600 mt-2">
            Anyone with this link can view and run your code
          </p>
        </div>

        {/* Share Link */}
        <div className="bg-gray-100 rounded-xl p-4 mb-6 border-2 border-gray-300">
          <p className="text-sm text-gray-500 mb-2 font-medium">Share Link:</p>
          <p className="text-sm text-gray-800 break-all font-mono bg-white p-3 rounded-lg border border-gray-200">
            {shareLink}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={copyToClipboard}
            className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg ${
              copied
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-xl'
            }`}
          >
            {copied ? '✅ Copied!' : '📋 Copy Link'}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-4 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-all"
          >
            ❌ Close
          </button>
        </div>

        {/* Social Share Buttons */}
        <div className="mt-6 pt-6 border-t-2 border-gray-200">
          <p className="text-sm text-gray-600 mb-3 text-center font-medium">
            Or share via:
          </p>
          <div className="flex gap-3 justify-center">
            <a
              href={`https://twitter.com/intent/tweet?text=Check out my code on CodeQuest!&url=${encodeURIComponent(shareLink)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-400 text-white p-3 rounded-xl hover:bg-blue-500 transition-all"
              title="Share on Twitter"
            >
              🐦 Twitter
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent('Check out my code on CodeQuest! ' + shareLink)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white p-3 rounded-xl hover:bg-green-600 transition-all"
              title="Share on WhatsApp"
            >
              💬 WhatsApp
            </a>
            <a
              href={`mailto:?subject=Check out my code!&body=${encodeURIComponent('I made this on CodeQuest: ' + shareLink)}`}
              className="bg-gray-500 text-white p-3 rounded-xl hover:bg-gray-600 transition-all"
              title="Share via Email"
            >
              📧 Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;