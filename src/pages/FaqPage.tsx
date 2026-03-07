import { useEffect, useState } from "react";
import { useCms } from "../context/CmsContext";
import { WPPosts } from "../interfaces/WordpressInterfaces";
import { Loader2, ChevronDown } from "lucide-react";

const FAQPage = () => {
  const [faqs, setFaqs] = useState<WPPosts[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { posts, error } = useCms();

  useEffect(() => {
    async function fetchFaqs() {
      try {
        setLoading(true);
        if (error) throw error;

        const faqs = posts.filter(item => item.categories.includes(9));
        setFaqs(faqs);
      } catch (err) {
        console.error("Hiba a FAQ bejegyzések lekérése közben:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFaqs();
  }, []);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-indigo-50 to-blue-50">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 text-red-700">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section id="faq" className="min-h-screen py-24 bg-gradient-to-b from-brand to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-14  animate-fade-in">
          <h1 className="text-4xl font-bold text-brandHeaderColor mb-3">Gyakran Ismételt Kérdések</h1>
          <p className="text-xl sm:text-2xl text-brandColor max-w-3xl mx-auto leading-relaxed">Minden, amit érdemes tudni</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md ${
                openIndex === index ? "ring-1 ring-indigo-100" : ""
              }`}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <span className="text-lg font-semibold text-gray-800">{faq.title.rendered}</span>
                <ChevronDown
                  className={`w-6 h-6 text-brandButton transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div
                  className="faq-answer px-6 pb-6 text-gray-600 leading-relaxed text-base animate-fadeIn"
                  dangerouslySetInnerHTML={{ __html: faq.content.rendered || "" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQPage;
