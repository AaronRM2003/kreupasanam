import { useState, useEffect } from "react";
import { Button, Dropdown } from "react-bootstrap";
import "./FeaturedTestimonySection.css";

function truncateWords(text, wordLimit) {
  if (!text || typeof text !== "string") return "";
  const words = text.split(" ");
  if (words.length <= wordLimit) {
    return text;
  }
  return words.slice(0, wordLimit).join(" ") + "...";
}

export default function FeaturedTestimonySection({ lang: initialLang }) {
  const [lang, setLang] = useState(initialLang || "en");
  const [testimonies, setTestimonies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/assets/testimony-content.json")
      .then((res) => res.json())
      .then((data) => {
        setTestimonies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load testimonies:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (initialLang && initialLang !== lang) {
      setLang(initialLang);
    }
  }, [initialLang]);

  const testimony = testimonies.find((item) => item.id === 1);
  const { title = {}, content = {} } = testimony || {};

  return (
    <section className="featured-testimony-box">
      <div className="header-row">
        <h2 className="section-heading">Featured Testimony</h2>
        <Dropdown onSelect={setLang} style={{ marginRight: "1rem" }}>
          <Dropdown.Toggle variant="outline-secondary" id="dropdown-lang">
            {{
              en: "English",
              hi: "हिन्दी",
              zh: "中文",
              bn: "বাংলা",
              ta: "தமிழ்",
              te: "తెలుగు",
              fr: "Français",
              es: "Español",
              mr: "मराठी",
              kn: "ಕನ್ನಡ",
            }[lang] || lang}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {["en", "zh", "bn", "hi", "ta", "te", "fr", "es", "mr", "kn"].map(
              (key) => (
                <Dropdown.Item key={key} eventKey={key}>
                  {{
                    en: "English",
                    hi: "हिन्दी",
                    zh: "中文",
                    bn: "বাংলা",
                    ta: "தமிழ்",
                    te: "తెలుగు",
                    fr: "Français",
                    es: "Español",
                    mr: "मराठी",
                    kn: "ಕನ್ನಡ",
                  }[key]}
                </Dropdown.Item>
              )
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="testimony-card">
        {loading ? (
          <>
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-btn"></div>
          </>
        ) : (
          <>
            <h3 className="testimony-title">
              {title[lang] || title["en"]}
            </h3>
            <p className="testimony-content">
              {truncateWords(content[lang] || content["en"], 50)}
            </p>
            <Button
              variant="primary"
              className="explore-btn"
              href={`/${initialLang || "en"}/testimony/1-covenant-of-strength`}
            >
              Let's Read!
            </Button>
          </>
        )}
      </div>
    </section>
  );
}
