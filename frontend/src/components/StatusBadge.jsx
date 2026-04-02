import React from 'react';

const StatusBadge = ({ label, type, value }) => {
  let colorClass = "bg-gray-600 text-gray-100";
  
  if (type === "queue") {
    if (value === "Short") colorClass = "bg-green-500/20 text-green-400 border border-green-500/30";
    else if (value === "Medium") colorClass = "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
    else if (value === "Long") colorClass = "bg-red-500/20 text-red-400 border border-red-500/30";
  } else if (type === "fuel") {
    if (value === "Available") colorClass = "bg-green-500/20 text-green-400 border border-green-500/30";
    else if (value === "Low") colorClass = "bg-orange-500/20 text-orange-400 border border-orange-500/30";
    else if (value === "Out of Stock") colorClass = "bg-gray-500/20 text-gray-400 border border-gray-500/30";
  }

  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${colorClass} inline-flex items-center gap-1`}>
      {label && <span className="opacity-70">{label}:</span>}
      {value}
    </span>
  );
};

export default StatusBadge;
