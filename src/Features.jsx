import React from 'react';

const Features = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Powerful Features for Modern Education
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            EduGuard AI provides a comprehensive suite of tools to enhance learning, security, and administration.
          </p>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* AI Analytics */}
            <div className="bg-white p-8 rounded-2xl shadow-soft transition-transform transform hover:-translate-y-2">
              <h3 className="text-2xl font-bold mb-4">AI Analytics</h3>
              <p className="text-gray-600">
                Gain deep insights into student performance and engagement with our advanced AI-powered analytics.
              </p>
            </div>
            {/* Dashboards */}
            <div className="bg-white p-8 rounded-2xl shadow-soft transition-transform transform hover:-translate-y-2">
              <h3 className="text-2xl font-bold mb-4">Custom Dashboards</h3>
              <p className="text-gray-600">
                Visualize data with intuitive and customizable dashboards for administrators, teachers, and students.
              </p>
            </div>
            {/* Security */}
            <div className="bg-white p-8 rounded-2xl shadow-soft transition-transform transform hover:-translate-y-2">
              <h3 className="text-2xl font-bold mb-4">Enhanced Security</h3>
              <p className="text-gray-600">
                Protect sensitive data with multi-layered security protocols and proactive threat detection.
              </p>
            </div>
            {/* Cloud Integration */}
            <div className="bg-white p-8 rounded-2xl shadow-soft transition-transform transform hover:-translate-y-2">
              <h3 className="text-2xl font-bold mb-4">Cloud Native</h3>
              <p className="text-gray-600">
                Access EduGuard AI from anywhere with our fully cloud-based infrastructure, ensuring reliability and scalability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Small CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Institution?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join the growing number of educational institutions leveraging EduGuard AI to create a smarter, safer learning environment.
          </p>
          <a
            href="/pricing"
            className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
          >
            Explore Pricing
          </a>
        </div>
      </section>
    </div>
  );
};

export default Features;
