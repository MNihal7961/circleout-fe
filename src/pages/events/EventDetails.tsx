import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CheckSquare, DollarSign, MapPin, Check, X, Calendar } from 'lucide-react';
import { mockEvents, mockGroups } from '../../data/mockData';
import Avatar from '../../components/ui/Avatar';
import TabBar from '../../components/ui/TabBar';
import Button from '../../components/ui/Button';

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('details');
  
  // Find the event data
  const event = mockEvents.find(e => e.id === id);
  if (!event) {
    return <div className="text-center p-8">Event not found</div>;
  }
  
  // Find associated group
  const group = mockGroups.find(g => g.id === event.groupId);
  
  // Format date and time
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });
  const formattedTime = eventDate.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true
  });
  
  // Calculate days until event
  const today = new Date();
  const diffTime = Math.abs(eventDate.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  const tabs = [
    { id: 'details', label: 'Details', icon: <Calendar size={16} /> },
    { id: 'checklist', label: 'Checklist', icon: <CheckSquare size={16} /> },
    { id: 'budget', label: 'Budget', icon: <DollarSign size={16} /> },
    { id: 'location', label: 'Location', icon: <MapPin size={16} /> },
  ];
  
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-orange-500 text-white p-4">
        <div className="flex items-center mb-2">
          <span className="text-3xl mr-3">{event.emoji}</span>
          <div>
            <h1 className="text-xl font-bold text-white">{event.name}</h1>
            <p className="text-white/80 text-sm">{group?.name}</p>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-3 mb-3">
          <div className="flex items-center mb-1">
            <Calendar size={16} className="mr-2" />
            <span>{formattedDate} at {formattedTime}</span>
          </div>
          <div className="flex items-center">
            <MapPin size={16} className="mr-2" />
            <span>{event.location || 'No location yet'}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex -space-x-2">
            {event.attendees?.slice(0, 4).map((attendee, index) => (
              <Avatar
                key={index}
                name={attendee}
                size="sm"
                src={`https://i.pravatar.cc/100?u=${attendee}`}
              />
            ))}
            {(event.attendees?.length || 0) > 4 && (
              <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-white text-xs">
                +{(event.attendees?.length || 0) - 4}
              </div>
            )}
          </div>
          <div className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
            {diffDays === 0 ? 'Today' : 
             diffDays === 1 ? 'Tomorrow' : 
             `${diffDays} days left`}
          </div>
        </div>
      </div>
      
      <TabBar tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      
      <div className="p-4">
        {activeTab === 'details' && (
          <div className="space-y-4">
            {event.description && (
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-medium mb-2">About</h3>
                <p className="text-gray-700">{event.description}</p>
              </div>
            )}
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-medium mb-3">Attendees</h3>
              <div className="space-y-2">
                {event.attendees?.map((attendee, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar
                        name={attendee}
                        size="sm"
                        src={`https://i.pravatar.cc/100?u=${attendee}`}
                      />
                      <span className="ml-2">{attendee}</span>
                    </div>
                    <span className="text-sm text-green-600 font-medium">Going</span>
                  </div>
                ))}
              </div>
            </div>
            
            {event.notes && (
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-medium mb-2">Notes</h3>
                <p className="text-gray-700">{event.notes}</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'checklist' && (
          <div className="h-[60vh] flex flex-col justify-center items-center text-gray-500">
            <CheckSquare size={48} className="mb-3 opacity-30" />
            <p>Checklist feature coming soon!</p>
          </div>
        )}
        
        {activeTab === 'budget' && (
          <div className="h-[60vh] flex flex-col justify-center items-center text-gray-500">
            <DollarSign size={48} className="mb-3 opacity-30" />
            <p>Budget feature coming soon!</p>
          </div>
        )}
        
        {activeTab === 'location' && (
          <div className="h-[60vh] flex flex-col justify-center items-center text-gray-500">
            <MapPin size={48} className="mb-3 opacity-30" />
            <p>Location feature coming soon!</p>
          </div>
        )}
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex space-x-2">
        <Button 
          variant="primary" 
          fullWidth
          iconLeft={<Check size={18} />}
        >
          I'm In
        </Button>
        <Button 
          variant="secondary" 
          fullWidth
          iconLeft={<X size={18} />}
        >
          Can't Join
        </Button>
      </div>
    </div>
  );
};

export default EventDetails;