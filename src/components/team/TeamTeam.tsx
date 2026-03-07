import { X } from 'lucide-react';
import { useState } from 'react';
import { WPMedia, WPPage } from '../../interfaces/WordpressInterfaces';
import * as LucideIcons from "lucide-react";

const icons = LucideIcons as unknown as Record<string, React.ComponentType<any>>;

type TeamTeamProps = {
  sectionTitle?: WPPage;
  doctorsTitle?: WPPage;
  doctorsList?: WPPage[];
  colleaguesTitle?: WPPage;
  colleagues?: WPPage[];
  //hrTitle?: WPPage;
  //hrcolleagues?: WPPage[];
  media?: WPMedia[];
};

function getImageUrl(mediaList: WPMedia[], id: number) {
  const media = mediaList.find((m) => m.id === id);
  return {
    src: media?.guid?.rendered || "",
    alt: media?.alt_text || "",
  };
}

export default function TeamTeam({ sectionTitle, doctorsTitle, doctorsList, colleaguesTitle, colleagues, /*hrTitle, hrcolleagues,*/ media }: TeamTeamProps) {
  const [selectedMember, setSelectedMember] = useState<WPPage | null>(null);

  const sectionTitleHtml = sectionTitle?.content.rendered?.replace(
    /<h2([^>]*)>/g,
    (match, attrs) =>
      `<h2${attrs.replace(/\sclass="[^"]*"/g, "")} class="text-3xl sm:text-4xl font-bold text-brandHeaderColor mb-4 text-center">`
  )
    .replace(
      /<p([^>]*)>/g,
      (match, attrs) =>
        `<p${attrs.replace(/\sclass="[^"]*"/g, "")} class="text-lg text-brandColor mb-16 text-center max-w-3xl mx-auto">`
    );

  const IconComponentDoctorsTitle = icons[(doctorsTitle?.meta?.icon?.[0] as string) || "Stethoscope"];
  const IconComponentColleaguesTitle = icons[(colleaguesTitle?.meta?.icon?.[0] as string) || "Users"];
  //const IconComponentHRTitle = icons[(hrTitle?.meta?.icon?.[0] as string) || "Crosshair"];

  return (
    <section id="bocskaiteam" className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-brand to-white">
      <div className="max-w-7xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: sectionTitleHtml ?? "" }} />

        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-brandColor mb-10 flex items-center justify-center gap-3">
            {IconComponentDoctorsTitle && (
              <IconComponentDoctorsTitle className="w-6 h-6 text-brandButton" />
            )}
            {doctorsTitle?.title.rendered}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctorsList?.map((doctor, index) => (

              <div
                key={index}
                onClick={() => setSelectedMember(doctor)}
                className={`bg-gradient-to-br ${doctor.meta?.isLeader?.[0] == "1"
                  ? 'from-emerald-50 to-sky-50 border-2 border-emerald-200'
                  : 'from-brand to-white border border-gray-200'
                  } p-8 rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer`}
              >
                <div className="mb-6 flex justify-center">
                  <div className="animate-pulse-soft">

                    <img
                      src={getImageUrl(media ?? [], doctor.featured_media).src}
                      alt={getImageUrl(media ?? [], doctor.featured_media).alt}
                      className={`w-64 h-64 rounded-full object-cover object-[center_top] transition-all duration-300 hover:scale-110 hover:rotate-3 ${doctor.meta?.isLeader?.[0] == "1" ? 'ring-4 ring-brandButton' : 'ring-2 ring-gray-300'
                        }`}
                    />
                  </div>
                </div>

                <h4 className="text-xl font-bold text-brandHeaderColor mb-2 text-center">
                  {doctor.title?.rendered}
                </h4>
                <p className={`text-sm font-medium mb-4 text-center ${doctor.meta?.isLeader?.[0] == "1" ? 'text-brandButtonHover' : 'text-brandColor'
                  }`}>
                  {doctor.meta?.titulus?.[0]}
                </p>

                <div className="space-y-2 text-brandColor">
                  <p className="text-sm leading-relaxed">
                    <span className="font-medium">Szakterület:</span> {doctor.meta?.szakterulet?.[0]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-brandColor mb-10 flex items-center justify-center gap-3">
            {IconComponentColleaguesTitle && (
              <IconComponentColleaguesTitle className="w-6 h-6 text-brandButton" />
            )}
            {colleaguesTitle?.title.rendered}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {colleagues?.map((member, index) => (
              <div
                key={index}
                onClick={() => setSelectedMember(member)}
                className="flex flex-col items-center text-center cursor-pointer group"
              >
                <div className="animate-pulse-soft">
                  <img
                    src={getImageUrl(media ?? [], member.featured_media).src}
                    alt={getImageUrl(media ?? [], member.featured_media).alt}
                    className="w-40 h-40 rounded-full object-cover object-[center_top] ring-2 ring-gray-300 mb-4 group-hover:ring-brandSection group-hover:scale-110 group-hover:-rotate-2 transition-all duration-300"
                  />
                </div>
                <h4 className="text-base font-semibold text-brandHeaderColor mb-1">
                  {member.title.rendered}
                </h4>
                <p className="text-sm text-brandColor">
                  {member.meta?.titulus?.[0]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/*<div>
          <h3 className="text-2xl font-semibold text-brandColor mb-10 flex items-center justify-center gap-3">
            {IconComponentHRTitle && (
              <IconComponentHRTitle className="w-6 h-6 text-brandButton" />
            )}
            <span
              dangerouslySetInnerHTML={{ __html: hrTitle?.title?.rendered ?? '' }}
            />
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {hrcolleagues?.map((member, index) => (
              <div
                key={index}
                onClick={() => setSelectedMember(member)}
                className="flex flex-col items-center text-center cursor-pointer group"
              >
                <div className="animate-pulse-soft">
                  <img
                    src={getImageUrl(media ?? [], member.featured_media).src}
                    alt={getImageUrl(media ?? [], member.featured_media).alt}
                    className="w-40 h-40 rounded-full object-cover object-[center_top] ring-2 ring-gray-300 mb-4 group-hover:ring-brandSection group-hover:scale-110 group-hover:-rotate-2 transition-all duration-300"
                  />
                </div>
                <h4 className="text-base font-semibold text-brandHeaderColor mb-1">
                  {member.title.rendered}
                </h4>
                <p className="text-sm text-brandColor">
                  {member.meta?.titulus?.[0]}
                </p>
              </div>
            ))}
          </div> 
        </div>*/}
      </div>

      {selectedMember && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-brandHeaderColor" >
                {selectedMember.title.rendered}
              </h3>
              <button
                onClick={() => setSelectedMember(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-col items-center mb-6">
                <img
                  src={getImageUrl(media ?? [], selectedMember.featured_media).src}
                  alt={getImageUrl(media ?? [], selectedMember.featured_media).alt}
                  className="w-40 h-40 rounded-full object-cover object-[center_top]  ring-4 ring-brandButton mb-4"
                />
                <p className="text-lg font-medium text-brandHeaderColor">
                  {selectedMember.meta?.titulus?.[0]}
                </p>
                {selectedMember.meta?.szakterulet?.[0] && (
                  <p className="text-sm text-brandHeaderColor mt-1">
                    <span className="font-medium">Szakterület:</span> {selectedMember.meta?.szakterulet?.[0]}
                  </p>
                )}
              </div>

              <div className="prose prose-gray max-w-none">
                <div className="text-brandColor leading-relaxed text-base member-text"
                  dangerouslySetInnerHTML={{ __html: selectedMember.content.rendered }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
