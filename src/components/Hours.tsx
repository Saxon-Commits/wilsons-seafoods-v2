import React from 'react';
import { OpeningHour } from '@/types';

interface HoursProps {
  hours: OpeningHour[];
}

const Hours: React.FC<HoursProps> = ({ hours }) => {
  return (
    <div className="max-w-md mx-auto bg-slate-800 rounded-xl shadow-lg p-6 md:p-8 border border-slate-700">
      <ul className="space-y-4">
        {hours.map((hour) => (
          <li key={hour.day} className="flex justify-between items-center text-lg border-b border-slate-700 pb-4 last:border-b-0 last:pb-0">
            <span className="font-semibold text-slate-300">{hour.day}</span>
            <span className="text-ice-blue font-bold text-xl">{hour.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hours;