'use client';

import { useState } from 'react';
import { 
  Users, 
  Target, 
  Megaphone, 
  FileText, 
  BookOpen, 
  Settings, 
  BarChart3,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Zap,
  AlertTriangle,
  TrendingUp,
  Shield,
  ArrowLeftRight
} from 'lucide-react';

// Partnership data for each function
const partnerships = [
  {
    id: 'demand',
    title: 'Demand Generation',
    icon: Megaphone,
    color: '#ec4899',
    theyOwn: [
      'Campaign strategy and priorities',
      'Budget allocation',
      'Channel mix and targets'
    ],
    gtmOwns: [
      'Campaign execution workflows',
      'AI-assisted campaign build and iteration',
      'Attribution and performance analysis',
      'Post-mortems and optimization insights'
    ],
    flow: {
      input: 'Demand defines what to run',
      process: 'GTM AI & Ops defines how it runs',
      output: 'Performance insights flow back into Demand decisions'
    }
  },
  {
    id: 'pmm',
    title: 'Product Marketing (PMM)',
    icon: Target,
    color: '#8b5cf6',
    theyOwn: [
      'Messaging, positioning, and narratives',
      'Use case strategy',
      'Persona definitions (decision authority)'
    ],
    gtmOwns: [
      'AI-assisted research synthesis (calls, transcripts, market data)',
      'Messaging execution workflows',
      'Content activation across channels',
      'Measurement of messaging effectiveness'
    ],
    flow: {
      input: 'PMM sets the narrative',
      process: 'GTM AI & Ops operationalizes and tests it',
      output: 'Insights inform future PMM decisions'
    }
  },
  {
    id: 'content',
    title: 'Content & Communications',
    icon: FileText,
    color: '#6366f1',
    theyOwn: [
      'Editorial strategy',
      'Content quality and voice',
      'Core asset creation'
    ],
    gtmOwns: [
      'Content transformation workflows',
      'Distribution readiness',
      'SEO/GEO instrumentation',
      'Engagement and performance analytics'
    ],
    flow: {
      input: 'Content creates the "source of truth"',
      process: 'GTM AI & Ops ensures reuse, scale, and measurement',
      output: 'Performance feedback improves future content planning'
    }
  },
  {
    id: 'enablement',
    title: 'Marketing Enablement & Learning',
    icon: BookOpen,
    color: '#f97316',
    theyOwn: [
      'Training strategy',
      'Learning programs',
      'Certification paths'
    ],
    gtmOwns: [
      'Insights from execution failures/successes',
      'AI-driven learning inputs',
      'Post-mortem outputs feeding enablement'
    ],
    flow: {
      input: 'Enablement defines learning goals',
      process: 'GTM AI & Ops supplies real-world data',
      output: 'Learning becomes execution-informed, not theoretical'
    }
  },
  {
    id: 'ops',
    title: 'Marketing Operations',
    icon: Settings,
    color: '#14b8a6',
    theyOwn: [
      'Day-to-day platform administration',
      'Campaign setup support',
      'Tool configuration'
    ],
    gtmOwns: [
      'Process design and standards',
      'Tool evaluation and architecture',
      'AI governance and automation strategy'
    ],
    flow: {
      input: 'Ops runs the tools',
      process: 'GTM AI & Ops designs how tools are used',
      output: 'Both align tightly with RevOps'
    }
  },
  {
    id: 'analytics',
    title: 'Analytics & Insights',
    icon: BarChart3,
    color: '#22c55e',
    theyOwn: [
      'Reporting accuracy',
      'Metric consistency',
      'Performance analysis'
    ],
    gtmOwns: [
      'What gets measured and why',
      'Insight synthesis',
      'Decision support outputs'
    ],
    flow: {
      input: 'Analytics produces signals',
      process: 'GTM AI & Ops turns signals into decisions',
      output: 'Leaders act with confidence'
    }
  }
];

// Responsibility matrix data
const responsibilityMatrix = [
  { function: 'Demand Gen', strategy: true, execution: false, measurement: false },
  { function: 'Product Marketing', strategy: true, execution: false, measurement: false },
  { function: 'Content', strategy: true, execution: false, measurement: false },
  { function: 'Enablement', strategy: true, execution: false, measurement: false },
  { function: 'GTM AI & Ops', strategy: false, execution: true, measurement: true }
];

// Impact comparison
const withoutRole = [
  'Teams execute inconsistently',
  'Measurement fragments',
  'Learnings are lost',
  'AI adoption is risky and uneven'
];

const withRole = [
  'Execution is faster',
  'Measurement is trusted',
  'Learning compounds',
  'Strategy improves over time'
];

// What this role does NOT do
const notDo = [
  'Override marketing leadership decisions',
  'Own campaign success or failure',
  'Replace strategic thinking with AI',
  'Act as a centralized approval gate'
];

export default function CollaborationPage() {
  const [selectedPartnership, setSelectedPartnership] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-sm font-medium">
              <Users className="w-4 h-4" />
              Cross-Functional Partnership
            </div>
            <h1 className="text-4xl font-bold text-[var(--foreground)]">How GTM AI & Ops Collaborates with Marketing</h1>
            <p className="text-xl text-[var(--foreground-secondary)] max-w-3xl mx-auto">
              This role partners with marketing leaders and teams to improve execution, measurement, and learning — without owning strategy or business outcomes.
            </p>
          </div>

          {/* Core Operating Principle */}
          <div className="bg-gradient-to-r from-[var(--primary)]/10 via-[var(--accent)]/5 to-[var(--primary)]/10 rounded-2xl p-8 border border-[var(--primary)]/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">Core Operating Principle</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-[var(--background)] rounded-xl border border-[var(--border)]">
                    <p className="text-lg font-semibold text-[var(--foreground)]">Marketing leaders own strategy.</p>
                  </div>
                  <div className="p-4 bg-[var(--primary)]/10 rounded-xl border border-[var(--primary)]/20">
                    <p className="text-lg font-semibold text-[var(--primary)]">GTM AI & Ops owns how strategy gets executed, measured, and improved.</p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-[var(--background)] border-4 border-[var(--primary)]/20">
                  <div className="text-center">
                    <Zap className="w-12 h-12 text-[var(--primary)] mx-auto mb-1" />
                    <span className="text-xs text-[var(--foreground-secondary)]">Execution<br/>Backbone</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Responsibility Matrix */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[var(--foreground)]">Ownership Matrix</h2>
              <p className="text-[var(--foreground-secondary)] mt-2">Clear delineation of who owns what across marketing functions</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-4 text-left bg-[var(--background-secondary)] border border-[var(--border)] rounded-tl-xl font-semibold text-[var(--foreground)]">Function</th>
                    <th className="p-4 text-center bg-[var(--background-secondary)] border border-[var(--border)] font-semibold text-[var(--foreground)]">
                      <div className="flex items-center justify-center gap-2">
                        <Target className="w-4 h-4" />
                        Owns Strategy
                      </div>
                    </th>
                    <th className="p-4 text-center bg-[var(--background-secondary)] border border-[var(--border)] font-semibold text-[var(--foreground)]">
                      <div className="flex items-center justify-center gap-2">
                        <Settings className="w-4 h-4" />
                        Owns Execution System
                      </div>
                    </th>
                    <th className="p-4 text-center bg-[var(--background-secondary)] border border-[var(--border)] rounded-tr-xl font-semibold text-[var(--foreground)]">
                      <div className="flex items-center justify-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Owns Measurement
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {responsibilityMatrix.map((row, index) => (
                    <tr key={row.function} className={row.function === 'GTM AI & Ops' ? 'bg-[var(--primary)]/5' : ''}>
                      <td className={`p-4 border border-[var(--border)] font-medium ${row.function === 'GTM AI & Ops' ? 'text-[var(--primary)] font-semibold' : 'text-[var(--foreground)]'} ${index === responsibilityMatrix.length - 1 ? 'rounded-bl-xl' : ''}`}>
                        {row.function}
                      </td>
                      <td className="p-4 border border-[var(--border)] text-center">
                        {row.strategy ? (
                          <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto" />
                        ) : (
                          <XCircle className="w-6 h-6 text-[var(--foreground-tertiary)] mx-auto" />
                        )}
                      </td>
                      <td className="p-4 border border-[var(--border)] text-center">
                        {row.execution ? (
                          <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto" />
                        ) : (
                          <XCircle className="w-6 h-6 text-[var(--foreground-tertiary)] mx-auto" />
                        )}
                      </td>
                      <td className={`p-4 border border-[var(--border)] text-center ${index === responsibilityMatrix.length - 1 ? 'rounded-br-xl' : ''}`}>
                        {row.measurement ? (
                          <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto" />
                        ) : (
                          <XCircle className="w-6 h-6 text-[var(--foreground-tertiary)] mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Partnership Details */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[var(--foreground)]">Partnership by Function</h2>
              <p className="text-[var(--foreground-secondary)] mt-2">Select a function to see detailed ownership breakdown</p>
            </div>

            {/* Function Selector */}
            <div className="flex flex-wrap justify-center gap-3">
              {partnerships.map((p) => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPartnership(selectedPartnership === p.id ? null : p.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      selectedPartnership === p.id
                        ? 'text-white shadow-lg'
                        : 'bg-[var(--background-secondary)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] border border-[var(--border)]'
                    }`}
                    style={selectedPartnership === p.id ? { backgroundColor: p.color } : {}}
                  >
                    <Icon className="w-4 h-4" />
                    {p.title}
                  </button>
                );
              })}
            </div>

            {/* Selected Partnership Detail */}
            {selectedPartnership && (
              <div className="space-y-6">
                {partnerships.filter(p => p.id === selectedPartnership).map((partnership) => {
                  const Icon = partnership.icon;
                  return (
                    <div key={partnership.id} className="bg-[var(--background-secondary)] rounded-2xl border border-[var(--border)] overflow-hidden">
                      {/* Header */}
                      <div className="p-6 border-b border-[var(--border)]" style={{ background: `linear-gradient(135deg, ${partnership.color}10, transparent)` }}>
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${partnership.color}20` }}>
                            <Icon className="w-7 h-7" style={{ color: partnership.color }} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-[var(--foreground)]">{partnership.title}</h3>
                            <p className="text-sm text-[var(--foreground-secondary)]">Collaboration Model</p>
                          </div>
                        </div>
                      </div>

                      {/* Ownership Comparison */}
                      <div className="p-6">
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                          {/* They Own */}
                          <div className="space-y-3">
                            <h4 className="font-semibold text-[var(--foreground)] flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: partnership.color }}></div>
                              {partnership.title.split(' ')[0]} Owns
                            </h4>
                            <div className="space-y-2">
                              {partnership.theyOwn.map((item, i) => (
                                <div key={i} className="flex items-start gap-2 p-3 bg-[var(--background)] rounded-lg border border-[var(--border)]">
                                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: partnership.color }} />
                                  <span className="text-sm text-[var(--foreground-secondary)]">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* GTM Owns */}
                          <div className="space-y-3">
                            <h4 className="font-semibold text-[var(--foreground)] flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-[var(--primary)]"></div>
                              GTM AI & Ops Owns
                            </h4>
                            <div className="space-y-2">
                              {partnership.gtmOwns.map((item, i) => (
                                <div key={i} className="flex items-start gap-2 p-3 bg-[var(--primary)]/5 rounded-lg border border-[var(--primary)]/20">
                                  <CheckCircle2 className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
                                  <span className="text-sm text-[var(--foreground-secondary)]">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Flow Diagram */}
                        <div className="p-4 bg-[var(--background)] rounded-xl border border-[var(--border)]">
                          <h4 className="font-semibold text-[var(--foreground)] mb-4 text-center">How This Works</h4>
                          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                            <div className="flex-1 p-4 bg-[var(--background-secondary)] rounded-lg text-center max-w-xs">
                              <div className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: partnership.color }}>1</div>
                              <p className="text-sm text-[var(--foreground)]">{partnership.flow.input}</p>
                            </div>
                            <ArrowRight className="w-6 h-6 text-[var(--foreground-tertiary)] rotate-90 md:rotate-0" />
                            <div className="flex-1 p-4 bg-[var(--primary)]/10 rounded-lg text-center max-w-xs border border-[var(--primary)]/20">
                              <div className="w-8 h-8 rounded-full bg-[var(--primary)] mx-auto mb-2 flex items-center justify-center text-white font-bold text-sm">2</div>
                              <p className="text-sm text-[var(--foreground)]">{partnership.flow.process}</p>
                            </div>
                            <ArrowRight className="w-6 h-6 text-[var(--foreground-tertiary)] rotate-90 md:rotate-0" />
                            <div className="flex-1 p-4 bg-green-500/10 rounded-lg text-center max-w-xs border border-green-500/20">
                              <div className="w-8 h-8 rounded-full bg-green-500 mx-auto mb-2 flex items-center justify-center text-white font-bold text-sm">3</div>
                              <p className="text-sm text-[var(--foreground)]">{partnership.flow.output}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Show all partnerships as cards when none selected */}
            {!selectedPartnership && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {partnerships.map((partnership) => {
                  const Icon = partnership.icon;
                  return (
                    <button
                      key={partnership.id}
                      onClick={() => setSelectedPartnership(partnership.id)}
                      className="p-5 bg-[var(--background-secondary)] rounded-xl border border-[var(--border)] hover:border-[var(--primary)]/50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${partnership.color}15` }}>
                          <Icon className="w-5 h-5" style={{ color: partnership.color }} />
                        </div>
                        <h3 className="font-semibold text-[var(--foreground)]">{partnership.title}</h3>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[var(--foreground-secondary)]">
                        <ArrowLeftRight className="w-4 h-4" />
                        <span>Click to see collaboration model</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Impact Comparison Chart */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[var(--foreground)]">Why This Model Works</h2>
              <p className="text-[var(--foreground-secondary)] mt-2">Comparison of outcomes with and without this operating model</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Without Role */}
              <div className="bg-red-500/5 rounded-2xl border border-red-500/20 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--foreground)]">Without This Role</h3>
                    <p className="text-sm text-red-500">Fragmented execution</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {withoutRole.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-[var(--background)] rounded-lg">
                      <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                      <span className="text-[var(--foreground-secondary)]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* With Role */}
              <div className="bg-green-500/5 rounded-2xl border border-green-500/20 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--foreground)]">With This Role</h3>
                    <p className="text-sm text-green-500">Unified execution</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {withRole.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-[var(--background)] rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-[var(--foreground-secondary)]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* What This Role Does NOT Do */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[var(--foreground)]">Role Boundaries</h2>
              <p className="text-[var(--foreground-secondary)] mt-2">This is an enablement role, not a control function</p>
            </div>

            <div className="bg-[var(--background-secondary)] rounded-2xl border border-[var(--border)] p-6">
              <div className="grid sm:grid-cols-2 gap-4">
                {notDo.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-red-500/5 rounded-xl border border-red-500/10">
                    <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                    <span className="text-[var(--foreground)]">Does not {item.toLowerCase()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Safeguard */}
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl border border-amber-500/20 p-8">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                <Shield className="w-7 h-7 text-amber-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">Key Safeguard</h3>
                <p className="text-lg text-[var(--foreground-secondary)]">
                  If strategy fails, this role improves how failure is understood — <strong className="text-[var(--foreground)]">not who is blamed</strong>.
                </p>
                <p className="text-sm text-amber-600 dark:text-amber-400 mt-3 italic">That distinction is essential for trust.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
