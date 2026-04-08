import { useState, useEffect } from "react";
import { Button, Dropdown } from "react-bootstrap";
import "./FeaturedTestimonySection.css";

function truncateText(text, limit, lang = "en") {
  if (!text || typeof text !== "string") return "";

  // Languages without spaces → use character slicing
  const noSpaceLangs = ["zh", "ja", "ko"];

  if (noSpaceLangs.includes(lang)) {
    return text.length <= limit
      ? text
      : text.slice(0, limit) + "...";
  }

  // Default → word-based truncation
  const words = text.split(" ");
  return words.length <= limit
    ? text
    : words.slice(0, limit).join(" ") + "...";
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

  const testimony = testimonies.find((item) => item.id === 42);
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
              {truncateText(content[lang] || content["en"], 50, lang)}
            </p>
            <Button
              variant="primary"
              className="explore-btn"
              href={`/${initialLang || "en"}/testimony/42-healing-from-stage-3-brain-tumor`}
            >
              Let's Read!
            </Button>
          </>
        )}
      </div>
    </section>
  );
}
