import React from 'react';
import { Check, Clock, DollarSign, Users } from 'lucide-react';
import Avatar from '../../components/ui/Avatar';

interface Notification {
  id: string;
  type: 'rsvp' | 'payment' | 'vote' | 'general';
  message: string;
  user: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'rsvp',
    message: 'marked themselves as going to',
    user: 'Alex Johnson',
    time: '10 minutes ago',
    read: false,
  },
  {
    id: '2',
    type: 'payment',
    message: 'paid you $25 for',
    user: 'Emma Wilson',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'vote',
    message: 'voted for "Mama Mia\'s" as the location for',
    user: 'James Smith',
    time: '3 hours ago',
    read: true,
  },
  {
    id: '4',
    type: 'general',
    message: 'created a new event',
    user: 'Olivia Brown',
    time: '5 hours ago',
    read: true,
  },
  {
    id: '5',
    type: 'rsvp',
    message: 'can\'t make it to',
    user: 'Noah Davis',
    time: 'Yesterday',
    read: true,
  },
  {
    id: '6',
    type: 'payment',
    message: 'reminds you that you owe $15 for',
    user: 'Sophia Miller',
    time: 'Yesterday',
    read: true,
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'rsvp':
      return <Check size={16} />;
    case 'payment':
      return <DollarSign size={16} />;
    case 'vote':
      return <Clock size={16} />;
    default:
      return <Users size={16} />;
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'rsvp':
      return 'bg-green-100 text-green-600';
    case 'payment':
      return 'bg-blue-100 text-blue-600';
    case 'vote':
      return 'bg-purple-100 text-purple-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

const Notifications: React.FC = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="text-xl font-bold">Notifications</h1>
      </header>
      
      <div className="space-y-3">
        {mockNotifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`bg-white rounded-lg p-3 shadow-sm ${!notification.read ? 'border-l-4 border-orange-500' : ''}`}
          >
            <div className="flex">
              <Avatar
                name={notification.user}
                size="sm"
                src={`https://i.pravatar.cc/100?u=${notification.user}`}
              />
              
              <div className="ml-3 flex-1">
                <div className="flex items-center">
                  <span className="font-medium">{notification.user}</span>
                  <span className="ml-1">{notification.message}</span>
                </div>
                
                <div className="flex items-center justify-between mt-1">
                  <div className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${getNotificationColor(notification.type)}`}>
                    {getNotificationIcon(notification.type)}
                    <span className="ml-1">
                      {notification.type === 'rsvp' && 'RSVP'}
                      {notification.type === 'payment' && 'Payment'}
                      {notification.type === 'vote' && 'Vote'}
                      {notification.type === 'general' && 'Update'}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;