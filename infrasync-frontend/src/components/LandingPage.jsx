import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Activity, Users, Building, MousePointer2 } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="bg-white">
      {/* --- TOP BANNER (Hero) --- */}
      <div className="relative bg-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">

          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-800/50 border border-blue-700 px-3 py-1 rounded text-sm text-blue-200">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Official Portal for Infrastructure Coordination
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold leading-tight">
              Building Cities <br/>
              <span className="text-orange-400">Without Conflicts.</span>
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed max-w-xl">
              InfraSync creates a unified digital bridge between Public Works, Water, Gas, and Telecom departments to prevent road re-digging and save public funds.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/login" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded font-bold shadow-lg shadow-orange-900/20 transition-all flex items-center gap-2">
                Department Login <ArrowRight size={18} />
              </Link>
              <Link to="/login" className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-3 rounded font-bold transition-all flex items-center gap-2">
                Citizen Dashboard <MousePointer2 size={18} />
              </Link>
            </div>
          </div>

          {/* Abstract Emblem/Graphic */}
          <div className="hidden md:block opacity-90">
             <Building size={300} strokeWidth={0.5} className="text-blue-400/20" />
          </div>
        </div>

        {/* Ticker Tape */}
        <div className="bg-blue-950 text-blue-200 text-sm py-2 px-4 overflow-hidden whitespace-nowrap">
          <p className="animate-marquee inline-block">
            📢 Notice: All departments must register works 15 days in advance. | 🌧️ Monsoon Alert: Road repairs suspended in Sector 62. | 🚜 New Project: Metro expansion approved in Phase 3.
          </p>
        </div>
      </div>

      {/* --- SERVICES CARDS --- */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">E-Governance Services</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard
            icon={<ShieldCheck className="w-12 h-12 text-blue-600" />}
            title="Conflict Detection System"
            desc="Automated AI checks to prevent overlapping infrastructure projects."
          />
          <ServiceCard
            icon={<Activity className="w-12 h-12 text-green-600" />}
            title="Real-Time Synchronization"
            desc="Live tracking of public works across city zones for officials."
          />
          <ServiceCard
            icon={<Users className="w-12 h-12 text-orange-600" />}
            title="Citizen Transparency"
            desc="Public access to ongoing work schedules and completion timelines."
          />
        </div>
      </div>

      {/* --- STATS STRIP --- */}
      <div className="bg-slate-100 border-y border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-around text-center gap-8">
          <StatBox number="120+" label="Departments Onboarded" />
          <StatBox number="450+" label="Conflicts Resolved" />
          <StatBox number="₹ 20Cr" label="Public Funds Saved" />
          <StatBox number="1.2M" label="Citizens Benefited" />
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 group">
    <div className="mb-6 bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center group-hover:bg-white border border-slate-100 group-hover:border-blue-100 transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed text-sm">{desc}</p>
  </div>
);

const StatBox = ({ number, label }) => (
  <div>
    <h4 className="text-4xl font-bold text-blue-900 mb-2">{number}</h4>
    <p className="text-slate-600 font-medium uppercase tracking-wide text-xs">{label}</p>
  </div>
);

export default LandingPage;