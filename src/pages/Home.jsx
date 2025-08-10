import { useEffect, useState } from 'react';
import AppBar from '../components/AppBar';
import Testimonies from '../components/Testimonies';
import IntroSection from '../components/IntroSection';
import IntroTestimony from '../components/IntroTestimony';
import FeaturedTestimonySection from '../components/HomeTestimony';
import ImageSpacer from "../components/Image";
import heroImage from "../assets/mother.webp";
import heroImage1 from "../assets/lamb.webp";
import Footer from '../components/Footer';
import FadeInOnScroll from '../framer';

export default function Home({ lang }) {
  
  const [introReady, setIntroReady] = useState(false);
  const [isHero1Visible, setIsHero1Visible] = useState(true);
  const [isHero2Visible, setIsHero2Visible] = useState(true);
  const [readyCount, setReadyCount] = useState(0);

  useEffect(() => {
    if (readyCount >= 3) {
      setIntroReady(true);
    }
  }, [readyCount]);

  const handleReady = () => setReadyCount((count) => count + 1);

  // Mobile visibility check for both ImageSpacers
  useEffect(() => {
    const checkVisibility = () => {
      const isMobile = window.innerWidth <= 1312 || window.innerHeight <= 500;

      // If it's mobile and hideOnMobile is true, hide both
      setIsHero1Visible(!isMobile);
      setIsHero2Visible(!isMobile);
    };

    checkVisibility(); // initial
    const timeout = setTimeout(checkVisibility, 250);
    window.addEventListener('resize', checkVisibility);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  return (
    <div>
      {introReady && <AppBar lang={lang} />}
      <div className="page">
        <img src="/assets/logo.webp" alt="Logo" className="floating-logo" />

        {!introReady ? (
          <>
            {/* Loading screen */}
            <div
              style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                fontFamily: 'Arial, sans-serif',
                backgroundColor: '#f8f9ff',
                color: '#246bfd',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  border: '4px solid #d3e3ff',
                  borderTop: '4px solid #246bfd',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginBottom: '1.5rem',
                }}
              ></div>

              <div style={{ fontSize: '1.2rem', fontWeight: 500 }}>
                Guided by grace…
              </div>

              <style>
                {`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}
              </style>
            </div>

            {/* Hidden preloading components to trigger onReady */}
            <div style={{ display: 'none' }}>
              <IntroSection lang={lang} onReady={handleReady} />
              <ImageSpacer
                src={heroImage1}
                maxWidth="80%"
                marginSize="5%"
                position="right"
                hideOnMobile={true}
                onReady={handleReady}
              />
              <ImageSpacer
                src={heroImage}
                maxWidth="100%"
                marginSize="4%"
                position="left"
                hideOnMobile={true}
                onReady={handleReady}
              />
            </div>
          </>
        ) : (
          <FadeInOnScroll>
            <IntroSection lang={lang} />
          </FadeInOnScroll>
        )}

        {introReady && (
          <>
            {/* Intro Testimony Section */}
            <FadeInOnScroll delay={0.1}>
              <div
                className="d-flex align-items-center"
                style={{
                 maxWidth: '1400px', margin: '0 auto', padding: '0 3%'
                }}
              >
                <div style={{ flex: '1 1 600px', minWidth: '300px' }}>
                  <IntroTestimony lang={lang} />
                </div>
                {isHero1Visible && (
                  <div style={{ flex: '0 1 320px' }}>
                    <ImageSpacer
                      src={heroImage1}
                      maxWidth="80%"
                      marginSize="5%"
                      position="right"
                      hideOnMobile={true}
                    />
                  </div>
                )}
              </div>
            </FadeInOnScroll>

            {/* Featured Testimony Section */}
            <FadeInOnScroll delay={0.2}>
              <div
                className="d-flex align-items-center"
                style={{
                     maxWidth: '1400px', margin: '0 auto', padding: '0 3%'
                }}
              >
                {isHero2Visible && (
                  <div style={{ flex: '0 1 320px' }}>
                    <ImageSpacer
                      src={heroImage}
                      maxWidth="100%"
                      marginSize="4%"
                      position="left"
                      hideOnMobile={true}
                    />
                  </div>
                )}
                <div style={{ flex: '1 1 600px', minWidth: '300px' }}>
                  <FeaturedTestimonySection lang={lang} />
                </div>
              </div>
            </FadeInOnScroll>

            {/* Testimonies and Footer */}
            <FadeInOnScroll delay={0.3}>
              <section className="section">
                <Testimonies lang={lang} />
              </section>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.4}>
              <Footer lang={lang} />
            </FadeInOnScroll>
          </>
        )}
      </div>
    </div>
  );
}
