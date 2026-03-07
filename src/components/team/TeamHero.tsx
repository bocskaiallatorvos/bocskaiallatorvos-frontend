import { Heart } from 'lucide-react';

type TeamHeroProps = {
  content?: string;
};

export default function TeamHero({ content }: TeamHeroProps) {

  const modifiedHtml = content?.replace(
    /<h1([^>]*)>/g,
    (match, attrs) =>
      `<h1${attrs.replace(/\sclass="[^"]*"/g, "")} class="text-4xl sm:text-5xl lg:text-6xl font-bold text-brandHeaderColor mb-6 tracking-tight">`
  )
  .replace(
    /<p([^>]*)>/g,
    (match, attrs) =>
      `<p${attrs.replace(/\sclass="[^"]*"/g, "")} class="text-xl sm:text-2xl text-brandColor max-w-3xl mx-auto leading-relaxed">`
  );

  return (
    <section className="relative bg-gradient-to-br from-brand via-white to-white pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-12">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-brandButton p-4 rounded-full animate-pulse-soft">
              <Heart className="w-12 h-12 text-white" fill="white" />
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: modifiedHtml ?? "" }} />
        </div>
      </div>
    </section>
  );
}
