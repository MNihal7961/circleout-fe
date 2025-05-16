import React from 'react';
import { Plus, Search } from 'lucide-react';
import GroupCard from '../../components/groups/GroupCard';
import Button from '../../components/ui/Button';
import { mockGroups } from '../../data/mockData';

const Groups: React.FC = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Your Groups</h1>
        <Button 
          variant="primary" 
          size="sm" 
          iconLeft={<Plus size={16} />}
          onClick={() => console.log('Create group')}
        >
          New Group
        </Button>
      </header>
      
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search groups..."
          className="input pl-10"
        />
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        {mockGroups.map(group => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
};

export default Groups;