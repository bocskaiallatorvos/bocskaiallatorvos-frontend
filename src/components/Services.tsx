import { ShieldPlus, Pipette , Scissors, HeartPulse, MonitorCloud, Cat } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: ShieldPlus,
    title: 'Bőrgyógyászati szakrendelés',
    description: ' Kutyák és macskák teljes körű bőrgyógyászati ellátása hivatalosan elismert bőrgyógyász szakállatorvos által.',
  },
  {
    icon: HeartPulse,
    title: 'Kardiológiai szakrendelés',
    description: 'Kardiológiai betegségek diagnosztikája és kezelése: szívultrahang, EKG, vérnyomásmérés.  Kiemelt figyelmet fordítunk a szívférgesség megelőzésére, kivizsgálására, kezelésére.',
  },
  {
    icon: Cat,
    title: 'Fogászati szakrendelés',
    description: 'Teljes körű fogászati ellátás korszerű fogászati röntgennel, tapasztalt és magas szintű szaktudással rendelkező állatorvos által.',
  },  
  {
    icon: MonitorCloud,
    title: 'Képalkotó diagnosztika',
    description: 'Ultrahang, endoszkópia, röntgen – modern képalkotás a lehető legpontosabb diagnózisért.',
  },
  {
    icon: Pipette,
    title: 'Laborvizsgálatok',
    description: 'Pontos és megbízható diagnosztikai eredmények világszínvonalú IDEXX technológiával.',
  },
  {
    icon: Scissors,
    title: 'Sebészeti ellátás',
    description: 'Modern eszközökkel felszerelt műtő, ivartalanítás és egyéb tervezett vagy sürgősségi lágysebészeti műtétek.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brandHeaderColor  mb-4">Szolgáltatásaink</h2>
          <p className="text-lg text-brandColor  max-w-2xl mx-auto">
            Komplett állatorvosi ellátást biztosítunk kedvenceinek, a megelőzéstől a gyógyításig.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-brand to-stone-50 p-8 rounded-xl hover:shadow-xl transition group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-brandButton w-14 h-14 rounded-lg flex items-center justify-center group-hover:scale-110 transition flex-shrink-0">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-brandHeaderColor">{service.title}</h3>
              </div>
              <p className="text-brandColor leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="pt-10 flex justify-center">
          <Link to="/szolgaltatasok" 
          className="text-brandButton hover:text-brandButtonHover hover:animate-shake transition">Minden szolgáltatás &#8594;</Link>
        </div>
      </div>
    </section>
  );
}
