import { useEffect } from 'react';
import { Handshake, Check, X, Clock, ExternalLink, Loader2 } from 'lucide-react';
import { useCollaborationStore } from '../../../../context/collaborationStore';
import { useUserStore } from '../../../../context/userStore';

const CollaborationManager = () => {
  const { user } = useUserStore();
  const { collaborations, fetchCollaborations, updateStatus, loading } = useCollaborationStore();

  useEffect(() => {
    fetchCollaborations();
  }, [fetchCollaborations]);

  if (loading && collaborations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <Loader2 className="text-gold animate-spin" size={48} />
        <p className="text-gold font-bold">Loading collaborations...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-[40px] border border-gold/5 soft-shadow overflow-hidden">
        <div className="p-10 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-serif font-bold text-gray-900">Partnership Requests</h3>
            <p className="text-gray-500">Manage your collaborations with other wedding professionals.</p>
          </div>
          <div className="bg-gold/10 px-4 py-2 rounded-2xl flex items-center space-x-2 text-gold">
            <Handshake size={20} />
            <span className="font-bold">{collaborations.length} Total</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-10 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Type</th>
                <th className="px-10 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Partner</th>
                <th className="px-10 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Venue Linked</th>
                <th className="px-10 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-10 py-5 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {collaborations.map((collab) => {
                const userOwnsService = collab.service?.vendor?.id === user?.id;

                return (
                  <tr key={collab.id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-10 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        userOwnsService ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                      }`}>
                        {userOwnsService ? 'Service Partner' : 'Venue Partner'}
                      </span>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-gray-100 overflow-hidden shrink-0">
                          <img 
                            src={userOwnsService ? collab.hall?.images?.[0] : collab.service?.images?.[0]} 
                            alt="" 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">
                            {userOwnsService ? collab.hall?.name : collab.service?.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {userOwnsService ? collab.hall?.owner?.name : collab.service?.vendor?.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6 font-medium text-gray-600">
                      {userOwnsService ? collab.service?.name : collab.hall?.name}
                    </td>
                    <td className="px-10 py-6">
                      <div className={`flex items-center space-x-1.5 font-bold text-[10px] uppercase tracking-widest ${
                        collab.status === 'accepted' ? 'text-green-500' : 
                        collab.status === 'rejected' ? 'text-pink-500' : 'text-gold'
                      }`}>
                        {collab.status === 'pending' && <Clock size={12} />}
                        {collab.status === 'accepted' && <Check size={12} />}
                        {collab.status === 'rejected' && <X size={12} />}
                        <span>{collab.status}</span>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-right">
                      {collab.status === 'pending' ? (
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={() => updateStatus(collab.id, 'accepted')}
                            className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all"
                            title="Accept"
                          >
                            <Check size={18} />
                          </button>
                          <button 
                            onClick={() => updateStatus(collab.id, 'rejected')}
                            className="p-2 bg-pink-50 text-pink-600 rounded-lg hover:bg-pink-600 hover:text-white transition-all"
                            title="Reject"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ) : (
                        <button className="p-2 text-gray-400 hover:text-gold transition-colors">
                          <ExternalLink size={18} />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
              {collaborations.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-10 py-20 text-center">
                    <Handshake size={48} className="mx-auto text-gray-200 mb-4" />
                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-1">No collaborations found</h3>
                    <p className="text-gray-500 text-sm">Start networking with other vendors to grow your business!</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CollaborationManager;
