import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { 
  Shield, 
  LogOut,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Server,
  Wifi,
  Play,
  BarChart3,
  Network,
  Target,
  Package,
  Map,
  Settings,
  Search,
  Bug,
  Monitor,
  FileText,
  UserCheck,
  TrendingUp,
  Database,
  RefreshCw
} from 'lucide-react'

function Dashboard() {
  const { user, logout } = useAuth()
  const [activePhase, setActivePhase] = useState(1)

  const auditPhases = [
    { id: 1, name: "Define Audit Scope", status: "completed", icon: <Target className="w-5 h-5" />, progress: 100 },
    { id: 2, name: "Inventory Network Assets", status: "completed", icon: <Package className="w-5 h-5" />, progress: 100 },
    { id: 3, name: "Map Network Topology", status: "in-progress", icon: <Map className="w-5 h-5" />, progress: 65 },
    { id: 4, name: "Review Security Policies", status: "pending", icon: <Settings className="w-5 h-5" />, progress: 0 },
    { id: 5, name: "Analyze Network Traffic", status: "pending", icon: <Activity className="w-5 h-5" />, progress: 0 },
    { id: 6, name: "Scan for Vulnerabilities", status: "pending", icon: <Search className="w-5 h-5" />, progress: 0 },
    { id: 7, name: "Test for Intrusions", status: "pending", icon: <Bug className="w-5 h-5" />, progress: 0 },
    { id: 8, name: "Evaluate Performance", status: "pending", icon: <BarChart3 className="w-5 h-5" />, progress: 0 },
    { id: 9, name: "Audit Logging", status: "pending", icon: <Monitor className="w-5 h-5" />, progress: 0 },
    { id: 10, name: "Check Compliance", status: "pending", icon: <FileText className="w-5 h-5" />, progress: 0 },
    { id: 11, name: "Interview Staff", status: "pending", icon: <UserCheck className="w-5 h-5" />, progress: 0 },
    { id: 12, name: "Identify Risks", status: "pending", icon: <TrendingUp className="w-5 h-5" />, progress: 0 },
    { id: 13, name: "Generate Report", status: "pending", icon: <Database className="w-5 h-5" />, progress: 0 },
    { id: 14, name: "Continuous Monitoring", status: "pending", icon: <RefreshCw className="w-5 h-5" />, progress: 0 }
  ]

  const networkStats = {
    devicesFound: 12,
    openPorts: 28,
    vulnerabilities: 5,
    lastScan: "3 hours ago",
    completedPhases: 2,
    totalPhases: 14
  }

  const recentActivity = [
    { action: "Network scan completed", time: "2 hours ago", type: "success" },
    { action: "5 vulnerabilities detected", time: "3 hours ago", type: "warning" },
    { action: "Asset inventory updated", time: "5 hours ago", type: "info" },
    { action: "New device discovered", time: "1 day ago", type: "info" }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/20 border-green-400/30'
      case 'in-progress': return 'text-blue-400 bg-blue-400/20 border-blue-400/30'
      case 'pending': return 'text-gray-400 bg-gray-400/20 border-gray-400/30'
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'in-progress': return <Clock className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case 'info': return <Activity className="w-4 h-4 text-blue-400" />
      default: return <Activity className="w-4 h-4 text-gray-400" />
    }
  }

  const overallProgress = Math.round((networkStats.completedPhases / networkStats.totalPhases) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold text-white">NetworkAudit Pro</span>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm text-gray-300">Welcome back,</p>
                <p className="text-white font-medium">{user?.email}</p>
              </div>
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
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Overall Progress</p>
                <p className="text-3xl font-bold text-white">{overallProgress}%</p>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${overallProgress}%` }}
                  ></div>
                </div>
              </div>
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Devices Found</p>
                <p className="text-3xl font-bold text-white">{networkStats.devicesFound}</p>
              </div>
              <Users className="w-8 h-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Open Ports</p>
                <p className="text-3xl font-bold text-white">{networkStats.openPorts}</p>
              </div>
              <Network className="w-8 h-8 text-cyan-400" />
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
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Audit Phases */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">14-Phase Audit Progress</h2>
                <span className="text-sm text-gray-300">
                  {networkStats.completedPhases} of {networkStats.totalPhases} completed
                </span>
              </div>
              <div className="space-y-3">
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
                        <div className="flex-1">
                          <h3 className="text-white font-medium">{phase.name}</h3>
                          <p className="text-gray-400 text-sm">Phase {phase.id}</p>
                          {phase.progress > 0 && (
                            <div className="w-32 bg-gray-700 rounded-full h-1 mt-1">
                              <div 
                                className="bg-blue-500 h-1 rounded-full transition-all duration-500"
                                style={{ width: `${phase.progress}%` }}
                              ></div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(phase.status)}`}>
                          {getStatusIcon(phase.status)}
                          <span className="text-sm capitalize">{phase.status.replace('-', ' ')}</span>
                        </div>
                        <Link 
                          to={`/audit/${phase.id}`}
                          className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                        >
                          <Play className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-6">
              <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1">
                      <p className="text-white text-sm">{activity.action}</p>
                      <p className="text-gray-400 text-xs">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Search className="w-4 h-4" />
                  <span>Start New Scan</span>
                </button>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Generate Report</span>
                </button>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Configure Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard