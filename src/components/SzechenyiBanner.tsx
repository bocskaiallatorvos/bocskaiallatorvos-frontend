import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

export default function SzechenyiBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("szechenyiBannerDismissed");
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("szechenyiBannerDismissed", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 right-0 z-50 hidden md:block">
      <button
        onClick={handleClose}
        className="absolute top-0 right-0 bg-white border border-[#076AB0] rounded-full p-1 text-gray-500 hover:text-gray-700 hover:border-[#076AB0] transition shadow transition-transform duration-300 hover:rotate-12"
      >
        <X size={16} />
      </button>
      <Link to="/palyazatok/ginop-2017-01597" target="_blank">
      <img
        src="https://api.bocskaiallatorvos.hu/wp-content/uploads/2026/01/szechenyi-2020-logo-bottom.png"
        alt="Széchenyi 2020 logó"
        className="w-40 h-auto"
      />
      </Link>
    </div>
  );
}