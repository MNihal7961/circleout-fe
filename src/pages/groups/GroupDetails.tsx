import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, MessageSquare, Users, Image, Plus } from 'lucide-react';
import { mockEvents, mockGroups } from '../../data/mockData';
import Avatar from '../../components/ui/Avatar';
import TabBar from '../../components/ui/TabBar';
import Button from '../../components/ui/Button';
import EventCard from '../../components/events/EventCard';

const GroupDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('events');
  
  // Find the group data
  const group = mockGroups.find(g => g.id === id);
  
  // Get group events
  const groupEvents = mockEvents.filter(event => event.groupId === id);
  
  if (!group) {
    return <div className="text-center p-8">Group not found</div>;
  }
  
  const tabs = [
    { id: 'events', label: 'Events', icon: <Calendar size={16} /> },
    { id: 'chat', label: 'Chat', icon: <MessageSquare size={16} /> },
    { id: 'members', label: 'Members', icon: <Users size={16} /> },
    { id: 'gallery', label: 'Gallery', icon: <Image size={16} /> },
  ];
  
  return (
    <div className="max-w-md mx-auto">
      <header className="p-4 bg-orange-500 text-white">
        <div className="flex items-center mb-2">
          <span className="text-3xl mr-3">{group.emoji}</span>
          <h1 className="text-xl font-bold text-white">{group.name}</h1>
        </div>
        <div className="flex -space-x-2">
          {group.members.slice(0, 5).map((member, index) => (
            <Avatar 
              key={index} 
              name={member} 
              size="sm" 
              src={`https://i.pravatar.cc/100?u=${member}`} 
            />
          ))}
          {group.members.length > 5 && (
            <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-white text-xs">
              +{group.members.length - 5}
            </div>
          )}
        </div>
      </header>
      
      <TabBar tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      
      <div className="p-4">
        {activeTab === 'events' && (
          <div className="space-y-6">
            <Button 
              variant="primary" 
              iconLeft={<Plus size={18} />}
              fullWidth
            >
              Plan New Event
            </Button>
            
            {groupEvents.length > 0 ? (
              <div className="space-y-3">
                <h2 className="font-medium text-gray-800">Upcoming Events</h2>
                {groupEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No events planned yet. Create one!</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'chat' && (
          <div className="h-[60vh] flex flex-col justify-center items-center text-gray-500">
            <MessageSquare size={48} className="mb-3 opacity-30" />
            <p>Chat feature coming soon!</p>
          </div>
        )}
        
        {activeTab === 'members' && (
          <div className="space-y-4">
            {group.members.map((member, index) => (
              <div key={index} className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                <Avatar 
                  name={member} 
                  src={`https://i.pravatar.cc/100?u=${member}`} 
                />
                <div className="ml-3">
                  <p className="font-medium">{member}</p>
                  <p className="text-sm text-gray-500">Member</p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'gallery' && (
          <div className="h-[60vh] flex flex-col justify-center items-center text-gray-500">
            <Image size={48} className="mb-3 opacity-30" />
            <p>Gallery feature coming soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupDetails;