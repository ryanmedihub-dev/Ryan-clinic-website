"use client";
import React from "react";

const PleoFeatures = ({ features = [], title, description }) => {
  return (
    <section className=" py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {title}
          </h4>
          <h5 className="text-base sm:text-lg md:text-lg font-medium text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
            {description}
          </h5>
          <div className="mt-4 w-24 h-1 bg-gray-200 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-5 sm:p-6 bg-white rounded-lg md:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-100"
            >
              <div className="absolute top-0 left-5 sm:left-6 w-10 sm:w-12 h-0.5 bg-blue-500 group-hover:w-14 sm:group-hover:w-16 transition-all duration-300"></div>
              <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="text-2xl p-2 bg-blue-50 rounded-lg text-blue-600">
                  {feature.icon && feature.icon}
                </div>
                <div className="sm:flex-1">
                  <h6 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h6>
                  <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PleoFeatures;