import TeamHero from '../components/team/TeamHero';
import TeamAbout from '../components/team/TeamAbout';
import TeamFacility from '../components/team/TeamFacility';
import TeamTeam from '../components/team/TeamTeam';
import { useCms } from '../context/CmsContext';

export default function OurTeamPage() {
  const { pages, media, error } = useCms();

  if (error) return <p>Hiba: {error}</p>;

  const heroSection = pages.find((p) => ["rolunk-hero"].includes(p.slug));
  const aboutSection = pages.find((p) => ["rolunk-bemutatkozas"].includes(p.slug));
  const teamSection = pages.find((p) => ["rolunk-csapatunk"].includes(p.slug));
  const doctorsSection = pages.find((p) => ["rolunk-allatorvosaink"].includes(p.slug));
  const ourDoctors = pages.filter((p) => p.parent === 187);
  const ourColleaguesSection = pages.find((p) => ["rolunk-munkatarsaink"].includes(p.slug));
  const ourColleagues = pages.filter((p) => p.parent === 204);
  const hrColleaguesSection = pages.find((p) => ["rolunk-hr"].includes(p.slug));
  const hrColleagues = pages.filter((p) => p.parent === 431);

  return (
    <div className="">
      <TeamHero content={heroSection?.content.rendered} />
      <TeamAbout content={aboutSection} />
      <TeamTeam 
          sectionTitle={teamSection} 
          doctorsTitle={doctorsSection} 
          doctorsList={ourDoctors} 
          colleaguesTitle={ourColleaguesSection} 
          colleagues={ourColleagues}
          hrTitle={hrColleaguesSection} 
          hrcolleagues={hrColleagues}
          media={media} />
      <TeamFacility />
    </div>
  );
}