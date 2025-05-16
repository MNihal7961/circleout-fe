import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockEvents } from "../../data/mockData";
import { Calendar, Plus, Receipt, Camera, ArrowRight } from "lucide-react";
import EventCard from "../../components/events/EventCard";
import Section from "../../components/ui/Section";
import Button from "../../components/ui/Button";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [greeting] = useState("Hey Alex, ready for the next hangout?");

  // Filter upcoming events - sort by date
  const upcomingEvents = [...mockEvents]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const quickActions = [
    {
      id: "calendar",
      icon: <Calendar size={20} />,
      label: "View Calendar",
      action: () => console.log("View calendar"),
    },
    {
      id: "payments",
      icon: <Receipt size={20} />,
      label: "Split Payments",
      action: () => navigate("/split-payment/new"),
    },
    {
      id: "memories",
      icon: <Camera size={20} />,
      label: "View Memories",
      action: () => console.log("View memories"),
    },
  ];

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-6">{greeting}</h1>
        <Button
          variant="primary"
          iconLeft={<Plus size={18} />}
          fullWidth
          onClick={() => navigate("/create-event")}
        >
          Plan Something
        </Button>
      </header>

      <Section
        title="Upcoming Events"
        action={
          <button className="text-sm text-orange-500 font-medium flex items-center">
            View all <ArrowRight size={16} className="ml-1" />
          </button>
        }
      >
        <div className="space-y-3 overflow-x-auto pb-2">
          {upcomingEvents.length > 0 ? (
            <div className="flex flex-col space-y-3">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No upcoming events.
            </p>
          )}
        </div>
      </Section>

      <Section title="Quick Actions">
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              onClick={action.action}
            >
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 mb-2">
                {action.icon}
              </div>
              <span className="text-sm text-center">{action.label}</span>
            </button>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Home;
