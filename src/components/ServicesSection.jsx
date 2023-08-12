// ServicesSection.js
import React from "react";
import Service from "./Service";

function ServicesSection() {
  const services = [
    {
      title: "Service 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageUrl: "image1.jpg", // Replace with your image URL
      serviceLink: "/service1", // Replace with the actual link
    },
    {
      title: "Service 2",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      imageUrl: "image2.jpg", // Replace with your image URL
      serviceLink: "/service2", // Replace with the actual link
    },
    // Add more services...
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Service
              key={index}
              title={service.title}
              description={service.description}
              imageUrl={service.imageUrl}
              serviceLink={service.serviceLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
