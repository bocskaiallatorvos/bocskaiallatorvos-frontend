import { Scissors, Microscope, Cat, Pill, Scan, DoorOpen } from 'lucide-react';

const facilities = [
  {
    icon: Scan,
    title: 'Fogászati röntgen, ultrahang, endoszkóp',
    description: 'Korszerű diagnosztikai berendezések a precíz diagnózishoz'
  },
  {
    icon: Microscope,
    title: 'Saját labor',
    description: 'Pontos és megbízható diagnosztikai eredmények világszínvonalú IDEXX technológiával'
  },
  {
    icon: Scissors,
    title: 'Műtő',
    description: 'Modern eszközökkel felszerelt műtő a biztonságos beavatkozásokhoz'
  },
  {
    icon: DoorOpen,
    title: 'Két vizsgálóhelyiség',
    description: 'Modern, jól felszerelt vizsgálóhelyiségek a kényelmes ellátásért'
  },
  {
    icon: Cat,
    title: 'Cicabarát váróhelyiség',
    description: 'Tágas és barátságos váróterem elkülönített cicabarát résszel, a stresszmentes várakozásért'
  },
  {
    icon: Pill,
    title: 'Állatgyógyszertár',
    description: 'Szabadforgalmú és vényköteles állatgyógyászati készítmények egy helyen. '
  }
];

export default function Facility() {
  return (
    <section className="pb-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-brandHeaderColor mb-4 text-center">
          Rendelőnk felszereltsége
        </h2>
        <p className="text-lg text-brandColor mb-12 text-center max-w-3xl mx-auto">
          Modern eszközeinkkel és átgondolt kialakításunkkal biztosítjuk kedvencei számára a legmagasabb színvonalú ellátást
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="bg-brandButton w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-white flex-shrink-0" />
                  </div>
                  <h3 className="text-xl font-semibold text-brandHeaderColor">
                    {facility.title}
                  </h3>
                </div>
                <p className="text-brandColor leading-relaxed">
                  {facility.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
