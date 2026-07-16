// src/pages/Projects.jsx
import React from 'react';

const projects = [
  "Delivered 3,000+ packages in West Africa within 48 hours",
  "Handled over 1,500 international cargo shipments",
  "Partnered with 20+ eCommerce platforms for last-mile delivery",
  "Managed express medical logistics for 5 major hospitals",
];

const Projects = () => {
  return (
    <div className="max-w-5xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold mb-6">Key Milestones</h1>
      <p className="text-gray-700 text-lg mb-8">
        At SwiftPort Logistics, our track record reflects our commitment to service excellence. Here's a look at some recent highlights:
      </p>
      <ul className="space-y-4">
        {projects.map((item, index) => (
          <li key={index} className="bg-gray-100 p-4 rounded shadow-sm">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
