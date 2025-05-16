import React from "react";

interface AvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg";
}

const Avatar: React.FC<AvatarProps> = ({ src, name, size = "md" }) => {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
  };

  const colors = [
    "bg-orange-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-pink-500",
  ];

  // Use a hash of the name to pick a consistent color
  const nameHash = name.split("").reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);

  const colorIndex = nameHash % colors.length;
  const bgColor = colors[colorIndex];

  return (
    <div
      className={`${
        sizeClasses[size]
      } rounded-full flex items-center justify-center text-white overflow-hidden ${
        src ? "" : bgColor
      }`}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

export default Avatar;
