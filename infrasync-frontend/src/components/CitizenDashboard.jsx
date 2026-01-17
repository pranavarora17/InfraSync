import { useEffect, useState } from 'react';
import axios from 'axios';
import { MapPin, Calendar, Search, Bell } from 'lucide-react';

const CitizenDashboard = () => {
  const [works, setWorks] = useState([]);
  const [search, setSearch] = useState('');
  const [alertCount, setAlertCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('https://infrasync-backend.onrender.com/api/work-requests');
      setWorks(res.data);
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearch(term);
    // Simple alert counter
    if (term.length > 2) {
      setAlertCount(works.filter(w => w.location.toLowerCase().includes(term.toLowerCase())).length);
    } else {
      setAlertCount(0);
    }
  };

  const filteredWorks = works.filter(w => w.location.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 pb-20 font-sans">

      {/* HEADER SECTION */}
      <div className="text-center mb-10 space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Public Infrastructure Tracker</h1>
        <p className="text-slate-500 text-lg">Check ongoing and upcoming work in your neighborhood</p>

        {/* SEARCH BAR */}
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Enter your Area or Sector (e.g. Sector 62)"
            className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-lg"
            onChange={handleSearch}
          />
        </div>

        {/* ALERT BANNER (Only shows if search matches) */}
        {alertCount > 0 && (
          <div className="max-w-xl mx-auto bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-center justify-center gap-2 text-orange-800 animate-fade-in">
            <Bell size={18} className="fill-orange-800" />
            <span className="font-bold">Alert:</span> {alertCount} project(s) found in this area.
          </div>
        )}
      </div>

      {/* CLEAN CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredWorks.map((work) => (
          <div key={work.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {work.title}
                </h3>
                <span className="text-sm font-semibold text-slate-400">{work.department}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                work.status === 'CONFLICT' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}>
                {work.status === 'CONFLICT' ? 'On Hold' : 'Approved'}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-2 rounded-lg">
                <MapPin size={18} className="text-red-500" />
                <span className="font-medium">{work.location}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-2 rounded-lg">
                <Calendar size={18} className="text-blue-500" />
                <span>{work.startDate} — {work.endDate}</span>
              </div>
            </div>
          </div>
        ))}

        {filteredWorks.length === 0 && (
          <div className="col-span-full text-center py-10 text-slate-400">
            <p>No upcoming work found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CitizenDashboard;