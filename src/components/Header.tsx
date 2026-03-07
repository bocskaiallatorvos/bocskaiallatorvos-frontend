import { Menu, X, Stethoscope } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <span className="logo w-14 h-14 bg-cover bg-center"></span>

            {/*<Stethoscope className="w-8 h-8 text-brandButton" />*/}
            <div>
              <h1 className="text-2xl font-bold text-brandHeaderColor">Bocskai <span className="hidden sm:inline">Állategészségügyi Centrum</span></h1>
              <span className="hidden sm:inline text-brandColor">Állatorvosi Rendelő</span>
              <span className="inline sm:hidden text-brandColor">Állategészségügyi Centrum</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/rolunk"
              className={`transition ${isActive('/rolunk') ? 'text-brandButton font-medium' : 'text-brandHeaderColor hover:text-brandButton'}`}
            >
              Rólunk
            </Link>
            <Link
              to="/szolgaltatasok"
              className={`transition ${isActive('/szolgaltatasok') ? 'text-brandButton font-medium' : 'text-brandHeaderColor hover:text-brandButton'}`}
            >
              Szolgáltatások
            </Link>
            <Link
              to="/blog"
              className={`transition ${isActive('/blog') ? 'text-brandButton font-medium' : 'text-brandHeaderColor hover:text-brandButton'}`}
            >
              Blog
            </Link>

            {/*<Link
              to="/gyik"
              className={`transition ${isActive('/gyik') ? 'text-brandButton font-medium' : 'text-brandHeaderColor hover:text-brandButton'}`}
            >
              GYIK
            </Link>*/}

            <Link
              to="/arlista"
              className={`transition ${isActive('/arlista') ? 'text-brandButton font-medium' : 'text-brandHeaderColor hover:text-brandButton'}`}
            >
              Árlista
            </Link>

            <Link
              to="/galeria"
              className={`transition ${isActive('/galeria') ? 'text-brandButton font-medium' : 'text-brandHeaderColor hover:text-brandButton'}`}
            >
              Galéria
            </Link>

            <Link
              to="/kapcsolat"
              className={`transition ${isActive('/kapcsolat') ? 'text-brandButton font-medium' : 'text-brandHeaderColor hover:text-brandButton'}`}
            >
              Kapcsolat
            </Link>

          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-6 px-4 space-y-2 backdrop-blur-xl bg-white/80 shadow-xl rounded-2xl border border-white/40 animate-slideDown">
           {/* { to: "/gyik", label: "GYIK" }, */}
            {[
              { to: "/rolunk", label: "Rólunk" },
              { to: "/szolgaltatasok", label: "Szolgáltatások" },
              { to: "/blog", label: "Blog" },
              { to: "/arlista", label: "Árlista" },
              { to: "/galeria", label: "Galéria" },
              { to: "/kapcsolat", label: "Kapcsolat" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={closeMenu}
                className={`block w-full text-left text-lg font-medium transition-all duration-300 py-3 px-3 rounded-xl ${isActive(to)
                    ? 'bg-brandButton text-white shadow-lg scale-[1.02]'
                    : 'text-gray-700 hover:bg-brandButton/10 hover:text-brandButtonHover'
                  }`}
              >
                {label}
              </Link>
            ))}

            <div className="pt-3 border-t border-gray-200/70">
              <p className="text-gray-700 font-semibold mb-2">Pályázatok</p>
              <div className="ml-3 space-y-1">
                <Link
                  to="/palyazatok/ginop-2017-01597"
                  onClick={closeMenu}
                  className="block text-gray-600 hover:text-brandButtonHover transition-colors"
                >
                  GINOP-2017-01597
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
