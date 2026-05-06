import { Search, MoreVertical, Shield, User, Briefcase, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useUserStore } from '../../../../context/userStore';

const UserManagement = () => {
  const { users, updateUserStatus, deleteUser } = useUserStore();
  const safeUsers = users || [];

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin': return <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center w-fit"><Shield size={12} className="mr-1" /> Admin</span>;
      case 'vendor': return <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center w-fit"><Briefcase size={12} className="mr-1" /> Owner</span>;
      default: return <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center w-fit"><User size={12} className="mr-1" /> User</span>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active': return <span className="text-green-500 flex items-center text-xs font-bold"><CheckCircle size={14} className="mr-1" /> Active</span>;
      case 'pending': return <span className="text-gold flex items-center text-xs font-bold"><MoreVertical size={14} className="mr-1" /> Pending</span>;
      default: return <span className="text-gray-400 flex items-center text-xs font-bold"><XCircle size={14} className="mr-1" /> Inactive</span>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            placeholder="Search users by name or email..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-gold/5 soft-shadow focus:border-gold outline-none transition-all text-sm"
          />
        </div>
        <div className="flex space-x-2">
          <button className="px-6 py-3 bg-white border border-gold/10 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">Export CSV</button>
          <button className="px-6 py-3 gold-gradient text-white rounded-xl text-sm font-bold shadow-lg shadow-gold/20 hover:scale-105 transition-all">Add New User</button>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-gold/5 soft-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-10 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">User Details</th>
                <th className="px-10 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Role</th>
                <th className="px-10 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Joined Date</th>
                <th className="px-10 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-10 py-5 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {safeUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-10 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-xl gold-gradient p-[1px]">
                        <div className="h-full w-full bg-white rounded-[9px] flex items-center justify-center overflow-hidden">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="" className="h-8 w-8" />
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">{getRoleBadge(user.role)}</td>
                  <td className="px-10 py-6 text-sm text-gray-500 font-medium">{user.joined}</td>
                  <td className="px-10 py-6">{getStatusBadge(user.status)}</td>
                  <td className="px-10 py-6">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => updateUserStatus(user.id, user.status === 'active' ? 'inactive' : 'active')}
                        className={`p-2 rounded-lg transition-colors ${user.status === 'active' ? 'text-gray-400 hover:bg-gray-100' : 'text-green-500 hover:bg-green-50'}`}
                      >
                        <CheckCircle size={18} />
                      </button>
                      <button 
                        onClick={() => deleteUser(user.id)}
                        className="p-2 text-gray-400 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
