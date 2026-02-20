import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./components/Button.jsx";

const FeatureCard = ({ title, desc }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-200">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 rounded-full bg-indigo-100 flex-shrink-0 flex items-center justify-center">
          <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-slate-800">{title}</h4>
          <p className="text-sm text-slate-500 mt-1">{desc}</p>
        </div>
      </div>
    </div>
  );
};

const StepCard = ({ number, title, desc }) => {
  return (
    <div className="flex-1 min-w-[200px] bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
          {number}
        </div>
        <div>
          <h5 className="font-semibold text-slate-800">{title}</h5>
          <p className="text-sm text-slate-500 mt-1">{desc}</p>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ value, label }) => {
  return (
    <div className="text-center p-4">
      <div className="text-3xl md:text-4xl font-extrabold text-indigo-600">{value}</div>
      <div className="text-sm text-slate-500 mt-1">{label}</div>
    </div>
  );
};



const HeroImageCollage = () => (
    <div className="relative w-full max-w-xl h-[28rem] lg:h-[32rem]">
        <div className="absolute -top-8 -left-6 w-48 h-48 rounded-full bg-cyan-300/30 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-8 -right-10 w-56 h-56 rounded-full bg-indigo-300/35 blur-3xl animate-float-delay" />

        <div className="absolute top-5 left-2 w-[72%] h-[58%] rounded-3xl overflow-hidden shadow-[0_24px_45px_-20px_rgba(30,41,59,0.55)] ring-1 ring-white/70 rotate-[-9deg] hover:rotate-[-6deg] transition-transform duration-500">
            <img
                src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Diverse group of students"
                className="h-full w-full object-cover scale-110 hover:scale-100 transition-transform duration-700"
            />
        </div>

        <div className="absolute bottom-10 right-0 w-[68%] h-[54%] rounded-3xl overflow-hidden shadow-[0_28px_50px_-22px_rgba(30,41,59,0.6)] ring-1 ring-white/80 rotate-[7deg] hover:rotate-[4deg] transition-transform duration-500">
            <img
                src="https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Student using a laptop"
                className="h-full w-full object-cover scale-110 hover:scale-100 transition-transform duration-700"
            />
        </div>

        <div className="absolute top-[39%] left-[49%] -translate-x-1/2 -translate-y-1/2 rounded-2xl px-4 py-3 bg-white/85 backdrop-blur-lg shadow-xl ring-1 ring-white animate-float-card">
            <p className="text-xs uppercase tracking-wider text-slate-500">Active Monitoring</p>
            <p className="text-xl font-black text-slate-800">24/7 AI Alerts</p>
        </div>

        <div className="absolute bottom-2 left-0 rounded-2xl px-4 py-3 bg-slate-900 text-white shadow-xl animate-float-delay">
            <p className="text-xs text-slate-300">Institutions Onboarded</p>
            <p className="text-2xl font-black">50+</p>
        </div>
    </div>
);

export default function Home() {
  const navigate = useNavigate();
  const features = [
    {
      title: "Smart Risk Detection",
      desc: "AI-driven models identify at-risk students proactively so you can intervene early.",
    },
    {
      title: "Cloud-Based Management",
      desc: "Centralized, secure access to student data and controls from anywhere.",
    },
    {
      title: "Real-time Analytics",
      desc: "Live dashboards and visualizations to track student performance trends.",
    },
    {
      title: "Secure & Scalable",
      desc: "Enterprise-grade security and auto-scaling to handle institutional needs.",
    },
  ];

  const steps = [
    {
      title: "Add Student Data",
      desc: "Import rosters, grades, attendance and contextual notes securely.",
    },
    {
      title: "System Analyzes Performance",
      desc: "Our models compute risk signals and learning pattern insights.",
    },
    {
      title: "Get Risk Alerts",
      desc: "Receive prioritized alerts and recommended interventions in real-time.",
    },
  ];

  const stats = [
    { value: "10,000+", label: "Students Monitored" },
    { value: "95%", label: "Risk Detection Accuracy" },
    { value: "50+", label: "Institutions" },
    { value: "Real-time", label: "Processing" },
  ];

  return (
    <>
        <section className="relative overflow-hidden bg-gradient-to-br from-[#e0ecff] via-[#f7fbff] to-[#dff6ff]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl animate-float-slow" />
            <div className="absolute top-20 right-0 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl animate-float-delay" />
          </div>
          <div className="container mx-auto px-6 lg:px-8 min-h-screen flex items-center">
            <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-16">
              <div className="md:col-span-7">
                <div className="max-w-2xl">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-cyan-500">
                    Empowering Student Success with AI
                  </h1>
                  <p className="mt-4 text-lg text-slate-600">
                    EduGuard AI provides cutting-edge tools to monitor, analyze, and support students, ensuring no one is left behind.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Button
                      variant="primary"
                      className="shadow-[0_20px_35px_-15px_rgba(79,70,229,0.75)] text-lg px-8 py-4 hover:-translate-y-0.5 transition-transform"
                      onClick={() => {
                        navigate('/dashboard');
                      }}
                      aria-label="Go to Dashboard"
                    >
                      Go to Dashboard
                      <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Button>
                    <Button
                      variant="outline"
                      className="text-lg px-8 py-4 bg-white/80 backdrop-blur-md border-white shadow-sm hover:shadow-md"
                      onClick={() => {
                        /* placeholder */
                      }}
                      aria-label="Learn More"
                    >
                      Learn More
                    </Button>
                  </div>

                  <div className="mt-8 text-sm text-slate-500 bg-white/70 backdrop-blur-md inline-flex items-center px-4 py-2 rounded-full shadow-sm">
                    Join over 50 institutions in revolutionizing education.
                  </div>
                </div>
              </div>

              <div className="md:col-span-5">
                <div className="w-full flex justify-center md:justify-end">
                  <HeroImageCollage />
                </div>
              </div>
            </div>
          </div>
        </section>

        <main className="container mx-auto px-6 lg:px-8 -mt-12">
          <section className="py-12">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Platform Features</h2>
                <p className="mt-2 text-slate-600">Everything you need to monitor, analyze and act.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((f) => (
                  <FeatureCard key={f.title} title={f.title} desc={f.desc} />
                ))}
              </div>
            </div>
          </section>

          <section className="py-12">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-slate-900">How It Works</h3>
                <p className="mt-2 text-slate-600">Simple steps to get your monitoring live.</p>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                {steps.map((s, idx) => (
                  <StepCard
                    key={s.title}
                    number={idx + 1}
                    title={s.title}
                    desc={s.desc}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="py-12">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                {stats.map((st) => (
                  <StatCard key={st.label} value={st.value} label={st.label} />
                ))}
              </div>
            </div>
          </section>

          <section className="py-12">
            <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden">
              <div className="bg-indigo-900 text-white rounded-2xl p-8 md:p-12 shadow-lg flex flex-col md:flex-row items-center justify-between">
                <div className="max-w-xl">
                  <h4 className="text-2xl md:text-3xl font-bold">Start Monitoring Smarter Today</h4>
                  <p className="mt-2 text-indigo-100">
                    Create a safer, more supportive learning environment with actionable insights.
                  </p>
                </div>
                <div className="mt-6 md:mt-0">
                  <Button
                    variant="ghost"
                    className="bg-white text-indigo-900 hover:bg-white/90 rounded-full px-6 py-3 font-semibold"
                    onClick={() => {
                      /* placeholder sign-up */
                    }}
                  >
                    Create Free Account
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
    </>
  );
}
