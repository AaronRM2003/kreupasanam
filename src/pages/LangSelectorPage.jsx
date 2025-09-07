import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

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
  kn: 'ಕನ್ನಡ',
};

export default function LangSelectorPage({ setLang }) {
  const navigate = useNavigate();

  const handleSelect = (code) => {
    setLang(code);
    navigate(`/${code}/home`);
  };
  useEffect(() => {
    localStorage.setItem('hasVisitedRoot', 'true');
  }, []);

  
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom right, #e0eafc, #cfdef3)',
        padding: '1rem',
        fontFamily: `'Poppins', sans-serif`,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '24px',
          padding: '2rem',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: '1.8rem',
            marginBottom: '1.5rem',
            color: '#333',
          }}
        >
          🌐 Choose Your Language
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '1rem',
          }}
        >
          {Object.entries(LANGUAGES).map(([code, label]) => (
            <button
              key={code}
              onClick={() => handleSelect(code)}
              style={{
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: '#f0f4f8',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.06)',
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = '#dbeafe')
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = '#f0f4f8')
              }
              onFocus={(e) =>
                (e.currentTarget.style.outline = '2px solid #60a5fa')
              }
              onBlur={(e) =>
                (e.currentTarget.style.outline = 'none')
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
