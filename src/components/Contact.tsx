import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import axios from 'axios';
import { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

export default function Contact() {

  const apiUrl = import.meta.env.VITE_API_URL;
  const [form, setForm] = useState({ email: '', message: '', name: '', phone: '' });
  const [captcha, setCaptcha] = useState<string | null>(null);
  const [errors, setErrors] = useState<any>({});
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  //const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const handleCaptchaChange = (token: string | null) => {
    setCaptcha(token);
  };

  const validate = () => {
    const newErrors: any = {};
    if (!form.name.trim()) newErrors.name = "A név megadása kötelező";
    if (!form.email.trim()) newErrors.email = "Az email megadása kötelező";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Érvénytelen email cím";
    if (!form.phone.trim()) newErrors.phone = "A telefon megadása kötelező";
    else if (!/^\+?\d{6,15}$/.test(form.phone.replace(/\s+/g, "")))
      newErrors.phone = "Érvénytelen telefonszám";
    if (!form.message.trim()) newErrors.message = "Az üzenet nem lehet üres";
    if (!captcha) newErrors.captcha = "Captcha ellenőrzés szükséges";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (!validate()) return;

    if (!captcha) {
      setErrorMsg("Kérlek, igazold, hogy nem vagy robot!");
      return;
    }

    try {
      await axios.post(`${apiUrl}/send-mail`, { ...form, captcha: captcha })/*.then(response => {
          console.log(response); // teljes válasz objektum
          alert(response.data); // csak a válasz tartalma
        })*/;
      //alert('E-mail elküldve!');
      setSuccessMsg("Az üzenet sikeresen elküldve!");
      setForm({ name: "", email: "", phone: "", message: "" });
      setCaptcha(null);
    } catch (err: any) {
      //alert('Hiba történt az e-mail küldésekor.');
      setErrorMsg(err.message || "Hiba történt az üzenet küldése közben");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-brand to-stone-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl font-bold text-brandHeaderColor mb-4">Kapcsolat</h1>
          <p className="text-xl sm:text-2xl text-brandColor max-w-2xl mx-auto">
            Forduljon hozzánk bizalommal kedvence egészségét érintő kérdéseivel!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 transition-all animate-slide-up duration-500 ">
          <div className="space-y-8 pb-4 md:pr-8 md:pb-0">
            <div className="bg-white p-6 rounded-xl shadow-lg flex items-start space-x-4">
              <div className="bg-brandButton w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-brandHeaderColor mb-2">Cím</h3>
                <p className="text-brandColor">4241 Bocskaikert, Debreceni út 25</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg flex items-start space-x-4">
              <div className="bg-brandButton w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-brandHeaderColor mb-2">Telefon</h3>
                <p className="text-brandColor"><a href="tel:+36302390940" title="+36 30 239 0940">+36 30 239 0940</a></p>
                {/*<p className="text-sm text-gray-500 mt-1">Sürgősségi: +36 30 555 5678</p>*/}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg flex items-start space-x-4">
              <div className="bg-brandButton w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-brandHeaderColor mb-2">Email</h3>
                <p className="text-brandColor">info@bocskaiallatorvos.hu</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg flex items-start space-x-4">
              <div className="bg-brandButton w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-brandHeaderColor mb-2">Nyitvatartás</h3>
                <div className="space-y-1 text-brandColor">
                  <p>Hétfő - Péntek: 8:00 - 19:00</p>
                  <p>Szombat: 9:00 - 12:00</p>
                  <p>Vasárnap: Zárva</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-brandHeaderColor mb-6">Üzenet küldése</h3>
            {successMsg && (
              <div className="bg-green-50 text-green-700 border border-green-200 rounded-lg p-4 mb-4">
                {successMsg}
              </div>
            )}
            {errorMsg && (
              <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg p-4 mb-4">
                {errorMsg}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-brandHeaderColor font-medium mb-2">Név</label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandButton ${errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  placeholder="Az Ön neve"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-brandHeaderColor font-medium mb-2">Email</label>
                <input
                  type="email"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandButton ${errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  placeholder="email@pelda.hu"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-brandHeaderColor font-medium mb-2">Telefon</label>
                <input
                  type="tel"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandButton ${errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  placeholder="+36 30 123 4567"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-brandHeaderColor font-medium mb-2">Üzenet</label>
                <textarea
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandButton ${errors.message ? "border-red-500" : "border-gray-300"
                    }`}
                  placeholder="Írja ide üzenetét..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <div className={errors.captcha ? "border-red-500 rounded-lg p-1" : ""}>
                <ReCAPTCHA sitekey="6LeUw_8rAAAAAH1ACJUABRgo1onHw-ruaid80sJt" onChange={handleCaptchaChange} />
                {errors.captcha && <p className="text-red-500 text-sm mt-1">{errors.captcha}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-brandButton hover:bg-brandButtonHover text-white px-8 py-3 rounded-lg font-medium transition shadow-lg hover:shadow-xl disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Küldés..." : "Küldés"}
              </button>
            </form>
          </div>
        </div>

        {/* Google Térkép */}
        <section id="terkep" className="mt-16 w-full max-w-6xl mx-auto rounded-xl overflow-hidden shadow-lg">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-brandHeaderColor mb-4">Térkép</h2>
          </div>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d86015.92644958379!2d21.577215635094642!3d47.64561149998238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47476d13b3c85163%3A0x19d5440677c3b3a3!2zQm9jc2thaSDDgWxsYXRlZ8Opc3pzw6lnw7xneWkgQ2VudHJ1bQ!5e0!3m2!1shu!2shu!4v1760900241791!5m2!1shu!2shu"
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>

      </div>
    </section>
  );
}
