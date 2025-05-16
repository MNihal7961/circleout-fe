export interface Event {
  id: string;
  name: string;
  emoji?: string;
  date: string;
  location?: string;
  description?: string;
  groupId: string;
  status?: 'confirmed' | 'pending' | 'cancelled';
  attendees?: string[];
  notes?: string;
}

export interface Group {
  id: string;
  name: string;
  emoji: string;
  members: string[];
  lastEvent?: string;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
  phone?: string;
}