'use client';

import { useState } from 'react';
import { 
  Zap, 
  Link2, 
  AlertCircle, 
  Gauge, 
  Shield,
  Target,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Info
} from 'lucide-react';

// 5-Factor Model Data
const factors = [
  {
    id: 1,
    name: 'Leverage',
    subtitle: 'Primary Impact',
    icon: Zap,
    color: '#f59e0b',
    question: 'If this exists, how many other workflows get easier or unnecessary?',
    description: 'Leverage measures the highest-order impact of a workflow. A single workflow with high leverage affects multiple downstream processes without requiring ownership of revenue or outcomes.',
    importance: 'highest',
    example: {
      workflow: 'Unified Performance Signal Workflow',
      affects: [
        'Demand optimization',
        'Content prioritization', 
        'Sales enablement',
        'Post-mortems'
      ],
      note: 'Massive impact — without owning revenue.'
    },
    scoreGuide: [
      { score: 'High', criteria: 'Enables 5+ other workflows' },
      { score: 'Medium', criteria: 'Enables 2-4 other workflows' },
      { score: 'Low', criteria: 'Enables 0-1 other workflows' }
    ]
  },
  {
    id: 2,
    name: 'Dependency',
    subtitle: 'Build Order',
    icon: Link2,
    color: '#3b82f6',
    question: 'Does this unlock other workflows or require them first?',
    description: 'Dependency determines the correct sequencing of workflow implementation. Workflows that unlock others should be prioritized; workflows that require prerequisites must wait.',
    importance: 'high',
    example: {
      workflow: 'Signal Ingestion',
      affects: [
        'Must exist before analytics workflows',
        'Unlocks performance intelligence',
        'Foundation for all measurement'
      ],
      note: 'Build the system in the right order.'
    },
    scoreGuide: [
      { score: 'Blocker', criteria: 'Many workflows depend on this' },
      { score: 'Enabler', criteria: 'Unlocks specific workflows' },
      { score: 'Independent', criteria: 'No dependencies either way' }
    ]
  },
  {
    id: 3,
    name: 'Signal Integrity Risk',
    subtitle: 'Hidden Impact',
    icon: AlertCircle,
    color: '#ef4444',
    question: 'Are decisions currently being made with incomplete, biased, or misleading data?',
    description: 'Signal integrity risk captures hidden impact that compounds over time. Poor signals lead to bad strategy, wasted spend, and internal thrash. Fixing integrity issues has enormous downstream effects.',
    importance: 'high',
    example: {
      workflow: 'Signal Quality Workflows',
      affects: [
        'Bad strategy from poor data',
        'Wasted spend on wrong segments',
        'Internal thrash from conflicting metrics'
      ],
      note: 'Enormous downstream effects when fixed.'
    },
    scoreGuide: [
      { score: 'Critical', criteria: 'Major decisions using bad data' },
      { score: 'Moderate', criteria: 'Some decisions affected' },
      { score: 'Low', criteria: 'Data quality is acceptable' }
    ]
  },
  {
    id: 4,
    name: 'Execution Friction',
    subtitle: 'Operational Impact',
    icon: Gauge,
    color: '#22c55e',
    question: 'Where is the organization losing time, rework, or trust today?',
    description: 'Execution friction measures operational impact rather than financial impact. High friction workflows cause delays, repeated work, and erode confidence in execution capabilities.',
    importance: 'medium',
    example: {
      workflow: 'Campaign Launch Workflow',
      affects: [
        'Time lost to manual processes',
        'Rework from inconsistent execution',
        'Trust erosion from missed deadlines'
      ],
      note: 'Operational impact, not financial impact.'
    },
    scoreGuide: [
      { score: 'High', criteria: 'Significant time/rework daily' },
      { score: 'Medium', criteria: 'Weekly friction points' },
      { score: 'Low', criteria: 'Occasional inefficiencies' }
    ]
  },
  {
    id: 5,
    name: 'Outcome Exposure',
    subtitle: 'Guardrail',
    icon: Shield,
    color: '#8b5cf6',
    question: 'If this workflow fails, does it create implicit accountability for outcomes outside the role\'s control?',
    description: 'Outcome exposure is a safety valve. Workflows with high exposure create accountability risk for outcomes that the role does not control. High exposure workflows should be deprioritized or have scope explicitly negotiated.',
    importance: 'guardrail',
    example: {
      workflow: 'Revenue Attribution Workflow',
      affects: [
        'Could imply ownership of revenue targets',
        'Failure blamed on execution, not strategy',
        'Scope creep into outcome ownership'
      ],
      note: 'High exposure = deprioritize or negotiate scope.'
    },
    scoreGuide: [
      { score: 'High', criteria: 'Implicit outcome accountability' },
      { score: 'Medium', criteria: 'Some accountability risk' },
      { score: 'Low', criteria: 'Clear execution-only scope' }
    ]
  }
];

// Example workflow scoring
const exampleScoring = [
  { workflow: 'Unified GTM Signal Ingestion', leverage: 'High', dependency: 'Blocker', signal: 'Critical', friction: 'High', exposure: 'Low', priority: 1 },
  { workflow: 'Segment Performance Intelligence', leverage: 'High', dependency: 'Enabler', signal: 'Critical', friction: 'Medium', exposure: 'Low', priority: 2 },
  { workflow: 'Content Transformation Engine', leverage: 'High', dependency: 'Enabler', signal: 'Moderate', friction: 'High', exposure: 'Low', priority: 3 },
  { workflow: 'Campaign Execution Infrastructure', leverage: 'Medium', dependency: 'Enabler', signal: 'Moderate', friction: 'High', exposure: 'Medium', priority: 4 },
  { workflow: 'Revenue Attribution Models', leverage: 'Medium', dependency: 'Independent', signal: 'Critical', friction: 'Medium', exposure: 'High', priority: 5 }
];

export default function PrioritizationPage() {
  const [selectedFactor, setSelectedFactor] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-sm font-medium">
              <Target className="w-4 h-4" />
              Workflow Prioritization
            </div>
            <h1 className="text-4xl font-bold text-[var(--foreground)]">5-Factor Prioritization Model</h1>
            <p className="text-xl text-[var(--foreground-secondary)] max-w-3xl mx-auto">
              A structured framework for prioritizing workflows based on impact, dependencies, risk, and accountability boundaries.
            </p>
          </div>

          {/* Factor Overview Cards */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[var(--foreground)] text-center">The Five Factors</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {factors.map((factor) => {
                const Icon = factor.icon;
                return (
                  <button
                    key={factor.id}
                    onClick={() => setSelectedFactor(selectedFactor === factor.id ? null : factor.id)}
                    className={`p-4 rounded-xl border transition-all text-center ${
                      selectedFactor === factor.id
                        ? 'border-2 shadow-lg'
                        : 'bg-[var(--background-secondary)] border-[var(--border)] hover:border-[var(--primary)]/50'
                    }`}
                    style={selectedFactor === factor.id ? { borderColor: factor.color, backgroundColor: `${factor.color}08` } : {}}
                  >
                    <div 
                      className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                      style={{ backgroundColor: `${factor.color}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: factor.color }} />
                    </div>
                    <div className="text-2xl font-bold mb-1" style={{ color: factor.color }}>{factor.id}</div>
                    <h3 className="font-semibold text-[var(--foreground)] text-sm">{factor.name}</h3>
                    <p className="text-xs text-[var(--foreground-tertiary)]">{factor.subtitle}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Factor Detail */}
          {selectedFactor && (
            <div className="space-y-6">
              {factors.filter(f => f.id === selectedFactor).map((factor) => {
                const Icon = factor.icon;
                return (
                  <div key={factor.id} className="bg-[var(--background-secondary)] rounded-2xl border border-[var(--border)] overflow-hidden">
                    {/* Factor Header */}
                    <div 
                      className="p-6 border-b border-[var(--border)]"
                      style={{ background: `linear-gradient(135deg, ${factor.color}10, transparent)` }}
                    >
                      <div className="flex items-start gap-4">
                        <div 
                          className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${factor.color}20` }}
                        >
                          <Icon className="w-7 h-7" style={{ color: factor.color }} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span 
                              className="text-sm font-bold px-2.5 py-1 rounded-lg"
                              style={{ backgroundColor: `${factor.color}20`, color: factor.color }}
                            >
                              Factor {factor.id}
                            </span>
                            <h3 className="text-xl font-bold text-[var(--foreground)]">{factor.name}</h3>
                            {factor.importance === 'highest' && (
                              <span className="text-xs px-2 py-0.5 bg-amber-500/10 text-amber-500 rounded-full">Highest Order</span>
                            )}
                            {factor.importance === 'guardrail' && (
                              <span className="text-xs px-2 py-0.5 bg-purple-500/10 text-purple-500 rounded-full">Safety Valve</span>
                            )}
                          </div>
                          <p className="text-[var(--foreground-secondary)]">{factor.description}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 space-y-6">
                      {/* Key Question */}
                      <div className="p-4 bg-[var(--background)] rounded-xl border border-[var(--border)]">
                        <div className="flex items-start gap-3">
                          <Info className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-[var(--foreground-tertiary)] mb-1">Key Question</p>
                            <p className="text-lg text-[var(--foreground)] italic">&quot;{factor.question}&quot;</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Example */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-[var(--foreground)]">Example Application</h4>
                          <div className="p-4 rounded-xl" style={{ backgroundColor: `${factor.color}05`, border: `1px solid ${factor.color}20` }}>
                            <p className="font-medium text-[var(--foreground)] mb-3">{factor.example.workflow}</p>
                            <div className="space-y-2">
                              {factor.example.affects.map((item, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <ArrowRight className="w-4 h-4 shrink-0 mt-0.5" style={{ color: factor.color }} />
                                  <span className="text-sm text-[var(--foreground-secondary)]">{item}</span>
                                </div>
                              ))}
                            </div>
                            <p className="text-sm mt-3 pt-3 border-t italic" style={{ borderColor: `${factor.color}20`, color: factor.color }}>
                              {factor.example.note}
                            </p>
                          </div>
                        </div>

                        {/* Scoring Guide */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-[var(--foreground)]">Scoring Guide</h4>
                          <div className="space-y-2">
                            {factor.scoreGuide.map((guide, i) => (
                              <div key={i} className="flex items-center gap-3 p-3 bg-[var(--background)] rounded-lg border border-[var(--border)]">
                                <span 
                                  className="text-sm font-bold px-2.5 py-1 rounded-lg min-w-[80px] text-center"
                                  style={{ backgroundColor: `${factor.color}15`, color: factor.color }}
                                >
                                  {guide.score}
                                </span>
                                <span className="text-sm text-[var(--foreground-secondary)]">{guide.criteria}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Factor Relationship Diagram */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[var(--foreground)] text-center">How Factors Interact</h2>
            
            <div className="bg-[var(--background-secondary)] rounded-2xl border border-[var(--border)] p-8">
              <div className="max-w-3xl mx-auto">
                {/* Priority Flow */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                  <div className="text-center p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 flex-1">
                    <Zap className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                    <p className="font-semibold text-[var(--foreground)]">Leverage</p>
                    <p className="text-xs text-[var(--foreground-tertiary)]">Start here</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-[var(--foreground-tertiary)] rotate-90 md:rotate-0" />
                  <div className="text-center p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 flex-1">
                    <Link2 className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <p className="font-semibold text-[var(--foreground)]">Dependency</p>
                    <p className="text-xs text-[var(--foreground-tertiary)]">Sequence it</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-[var(--foreground-tertiary)] rotate-90 md:rotate-0" />
                  <div className="text-center p-4 bg-red-500/10 rounded-xl border border-red-500/20 flex-1">
                    <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                    <p className="font-semibold text-[var(--foreground)]">Signal Risk</p>
                    <p className="text-xs text-[var(--foreground-tertiary)]">Assess impact</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-[var(--foreground-tertiary)] rotate-90 md:rotate-0" />
                  <div className="text-center p-4 bg-green-500/10 rounded-xl border border-green-500/20 flex-1">
                    <Gauge className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="font-semibold text-[var(--foreground)]">Friction</p>
                    <p className="text-xs text-[var(--foreground-tertiary)]">Measure pain</p>
                  </div>
                </div>

                {/* Guardrail */}
                <div className="relative">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
                  <div className="pt-6 text-center">
                    <div className="inline-flex items-center gap-3 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                      <Shield className="w-8 h-8 text-purple-500" />
                      <div className="text-left">
                        <p className="font-semibold text-[var(--foreground)]">Outcome Exposure</p>
                        <p className="text-sm text-purple-500">Apply as guardrail to all decisions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Example Scoring Table */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[var(--foreground)]">Example Prioritization</h2>
              <p className="text-[var(--foreground-secondary)] mt-2">How the 5-factor model applies to sample workflows</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="p-3 text-left bg-[var(--background-secondary)] border border-[var(--border)] font-semibold text-[var(--foreground)] rounded-tl-xl">Workflow</th>
                    <th className="p-3 text-center bg-amber-500/10 border border-[var(--border)]">
                      <div className="flex items-center justify-center gap-1">
                        <Zap className="w-4 h-4 text-amber-500" />
                        <span className="text-amber-600 dark:text-amber-400 font-semibold">Leverage</span>
                      </div>
                    </th>
                    <th className="p-3 text-center bg-blue-500/10 border border-[var(--border)]">
                      <div className="flex items-center justify-center gap-1">
                        <Link2 className="w-4 h-4 text-blue-500" />
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">Dependency</span>
                      </div>
                    </th>
                    <th className="p-3 text-center bg-red-500/10 border border-[var(--border)]">
                      <div className="flex items-center justify-center gap-1">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <span className="text-red-600 dark:text-red-400 font-semibold">Signal Risk</span>
                      </div>
                    </th>
                    <th className="p-3 text-center bg-green-500/10 border border-[var(--border)]">
                      <div className="flex items-center justify-center gap-1">
                        <Gauge className="w-4 h-4 text-green-500" />
                        <span className="text-green-600 dark:text-green-400 font-semibold">Friction</span>
                      </div>
                    </th>
                    <th className="p-3 text-center bg-purple-500/10 border border-[var(--border)]">
                      <div className="flex items-center justify-center gap-1">
                        <Shield className="w-4 h-4 text-purple-500" />
                        <span className="text-purple-600 dark:text-purple-400 font-semibold">Exposure</span>
                      </div>
                    </th>
                    <th className="p-3 text-center bg-[var(--background-secondary)] border border-[var(--border)] font-semibold text-[var(--foreground)] rounded-tr-xl">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {exampleScoring.map((row, index) => (
                    <tr key={row.workflow} className={index % 2 === 0 ? 'bg-[var(--background)]' : 'bg-[var(--background-secondary)]'}>
                      <td className={`p-3 border border-[var(--border)] font-medium text-[var(--foreground)] ${index === exampleScoring.length - 1 ? 'rounded-bl-xl' : ''}`}>
                        {row.workflow}
                      </td>
                      <td className="p-3 border border-[var(--border)] text-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${row.leverage === 'High' ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400' : 'bg-amber-500/10 text-amber-500/70'}`}>
                          {row.leverage}
                        </span>
                      </td>
                      <td className="p-3 border border-[var(--border)] text-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${row.dependency === 'Blocker' ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' : 'bg-blue-500/10 text-blue-500/70'}`}>
                          {row.dependency}
                        </span>
                      </td>
                      <td className="p-3 border border-[var(--border)] text-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${row.signal === 'Critical' ? 'bg-red-500/20 text-red-600 dark:text-red-400' : 'bg-red-500/10 text-red-500/70'}`}>
                          {row.signal}
                        </span>
                      </td>
                      <td className="p-3 border border-[var(--border)] text-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${row.friction === 'High' ? 'bg-green-500/20 text-green-600 dark:text-green-400' : 'bg-green-500/10 text-green-500/70'}`}>
                          {row.friction}
                        </span>
                      </td>
                      <td className="p-3 border border-[var(--border)] text-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${row.exposure === 'High' ? 'bg-purple-500/20 text-purple-600 dark:text-purple-400' : row.exposure === 'Low' ? 'bg-green-500/10 text-green-500' : 'bg-purple-500/10 text-purple-500/70'}`}>
                          {row.exposure}
                        </span>
                      </td>
                      <td className={`p-3 border border-[var(--border)] text-center ${index === exampleScoring.length - 1 ? 'rounded-br-xl' : ''}`}>
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--primary)] text-white font-bold">
                          {row.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Legend */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-[var(--foreground-secondary)]">High = Prioritize</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-[var(--foreground-secondary)]">High Exposure = Caution</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-[var(--foreground-secondary)]">Blocker = Do First</span>
              </div>
            </div>
          </div>

          {/* Key Insight */}
          <div className="bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 rounded-2xl border border-[var(--primary)]/20 p-8">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                <TrendingUp className="w-7 h-7 text-[var(--primary)]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">Key Insight</h3>
                <p className="text-lg text-[var(--foreground-secondary)]">
                  The 5-factor model enables high-impact prioritization by separating <strong className="text-[var(--foreground)]">value creation</strong> (Leverage, Signal Risk, Friction) from <strong className="text-[var(--foreground)]">sequencing</strong> (Dependency) and <strong className="text-[var(--foreground)]">risk management</strong> (Outcome Exposure).
                </p>
                <p className="text-sm text-[var(--foreground-tertiary)] mt-3">
                  This ensures workflows are prioritized for maximum organizational impact while maintaining clear accountability boundaries.
                </p>
              </div>
            </div>
          </div>

          {/* Decision Framework Summary */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[var(--foreground)] text-center">Quick Decision Framework</h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-5 bg-green-500/5 rounded-xl border border-green-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <h3 className="font-semibold text-[var(--foreground)]">Prioritize When</h3>
                </div>
                <ul className="space-y-2 text-sm text-[var(--foreground-secondary)]">
                  <li>• High leverage (affects many workflows)</li>
                  <li>• Blocker dependency (unlocks others)</li>
                  <li>• Critical signal risk (bad decisions happening)</li>
                  <li>• Low outcome exposure</li>
                </ul>
              </div>
              
              <div className="p-5 bg-amber-500/5 rounded-xl border border-amber-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <h3 className="font-semibold text-[var(--foreground)]">Negotiate Scope When</h3>
                </div>
                <ul className="space-y-2 text-sm text-[var(--foreground-secondary)]">
                  <li>• High value but high exposure</li>
                  <li>• Success metrics tied to outcomes</li>
                  <li>• Accountability unclear</li>
                  <li>• Multiple stakeholder dependencies</li>
                </ul>
              </div>
              
              <div className="p-5 bg-red-500/5 rounded-xl border border-red-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <h3 className="font-semibold text-[var(--foreground)]">Deprioritize When</h3>
                </div>
                <ul className="space-y-2 text-sm text-[var(--foreground-secondary)]">
                  <li>• Low leverage (affects few workflows)</li>
                  <li>• High exposure without authority</li>
                  <li>• Dependencies not yet in place</li>
                  <li>• Low friction and signal risk</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
