import { UserCheck, Mail, Calendar, Check, X } from 'lucide-react';
import { useUserStore } from '../../../../context/userStore';

const OwnerApprovals = () => {
  const { users, updateUserStatus, deleteUser } = useUserStore();
  const safeUsers = users || [];
  const pendingOwners = safeUsers.filter(u => u.role === 'vendor' && u.status === 'pending');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {pendingOwners.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pendingOwners.map((owner) => (
            <div key={owner.id} className="bg-white p-10 rounded-[40px] border border-gold/5 soft-shadow flex flex-col group relative overflow-hidden">
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-[100px] transition-all group-hover:scale-110"></div>
              
              <div className="flex items-center space-x-6 mb-8 relative z-10">
                <div className="h-20 w-20 rounded-2xl gold-gradient p-[2px] shadow-xl shadow-gold/20">
                  <div className="h-full w-full bg-white rounded-[14px] flex items-center justify-center overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${owner.name}`} alt="" className="h-16 w-16" />
                  </div>
                </div>
                <div>
                  <h4 className="text-2xl font-serif font-bold text-gray-900 mb-1">{owner.name}</h4>
                  <p className="text-gold font-bold text-[10px] uppercase tracking-[0.2em]">Pending Verification</p>
                </div>
              </div>

              <div className="space-y-4 mb-10 relative z-10">
                <div className="flex items-center text-gray-500 space-x-3">
                  <Mail size={16} className="text-gold" />
                  <span className="text-sm">{owner.email}</span>
                </div>
                <div className="flex items-center text-gray-500 space-x-3">
                  <Calendar size={16} className="text-gold" />
                  <span className="text-sm font-medium">Applied on {owner.joined}</span>
                </div>
              </div>

              <div className="flex space-x-4 relative z-10">
                <button 
                  onClick={() => updateUserStatus(owner.id, 'active')}
                  className="flex-grow gold-gradient text-white py-4 rounded-2xl font-bold shadow-lg shadow-gold/20 hover:scale-105 transition-all flex items-center justify-center space-x-2"
                >
                  <Check size={18} />
                  <span>Approve Owner</span>
                </button>
                <button 
                  onClick={() => deleteUser(owner.id)}
                  className="px-6 py-4 rounded-2xl border border-gray-100 text-gray-400 hover:text-pink-500 hover:bg-pink-50 transition-all"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-white rounded-[40px] border border-dashed border-gold/30">
          <UserCheck size={48} className="mx-auto text-gray-200 mb-4" />
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">No pending approvals</h3>
          <p className="text-gray-500">All hall owner applications have been processed.</p>
        </div>
      )}
    </div>
  );
};

export default OwnerApprovals;
