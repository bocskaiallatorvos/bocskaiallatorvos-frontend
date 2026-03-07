import { Star, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const googleReviews = [
  {
    name: 'András Andrejkovics',
    rating: 5,
    text: 'Nagyon jó csapat! Segítőkészek, kedvesek, türelmesek! Látszik, hogy imádják, szeretik az állatokat! Jól felszerelt rendelők. Tiszta. Évek óta odajárunk és oda is fogunk! Gratulálunk! Így tovább!',
    date: '2025. július',
  },
  {
    name: 'Rácz Anett',
    rating: 5,
    text: 'Dr. Balogh-Bakos Nórához kerültünk a 12 éves yorkimmal, rendkívül lelkiismeretes orvos, rengeteg vizsgálatot csinált, hogy kizárhassunk mindent, kicsit féltem is tőle, hogy egy vagyont fogunk fizetni, de meglepődésemre egyáltalán nem így volt, úgyhogy csak ajánlani tudom a helyet is és a doktornőt is. Köszönöm, hogy egyből foglalkoztak a kutyámmal és most már nagyon jól van 😊',
    date: '2025. augusztus',
  },
  {
    name: 'Balogh Emese',
    rating: 5,
    text: 'faggyúmirígy gyulladásos, 23kg, 80%-ban kopasz, gyulladt bőrű, sebes Akitánkat úgy helyre sikerült hozni Dr Kuczmog Zita bőrgyógyász specialista tanácsai segítségével, h. most 54kg, vastag, gyönyörű, dupla bundás egészséges kinézetű fiú lett belőle, egyáltalán nem látszik rajta, h. gyógyíthatatlan bőrbeteg. legprofibb csapat, örökké hálásak leszünk nekik',
    date: '2024. november',
  },
];

const facebookReviews = [
  {
    name: 'Regőczi János',
    rating: 5,
    text: 'Maximális empátia,maximális szakmai tudás!!!! Mindenkinek csak ajánlani tudom,Fekete Zoltán doktor urat,és kedves csapatát,teljesen felszerelt rendelőjét!!! Nagyon köszönjük a segítséget,Diego és családja!!!',
    date: '2025. szeptember',
  },
  {
    name: 'Szűcs Fuzsina',
    rating: 5,
    text: 'A legjobb hely ahova kerülhettünk ! Nagyon hálás vagyok Bakos doktornőnek és az egész csapatnak ❤️maximális szakértelem és empátia 🐾❤️',
    date: '2025. március',
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brandHeaderColor mb-4">Ügyfeleink véleménye</h2>
          <p className="text-lg text-brandColor max-w-2xl mx-auto">
            Büszkék vagyunk rá, hogy elégedett pácienseink ezrei bíznak teljes körű állatorvosi ellátásunkban.
          </p>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-3">
              <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <Link
                title="További vélemények a Bocskai Állategészségügyi Centrumról Google-ön"
                target="_blank"
                to="https://www.google.com/search?sa=X&sca_esv=527cd381b4601833&tbm=lcl&sxsrf=AE3TifNud03-GAwTUqykZhGPrBodfykeWQ:1762198926760&q=Bocskai+%C3%81llateg%C3%A9szs%C3%A9g%C3%BCgyi+Centrum+V%C3%A9lem%C3%A9nyek&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxI2tDAzNDGzsDA0NTU1NzY3sbAw3sDI-IrRyCk_uTg7MVPhcGNOTmJJavrhlcVVxYdXph_ek16ZqeCcmldSVJqrEHZ4ZU5q7uGVeZWp2YtYydAEAK-UvE6EAAAA&rldimm=1861468815557374883&hl=hu-HU&ved=2ahUKEwinkrbI3taQAxWl-LsIHa8pARgQ9fQKegQIShAF&cshid=1762199158642807&biw=1536&bih=695&dpr=1.25#lkt=LocalPoiReviews" 
                className="font-bold text-brandColor">Google Vélemények</Link>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-brandHeaderColor">4.9/5</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {googleReviews.map((review, index) => (
              <div key={index} className="bg-gradient-to-br from-brand to-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <div className="font-bold text-brandColor">{review.name}</div>
                    <div className="text-sm text-brandHeaderColor">{review.date}</div>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-brandColor leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-center mb-8">
            <div className="bg-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-3">
              <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center">
                <Facebook className="w-5 h-5 text-white" />
              </div>
              <Link
                title="További vélemények a Bocskai Állategészségügyi Centrumról Facebookon"
                target="_blank"
                to="https://www.facebook.com/bocskaiallatorvos/reviews" 
                className="font-bold text-brandColor">Facebook Vélemények</Link>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-brandHeaderColor">5.0/5</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {facebookReviews.map((review, index) => (
              <div key={index} className="bg-gradient-to-br from-brand to-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <div className="font-bold text-brandColor">{review.name}</div>
                    <div className="text-sm text-brandHeaderColor">{review.date}</div>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-brandColor leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
