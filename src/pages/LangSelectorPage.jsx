import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LANGUAGES = {
  en: 'English',
  hi: 'हिन्दी',
  zh: '中文',
  bn: 'বাংলা',
  ta: 'தமிழ்',
  te: 'తెలుగు',
  fr: 'Français',
  es: 'Español',
  mr: 'मराठी',
  kn: 'ಕನ್ನಡ'
};

export default function LangSelectorPage({ setLang }) {
  const navigate = useNavigate();

  const handleSelect = (code) => {
    setLang(code);
    navigate(`/${code}/home`);
  };

  return (
    <div
      style={{
        height: '100vh',
        background: 'linear-gradient(to bottom right, #f5f7fa, #c3cfe2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>
          Please select your language:
        </h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          {Object.entries(LANGUAGES).map(([code, label]) => (
            <button
              key={code}
              onClick={() => handleSelect(code)}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                borderRadius: '8px',
                border: '1px solid #ccc',
                backgroundColor: '#f8f9fa',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e2e6ea')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f8f9fa')}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
