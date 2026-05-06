import { useState, useEffect } from 'react';
import { Handshake, Check, Loader2 } from 'lucide-react';
import { useHallStore } from '../../../../context/hallStore';
import { useCollaborationStore } from '../../../../context/collaborationStore';

const CollaborationModal = ({ service, onCancel }) => {
  const { halls, fetchHalls } = useHallStore();
  const { sendRequest, loading: collaborationLoading } = useCollaborationStore();
  const [selectedHallId, setSelectedHallId] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchHalls();
  }, [fetchHalls]);

  const handleSubmit = async () => {
    if (!selectedHallId) return;
    try {
      await sendRequest(selectedHallId, service.id);
      setSuccess(true);
      setTimeout(onCancel, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-10 text-center space-y-6">
          <div className="h-20 w-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto">
            {success ? <Check className="text-green-500" size={40} /> : <Handshake className="text-gold" size={40} />}
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-serif font-bold text-gray-900">
              {success ? 'Request Sent!' : 'Start Collaboration'}
            </h2>
            <p className="text-gray-500">
              {success 
                ? `Your request to collaborate with ${service.name} has been sent.` 
                : `Select which of your venues you'd like to link with ${service.name}.`}
            </p>
          </div>

          {!success && (
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {halls.map((hall) => (
                <button
                  key={hall.id}
                  onClick={() => setSelectedHallId(hall.id)}
                  className={`w-full p-6 rounded-3xl border transition-all flex items-center space-x-4 text-left ${
                    selectedHallId === hall.id 
                      ? 'bg-gold border-gold text-white shadow-xl' 
                      : 'bg-gray-50 border-transparent hover:border-gold/30 text-gray-900'
                  }`}
                >
                  <div className="h-12 w-12 rounded-xl overflow-hidden bg-white shrink-0">
                    <img src={hall.images?.[0] || 'https://via.placeholder.com/100'} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-bold">{hall.name}</p>
                    <p className={`text-xs ${selectedHallId === hall.id ? 'text-white/70' : 'text-gray-400'}`}>{hall.city}</p>
                  </div>
                  {selectedHallId === hall.id && <Check size={20} />}
                </button>
              ))}
              {halls.length === 0 && (
                <div className="py-8 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                  <p className="text-gray-400 text-sm font-medium">You don't have any venues yet.</p>
                </div>
              )}
            </div>
          )}

          {!success && (
            <div className="flex gap-4 pt-4">
              <button 
                onClick={onCancel}
                className="flex-1 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button 
                disabled={!selectedHallId || collaborationLoading}
                onClick={handleSubmit}
                className={`flex-1 py-4 rounded-2xl font-bold text-white shadow-xl transition-all flex items-center justify-center space-x-2 ${
                  !selectedHallId || collaborationLoading ? 'bg-gray-300' : 'gold-gradient hover:scale-[1.02]'
                }`}
              >
                {collaborationLoading && <Loader2 className="animate-spin" size={20} />}
                <span>Send Request</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollaborationModal;
