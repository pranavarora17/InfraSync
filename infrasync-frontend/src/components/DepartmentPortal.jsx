import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LayoutDashboard, Plus, MessageSquare, CheckCircle, XCircle,
  Clock, MapPin, Calendar, Send, User, Building2, Bell
} from 'lucide-react';

const DepartmentPortal = () => {
  const [works, setWorks] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedWork, setSelectedWork] = useState(null); // The selected project for right panel
  const [newMessage, setNewMessage] = useState('');

  // Get current user (Default to Water Dept for demo)
  const currentUser = JSON.parse(localStorage.getItem('user')) || { department: 'Water Dept' };

  const [formData, setFormData] = useState({
    title: '', department: currentUser.department, location: '', startDate: '', endDate: ''
  });

  useEffect(() => { fetchWorks(); }, []);

  const fetchWorks = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/work-requests');
      setWorks(res.data.reverse()); // Newest first
    } catch (err) { console.error(err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/api/work-requests', {
      ...formData,
      status: 'Under Review',
      collaborationLog: `[System]: Proposal initiated by ${currentUser.department}.`
    });
    alert("Proposal Submitted to Ministry Portal");
    fetchWorks();
    setActiveTab('dashboard');
  };

  const handleApproval = async (workId, status) => {
    await axios.put(`http://localhost:8080/api/work-requests/${workId}/approve?department=${currentUser.department}&status=${status}`);

    // Update local state immediately for better UX
    const updatedWorks = works.map(w => {
      if (w.id === workId) {
        w.departmentApprovals[currentUser.department] = status;
      }
      return w;
    });
    setWorks([...updatedWorks]);

    // If this work is currently selected, update it too
    if (selectedWork && selectedWork.id === workId) {
      setSelectedWork({ ...selectedWork, departmentApprovals: { ...selectedWork.departmentApprovals, [currentUser.department]: status }});
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedWork) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const logEntry = `\n[${timestamp}] ${currentUser.department}: ${newMessage}`;

    const updatedWork = { ...selectedWork, collaborationLog: (selectedWork.collaborationLog || "") + logEntry };

    // UI Update
    setSelectedWork(updatedWork);
    setWorks(works.map(w => w.id === selectedWork.id ? updatedWork : w));
    setNewMessage("");

    // Backend Save
    await axios.post('http://localhost:8080/api/work-requests', updatedWork);
  };

  // Helper to render status badges
  const renderStatusBadge = (status) => {
    if (status === 'APPROVED') return <span className="flex items-center gap-1 text-green-700 font-bold text-xs"><CheckCircle size={12}/> Approved</span>;
    if (status === 'REJECTED') return <span className="flex items-center gap-1 text-red-700 font-bold text-xs"><XCircle size={12}/> Rejected</span>;
    if (status === 'CREATOR') return <span className="text-slate-400 font-bold text-xs">Owner</span>;
    return <span className="flex items-center gap-1 text-orange-600 font-bold text-xs"><Clock size={12}/> Pending</span>;
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">

      {/* SIDEBAR: Official Government Style */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed h-full border-r border-slate-800 z-10 shadow-xl">
        <div className="p-6 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2 text-white mb-2">
            <Building2 size={20} className="text-orange-500"/>
            <span className="font-bold tracking-tight"></span>
          </div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Logged in as</div>
          <div className="text-sm font-bold text-blue-200">{currentUser.department}</div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-blue-900 text-white border-l-4 border-blue-500' : 'hover:bg-slate-800 hover:text-white'}`}>
            <LayoutDashboard size={18} /> Active Approvals
          </button>
          <button onClick={() => setActiveTab('new-request')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded text-sm font-medium transition-colors ${activeTab === 'new-request' ? 'bg-blue-900 text-white border-l-4 border-blue-500' : 'hover:bg-slate-800 hover:text-white'}`}>
            <Plus size={18} /> New Proposal
          </button>
        </nav>

        <div className="p-4 bg-slate-950 text-xs text-slate-500 border-t border-slate-800">
          Official use only. <br/> Ministry of Urban Development.
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 p-8">

        {/* HEADER */}
        <div className="mb-8 flex justify-between items-end border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {activeTab === 'dashboard' ? 'Inter-Departmental Coordination' : 'Submit Work Proposal'}
            </h1>
            <p className="text-sm text-slate-500 mt-1">Zone 1 Administration</p>
          </div>
          <div className="bg-white px-4 py-2 border rounded-full text-sm font-bold text-slate-600 flex items-center gap-2 shadow-sm">
             <Bell size={16} className="text-orange-500" /> Notifications
          </div>
        </div>

        {/* DASHBOARD VIEW */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* LEFT: Project List */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide">Pending Proposals</h2>
              {works.map((work) => (
                <div
                  key={work.id}
                  onClick={() => setSelectedWork(work)}
                  className={`cursor-pointer p-5 rounded border shadow-sm transition-all hover:shadow-md ${selectedWork?.id === work.id ? 'bg-blue-50 border-blue-300 ring-1 ring-blue-300' : 'bg-white border-slate-200'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-slate-800 text-lg">{work.title}</h3>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200 font-bold">{work.department}</span>
                  </div>
                  <div className="text-sm text-slate-500 flex gap-4">
                    <span className="flex items-center gap-1"><MapPin size={14}/> {work.location}</span>
                    <span className="flex items-center gap-1"><Calendar size={14}/> {work.startDate}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT: Detail Panel (Approvals & Chat) */}
            <div className="h-[calc(100vh-12rem)] sticky top-8">
              {selectedWork ? (
                <div className="bg-white h-full rounded border border-slate-200 shadow-lg flex flex-col">

                  {/* PANEL HEADER */}
                  <div className="p-4 bg-slate-50 border-b border-slate-200">
                    <h3 className="font-bold text-slate-800">{selectedWork.title}</h3>
                    <p className="text-xs text-slate-500">Proposal ID: #{selectedWork.id}</p>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-6">

                    {/* APPROVAL MATRIX */}
                    <div className="bg-slate-50 p-4 rounded border border-slate-200">
                      <h4 className="text-xs font-bold text-slate-500 uppercase mb-3 border-b border-slate-200 pb-2">Approval Status</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {selectedWork.departmentApprovals && Object.entries(selectedWork.departmentApprovals).map(([dept, status]) => (
                          <div key={dept} className="flex justify-between items-center bg-white p-2 rounded border border-slate-100 text-sm">
                            <span className="text-slate-700 font-medium">{dept}</span>
                            {renderStatusBadge(status)}
                          </div>
                        ))}
                      </div>

                      {/* ACTION BUTTONS (Only show if needed) */}
                      {selectedWork.department !== currentUser.department && selectedWork.departmentApprovals[currentUser.department] === 'PENDING' && (
                        <div className="mt-4 pt-4 border-t border-slate-200 flex gap-2">
                          <button onClick={() => handleApproval(selectedWork.id, 'APPROVED')} className="flex-1 bg-green-600 text-white py-2 rounded font-bold text-sm hover:bg-green-700 transition shadow-sm">
                            Authorize Work
                          </button>
                          <button onClick={() => handleApproval(selectedWork.id, 'REJECTED')} className="flex-1 bg-red-600 text-white py-2 rounded font-bold text-sm hover:bg-red-700 transition shadow-sm">
                            Reject
                          </button>
                        </div>
                      )}
                    </div>

                    {/* CHAT / LOGS */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase mb-3 flex items-center gap-2">
                        <MessageSquare size={14}/> Coordination Log
                      </h4>
                      <div className="bg-slate-50 border border-slate-200 rounded h-64 overflow-y-auto p-3 space-y-3 mb-3">
                         {selectedWork.collaborationLog?.split('\n').map((msg, idx) => {
                            if (!msg) return null;
                            const isSystem = msg.includes('[System]');
                            const isMe = msg.includes(currentUser.department);
                            return (
                              <div key={idx} className={`text-sm p-2 rounded border ${isSystem ? 'bg-slate-100 text-slate-500 italic text-xs' : isMe ? 'bg-blue-50 border-blue-100 text-slate-700 ml-4' : 'bg-white border-slate-200 mr-4'}`}>
                                {msg.replace('[System]:', '')}
                              </div>
                            )
                         })}
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type an official remark..."
                          className="flex-1 border border-slate-300 rounded p-2 text-sm focus:border-blue-900 outline-none"
                        />
                        <button onClick={handleSendMessage} className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800">
                          <Send size={16}/>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ) : (
                <div className="h-full border-2 border-dashed border-slate-200 rounded bg-slate-50 flex flex-col items-center justify-center text-slate-400">
                  <LayoutDashboard size={48} className="opacity-20 mb-2"/>
                  <p className="font-medium">Select a proposal to view details</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* NEW REQUEST FORM */}
        {activeTab === 'new-request' && (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold mb-6 text-slate-800 border-b border-slate-100 pb-4">New Work Proposal</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Project Title</label>
                <input type="text" className="w-full p-2 border border-slate-300 rounded focus:border-blue-900 outline-none"
                  onChange={e => setFormData({...formData, title: e.target.value})} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Location</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded focus:border-blue-900 outline-none"
                    onChange={e => setFormData({...formData, location: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Department</label>
                  <input type="text" value={currentUser.department} disabled className="w-full p-2 border border-slate-200 bg-slate-50 rounded text-slate-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Start Date</label>
                  <input type="date" className="w-full p-2 border border-slate-300 rounded"
                    onChange={e => setFormData({...formData, startDate: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">End Date</label>
                  <input type="date" className="w-full p-2 border border-slate-300 rounded"
                    onChange={e => setFormData({...formData, endDate: e.target.value})} required />
                </div>
              </div>
              <button className="w-full bg-blue-900 text-white p-3 rounded font-bold hover:bg-blue-800 transition shadow-lg mt-4">
                Submit for Approval
              </button>
            </form>
          </div>
        )}

      </main>
    </div>
  );
};

export default DepartmentPortal;