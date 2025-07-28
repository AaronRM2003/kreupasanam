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

export default function Home({ lang }) {
  return (
    <div>
      <AppBar lang={lang} />
      <div className="page">

        <img src={logo} alt="Logo" className="floating-logo" />

        <FadeInOnScroll>
          <IntroSection lang={lang} />
        </FadeInOnScroll>

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

      </div>
    </div>
  );
}
