import { WPPage } from "../../interfaces/WordpressInterfaces";

type TeamAboutProps = {
  content?: WPPage;
};

export default function TeamAbout({ content }: TeamAboutProps) {

  const modifiedHtml = content?.content.rendered
    .replace(
      /<p([^>]*)>/g,
      (match, attrs) =>
        `<p${attrs.replace(/\sclass="[^"]*"/g, "")} class="text-lg">`
    );

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-brandColor mb-12 text-center">
          {content?.title.rendered}
        </h2>

        <div className="bg-brandSection border-l-4 border-brandButton p-6 rounded-r-lg">
          <p className="text-lg sm:text-xl font-medium text-gray-900 mb-3">
            {content?.meta?.rolunk_idezet}
          </p>
        </div>

        <div className="space-y-8 mt-12 text-brandColor leading-relaxed text-lg"
          dangerouslySetInnerHTML={{ __html: modifiedHtml ?? "" }} />
      </div>
    </section>
  );
}
