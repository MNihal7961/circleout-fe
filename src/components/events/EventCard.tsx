import React from "react";
import { Calendar, Clock, Users, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import type { Event } from "../../types";

interface EventCardProps {
  event: Event;
  compact?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, compact = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events/${event.id}`);
  };

  // Calculate days until event
  const today = new Date();
  const eventDate = new Date(event.date);
  const diffTime = Math.abs(eventDate.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div
      className={`event-card ${compact ? "min-w-[250px]" : "w-full"}`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start">
        {event.emoji && <span className="text-2xl mr-2">{event.emoji}</span>}
        <div className="flex-1">
          <h3 className="font-medium text-lg">{event.name}</h3>
          <div className="flex items-center text-gray-600 text-sm mt-1">
            <Calendar size={14} className="mr-1" />
            <span>{format(new Date(event.date), "E, MMM d")}</span>
            <Clock size={14} className="ml-3 mr-1" />
            <span>{format(new Date(event.date), "h:mm a")}</span>
          </div>
        </div>
        {event.status && (
          <span
            className={`badge ${
              event.status === "confirmed"
                ? "badge-primary"
                : event.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {event.status === "confirmed"
              ? "Confirmed"
              : event.status === "pending"
              ? "Pending"
              : event.status}
          </span>
        )}
      </div>

      {!compact && (
        <div className="mt-4">
          {event.location && (
            <div className="flex items-center text-gray-600 text-sm mb-2">
              <MapPin size={14} className="mr-1 flex-shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600 text-sm">
              <Users size={14} className="mr-1" />
              <span>{event.attendees?.length || 0} people</span>
            </div>
            <div className="text-sm font-medium text-orange-500">
              {diffDays === 0
                ? "Today"
                : diffDays === 1
                ? "Tomorrow"
                : `${diffDays} days left`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;
