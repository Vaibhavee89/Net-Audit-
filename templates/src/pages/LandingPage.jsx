import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Network, Search, BarChart3, Lock, Zap, CheckCircle, ArrowRight } from 'lucide-react';

function LandingPage() {
  const features = [
    {
      icon: <Network className="w-8 h-8 text-blue-600" />,
      title: "Network Discovery",
      description: "Automatically discover all devices on your network with detailed information about each endpoint."
    },
    {
      icon: <Search className="w-8 h-8 text-blue-600" />,
      title: "Port & Service Scanning",
      description: "Comprehensive port scanning and service identification to understand your network's attack surface."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Vulnerability Assessment",
      description: "Identify security vulnerabilities and get actionable recommendations to improve your security posture."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
      title: "Traffic Monitoring",
      description: "Monitor network traffic patterns and bandwidth usage to detect anomalies and optimize performance."
    },
    {
      icon: <Lock className="w-8 h-8 text-blue-600" />,
      title: "Access Control Testing",
      description: "Test firewall rules and access controls to ensure your network security policies are effective."
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "Automated Reporting",
      description: "Generate comprehensive reports with actionable insights and recommendations for network improvements."
    }
  ];

  const auditPhases = [
    "Planning & Scope Definition",
    "Network Discovery",
    "Port & Service Scanning",
    "OS and Device Fingerprinting",
    "Firewall & Access Control Testing",
    "DNS and Routing Checks",
    "Vulnerability Assessment",
    "Traffic & Bandwidth Monitoring",
    "Change Tracking & Anomaly Detection",
    "Reporting & Recommendations",
    "Automation & Re-Auditing"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold text-white">NetworkAudit Pro</span>
            </div>
            <div className="flex space-x-4">
              <Link 
                to="/login" 
                className="text-white hover:text-blue-300 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-white/10"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Comprehensive
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"> Network Security</span>
            <br />Auditing Platform
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover, analyze, and secure your network infrastructure with our advanced 11-phase audit methodology. 
            Get actionable insights to protect your organization from cyber threats.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Start Free Audit</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Powerful Network Audit Features</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to conduct thorough network security assessments
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200 transform hover:scale-105">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audit Phases Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">11-Phase Audit Methodology</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our comprehensive approach ensures no aspect of your network security is overlooked
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {auditPhases.map((phase, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 flex items-center space-x-3 hover:bg-white/15 transition-all duration-200">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <span className="text-white font-medium">{phase}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Secure Your Network?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of organizations that trust NetworkAudit Pro to protect their infrastructure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Start Your Free Audit
            </Link>
            <Link 
              to="/login" 
              className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-md border-t border-white/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-semibold text-white">NetworkAudit Pro</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 NetworkAudit Pro. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;