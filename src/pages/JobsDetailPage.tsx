import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Job } from '../interfaces/JobInterface';
import JobApplicationForm from '../components/JobApplicationForm';
import { ArrowLeft, MapPin, Briefcase, Calendar, Building2, Loader2 } from 'lucide-react';

const jobsList = [
    {
        id: "1",
        title: "Állatorvosi asszisztens",
        slug: "allatorvosi-asszisztens-teljes-munkaido",
        location: "Bocskaikert",
        type: "Teljes munkaidő, beosztás szerint",
        department: "Asszisztens",
        summary: "Csatlakozz dinamikusan fejlődő csapatunkhoz senior frontend fejlesztőként! Modern technológiákkal dolgozunk, és innovatív projekteken vehetsz részt.",
        description: `Csapatunk egy tapasztalt Senior Frontend Fejlesztőt keres, aki szenvedélyesen foglalkozik a modern webes technológiákkal és szeret kihívásokkal teli projekteken dolgozni.

<b>Fő feladatok:</b>
• Modern, reszponzív webes alkalmazások tervezése és fejlesztése React és TypeScript használatával
• Szoros együttműködés a UX/UI csapattal a tökéletes felhasználói élmény biztosítása érdekében
• Kód review és mentorálás junior fejlesztők számára
• Teljesítményoptimalizálás és legjobb gyakorlatok alkalmazása
• Részvétel az architektúra tervezésében és technológiai döntésekben

<b>Elvárások:</b>
• Minimum 5 év tapasztalat frontend fejlesztésben
• Magas szintű React és TypeScript tudás
• Modern CSS keretrendszerek ismerete (Tailwind, CSS Modules, stb.)
• REST API-k és state management megoldások használata
• Git verziókezelés magabiztos használata
• Kiváló kommunikációs készség magyarul és angolul

<b>Előny:</b>
• Next.js vagy más SSR framework tapasztalat
• GraphQL ismerete
• Testing library és end-to-end teszt tapasztalat
• CI/CD folyamatok ismerete

<b>Amit kínálunk:</b>
• Versenyképes fizetés és cafeteria
• Hibrid munkavégzés lehetősége
• Folyamatos képzési és fejlődési lehetőségek
• Modern eszközök és technológiák
• Támogató, szakmailag erős csapat
• Nemzetközi projekteken való részvétel`,
        postedDate: "2026-01-25"
    },
    {
        id: "2",
        title: "Állatorvosi asszisztens",
        slug: "allatorovosi-asszisztens-4-oras-munkaido",
        location: "Bocskaikert",
        type: "4 órás munkaidő",
        department: "Asszisztens",
        summary: "Keresünk egy lelkes backend fejlesztőt, aki szeretne része lenni egy ambiciózus projektnek és modern backend technológiákkal dolgozni.",
        description: `Csapatunk egy motivált Backend Fejlesztőt keres, aki szeretne skálázható és megbízható rendszerek építésében részt venni.

<b>Fő feladatok:</b>
• RESTful API-k tervezése és implementálása
• Adatbázis-sémák tervezése és optimalizálása
• Microservice-ek fejlesztése és karbantartása
• Teljesítmény monitorozás és optimalizálás
• Biztonsági best practice-ek alkalmazása
• Dokumentáció készítése és karbantartása

<b>Elvárások:</b>
• Minimum 3 év tapasztalat backend fejlesztésben
• Node.js és TypeScript magas szintű ismerete
• SQL és NoSQL adatbázisok használata (PostgreSQL, MongoDB)
• RESTful API tervezési elvek ismerete
• Docker és konténerizáció alapjai
• Tiszta kód írása és a SOLID elvek alkalmazása

<b>Előny:</b>
• Supabase vagy Firebase tapasztalat
• Kubernetes ismerete
• Message queue rendszerek használata (RabbitMQ, Redis)
• GraphQL API fejlesztés
• AWS vagy más cloud platform ismerete

<b>Amit kínálunk:</b>
• Növekedési lehetőségek
• Rugalmas munkaidő
• Home office lehetőség
• Képzési költségek támogatása
• Csapatépítő programok
• Ingyenes snackek és italok az irodában`,
        postedDate: "2026-01-28"
    },
    {
        id: "3",
        title: "Recepciós",
        slug: "recepcios-6-oras-munkaido",
        location: "Bocskaikert",
        type: "6 órás munkaidő",
        department: "Adminisztráció",
        summary: "Kreatív UX/UI designert keresünk, aki képes a felhasználói élményt a középpontba helyezni és lenyűgöző digitális termékeket alkotni.",
        description: `Keresünk egy tapasztalt UX/UI Designert, aki szenvedélyesen foglalkozik a felhasználóközpontú tervezéssel és innovatív megoldásokkal.

<b>Fő feladatok:</b>
• Felhasználói kutatások tervezése és lebonyolítása
• Wireframe-ek és prototípusok készítése
• Vizuális design rendszerek létrehozása és karbantartása
• User flow-k és information architecture tervezése
• Együttműködés a fejlesztő csapattal az implementáció során
• Usability tesztek tervezése és értékelése

<b>Elvárások:</b>
• Minimum 4 év tapasztalat UX/UI design területen
• Figma vagy hasonló design tool magas szintű ismerete
• Portfólió, amely bemutatja a korábbi munkákat
• Design rendszerek és komponens library-k készítése
• Responsive és adaptive design elvek ismerete
• Színelmélet és tipográfia mélyreható ismerete

<b>Előny:</b>
• HTML/CSS alapismeretek
• Animáció és motion design készségek
• Accessibility (WCAG) standardok ismerete
• Design thinking workshop facilitálási tapasztalat
• Illusztráció vagy grafikai készségek

<b>Amit kínálunk:</b>
• Inspiráló munkakörnyezet
• Legújabb design eszközök és szoftverek
• Konferenciákon való részvétel
• Creative freedom a projektekben
• Nemzetközi design közösség
• Vonzó bérezés és juttatások`,
        postedDate: "2026-01-20"
    },
    {
        id: "4",
        title: "Általános állatorvos",
        slug: "altalanos-allatorvos-teljes-munkaido",
        location: "Bocskaikert",
        type: "Teljes munkaidő, váltott munkarend",
        department: "Állatorvos",
        summary: "Tapasztalt DevOps engineer-t keresünk, aki segít automatizálni és optimalizálni a fejlesztési és deployment folyamatainkat.",
        description: `Innovatív csapatunkhoz keresünk egy tapasztalt DevOps Engineer-t, aki segít modernizálni infrastruktúránkat és optimalizálni CI/CD folyamatainkat.

<b>Fő feladatok:</b>
• CI/CD pipeline-ok tervezése és karbantartása
• Infrastruktúra mint kód (IaC) implementálása
• Konténerizált alkalmazások orchestrációja
• Monitoring és logging rendszerek üzemeltetése
• Biztonsági audit-ok és compliance ellenőrzések
• Incidens kezelés és troubleshooting
• Automation scriptek írása és karbantartása

<b>Elvárások:</b>
• Minimum 4 év tapasztalat DevOps/SRE területen
• Kubernetes és Docker haladó szintű ismerete
• CI/CD eszközök használata (GitHub Actions, GitLab CI, Jenkins)
• Cloud platformok ismerete (AWS, GCP, vagy Azure)
• Infrastructure as Code (Terraform, CloudFormation)
• Linux rendszeradminisztráció
• Scripting nyelvek (Bash, Python)

<b>Előny:</b>
• Helm charts készítése
• Service mesh technológiák (Istio, Linkerd)
• Prometheus és Grafana monitorozás
• Security scanning és vulnerability management
• Multi-cloud architektúra tapasztalat

<b>Amit kínálunk:</b>
• 100% remote munkavégzés
• Magas szintű technológiai stack
• Certifikációk támogatása
• Rugalmas munkaidő
• Nemzetközi projektek
• Versenyképes kompenzáció`,
        postedDate: "2026-01-22"
    },
    {
        id: "5",
        title: "Iroda koordinátor",
        slug: "iroda-koordinator-4-oras-munkaido",
        location: "Bocskaikert",
        type: "4 órás munkaidő",
        department: "Adminisztráció",
        summary: "Stratégiai gondolkodású Product Manager-t keresünk, aki képes összekapcsolni az üzleti célokat a fejlesztői megvalósítással.",
        description: `Dinamikusan növekvő termékcsapatunkhoz keresünk egy tapasztalt Product Manager-t, aki vízióval és adatvezérelt megközelítéssel dolgozik.

<b>Fő feladatok:</b>
• Product roadmap tervezése és priorizálása
• User story-k és követelmények megfogalmazása
• Stakeholder management és kommunikáció
• Product backlog kezelése és grooming
• A/B tesztek tervezése és kiértékelése
• Versenyelemzés és piackutatás
• KPI-k definiálása és nyomon követése
• Sprint planning és review meetingek vezetése

<b>Elvárások:</b>
• Minimum 5 év tapasztalat product management szerepkörben
• Agile/Scrum módszertanok mélyreható ismerete
• Analitikus gondolkodás és adatvezérelt döntéshozatal
• Kiváló stakeholder management készségek
• Technológiai háttérismeret vagy affinitás
• Kiváló kommunikációs képesség magyarul és angolul

<b>Előny:</b>
• Product Management certifikációk (CSPO, CPM)
• SaaS termékek tapasztalata
• B2B enterprise software ismerete
• UX research módszertan ismerete
• SQL és analytics eszközök használata

<b>Amit kínálunk:</b>
• Stratégiai döntésekben való részvétel
• Valódi impact a termékre
• Támogató, multidiszciplináris csapat
• Nemzetközi ügyfélkör
• Folyamatos fejlődési lehetőségek
• Prémium kategóriás juttatási csomag`,
        postedDate: "2026-01-18"
    }
];

export default function JobDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const data = jobsList.find(job => job.slug === slug) || null;
        setJob(data);
      } catch (err) {
        setError('Hiba történt az álláshirdetés betöltése során');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (loading) {
    return (
      <section id="jobDetail" className="min-h-screen bg-gradient-to-b from-brand to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-700">Betöltés...</p>
        </div>
      </section>
    );
  }

  if (error || !job) {
    return (
      <section id="jobDetail" className="min-h-screen bg-gradient-to-b from-brand to-white flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <p className="text-red-600 mb-4">{error || 'Álláshirdetés nem található'}</p>
          <Link
            to="/karrier"
            className="inline-flex font-medium items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Vissza az álláshirdetésekhez
          </Link>
        </div>
      </section>
    );
  }

  const formatDescription = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.includes('<b>') && line.includes('</b>')) {
        const parts = line.split(/(<b>.*?<\/b>)/g);
        return (
          <p key={index} className="mb-3">
            {parts.map((part, i) => {
              if (part.startsWith('<b>') && part.endsWith('</b>')) {
                const boldText = part.replace(/<\/?b>/g, '');
                return (
                  <strong key={i} className="font-bold text-gray-900">
                    {boldText}
                  </strong>
                );
              }
              return <span key={i}>{part}</span>;
            })}
          </p>
        );
      }
      if (line.startsWith('•')) {
        return (
          <li key={index} className="ml-4 mb-2 text-gray-700">
            {line.substring(1).trim()}
          </li>
        );
      }
      if (line.trim() === '') {
        return <div key={index} className="h-4" />;
      }
      return (
        <p key={index} className="mb-3 text-gray-700">
          {line}
        </p>
      );
    });
  };

  return (
    <>
      <section id="jobDetail" className="py-20 min-h-screen bg-gradient-to-b from-brand to-white">
        <div className="bg-brandColor text-white py-8 shadow-lg">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/karrier"
              className="inline-flex font-medium items-center text-brandButton hover:text-white transition-colors mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Vissza az álláshirdetésekhez
            </Link>
            <h1 className="text-4xl font-bold mb-4 animate-fade-in">{job.title}</h1>
            <div className="flex flex-wrap gap-4 ">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center">
                <Building2 className="w-5 h-5 mr-2" />
                <span>{job.department}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>Közzétéve: {new Date(job.postedDate).toLocaleDateString('hu-HU')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8 animate-slide-up">
                <div className="prose prose-lg max-w-none">
                  <div className="text-xl text-gray-700 mb-8 pb-8 border-b border-gray-200">
                    {job.summary}
                  </div>
                  <div className="space-y-2">
                    {formatDescription(job.description)}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8 animate-slide-up">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Érdekel ez a pozíció?
                </h3>
                <p className="text-gray-700 mb-6">
                  Jelentkezz most és csatlakozz csapatunkhoz!
                </p>
                {/*<button
                  onClick={() => setShowApplicationForm(true)}
                  className="w-full bg-brandButton text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-brandButtonHover transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Jelentkezem
                </button>*/}
                <a 
                href="mailto:info@bocskaiallatorvos.hu"
                className="w-full bg-brandButton text-white py-4 px-6 rounded-lg font-bold text-base hover:bg-brandButtonHover transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >info@bocskaiallatorvos.hu</a>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Állás információk</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Típus:</span>
                      <span className="font-medium text-gray-900">{job.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Pozíció:</span>
                      <span className="font-medium text-gray-900">{job.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Helyszín:</span>
                      <span className="font-medium text-gray-900">{job.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showApplicationForm && (
        <JobApplicationForm
          jobTitle={job.title}
          onClose={() => setShowApplicationForm(false)}
        />
      )}
    </>
  );
}
