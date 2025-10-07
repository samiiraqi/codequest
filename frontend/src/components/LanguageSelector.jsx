import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

function LanguageSelector() {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr' },
    { code: 'he', name: 'עברית', flag: '🇮🇱', dir: 'rtl' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' }
  ];

  const changeLanguage = (lng, dir) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = dir;
    document.documentElement.lang = lng;
    localStorage.setItem('language', lng);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'en';
    const lang = languages.find(l => l.code === savedLang);
    if (lang) {
      document.documentElement.dir = lang.dir;
      document.documentElement.lang = lang.code;
    }
  }, []);

  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code, lang.dir)}
          className={`px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 ${
            i18n.language === lang.code
              ? 'bg-primary text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
          }`}
        >
          <span className="mr-2">{lang.flag}</span>
          {lang.name}
        </button>
      ))}
    </div>
  );
}

export default LanguageSelector;