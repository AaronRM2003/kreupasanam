import { Routes, Route, useLocation, Navigate,useParams } from 'react-router-dom';
import { useEffect ,useState} from 'react';
import Home from './pages/Home';
import TestimonyPage from './pages/TestimonyPage';
import MonthlyTestimonies from './pages/MonthTestimonies';
import 'bootstrap/dist/css/bootstrap.min.css';
import Oracles from './pages/Oracles';
import OraclesPage from './pages/OraclesPage';
import Dhyanam from './pages/Dhyanam';
import DhyanamPage from './pages/DhyanamPage';
import LangSelectorPage from './pages/LangSelectorPage';
import TranslationDisclaimer from './TranslationDisclaimer';
import NotFoundPage from './NotFoundPage';
import About from './AboutPage';

const supportedLangs = ['en', 'hi', 'zh', 'bn', 'ta', 'te', 'fr', 'es', 'mr', 'kn'];

function LangRoute({ element: Element, redirectToRootIfNotVisited = false }) {
  const { lang } = useParams();

  if (!supportedLangs.includes(lang)) {
    return <Navigate to="/invalid" replace />;
  }

  if (
    redirectToRootIfNotVisited &&
    lang === 'en' &&
    localStorage.getItem('hasVisitedRoot') !== 'true'
  ) {
    console.log('Redirecting to root');
    return <Navigate to="/" replace />;
  }

  return <Element lang={lang} />;
}

function RedirectTo({ toBase }) {
  const { lang, idSlug } = useParams();
  return <Navigate to={`/${lang}/${toBase}/${idSlug}`} replace />;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const currentLang = supportedLangs.includes(pathSegments[0]) ? pathSegments[0] : null;
  const [lang, setLang] = useState(null);
  const isLangSelectorPage = location.pathname === '/';
  const isInvalidPage = location.pathname === '/invalid';

  const showDisclaimer = !isLangSelectorPage && !isInvalidPage;

  return (
    <>
      <ScrollToTop />
      {showDisclaimer && <TranslationDisclaimer lang={currentLang || 'en'} />}
      <Routes>
        {/* Language selection page at root */}
    <Route path="/" element={<LangSelectorPage setLang={setLang} />} />

        {/* Invalid route fallback */}
        <Route path="/invalid" element={<NotFoundPage />} />


        {/* Language-prefixed routes */}
        <Route path=":lang">
          <Route path="about" element={<LangRoute element={About} />} />
          <Route index element={<Navigate to="home" replace />} />

          <Route path="home" element={<LangRoute element={Home} redirectToRootIfNotVisited />} />
          <Route path="testimony/:idSlug" element={<LangRoute element={TestimonyPage} />} />
          <Route path="testimonies" element={<LangRoute element={MonthlyTestimonies} />} />
          <Route path="oracles" element={<LangRoute element={Oracles} />} />
          <Route path="oracles/:idSlug" element={<LangRoute element={OraclesPage} />} />
          <Route path="dhyanam" element={<LangRoute element={Dhyanam} />} />
          <Route path="dhyanam/:idSlug" element={<LangRoute element={DhyanamPage} />} />

          <Route path="share/testimony/:idSlug" element={<RedirectTo toBase="testimony" />} />
          <Route path="share/oracles/:idSlug" element={<RedirectTo toBase="oracles" />} />
          <Route path="share/dhyanam/:idSlug" element={<RedirectTo toBase="dhyanam" />} />


          {/* ✅ Catch invalid paths like /en/invalid or /ml/xyz */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>


        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/invalid" replace />} />
      </Routes>
    </>
  );
}

export default App;
