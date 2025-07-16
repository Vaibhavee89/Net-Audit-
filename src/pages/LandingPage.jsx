import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Shield, 
  Search, 
  Network, 
  BarChart3, 
  Lock, 
  Eye, 
  Bug, 
  Activity, 
  FileText, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Target,
  Package,
  Map,
  Settings,
  Zap,
  AlertTriangle,
  Monitor,
  Database,
  UserCheck,
  TrendingUp,
  RefreshCw
} from 'lucide-react'

function LandingPage() {
  const auditPhases = [
    {
      id: 1,
      title: "Define Audit Scope and Objectives",
      description: "Identify what will be audited (LAN, WAN, Wi-Fi, VPN, cloud) and set clear goals for security assessment and compliance.",
      icon: <Target className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Inventory All Network Assets",
      description: "Comprehensive listing of all hardware, software, and endpoints including routers, switches, servers, and IoT devices.",
      icon: <Package className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Map the Network Topology",
      description: "Create detailed network diagrams showing logical and physical connections, subnetworks, and data flows.",
      icon: <Map className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      title: "Review Network Security Policies",
      description: "Audit firewall rules, ACLs, VPN configurations, user roles, and multi-factor authentication enforcement.",
      icon: <Settings className="w-6 h-6" />,
      color: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      title: "Analyze Network Traffic",
      description: "Monitor traffic patterns using Wireshark, tcpdump, and NetFlow analyzers to identify anomalies and bottlenecks.",
      icon: <Activity className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: 6,
      title: "Scan for Vulnerabilities",
      description: "Perform internal and external scans using Nmap, Nessus, and OpenVAS to identify security weaknesses.",
      icon: <Search className="w-6 h-6" />,
      color: "from-teal-500 to-cyan-500"
    },
    {
      id: 7,
      title: "Test for Intrusions or Breaches",
      description: "Conduct penetration testing and review IDS/IPS logs and SIEM tools for suspicious behavior.",
      icon: <Bug className="w-6 h-6" />,
      color: "from-red-500 to-pink-500"
    },
    {
      id: 8,
      title: "Evaluate Network Performance",
      description: "Measure uptime, latency, packet loss, and throughput to identify bottlenecks and ensure reliability.",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: 9,
      title: "Audit Logging and Monitoring",
      description: "Verify event logs are enabled, centralized, and properly retained with appropriate alerting mechanisms.",
      icon: <Monitor className="w-6 h-6" />,
      color: "from-blue-500 to-indigo-500"
    },
    {
      id: 10,
      title: "Check Compliance and Documentation",
      description: "Match configurations against compliance standards (NIST, ISO 27001, PCI-DSS) and verify documentation.",
      icon: <FileText className="w-6 h-6" />,
      color: "from-green-500 to-teal-500"
    },
    {
      id: 11,
      title: "Interview Staff and Verify Access",
      description: "Interview network admins, verify access logs against employee roles, and check for unauthorized users.",
      icon: <UserCheck className="w-6 h-6" />,
      color: "from-purple-500 to-indigo-500"
    },
    {
      id: 12,
      title: "Identify Risks and Recommend Improvements",
      description: "Rank vulnerabilities by risk using CVSS scores and suggest improvements like network segmentation and MFA.",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-orange-500 to-yellow-500"
    },
    {
      id: 13,
      title: "Generate Audit Report",
      description: "Document audit objectives, methodologies, vulnerabilities found, risk levels, and actionable recommendations.",
      icon: <Database className="w-6 h-6" />,
      color: "from-cyan-500 to-blue-500"
    },
    {
      id: 14,
      title: "Plan for Continuous Monitoring",
      description: "Recommend ongoing monitoring tools, set periodic audit intervals, and enable automated alerts.",
      icon: <RefreshCw className="w-6 h-6" />,
      color: "from-pink-500 to-purple-500"
    }
  ]

  const keyFeatures = [
    {
      icon: <Shield className="w-8 h-8 text-blue-400" />,
      title: "Comprehensive Security Assessment",
      description: "14-phase methodology covering every aspect of network security from asset inventory to continuous monitoring."
    },
    {
      icon: <Network className="w-8 h-8 text-green-400" />,
      title: "Network Topology Mapping",
      description: "Automated discovery and visualization of network infrastructure with detailed connection mapping."
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-red-400" />,
      title: "Vulnerability Detection",
      description: "Advanced scanning capabilities using industry-standard tools like Nmap, Nessus, and OpenVAS."
    },
    {
      icon: <Eye className="w-8 h-8 text-purple-400" />,
      title: "Traffic Analysis & Monitoring",
      description: "Real-time network traffic analysis with anomaly detection and performance optimization."
    },
    {
      icon: <FileText className="w-8 h-8 text-cyan-400" />,
      title: "Compliance Reporting",
      description: "Automated compliance checking against NIST, ISO 27001, PCI-DSS, and other industry standards."
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: "Python Integration Ready",
      description: "Built for seamless integration with Python-based security tools and automation frameworks."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold text-white">Net-Audit</span>
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
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-200 font-medium transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="float-animation">
            <Shield className="w-20 h-20 text-blue-400 mx-auto mb-8" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="gradient-text">14-Phase</span>
            <br />
            Network Security Audit
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            From asset discovery to continuous monitoring - secure your infrastructure with enterprise-grade auditing.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/signup" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>Start Security Audit</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 backdrop-blur-sm">
              View Demo
            </button>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Enterprise-Level Network Auditing</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced security assessment tools designed for modern network infrastructure
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 group">
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14-Phase Methodology */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Complete 14-Phase Audit Methodology</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Systematic approach to network security assessment covering every critical aspect of your infrastructure
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {auditPhases.map((phase, index) => (
              <div key={phase.id} className="group relative">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 h-full">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${phase.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {phase.icon}
                  </div>
                  <div className="flex items-center mb-3">
                    <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full mr-3">
                      {phase.id}
                    </span>
                    <h3 className="text-lg font-semibold text-white leading-tight">{phase.title}</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Python Integration CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-4xl font-bold text-white mb-6">Ready for Python Integration</h2>
            <p className="text-xl text-gray-300 mb-8">
              Built with seamless Python integration in mind. Connect your existing security tools, 
              automation scripts, and monitoring systems for a complete security operations platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/signup" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Start Your Audit
              </Link>
              <Link 
                to="/login" 
                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 backdrop-blur-sm"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-md border-t border-white/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-8 h-8 text-blue-400" />
                <span className="text-xl font-bold text-white">NetworkAudit Pro</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Enterprise-grade network security auditing platform with comprehensive 14-phase methodology 
                and Python integration capabilities.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Network Discovery</li>
                <li>Vulnerability Scanning</li>
                <li>Traffic Analysis</li>
                <li>Compliance Reporting</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Integration</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Python API</li>
                <li>REST Endpoints</li>
                <li>Custom Scripts</li>
                <li>Automation Tools</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2025 NetworkAudit Pro. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage