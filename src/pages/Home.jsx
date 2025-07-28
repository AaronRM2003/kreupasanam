import AppBar from '../components/AppBar';
import Testimonies from '../components/Testimonies';
import IntroSection from '../components/IntroSection';
import IntroTestimony from '../components/IntroTestimony';
import logo from "../assets/logo.webp";
import FeaturedTestimonySection from '../components/HomeTestimony';
import ImageSpacer from "../components/Image";  // Adjust path as needed
import heroImage from "../assets/mother.webp";
import heroImage1 from "../assets/lamb.webp";
import Footer from '../components/Footer';
import FadeInOnScroll from '../framer';
import { useState } from 'react';

export default function Home({ lang }) {
    const [introReady, setIntroReady] = useState(false);

 

  return (
    <div>
      
    {introReady && (     
      <AppBar lang={lang} />
      )}
      <div className="page">

        <img src={logo} alt="Logo" className="floating-logo" />

        {!introReady ? (
          <>
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
  {/* Spinner */}
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

  {/* Loading Text */}
  <div style={{ fontSize: '1.2rem', fontWeight: 500 }}>Loading introduction...</div>

  {/* Spinner Keyframes */}
  <style>
    {`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}
  </style>
</div>

            {/* Load IntroSection without animation to trigger onReady */}
            <div style={{ display: 'none' }}>
              <IntroSection lang={lang} onReady={() => setIntroReady(true)} />
            </div>
          </>
        ) : (
          <FadeInOnScroll>
            <IntroSection lang={lang} />
          </FadeInOnScroll>
        )}
          {introReady && ( 
            <>
            <FadeInOnScroll delay={0.1}>
          <div className="d-flex align-items-center" style={{ maxWidth: '1400px', margin: '0 auto', padding: '1rem 5%'}}>
            <div style={{ flex: '1 1 600px', minWidth: '300px' }}>
              <IntroTestimony lang={lang} />
            </div>
            <div className="d-none d-md-block" style={{ flex: '0 1 320px' }}>
              <ImageSpacer src={heroImage1} maxWidth="95%" marginSize="10%" position="right" hideOnMobile={true} />
            </div>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.2}>
          <div className="d-flex align-items-center" style={{ maxWidth: '1400px', margin: '0 auto', padding: '1rem 5%' }}>
            <div className="d-none d-md-block" style={{ flex: '0 1 320px' }}>
            <ImageSpacer src={heroImage} maxWidth="100%" marginSize="4%" position="left" hideOnMobile={true} />
            </div>
            <div style={{ flex: '1 1 600px', minWidth: '300px' }}>
              <FeaturedTestimonySection lang={lang} />
            </div>
          </div>
        </FadeInOnScroll>

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
