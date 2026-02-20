import React from 'react';

const Pricing = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Pricing Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Transparent Pricing for Every Institution
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Choose a plan that scales with your needs. All plans include our core set of features.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="bg-white p-8 rounded-2xl shadow-soft flex flex-col">
              <h3 className="text-2xl font-bold mb-4">Starter</h3>
              <p className="text-gray-600 mb-6">For small institutions and individual departments getting started with AI analytics.</p>
              <div className="text-4xl font-bold mb-6">
                $49<span className="text-lg font-normal text-gray-500">/mo</span>
              </div>
              <ul className="space-y-4 text-gray-600 mb-8 flex-grow">
                <li>✓ AI Analytics Suite</li>
                <li>✓ Basic Dashboards</li>
                <li>✓ Standard Security</li>
                <li>✓ Email Support</li>
              </ul>
              <a
                href="/contact"
                className="w-full text-center bg-gray-200 text-gray-800 font-semibold py-3 px-8 rounded-full hover:bg-gray-300 transition-colors"
              >
                Get Started
              </a>
            </div>

            {/* Pro Plan - Highlighted */}
            <div className="relative bg-white p-8 rounded-2xl shadow-xl ring-2 ring-indigo-600 flex flex-col">
              <div className="absolute top-0 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-4">Pro</h3>
              <p className="text-gray-600 mb-6">For growing institutions that require advanced features and support.</p>
              <div className="text-4xl font-bold mb-6">
                $99<span className="text-lg font-normal text-gray-500">/mo</span>
              </div>
              <ul className="space-y-4 text-gray-600 mb-8 flex-grow">
                <li>✓ Everything in Starter</li>
                <li>✓ Advanced Custom Dashboards</li>
                <li>✓ Enhanced Security Suite</li>
                <li>✓ Priority Email & Chat Support</li>
              </ul>
              <a
                href="/contact"
                className="w-full text-center bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
              >
                Choose Pro
              </a>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white p-8 rounded-2xl shadow-soft flex flex-col">
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <p className="text-gray-600 mb-6">For large-scale deployments with custom needs and dedicated support.</p>
              <div className="text-4xl font-bold mb-6">Contact Us</div>
              <ul className="space-y-4 text-gray-600 mb-8 flex-grow">
                <li>✓ Everything in Pro</li>
                <li>✓ On-Premise & Cloud Options</li>
                <li>✓ Dedicated Account Manager</li>
                <li>✓ 24/7 Premium Support</li>
              </ul>
              <a
                href="/contact"
                className="w-full text-center bg-gray-200 text-gray-800 font-semibold py-3 px-8 rounded-full hover:bg-gray-300 transition-colors"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
