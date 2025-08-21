import { useState ,useEffect} from "react";
import { Button, Dropdown } from "react-bootstrap";
import "./FeaturedTestimonySection.css";

const testimonyData = {
  en: {
    title: "Healed Through Her Intercession",
    content: `I had suffered from chronic migraines for years. Doctors couldn’t help much, and I was losing hope. After attending a retreat at Kreupasanam and praying the Marian Covenant Prayer for 90 days with faith, I began to notice my migraines becoming less intense. By the end of the novena, they were completely gone. I believe Mother Mary’s intercession truly healed me.`,
  },
  ml: {
    title: "അവളുടെ ഇടപെടലിലൂടെ ചികിത്സ ലഭിച്ചു",
    content: `വർഷങ്ങളായി മൂർച്ഛിച്ച തലവേദനകളാൽ ഞാൻ പീഡിക്കപ്പെട്ടിരുന്നു. Kreupasanam-ൽ നടന്ന ഒരു retreat-ലും Marian Covenant Prayer 90 ദിവസം പ്രാർത്ഥിച്ചപ്പോൾ, എന്റെ വേദനയ്ക്ക് കുറവ് അനുഭവപ്പെട്ടു. ഒടുവിൽ തലവേദനകളെല്ലാം ഇല്ലാതായി. അമ്മയുടെ ഇടപെടലാണ് എന്നെ സുഖപ്പെടുത്തിയത് എന്ന് ഞാൻ വിശ്വസിക്കുന്നു.`,
  },
  hi: {
    title: "उनकी मध्यस्थता से चमत्कारी उपचार",
    content: `मैं सालों से माइग्रेन से परेशान था। डॉक्टर्स कुछ खास नहीं कर पा रहे थे। क्रेउपसनम में एक रिट्रीट में भाग लेने के बाद और 90 दिनों तक मैरियन कोवेनेंट प्रेयर करने के बाद, मेरी तकलीफ कम होती गई और अंत में पूरी तरह ठीक हो गई। मुझे यकीन है कि यह माँ मरियम की मध्यस्थता से हुआ है।`,
  },
};

function truncateWords(text, wordLimit) {
  if (!text || typeof text !== "string") return '';
  const words = text.split(" ");
  if (words.length <= wordLimit) {
    return text;
  }
  return words.slice(0, wordLimit).join(" ") + "...";
}


export default function FeaturedTestimonySection( {lang:initialLang}) {
  const [lang, setLang] = useState(initialLang||"en");
  const [testimonies, setTestimonies] = useState([]);

  useEffect(() => {
    fetch('/assets/testimony-content.json')
      .then((res) => res.json())
      .then((data) => setTestimonies(data))
      .catch((err) => console.error('Failed to load testimonies:', err));
    }, []);

  useEffect(() => {
    if (initialLang && initialLang !== lang) {
      setLang(initialLang);
    }
  }, [initialLang]);
  const testimony = testimonies.find(item => item.id === 1);
const { title = {}, content = {}, date, video } = testimony || {};

  return (
    <section className="featured-testimony-box">
      <div className="header-row">
        <h2 className="section-heading">Featured Testimony</h2>
       <Dropdown onSelect={setLang}
       style={{marginRight:"1rem"}}
       >
      
                  <Dropdown.Toggle
                    variant="outline-secondary"
                    id="dropdown-lang"
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(36, 107, 253, 0.3)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(36, 107, 253, 0.15)'}
                  >
                    {{
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
                    }[lang] || lang}
                  </Dropdown.Toggle>
      
                  <Dropdown.Menu
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                      padding: '0.25rem 0',
                      minWidth: '150px',
                    }}
                  >
                    {['en', 'zh', 'bn', 'hi', 'ta', 'te', 'fr', 'es', 'mr','kn'].map(key => (
                      <Dropdown.Item
                        key={key}
                        eventKey={key}
                        style={{
                          borderRadius: '8px',
                          transition: 'background-color 0.25s ease, color 0.25s ease',
                          fontWeight: '600',
                          padding: '1rem 1.5rem',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.backgroundColor = 'rgba(36, 107, 253, 0.1)';
                          e.currentTarget.style.color = '#246bfd';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = 'inherit';
                        }}
                      >
                        {{
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
                        }[key]}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
      </div>

      <div className="testimony-card">
     <h3 className="testimony-title">{title[lang] || title['en']}</h3>
<p className="testimony-content">{truncateWords(content[lang] || content['en'], 50)}</p>

       <Button variant="primary" className="explore-btn" href={`/${initialLang||'en'}/testimony/1-covenant-of-strength`}>
  Let's Read!
</Button>

      </div>
    </section>
  );
}
