// Service.js
import React from "react";

function Service({ title, description, imageUrl, serviceLink }) {
  return (
    <a href={serviceLink} className="block">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <img src={imageUrl} alt={title} className="w-16 h-16 mx-auto mb-2" />
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-700">{description}</p>
        </div>
      </div>
    </a>
  );
}

export default Service;
