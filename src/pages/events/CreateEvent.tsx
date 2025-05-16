import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Pizza,
  Film,
  Bus,
  Palette,
  ChevronRight,
  MapPin,
  Calendar,
  Clock,
} from "lucide-react";
import Button from "../../components/ui/Button";

type EventType = {
  id: string;
  label: string;
  icon: React.ReactNode;
  emoji: string;
};

const eventTypes: EventType[] = [
  {
    id: "house-party",
    label: "House Party",
    icon: <Home size={20} />,
    emoji: "🏡",
  },
  { id: "dinner", label: "Dinner", icon: <Pizza size={20} />, emoji: "🍕" },
  { id: "movie", label: "Movie", icon: <Film size={20} />, emoji: "🎬" },
  { id: "trip", label: "Trip", icon: <Bus size={20} />, emoji: "🚌" },
  { id: "custom", label: "Custom", icon: <Palette size={20} />, emoji: "🎨" },
];

const CreateEvent: React.FC = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [eventType, setEventType] = useState<string | null>(null);
  const [eventDetails, setEventDetails] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    notes: "",
  });

  const handleTypeSelect = (typeId: string) => {
    setEventType(typeId);
    setStep(2);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      // Create event logic here
      navigate("/");
    }
  };

  const renderStepOne = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-center">What kind of event?</h2>
      <div className="grid grid-cols-2 gap-4">
        {eventTypes.map((type) => (
          <button
            key={type.id}
            className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            onClick={() => handleTypeSelect(type.id)}
          >
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 mb-3">
              {type.icon}
            </div>
            <span className="text-gray-900">{type.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStepTwo = () => {
    const selectedType = eventTypes.find((type) => type.id === eventType);

    return (
      <div className="space-y-5">
        <div className="flex items-center justify-center mb-2">
          <span className="text-4xl mr-3">{selectedType?.emoji}</span>
          <h2 className="text-xl font-semibold">Event Details</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name of event
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={eventDetails.name}
              onChange={handleInputChange}
              placeholder={`${selectedType?.label} Name`}
              className="input"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={eventDetails.date}
                  onChange={handleInputChange}
                  className="input pl-10"
                  required
                />
                <Calendar
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Time
              </label>
              <div className="relative">
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={eventDetails.time}
                  onChange={handleInputChange}
                  className="input pl-10"
                  required
                />
                <Clock
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <div className="relative">
              <input
                type="text"
                id="location"
                name="location"
                value={eventDetails.location}
                onChange={handleInputChange}
                placeholder="Add a location"
                className="input pl-10"
              />
              <MapPin
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Notes (optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={eventDetails.notes}
              onChange={handleInputChange}
              placeholder="Any additional details"
              className="input min-h-[100px]"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderStepThree = () => {
    const selectedType = eventTypes.find((type) => type.id === eventType);

    return (
      <div className="space-y-5">
        <div className="flex items-center justify-center mb-2">
          <span className="text-4xl mr-3">{selectedType?.emoji}</span>
          <h2 className="text-xl font-semibold">Additional Options</h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Split costs</h3>
                <p className="text-sm text-gray-500">
                  Track expenses for this event
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Enable voting</h3>
                <p className="text-sm text-gray-500">
                  For food, time, or location
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Assign roles</h3>
                <p className="text-sm text-gray-500">
                  Assign tasks to attendees
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <header className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Create Event</h1>
          <div className="flex items-center text-sm text-gray-500">
            <span className={step >= 1 ? "text-orange-500 font-medium" : ""}>
              Type
            </span>
            <ChevronRight size={16} />
            <span className={step >= 2 ? "text-orange-500 font-medium" : ""}>
              Details
            </span>
            <ChevronRight size={16} />
            <span className={step >= 3 ? "text-orange-500 font-medium" : ""}>
              Options
            </span>
          </div>
        </div>
      </header>

      <div className="mb-6">
        {step === 1 && renderStepOne()}
        {step === 2 && renderStepTwo()}
        {step === 3 && renderStepThree()}
      </div>

      {step > 1 && (
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            fullWidth
            onClick={() => setStep(step - 1)}
          >
            Back
          </Button>
          <Button
            variant="primary"
            fullWidth
            disabled={
              step === 2 &&
              (!eventDetails.name || !eventDetails.date || !eventDetails.time)
            }
            onClick={handleNext}
          >
            {step === 3 ? "Send to Group" : "Next"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateEvent;
