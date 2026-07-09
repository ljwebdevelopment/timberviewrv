import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home         from './pages/Home';
import Sites        from './pages/Sites';
import Amenities    from './pages/Amenities';
import ExtendedStay from './pages/ExtendedStay';
import Contact      from './pages/Contact';
import Owner        from './pages/Owner';

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const isOwner = location.pathname.startsWith('/owner');

  // Owner page has its own full-screen layout — no header/footer
  if (isOwner) {
    return (
      <Routes>
        <Route path="/owner" element={<Owner />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/"              element={<Home />}         />
        <Route path="/sites"         element={<Sites />}        />
        <Route path="/amenities"     element={<Amenities />}    />
        <Route path="/extended-stay" element={<ExtendedStay />} />
        <Route path="/contact"       element={<Contact />}      />
      </Routes>
    </Layout>
  );
}
