import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import TestimonyPage from './pages/TestimonyPage';
import MonthlyTestimonies from './pages/MonthTestimonies';
import 'bootstrap/dist/css/bootstrap.min.css';
import Oracles from './pages/Oracles';
import OraclesPage from './pages/OraclesPage';
import Dhyanam from './pages/Dhyanam';
import DhyanamPage from './pages/DhyanamPage';
import LangSelectorPage from './pages/LangSelectorPage'; // You need to create this page
import { useParams } from 'react-router-dom';

const supportedLangs = ['en', 'hi', 'zh', 'bn', 'ta', 'te', 'fr', 'es', 'mr', 'kn'];

function LangRoute({ element: Element }) {
  const { lang } = useParams();
  if (!supportedLangs.includes(lang)) {
    return <Navigate to="/" replace />;
  }
  return <Element lang={lang} />;
}



function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  // No initial load from localStorage
  const [lang, setLang] = useState(null);

  return (
    <>
      <ScrollToTop />
     <Routes>
  {/* Language selection page at root */}
  <Route path="/" element={<LangSelectorPage setLang={setLang} />} />

  {/* Language-specific routes */}
  <Route path=":lang">
    <Route index element={<Navigate to="home" replace />} />
    <Route path="home" element={<LangRoute element={Home} />} />
    <Route path="testimony/:id" element={<LangRoute element={TestimonyPage} />} />
    <Route path="testimonies" element={<LangRoute element={MonthlyTestimonies} />} />
    <Route path="oracles" element={<LangRoute element={Oracles} />} />
    <Route path="oracles/:id" element={<LangRoute element={OraclesPage} />} />
    <Route path="dhyanam" element={<LangRoute element={Dhyanam} />} />
    <Route path="dhyanam/:id" element={<LangRoute element={DhyanamPage} />} />
  </Route>
</Routes>

    </>
  );
}

export default App;
