import React from 'react';

const HowItWorks = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            How EduGuard AI Works
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            A simple, streamlined process to integrate AI-powered insights into your educational ecosystem.
          </p>
        </div>
      </section>

      {/* Step-by-Step Workflow */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-soft text-center max-w-sm">
              <div className="text-5xl font-bold text-indigo-600 mb-4">1</div>
              <h3 className="text-2xl font-bold mb-2">Connect Your Data</h3>
              <p className="text-gray-600">
                Securely integrate your existing student information systems and learning management systems with EduGuard AI.
              </p>
            </div>
            {/* Step 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-soft text-center max-w-sm">
              <div className="text-5xl font-bold text-indigo-600 mb-4">2</div>
              <h3 className="text-2xl font-bold mb-2">Configure Your Dashboards</h3>
              <p className="text-gray-600">
                Customize analytics and reporting dashboards to meet the unique needs of your institution.
              </p>
            </div>
            {/* Step 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-soft text-center max-w-sm">
              <div className="text-5xl font-bold text-indigo-600 mb-4">3</div>
              <h3 className="text-2xl font-bold mb-2">Gain Actionable Insights</h3>
              <p className="text-gray-600">
                Leverage AI-driven insights to improve student outcomes, enhance security, and optimize operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Take the first step towards a smarter, more secure educational environment.
          </p>
          <a
            href="/contact"
            className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
          >
            Request a Demo
          </a>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
