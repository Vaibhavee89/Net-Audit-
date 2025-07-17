import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  Shield, 
  ArrowLeft, 
  Play, 
  Pause, 
  CheckCircle, 
  AlertTriangle,
  Target,
  Package,
  Map,
  Settings,
  Activity,
  Search,
  Bug,
  BarChart3,
  Monitor,
  FileText,
  UserCheck,
  TrendingUp,
  Database,
  RefreshCw,
  Terminal,
  Download
} from 'lucide-react'

function AuditPhase() {
  const { phaseId } = useParams()
  const { user } = useAuth()
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [logs, setLogs] = useState([])

  const phaseDetails = {
    1: {
      title: "Define Audit Scope and Objectives",
      description: "Identify what will be audited (LAN, WAN, Wi-Fi, VPN, cloud network) and set clear goals for security assessment, compliance check, and performance review.",
      icon: <Target className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      tasks: [
        "Identify network segments to audit",
        "Define security assessment goals",
        "Set compliance requirements (ISO 27001, HIPAA, etc.)",
        "Gather stakeholder requirements",
        "Document audit scope boundaries"
      ],
      tools: ["Network Documentation", "Compliance Frameworks", "Stakeholder Interviews"],
      pythonIntegration: "scope_definition.py - Automated scope documentation and requirement gathering"
    },
    2: {
      title: "Inventory All Network Assets",
      description: "Comprehensive listing of all hardware (routers, switches, firewalls, servers), software (OS, applications, firmware), and endpoints (desktops, laptops, mobile devices, IoT).",
      icon: <Package className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      tasks: [
        "Discover all network hardware",
        "Document software and firmware versions",
        "Catalog all endpoints and devices",
        "Identify IoT and mobile devices",
        "Create asset database"
      ],
      tools: ["Nmap", "Asset Discovery Tools", "SNMP Scanners"],
      pythonIntegration: "asset_inventory.py - Automated asset discovery and cataloging"
    },
    3: {
      title: "Map the Network Topology",
      description: "Create detailed network diagrams showing logical and physical connections, identify subnetworks and data flows, and highlight external connections.",
      icon: <Map className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      tasks: [
        "Create logical network diagram",
        "Map physical connections",
        "Identify subnetworks and VLANs",
        "Document data flow patterns",
        "Highlight external connections"
      ],
      tools: ["Network Mapping Tools", "SNMP", "Traceroute"],
      pythonIntegration: "topology_mapper.py - Automated network topology discovery and visualization"
    },
    4: {
      title: "Review Network Security Policies",
      description: "Audit firewall rules, access control lists (ACLs), VPN configurations, user roles, group policies, and multi-factor authentication enforcement.",
      icon: <Settings className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
      tasks: [
        "Review firewall rules and ACLs",
        "Audit VPN configurations",
        "Check user roles and permissions",
        "Verify MFA enforcement",
        "Assess password policies"
      ],
      tools: ["Firewall Analyzers", "Policy Auditors", "Access Control Tools"],
      pythonIntegration: "policy_auditor.py - Automated policy compliance checking"
    },
    5: {
      title: "Analyze Network Traffic",
      description: "Monitor traffic patterns using Wireshark, tcpdump, and NetFlow analyzers to identify unusual spikes, unauthorized flows, bandwidth issues, and latency problems.",
      icon: <Activity className="w-8 h-8" />,
      color: "from-indigo-500 to-purple-500",
      tasks: [
        "Monitor traffic patterns",
        "Identify unusual traffic spikes",
        "Detect unauthorized data flows",
        "Analyze bandwidth utilization",
        "Measure latency and jitter"
      ],
      tools: ["Wireshark", "tcpdump", "NetFlow Analyzers"],
      pythonIntegration: "traffic_analyzer.py - Real-time traffic analysis and anomaly detection"
    },
    6: {
      title: "Scan for Vulnerabilities",
      description: "Perform internal and external vulnerability scans using Nmap, Nessus, and OpenVAS to identify unpatched systems, open ports, weak protocols, and deprecated SSL/TLS versions.",
      icon: <Search className="w-8 h-8" />,
      color: "from-teal-500 to-cyan-500",
      tasks: [
        "Run internal vulnerability scans",
        "Perform external security scans",
        "Identify unpatched systems",
        "Find unnecessary open ports",
        "Check for weak protocols"
      ],
      tools: ["Nmap", "Nessus", "OpenVAS", "Vulnerability Scanners"],
      pythonIntegration: "vulnerability_scanner.py - Automated vulnerability assessment and reporting"
    },
    7: {
      title: "Test for Intrusions or Breaches",
      description: "Conduct penetration testing on critical systems, review IDS/IPS logs for suspicious behavior, and check SIEM tools for alerts and anomalies.",
      icon: <Bug className="w-8 h-8" />,
      color: "from-red-500 to-pink-500",
      tasks: [
        "Conduct penetration testing",
        "Review IDS/IPS logs",
        "Analyze SIEM alerts",
        "Check for indicators of compromise",
        "Test incident response procedures"
      ],
      tools: ["Penetration Testing Tools", "IDS/IPS", "SIEM Systems"],
      pythonIntegration: "intrusion_tester.py - Automated penetration testing and log analysis"
    },
    8: {
      title: "Evaluate Network Performance and Reliability",
      description: "Measure uptime/downtime, latency, packet loss, and throughput. Identify network bottlenecks and verify redundancy and failover systems.",
      icon: <BarChart3 className="w-8 h-8" />,
      color: "from-yellow-500 to-orange-500",
      tasks: [
        "Measure network uptime/downtime",
        "Test latency and packet loss",
        "Analyze throughput performance",
        "Identify network bottlenecks",
        "Verify failover systems"
      ],
      tools: ["Performance Monitors", "Bandwidth Analyzers", "Uptime Monitors"],
      pythonIntegration: "performance_evaluator.py - Network performance monitoring and analysis"
    },
    9: {
      title: "Audit Logging and Monitoring Mechanisms",
      description: "Verify that event logs are enabled, centralized, and properly retained. Validate log integrity, access control, and alerting mechanisms.",
      icon: <Monitor className="w-8 h-8" />,
      color: "from-blue-500 to-indigo-500",
      tasks: [
        "Verify log collection is enabled",
        "Check log centralization",
        "Validate log retention policies",
        "Test log integrity",
        "Review alerting mechanisms"
      ],
      tools: ["Log Management Systems", "SIEM", "Syslog Servers"],
      pythonIntegration: "log_auditor.py - Automated log analysis and compliance checking"
    },
    10: {
      title: "Check Compliance and Documentation",
      description: "Match configurations against compliance standards (NIST, ISO 27001, PCI-DSS) and verify documentation for change management, policies, and incident response.",
      icon: <FileText className="w-8 h-8" />,
      color: "from-green-500 to-teal-500",
      tasks: [
        "Check NIST compliance",
        "Verify ISO 27001 requirements",
        "Audit PCI-DSS compliance",
        "Review change management docs",
        "Validate incident response plans"
      ],
      tools: ["Compliance Scanners", "Documentation Tools", "Audit Frameworks"],
      pythonIntegration: "compliance_checker.py - Automated compliance assessment and reporting"
    },
    11: {
      title: "Interview Staff and Verify Access",
      description: "Interview network administrators for undocumented changes, verify access logs against employee roles, and check for unauthorized users or ex-employees with active credentials.",
      icon: <UserCheck className="w-8 h-8" />,
      color: "from-purple-500 to-indigo-500",
      tasks: [
        "Interview network administrators",
        "Verify user access logs",
        "Check employee role alignment",
        "Identify unauthorized users",
        "Review ex-employee access"
      ],
      tools: ["Access Management Systems", "HR Systems", "Interview Templates"],
      pythonIntegration: "access_verifier.py - Automated access review and user validation"
    },
    12: {
      title: "Identify Risks and Recommend Improvements",
      description: "Rank vulnerabilities by risk using CVSS scores and exploitability. Suggest improvements like network segmentation, MFA implementation, and firewall optimization.",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-orange-500 to-yellow-500",
      tasks: [
        "Calculate CVSS risk scores",
        "Rank vulnerabilities by impact",
        "Recommend network segmentation",
        "Suggest MFA implementation",
        "Optimize firewall rules"
      ],
      tools: ["Risk Assessment Tools", "CVSS Calculators", "Security Frameworks"],
      pythonIntegration: "risk_assessor.py - Automated risk calculation and recommendation engine"
    },
    13: {
      title: "Generate Audit Report",
      description: "Document audit objectives, methodologies used, vulnerabilities found, risk levels, and actionable recommendations. Share with stakeholders and set follow-up dates.",
      icon: <Database className="w-8 h-8" />,
      color: "from-cyan-500 to-blue-500",
      tasks: [
        "Document audit objectives",
        "Summarize methodologies used",
        "List vulnerabilities found",
        "Assign risk levels",
        "Provide actionable recommendations"
      ],
      tools: ["Report Generators", "Documentation Tools", "Presentation Software"],
      pythonIntegration: "report_generator.py - Automated comprehensive audit report generation"
    },
    14: {
      title: "Plan for Continuous Monitoring",
      description: "Recommend ongoing monitoring tools (Zabbix, Nagios, SolarWinds), set periodic audit intervals, and enable automated alerts and regular vulnerability scans.",
      icon: <RefreshCw className="w-8 h-8" />,
      color: "from-pink-500 to-purple-500",
      tasks: [
        "Setup continuous monitoring tools",
        "Configure automated alerts",
        "Schedule periodic audits",
        "Enable vulnerability scanning",
        "Implement change tracking"
      ],
      tools: ["Zabbix", "Nagios", "SolarWinds", "Monitoring Platforms"],
      pythonIntegration: "continuous_monitor.py - Automated monitoring setup and maintenance"
    }
  }

  const currentPhase = phaseDetails[phaseId] || phaseDetails[1]

  const startPhase = () => {
    setIsRunning(true)
    setProgress(0)
    setLogs([])
    
    // Simulate phase execution
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10
        if (newProgress >= 100) {
          clearInterval(interval)
          setIsRunning(false)
          setLogs(prev => [...prev, { type: 'success', message: 'Phase completed successfully!', timestamp: new Date().toLocaleTimeString() }])
          return 100
        }
        
        // Add random log entries
        if (Math.random() > 0.7) {
          const messages = [
            'Scanning network segment...',
            'Analyzing configuration files...',
            'Checking security policies...',
            'Validating compliance requirements...',
            'Processing discovered assets...'
          ]
          setLogs(prev => [...prev, { 
            type: 'info', 
            message: messages[Math.floor(Math.random() * messages.length)], 
            timestamp: new Date().toLocaleTimeString() 
          }])
        }
        
        return newProgress
      })
    }, 500)
  }

  const pausePhase = () => {
    setIsRunning(false)
  }

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
            <div className="flex items-center space-x-4">
              <Link 
                to="/dashboard"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Phase Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className={`p-4 rounded-xl bg-gradient-to-r ${currentPhase.color}`}>
              {currentPhase.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Phase {phaseId}: {currentPhase.title}</h1>
              <p className="text-gray-300 text-lg">{currentPhase.description}</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium">Progress</span>
              <span className="text-white">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className={`bg-gradient-to-r ${currentPhase.color} h-3 rounded-full transition-all duration-500`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex space-x-4">
            {!isRunning ? (
              <button
                onClick={startPhase}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Start Phase</span>
              </button>
            ) : (
              <button
                onClick={pausePhase}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
              >
                <Pause className="w-5 h-5" />
                <span>Pause Phase</span>
              </button>
            )}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Export Results</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Phase Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tasks */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4">Phase Tasks</h2>
              <div className="space-y-3">
                {currentPhase.tasks.map((task, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-white">{task}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Execution Logs */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex items-center space-x-2 mb-4">
                <Terminal className="w-5 h-5 text-green-400" />
                <h2 className="text-xl font-bold text-white">Execution Logs</h2>
              </div>
              <div className="bg-black/30 rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm">
                {logs.length === 0 ? (
                  <p className="text-gray-400">No logs yet. Start the phase to see execution details.</p>
                ) : (
                  logs.map((log, index) => (
                    <div key={index} className="mb-2">
                      <span className="text-gray-400">[{log.timestamp}]</span>
                      <span className={`ml-2 ${
                        log.type === 'success' ? 'text-green-400' :
                        log.type === 'warning' ? 'text-yellow-400' :
                        'text-blue-400'
                      }`}>
                        {log.message}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tools Required */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4">Required Tools</h2>
              <div className="space-y-2">
                {currentPhase.tools.map((tool, index) => (
                  <div key={index} className="p-2 bg-white/5 rounded-lg border border-white/10">
                    <span className="text-white text-sm">{tool}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Python Integration */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4">Python Integration</h2>
              <div className="p-4 bg-black/30 rounded-lg border border-white/10">
                <code className="text-green-400 text-sm">{currentPhase.pythonIntegration}</code>
              </div>
              <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                View Python Script
              </button>
            </div>

            {/* Phase Status */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4">Phase Status</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    progress === 100 ? 'bg-green-400/20 text-green-400' :
                    isRunning ? 'bg-blue-400/20 text-blue-400' :
                    'bg-gray-400/20 text-gray-400'
                  }`}>
                    {progress === 100 ? 'Completed' : isRunning ? 'Running' : 'Pending'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Duration</span>
                  <span className="text-white">~30 minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Priority</span>
                  <span className="text-yellow-400">High</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuditPhase