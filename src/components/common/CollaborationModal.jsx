import { useState } from 'react';
import { X, Handshake, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { useUserStore } from '../../context/userStore';
import { useCollaborationStore } from '../../context/collaborationStore';

const CollaborationModal = ({ isOpen, onClose, targetType, targetId, targetName }) => {
  const { user } = useUserStore();
  const { sendRequest, loading } = useCollaborationStore();
  const [selectedId, setSelectedId] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // Determine what the current user can offer based on the target type
  // If target is a Hall, user must offer a Service
  // If target is a Service, user must offer a Hall
  const myItems = targetType === 'hall' ? (user?.services || []) : (user?.halls || []);
  const myItemLabel = targetType === 'hall' ? 'Select your Service' : 'Select your Venue';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedId) return;

    setError('');
    try {
      // If target is hall, hall_id = targetId, service_id = selectedId
      // If target is service, hall_id = selectedId, service_id = targetId
      const hallId = targetType === 'hall' ? targetId : selectedId;
      const serviceId = targetType === 'hall' ? selectedId : targetId;
      
      await sendRequest(hallId, serviceId);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setSelectedId('');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send partnership request.');
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-gold/10 animate-in zoom-in duration-300">
        <div className="bg-gold p-8 text-white flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Handshake size={28} />
            <h3 className="text-2xl font-serif font-bold">Propose Partnership</h3>
          </div>
          <button onClick={onClose} className="hover:rotate-90 transition-transform">
            <X size={24} />
          </button>
        </div>

        <div className="p-10">
          {success ? (
            <div className="text-center py-10 space-y-4 animate-in fade-in zoom-in duration-500">
              <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={48} />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">Request Sent!</h4>
              <p className="text-gray-500">Your collaboration proposal has been sent to the owner of {targetName}.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Partnering with</p>
                <div className="p-4 rounded-2xl bg-gray-50 border border-gold/5 flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    {targetType === 'hall' ? <CheckCircle2 size={20} /> : <Handshake size={20} />}
                  </div>
                  <span className="font-bold text-gray-900 text-lg">{targetName}</span>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">{myItemLabel}</label>
                {myItems.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3">
                    {myItems.map(item => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedId(item.id)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
                          selectedId === item.id ? 'border-gold bg-gold/5 ring-4 ring-gold/10' : 'border-gray-100 hover:border-gold/20'
                        }`}
                      >
                        <span className="font-bold text-gray-800">{item.name}</span>
                        {selectedId === item.id && <CheckCircle2 size={20} className="text-gold" />}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm flex items-start space-x-3">
                    <AlertCircle size={20} className="shrink-0" />
                    <p>You don't have any {targetType === 'hall' ? 'services' : 'venues'} to offer for collaboration. Please add one first from your dashboard.</p>
                  </div>
                )}
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-100 text-red-700 text-sm font-bold flex items-center space-x-2">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={!selectedId || loading || myItems.length === 0}
                className="w-full gold-gradient text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-gold/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-3 disabled:opacity-50 disabled:grayscale"
              >
                {loading ? <Loader2 className="animate-spin" size={24} /> : <Handshake size={24} />}
                <span>{loading ? 'Sending Request...' : 'Send Proposal'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollaborationModal;
