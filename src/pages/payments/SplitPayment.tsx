import React, { useState } from 'react';
import { DollarSign, ChevronRight, Check } from 'lucide-react';
import { mockEvents } from '../../data/mockData';
import Avatar from '../../components/ui/Avatar';
import Button from '../../components/ui/Button';

const SplitPayment: React.FC = () => {
  const [totalAmount, setTotalAmount] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(mockEvents[0]);
  const [contributions, setContributions] = useState<Record<string, number>>({});
  
  const attendees = selectedEvent.attendees || [];
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and decimal point
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setTotalAmount(value);
    
    // Reset contributions when total changes
    setContributions({});
  };
  
  const handleContributionChange = (attendee: string, value: string) => {
    // Only allow numbers and decimal point
    const amount = value.replace(/[^0-9.]/g, '');
    setContributions(prev => ({
      ...prev,
      [attendee]: parseFloat(amount) || 0,
    }));
  };
  
  // Calculate equal split amount
  const totalAmountNum = parseFloat(totalAmount) || 0;
  const equalSplitAmount = totalAmountNum / (attendees.length || 1);
  
  // Calculate the total of all contributions
  const contributionsTotal = Object.values(contributions).reduce((sum, amount) => sum + amount, 0);
  
  // Calculate remaining amount
  const remainingAmount = totalAmountNum - contributionsTotal;
  
  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="text-xl font-bold">Split the Bill</h1>
        <p className="text-gray-500">Easily divide expenses among attendees</p>
      </header>
      
      <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl mr-2">{selectedEvent.emoji}</span>
            <span className="font-medium">{selectedEvent.name}</span>
          </div>
          <ChevronRight size={18} className="text-gray-400" />
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
        <h2 className="font-medium mb-3">Total Amount</h2>
        <div className="relative">
          <DollarSign size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={totalAmount}
            onChange={handleAmountChange}
            placeholder="0.00"
            className="input text-xl pl-10 font-medium"
          />
        </div>
        
        {totalAmountNum > 0 && (
          <div className="mt-2 text-sm text-gray-500 flex justify-between">
            <span>Even split:</span>
            <span>${equalSplitAmount.toFixed(2)} per person</span>
          </div>
        )}
      </div>
      
      {totalAmountNum > 0 && (
        <>
          <h2 className="font-medium mb-3">Contributors</h2>
          <div className="space-y-3 mb-6">
            {attendees.map((attendee, index) => (
              <div key={index} className="bg-white rounded-lg p-3 shadow-sm flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar
                    name={attendee}
                    size="sm"
                    src={`https://i.pravatar.cc/100?u=${attendee}`}
                  />
                  <span className="ml-2">{attendee}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-1">$</span>
                  <input
                    type="text"
                    value={contributions[attendee] || ''}
                    onChange={(e) => handleContributionChange(attendee, e.target.value)}
                    placeholder={equalSplitAmount.toFixed(2)}
                    className="w-20 p-1 border border-gray-300 rounded"
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-100 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Total amount:</span>
              <span className="font-medium">${totalAmountNum.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Total allocated:</span>
              <span className="font-medium">${contributionsTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-orange-200">
              <span className="font-medium">Remaining:</span>
              <span 
                className={`font-medium ${remainingAmount === 0 ? 'text-green-600' : 'text-orange-600'}`}
              >
                ${remainingAmount.toFixed(2)}
              </span>
            </div>
          </div>
          
          <Button 
            variant="primary" 
            fullWidth
            iconLeft={remainingAmount === 0 ? <Check size={18} /> : <DollarSign size={18} />}
            disabled={remainingAmount !== 0}
          >
            {remainingAmount === 0 ? 'Split Complete' : 'Complete Split'}
          </Button>
        </>
      )}
    </div>
  );
};

export default SplitPayment;