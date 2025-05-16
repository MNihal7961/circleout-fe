import React from "react";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Group } from "../../types";

interface GroupCardProps {
  group: Group;
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/groups/${group.id}`);
  };

  return (
    <div className="group-card" onClick={handleClick}>
      <div className="flex items-center">
        <span className="text-3xl mr-4">{group.emoji}</span>
        <div>
          <h3 className="font-medium text-lg">{group.name}</h3>
          <div className="flex items-center text-gray-600 text-sm mt-1">
            <Users size={14} className="mr-1" />
            <span>{group.members.length} members</span>
          </div>
        </div>
      </div>

      {group.lastEvent && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Last event:</span> {group.lastEvent}
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupCard;
