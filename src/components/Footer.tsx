import { Facebook, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div>
                <h3 className="text-xl font-bold">Bocskai Állategészségügyi Centrum</h3>
              </div>
            </div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="logo w-8 h-8 bg-cover bg-center"></div>
              <div>
                <p className="text-gray-400 leading-relaxed">
                  Állatorvosi Rendelő
                </p>
              </div>
            </div>

          </div>

          <div>
            <h4 className="font-bold mb-4">Gyors linkek</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/adatvedelmi-tajekoztato" className="hover:text-brandButton transition">Adatvédelem</Link></li>
              <li><Link to="/rolunk" className="hover:text-brandButton transition">Rólunk</Link></li>
              <li><Link to="/szolgaltatasok" className="hover:text-brandButton transition">Szolgáltatások</Link></li>
              <li><Link to="/blog" className="hover:text-brandButton transition">Blog</Link></li>
              <li><Link to="/gyik" className="hover:text-brandButton transition">GYIK</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Gyors linkek</h4>
            <ul className="space-y-2 text-gray-400">
              {/*<li><Link to="/karrier" className="hover:text-brandButton transition">Karrier</Link></li>*/}
              <li><Link to="/arlista" className="hover:text-brandButton transition">Árlista</Link></li>
              <li><Link to="/galeria" className="hover:text-brandButton transition">Galéria</Link></li>
              <li><Link to="/kapcsolat" className="hover:text-brandButton transition">Kapcsolat</Link></li>
              <li><Link to="/palyazatok/ginop-2017-01597" className="hover:text-brandButton transition">Pályázat</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Elérhetőség</h4>
            <ul className="space-y-2 text-gray-400">
              <li>4241 Bocskaikert,</li>
              <li>Debreceni út 25.</li>
              <li><a href="tel:+36302390940" className="hover:text-brandButton transition">+36 30 239 0940</a></li>
              <li>info@bocskaiallatorvos.hu</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Kövessen minket</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/bocskaiallatorvos" target="_blank" className="bg-gray-800 hover:bg-brandButtonHover w-10 h-10 rounded-full flex items-center justify-center transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/bocskaiallatorvos/" target="_blank" className="bg-gray-800 hover:bg-brandButtonHover w-10 h-10 rounded-full flex items-center justify-center transition">
                <Instagram className="w-5 h-5" />
              </a>
              <Link to="/kapcsolat" className="bg-gray-800 hover:bg-brandButtonHover w-10 h-10 rounded-full flex items-center justify-center transition">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2019-{new Date().getFullYear()} Bocskai Állatorvosi Rendelő. Minden jog fenntartva.</p>
        </div>
      </div>
    </footer>
  );
}
