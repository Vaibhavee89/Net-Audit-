import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Shield, 
  Network, 
  Search, 
  BarChart3, 
  Lock, 
  Zap, 
  LogOut,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Server,
  Wifi
} from 'lucide-react';

function Dashboard() {
  const { user, logout } = useAuth();
  const [activePhase, setActivePhase] = useState(1);

  const auditPhases = [
    { id: 1, name: "Planning & Scope Definition", status: "completed", icon: <Shield className="w-5 h-5" /> },
    { id: 2, name: "Network Discovery", status: "completed", icon: <Network className="w-5 h-5" /> },
    { id: 3, name: "Port & Service Scanning", status: "in-progress", icon: <Search className="w-5 h-5" /> },
    { id: 4, name: "OS and Device Fingerprinting", status: "pending", icon: <Server className="w-5 h-5" /> },
    { id: 5, name: "Firewall & Access Control Testing", status: "pending", icon: <Lock className="w-5 h-5" /> },
    { id: 6, name: "DNS and Routing Checks", status: "pending", icon: <Wifi className="w-5 h-5" /> },
    { id: 7, name: "Vulnerability Assessment", status: "pending", icon: <AlertTriangle className="w-5 h-5" /> },
    { id: 8, name: "Traffic & Bandwidth Monitoring", status: "pending", icon: <BarChart3 className="w-5 h-5" /> },
    { id: 9, name: "Change Tracking & Anomaly Detection", status: "pending", icon: <Activity className="w-5 h-5" /> },
    { id: 10, name: "Reporting & Recommendations", status: "pending", icon: <Zap className="w-5 h-5" /> },
    { id: 11, name: "Automation & Re-Auditing", status: "pending", icon: <Clock className="w-5 h-5" /> }
  ];

  const networkStats = {
    devicesFound: 6,
    openPorts: 15,
    vulnerabilities: 3,
    lastScan: "2 hours ago"
  };

  const recentDevices = [
    { ip: "192.168.31.1", hostname: "jiofiber.local.html", os: "OpenWrt 21.02", status: "online" },
    { ip: "192.168.31.195", hostname: "Vaibhavee.lan", os: "Windows 10", status: "online" },
    { ip: "192.168.31.225", hostname: "Google Home", os: "Google Home device", status: "online" },
    { ip: "192.168.31.95", hostname: "SetTopBox-0174.lan", os: "Android 9-10", status: "online" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/20';
      case 'in-progress': return 'text-blue-400 bg-blue-400/20';
      case 'pending': return 'text-gray-400 bg-gray-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

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
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {user?.email}</span>
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-white/10"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Devices Found</p>
                <p className="text-3xl font-bold text-white">{networkStats.devicesFound}</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Open Ports</p>
                <p className="text-3xl font-bold text-white">{networkStats.openPorts}</p>
              </div>
              <Network className="w-8 h-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Vulnerabilities</p>
                <p className="text-3xl font-bold text-white">{networkStats.vulnerabilities}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Last Scan</p>
                <p className="text-lg font-semibold text-white">{networkStats.lastScan}</p>
              </div>
              <Activity className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Audit Phases */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Audit Progress</h2>
              <div className="space-y-4">
                {auditPhases.map((phase) => (
                  <div
                    key={phase.id}
                    className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                      activePhase === phase.id
                        ? 'bg-blue-500/20 border-blue-500/50'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                    onClick={() => setActivePhase(phase.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${getStatusColor(phase.status)}`}>
                          {phase.icon}
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{phase.name}</h3>
                          <p className="text-gray-400 text-sm">Phase {phase.id}</p>
                        </div>
                      </div>
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(phase.status)}`}>
                        {getStatusIcon(phase.status)}
                        <span className="text-sm capitalize">{phase.status.replace('-', ' ')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Devices */}
          <div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-6">Recent Devices</h2>
              <div className="space-y-4">
                {recentDevices.map((device, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{device.ip}</span>
                      <span className="px-2 py-1 bg-green-400/20 text-green-400 text-xs rounded-full">
                        {device.status}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm">{device.hostname}</p>
                    <p className="text-gray-400 text-xs">{device.os}</p>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                View All Devices
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;