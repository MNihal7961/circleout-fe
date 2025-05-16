import type { Event, Group} from '../types';

export const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Friday Movie Night',
    emoji: '🎬',
    date: '2025-05-15T19:00:00',
    location: 'AMC Theater',
    description: 'Let\'s watch the latest blockbuster together!',
    groupId: '1',
    status: 'confirmed',
    attendees: ['Alex Johnson', 'Emma Wilson', 'James Smith', 'Olivia Brown'],
  },
  {
    id: '2',
    name: 'Sam\'s Birthday Bash',
    emoji: '🎉',
    date: '2025-05-20T20:00:00',
    location: 'The Rooftop Bar',
    description: 'Celebrating Sam\'s 30th birthday!',
    groupId: '1',
    status: 'pending',
    attendees: ['Alex Johnson', 'Emma Wilson', 'Noah Davis', 'Sophia Miller'],
    notes: 'Bringing a cake and decorations. Don\'t tell Sam!'
  },
  {
    id: '3',
    name: 'Weekend Hike',
    emoji: '🥾',
    date: '2025-05-18T09:00:00',
    location: 'Trailhead Park',
    groupId: '3',
    status: 'confirmed',
    attendees: ['Alex Johnson', 'James Smith', 'Noah Davis'],
  },
  {
    id: '4',
    name: 'Dinner at Luigi\'s',
    emoji: '🍝',
    date: '2025-05-22T19:30:00',
    location: 'Luigi\'s Italian Restaurant',
    groupId: '2',
    status: 'confirmed',
    attendees: ['Alex Johnson', 'Emma Wilson', 'Olivia Brown', 'Sophia Miller'],
  },
  {
    id: '5',
    name: 'Game Night',
    emoji: '🎮',
    date: '2025-05-25T18:00:00',
    location: 'Alex\'s Place',
    groupId: '1',
    status: 'pending',
    attendees: ['Alex Johnson', 'James Smith', 'Noah Davis'],
  },
];

export const mockGroups: Group[] = [
  {
    id: '1',
    name: 'College Buds',
    emoji: '🎓',
    members: ['Alex Johnson', 'Emma Wilson', 'James Smith', 'Olivia Brown', 'Noah Davis', 'Sophia Miller'],
    lastEvent: 'Movie Night - Last Friday',
  },
  {
    id: '2',
    name: 'Foodie Fridays',
    emoji: '🍔',
    members: ['Alex Johnson', 'Emma Wilson', 'Olivia Brown', 'Sophia Miller'],
    lastEvent: 'Sushi Bar - 2 weeks ago',
  },
  {
    id: '3',
    name: 'Weekend Warriors',
    emoji: '🌄',
    members: ['Alex Johnson', 'James Smith', 'Noah Davis'],
    lastEvent: 'Beach Day - Last month',
  },
];