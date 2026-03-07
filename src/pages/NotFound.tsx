import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white to-white text-black p-6">
      <h1 className="text-8xl font-extrabold animate-bounce mb-6 text-brandButtonHover">404</h1>
      <p className="text-2xl sm:text-3xl font-bold mb-4">Oops! Oldal nem található</p>
      <p className="text-center max-w-xl mb-6">
        Úgy tűnik, eltévedtél az internet dzsungelében. Ne aggódj, van kiút!
      </p>
      <Link
        to="/"
        className="bg-white text-brandButtonHover font-bold py-3 px-6 rounded-lg shadow-lg hover:scale-105 hover:text-brandButton transition-transform"
      >
        Vissza a főoldalra
      </Link>

      {/* Játékos kis animált macska */}
      <div className="mt-10">
        <div className="image404 w-32 h-32 animate-bounce-slow bg-cover bg-center"></div>        
      </div>

      <style>
        {`
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          .animate-bounce-slow {
            animation: bounce-slow 2s infinite;
          }
        `}
      </style>
    </div>
  );
}