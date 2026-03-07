import { Briefcase, MapPin, Clock } from 'lucide-react';
import { Job } from '../../interfaces/JobInterface';
import { Link } from 'react-router-dom';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link to={`/karrier/${job.slug}`} className="group">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 h-full border border-gray-100 hover:border-brandSection hover:-translate-y-1">
        <div className="flex items-start justify-between mb-4">
          <div className="bg-brandHero p-3 rounded-lg group-hover:bg-brandButton transition-colors duration-300">
            <Briefcase className="w-6 h-6 text-stone-950" />
          </div>
          <span className="px-3 py-1 bg-brandHero text-stone-950 rounded-full text-sm font-medium">
            {job.department}
          </span>
        </div>

        <h3 className="text-xl font-bold text-stone-950 mb-2 group-hover:text-stone-950  transition-colors duration-300">
          {job.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {job.summary}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{job.type}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <span className="text-brandButton font-medium text-sm group-hover:text-brandButtonHover inline-flex items-center">
            Részletek megtekintése
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
