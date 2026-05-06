import { useState, useEffect } from 'react';
import { 
  Users, 
  Landmark, 
  DollarSign, 
  ArrowUpRight, 
  Clock, 
  ShieldCheck,
  UserCheck,
  LayoutDashboard,
  Loader2,
  Sparkles
} from 'lucide-react';
import { useUserStore } from '../../../context/userStore';
import { useHallStore } from '../../../context/hallStore';
import { useServiceStore } from '../../../context/serviceStore';
import UserManagement from './components/UserManagement';
import HallModeration from './components/HallModeration';
import ServiceModeration from './components/ServiceModeration';
import OwnerApprovals from './components/OwnerApprovals';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { users, fetchUsers, loading: usersLoading } = useUserStore();
  const { halls, fetchHalls, loading: hallsLoading } = useHallStore();
  const { services, fetchServices, loading: servicesLoading } = useServiceStore();

  useEffect(() => {
    fetchUsers();
    fetchHalls();
    fetchServices();
  }, [fetchUsers, fetchHalls, fetchServices]);

  const safeUsers = users || [];
  const safeHalls = halls || [];
  const safeServices = services || [];

  const stats = [
    { label: 'Total Users', value: safeUsers.length.toString(), icon: Users, color: 'text-blue-500', trend: '+12%' },
    { label: 'Active Halls', value: safeHalls.length.toString(), icon: Landmark, color: 'text-gold', trend: '+5' },
    { label: 'Services', value: safeServices.length.toString(), icon: Sparkles, color: 'text-purple-500', trend: '+8' },
  ];

  const pendingApprovalsCount = safeUsers.filter(u => u.role === 'vendor' && u.status === 'pending').length;

  const loading = usersLoading || hallsLoading || servicesLoading;

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Platform Administration</h1>
          <p className="text-gray-500">Global oversight, user moderation, and venue approval systems.</p>
        </div>
        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-2xl border border-gold/5 soft-shadow text-xs font-bold text-gray-500">
          <Clock size={14} className="text-gold" />
          <span>Last updated: {loading ? 'Fetching...' : 'Just now'}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-8 border-b border-gray-100 pb-px">
        {[
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'users', label: 'User Management', icon: Users },
          { id: 'halls', label: 'Hall Moderation', icon: Landmark },
          { id: 'services', label: 'Service Moderation', icon: Sparkles },
          { id: 'approvals', label: 'Owner Approvals', icon: UserCheck, count: pendingApprovalsCount }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 px-2 text-sm font-bold uppercase tracking-widest transition-all relative flex items-center space-x-2 ${
              activeTab === tab.id ? 'text-gold' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <tab.icon size={16} />
            <span>{tab.label}</span>
            {tab.count > 0 && (
              <span className="bg-pink-500 text-white text-[10px] h-5 w-5 rounded-full flex items-center justify-center font-bold">
                {tab.count}
              </span>
            )}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold rounded-full"></div>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="animate-in fade-in duration-500">
        {loading && activeTab === 'overview' && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="text-gold animate-spin" size={40} />
            <p className="text-gold font-bold">Syncing platform data...</p>
          </div>
        )}

        {!loading && activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-[32px] border border-gold/5 soft-shadow group hover:border-gold/20 transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-4 rounded-2xl bg-gray-50 ${stat.color}`}>
                      <stat.icon size={28} />
                    </div>
                    <span className="flex items-center text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">
                      <ArrowUpRight size={14} className="mr-1" />
                      {stat.trend}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity Placeholder */}
              <div className="bg-white p-10 rounded-[40px] border border-gold/5 soft-shadow">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8">System Health</h3>
                <div className="space-y-8">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-bold">
                      <span className="text-gray-600">Database Performance</span>
                      <span className="text-green-500">Optimal</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[94%]"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-bold">
                      <span className="text-gray-600">Media Storage</span>
                      <span className="text-gold">42% Used</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gold w-[42%]"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Summary */}
              <div className="bg-white p-10 rounded-[40px] border border-gold/5 soft-shadow">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8">Recent Moderation</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">New Hall Approved</p>
                        <p className="text-xs text-gray-500">Casablanca Palace</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 font-bold">2h ago</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                        <UserCheck size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">New Owner Verified</p>
                        <p className="text-xs text-gray-500">Mehdi Ben</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 font-bold">5h ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'halls' && <HallModeration />}
        {activeTab === 'services' && <ServiceModeration />}
        {activeTab === 'approvals' && <OwnerApprovals />}
      </div>
    </div>
  );
};

export default AdminDashboard;
