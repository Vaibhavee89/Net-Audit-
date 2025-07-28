import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
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
  Download,
  Edit3,
  Save,
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight
} from 'lucide-react'

function AuditPhase() {
  const { phaseId } = useParams()
  const { user } = useAuth()
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [logs, setLogs] = useState([])
  const [editingStep, setEditingStep] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})
  const [phaseData, setPhaseData] = useState({
    scopeComponents: [
      { id: 1, name: 'LAN - Local Area Network', description: 'Corporate office network infrastructure', included: true },
      { id: 2, name: 'WAN - Wide Area Network', description: 'Connections between office branches', included: true },
      { id: 3, name: 'Wireless Networks', description: 'Wi-Fi access points and client devices', included: true },
      { id: 4, name: 'VPN Infrastructure', description: 'Remote access tunnels and configurations', included: false },
      { id: 5, name: 'Cloud Networks', description: 'Virtual networks in AWS, Azure, or GCP', included: false },
      { id: 6, name: 'Firewall and DMZ', description: 'Perimeter defense and public-facing systems', included: true }
    ],
    objectives: [
      { id: 1, name: 'Security Assessment', description: 'Detect vulnerabilities, misconfigurations, or unauthorized access', priority: 'High' },
      { id: 2, name: 'Compliance Check - ISO 27001', description: 'Ensure adherence to ISO/IEC 27001 standards', priority: 'High' },
      { id: 3, name: 'Performance Review', description: 'Analyze network efficiency, bandwidth usage, and latency', priority: 'Medium' },
      { id: 4, name: 'Access Control Audit', description: 'Verify authorized user access only', priority: 'High' }
    ],
    stakeholders: [
      { id: 1, name: 'IT Administrator', role: 'Network Management', contact: 'admin@company.com', concerns: 'Network performance and security' },
      { id: 2, name: 'CISO', role: 'Security Oversight', contact: 'ciso@company.com', concerns: 'Compliance and risk management' }
    ],
    timeline: {
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      duration: '30 days'
    },
    complianceFrameworks: ['ISO/IEC 27001', 'NIST Cybersecurity Framework'],
    businessCriticalSystems: ['Email Server', 'Database Server', 'Web Application'],
    exclusions: ['Guest WiFi Network', 'Legacy Systems scheduled for decommission']
  })

  const phaseDetails = {
    1: {
      title: "Define Audit Scope and Objectives",
      description: "Identify what will be audited (LAN, WAN, Wi-Fi, VPN, cloud network) and set clear goals for security assessment, compliance check, and performance review.",
      icon: <Target className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      sections: [
        {
          id: 'scope',
          title: '🧭 1.1 Identify What Will Be Audited',
          description: 'Define specific network components and segments to be included in the audit.',
          content: 'scopeComponents'
        },
        {
          id: 'objectives',
          title: '🎯 1.2 Set Clear Audit Objectives',
          description: 'Define SMART objectives for the audit process.',
          content: 'objectives'
        },
        {
          id: 'stakeholders',
          title: '🧑‍💼 1.3 Gather Stakeholder Requirements',
          description: 'Identify and document stakeholder expectations and concerns.',
          content: 'stakeholders'
        },
        {
          id: 'deliverables',
          title: '🗺️ Deliverables of This Step',
          description: 'Final outputs and documentation from this phase.',
          content: 'deliverables'
        }
      ]
    }
    // Other phases would be defined here...
  }

  const currentPhase = phaseDetails[phaseId] || phaseDetails[1]

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const addItem = (type) => {
    const newItem = {
      id: Date.now(),
      name: '',
      description: '',
      ...(type === 'scopeComponents' && { included: true }),
      ...(type === 'objectives' && { priority: 'Medium' }),
      ...(type === 'stakeholders' && { role: '', contact: '', concerns: '' })
    }
    
    setPhaseData(prev => ({
      ...prev,
      [type]: [...prev[type], newItem]
    }))
    setEditingStep(`${type}-${newItem.id}`)
  }

  const updateItem = (type, id, field, value) => {
    setPhaseData(prev => ({
      ...prev,
      [type]: prev[type].map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }))
  }

  const removeItem = (type, id) => {
    setPhaseData(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== id)
    }))
  }

  const generatePDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    let yPosition = 20

    // Title
    pdf.setFontSize(20)
    pdf.setFont('helvetica', 'bold')
    pdf.text(`Phase ${phaseId}: ${currentPhase.title}`, 20, yPosition)
    yPosition += 15

    // Description
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'normal')
    const splitDescription = pdf.splitTextToSize(currentPhase.description, pageWidth - 40)
    pdf.text(splitDescription, 20, yPosition)
    yPosition += splitDescription.length * 5 + 10

    // Scope Components
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.text('1.1 Network Components in Scope', 20, yPosition)
    yPosition += 10

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    phaseData.scopeComponents.forEach(component => {
      if (yPosition > pageHeight - 30) {
        pdf.addPage()
        yPosition = 20
      }
      const status = component.included ? '✓ Included' : '✗ Excluded'
      pdf.text(`${status}: ${component.name}`, 25, yPosition)
      yPosition += 5
      if (component.description) {
        const splitDesc = pdf.splitTextToSize(`   ${component.description}`, pageWidth - 50)
        pdf.text(splitDesc, 25, yPosition)
        yPosition += splitDesc.length * 4 + 3
      }
    })

    yPosition += 10

    // Objectives
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.text('1.2 Audit Objectives', 20, yPosition)
    yPosition += 10

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    phaseData.objectives.forEach(objective => {
      if (yPosition > pageHeight - 30) {
        pdf.addPage()
        yPosition = 20
      }
      pdf.text(`• ${objective.name} (Priority: ${objective.priority})`, 25, yPosition)
      yPosition += 5
      if (objective.description) {
        const splitDesc = pdf.splitTextToSize(`   ${objective.description}`, pageWidth - 50)
        pdf.text(splitDesc, 25, yPosition)
        yPosition += splitDesc.length * 4 + 3
      }
    })

    yPosition += 10

    // Stakeholders
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.text('1.3 Stakeholders', 20, yPosition)
    yPosition += 10

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    phaseData.stakeholders.forEach(stakeholder => {
      if (yPosition > pageHeight - 30) {
        pdf.addPage()
        yPosition = 20
      }
      pdf.text(`• ${stakeholder.name} - ${stakeholder.role}`, 25, yPosition)
      yPosition += 5
      if (stakeholder.contact) {
        pdf.text(`   Contact: ${stakeholder.contact}`, 25, yPosition)
        yPosition += 4
      }
      if (stakeholder.concerns) {
        const splitConcerns = pdf.splitTextToSize(`   Concerns: ${stakeholder.concerns}`, pageWidth - 50)
        pdf.text(splitConcerns, 25, yPosition)
        yPosition += splitConcerns.length * 4 + 3
      }
    })

    // Timeline
    yPosition += 10
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Timeline', 20, yPosition)
    yPosition += 10

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`Start Date: ${phaseData.timeline.startDate}`, 25, yPosition)
    yPosition += 5
    pdf.text(`End Date: ${phaseData.timeline.endDate}`, 25, yPosition)
    yPosition += 5
    pdf.text(`Duration: ${phaseData.timeline.duration}`, 25, yPosition)

    // Save the PDF
    pdf.save(`Phase_${phaseId}_Audit_Scope_Definition.pdf`)
  }

  const startPhase = () => {
    setIsRunning(true)
    setProgress(0)
    setLogs([])
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10
        if (newProgress >= 100) {
          clearInterval(interval)
          setIsRunning(false)
          setLogs(prev => [...prev, { type: 'success', message: 'Phase completed successfully!', timestamp: new Date().toLocaleTimeString() }])
          return 100
        }
        
        if (Math.random() > 0.7) {
          const messages = [
            'Validating scope definitions...',
            'Checking stakeholder requirements...',
            'Reviewing compliance frameworks...',
            'Documenting audit objectives...',
            'Finalizing scope boundaries...'
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

  const renderScopeComponents = () => (
    <div className="space-y-4">
      {phaseData.scopeComponents.map(component => (
        <div key={component.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={component.included}
                onChange={(e) => updateItem('scopeComponents', component.id, 'included', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              {editingStep === `scopeComponents-${component.id}` ? (
                <input
                  type="text"
                  value={component.name}
                  onChange={(e) => updateItem('scopeComponents', component.id, 'name', e.target.value)}
                  className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm"
                  autoFocus
                />
              ) : (
                <span className={`font-medium ${component.included ? 'text-green-400' : 'text-gray-400'}`}>
                  {component.name}
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingStep(editingStep === `scopeComponents-${component.id}` ? null : `scopeComponents-${component.id}`)}
                className="text-blue-400 hover:text-blue-300"
              >
                {editingStep === `scopeComponents-${component.id}` ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => removeItem('scopeComponents', component.id)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          {editingStep === `scopeComponents-${component.id}` ? (
            <textarea
              value={component.description}
              onChange={(e) => updateItem('scopeComponents', component.id, 'description', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm"
              rows="2"
              placeholder="Description..."
            />
          ) : (
            <p className="text-gray-300 text-sm">{component.description}</p>
          )}
        </div>
      ))}
      <button
        onClick={() => addItem('scopeComponents')}
        className="w-full p-3 border-2 border-dashed border-white/30 rounded-lg text-white hover:border-white/50 transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <Plus className="w-4 h-4" />
        <span>Add Network Component</span>
      </button>
    </div>
  )

  const renderObjectives = () => (
    <div className="space-y-4">
      {phaseData.objectives.map(objective => (
        <div key={objective.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3 flex-1">
              {editingStep === `objectives-${objective.id}` ? (
                <input
                  type="text"
                  value={objective.name}
                  onChange={(e) => updateItem('objectives', objective.id, 'name', e.target.value)}
                  className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm flex-1"
                  autoFocus
                />
              ) : (
                <span className="font-medium text-white">{objective.name}</span>
              )}
              <select
                value={objective.priority}
                onChange={(e) => updateItem('objectives', objective.id, 'priority', e.target.value)}
                className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingStep(editingStep === `objectives-${objective.id}` ? null : `objectives-${objective.id}`)}
                className="text-blue-400 hover:text-blue-300"
              >
                {editingStep === `objectives-${objective.id}` ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => removeItem('objectives', objective.id)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          {editingStep === `objectives-${objective.id}` ? (
            <textarea
              value={objective.description}
              onChange={(e) => updateItem('objectives', objective.id, 'description', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm"
              rows="2"
              placeholder="Description..."
            />
          ) : (
            <p className="text-gray-300 text-sm">{objective.description}</p>
          )}
        </div>
      ))}
      <button
        onClick={() => addItem('objectives')}
        className="w-full p-3 border-2 border-dashed border-white/30 rounded-lg text-white hover:border-white/50 transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <Plus className="w-4 h-4" />
        <span>Add Objective</span>
      </button>
    </div>
  )

  const renderStakeholders = () => (
    <div className="space-y-4">
      {phaseData.stakeholders.map(stakeholder => (
        <div key={stakeholder.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3 flex-1">
              {editingStep === `stakeholders-${stakeholder.id}` ? (
                <div className="grid grid-cols-2 gap-2 flex-1">
                  <input
                    type="text"
                    value={stakeholder.name}
                    onChange={(e) => updateItem('stakeholders', stakeholder.id, 'name', e.target.value)}
                    className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm"
                    placeholder="Name"
                    autoFocus
                  />
                  <input
                    type="text"
                    value={stakeholder.role}
                    onChange={(e) => updateItem('stakeholders', stakeholder.id, 'role', e.target.value)}
                    className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm"
                    placeholder="Role"
                  />
                </div>
              ) : (
                <div>
                  <span className="font-medium text-white">{stakeholder.name}</span>
                  <span className="text-gray-400 ml-2">- {stakeholder.role}</span>
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingStep(editingStep === `stakeholders-${stakeholder.id}` ? null : `stakeholders-${stakeholder.id}`)}
                className="text-blue-400 hover:text-blue-300"
              >
                {editingStep === `stakeholders-${stakeholder.id}` ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => removeItem('stakeholders', stakeholder.id)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          {editingStep === `stakeholders-${stakeholder.id}` ? (
            <div className="space-y-2">
              <input
                type="email"
                value={stakeholder.contact}
                onChange={(e) => updateItem('stakeholders', stakeholder.id, 'contact', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm"
                placeholder="Contact email"
              />
              <textarea
                value={stakeholder.concerns}
                onChange={(e) => updateItem('stakeholders', stakeholder.id, 'concerns', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm"
                rows="2"
                placeholder="Concerns and expectations..."
              />
            </div>
          ) : (
            <div className="text-gray-300 text-sm">
              {stakeholder.contact && <p>Contact: {stakeholder.contact}</p>}
              {stakeholder.concerns && <p>Concerns: {stakeholder.concerns}</p>}
            </div>
          )}
        </div>
      ))}
      <button
        onClick={() => addItem('stakeholders')}
        className="w-full p-3 border-2 border-dashed border-white/30 rounded-lg text-white hover:border-white/50 transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <Plus className="w-4 h-4" />
        <span>Add Stakeholder</span>
      </button>
    </div>
  )

  const renderDeliverables = () => (
    <div className="space-y-4">
      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
        <h4 className="font-medium text-white mb-2">Written Scope Document</h4>
        <ul className="text-gray-300 text-sm space-y-1 ml-4">
          <li>• Network components included and excluded</li>
          <li>• Timeline: {phaseData.timeline.startDate} to {phaseData.timeline.endDate}</li>
          <li>• Tools and methodologies to be used</li>
          <li>• Roles and responsibilities</li>
        </ul>
      </div>
      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
        <h4 className="font-medium text-white mb-2">Objectives and Compliance</h4>
        <ul className="text-gray-300 text-sm space-y-1 ml-4">
          <li>• {phaseData.objectives.length} defined objectives</li>
          <li>• Compliance frameworks: {phaseData.complianceFrameworks.join(', ')}</li>
          <li>• Business-critical systems identified</li>
        </ul>
      </div>
      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
        <h4 className="font-medium text-white mb-2">Communication Plan</h4>
        <ul className="text-gray-300 text-sm space-y-1 ml-4">
          <li>• {phaseData.stakeholders.length} stakeholders identified</li>
          <li>• Regular progress updates scheduled</li>
          <li>• Escalation procedures defined</li>
        </ul>
      </div>
    </div>
  )

  const renderSectionContent = (contentType) => {
    switch (contentType) {
      case 'scopeComponents':
        return renderScopeComponents()
      case 'objectives':
        return renderObjectives()
      case 'stakeholders':
        return renderStakeholders()
      case 'deliverables':
        return renderDeliverables()
      default:
        return <div>Content not available</div>
    }
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
            <button 
              onClick={generatePDF}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Phase Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Interactive Sections */}
            {currentPhase.sections && currentPhase.sections.map(section => (
              <div key={section.id} className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
                >
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">{section.title}</h2>
                    <p className="text-gray-300">{section.description}</p>
                  </div>
                  {expandedSections[section.id] ? 
                    <ChevronDown className="w-5 h-5 text-gray-400" /> : 
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  }
                </button>
                {expandedSections[section.id] && (
                  <div className="px-6 pb-6">
                    {renderSectionContent(section.content)}
                  </div>
                )}
              </div>
            ))}

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
            {/* Timeline */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4">Timeline</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Start Date</label>
                  <input
                    type="date"
                    value={phaseData.timeline.startDate}
                    onChange={(e) => setPhaseData(prev => ({
                      ...prev,
                      timeline: { ...prev.timeline, startDate: e.target.value }
                    }))}
                    className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-1">End Date</label>
                  <input
                    type="date"
                    value={phaseData.timeline.endDate}
                    onChange={(e) => setPhaseData(prev => ({
                      ...prev,
                      timeline: { ...prev.timeline, endDate: e.target.value }
                    }))}
                    className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
                  />
                </div>
              </div>
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
                  <span className="text-gray-300">Components</span>
                  <span className="text-white">{phaseData.scopeComponents.filter(c => c.included).length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Objectives</span>
                  <span className="text-white">{phaseData.objectives.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Stakeholders</span>
                  <span className="text-white">{phaseData.stakeholders.length}</span>
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