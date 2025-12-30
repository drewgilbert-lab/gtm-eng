'use client';

import { useState } from 'react';
import { 
  Target,
  Clock,
  ArrowDownToLine,
  Cpu,
  Package,
  Users,
  Compass,
  ShieldCheck,
  RefreshCcw,
  ChevronRight,
  Layers,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Zap,
  Link2,
  AlertCircle,
  Gauge,
  Shield,
  Radio,
  Lightbulb,
  FileText,
  Megaphone,
  UserCheck,
  BookOpen,
  Settings,
  PieChart,
  Calendar,
  Star
} from 'lucide-react';

// Framework dimensions
const workflowDimensions = [
  { id: 'A', title: 'Workflow Objective', subtitle: 'Why this exists', description: 'What business problem this workflow solves', icon: Target, color: '#6366f1' },
  { id: 'B', title: 'Trigger / Cadence', subtitle: 'When it runs', description: 'Event-based, time-based, or request-based triggers', icon: Clock, color: '#8b5cf6' },
  { id: 'C', title: 'Inputs', subtitle: 'What it consumes', description: 'Data, artifacts, or signals required—not tasks', icon: ArrowDownToLine, color: '#a855f7' },
  { id: 'D', title: 'Processing & Synthesis', subtitle: 'What happens', description: 'Where AI, automation, and judgment apply', icon: Cpu, color: '#d946ef' },
  { id: 'E', title: 'Outputs', subtitle: 'What shows up', description: 'Concrete, consumable artifacts', icon: Package, color: '#ec4899' },
  { id: 'F', title: 'Primary Consumers', subtitle: 'Who uses it', description: 'Named teams or roles', icon: Users, color: '#f43f5e' },
  { id: 'G', title: 'Decisions Informed', subtitle: 'Not decisions made', description: 'Explicitly clarify boundaries', icon: Compass, color: '#f97316' },
  { id: 'H', title: 'Quality Checks', subtitle: 'Integrity gates', description: 'Prevent garbage in / garbage out', icon: ShieldCheck, color: '#eab308' },
  { id: 'I', title: 'Failure & Feedback', subtitle: 'Learning loops', description: 'When signals contradict or performance is poor', icon: RefreshCcw, color: '#22c55e' }
];

// Example workflow data
const exampleWorkflow = {
  title: 'Surface Segment-Level Performance Signals',
  subtitle: 'Full funnel visibility across segments',
  dimensions: {
    A: { content: 'Provide a fact-based view of how different segments perform across the entire GTM funnel, from initial engagement through closed-won.', questions: ['Which segments convert — and where they break down', 'Which segments look good early but fail late', 'Which segments deserve further investment or experimentation'] },
    B: { type: 'Cadence-based', schedule: [{ label: 'Monthly', description: 'Standard output' }, { label: 'Quarterly', description: 'Deep-dive version' }, { label: 'On-demand', description: 'Predefined leadership reviews only' }], note: 'This is not a "pull whenever someone asks" workflow.' },
    C: { primary: ['Lead and contact data (source, persona, segment)', 'Opportunity lifecycle data (stage progression, time in stage)', 'Closed-won / closed-lost outcomes', 'Revenue and deal size', 'Attribution or influence markers', 'SDR / Sales activity metadata'], optional: ['Account firmographics', 'Product usage signals', 'Campaign association data'] },
    D: { activities: ['Normalize segment definitions across systems', 'Align lifecycle stages across Marketing and Sales', 'Aggregate funnel performance by segment', 'Calculate conversion rates at each stage', 'Identify drop-off points and bottlenecks', 'Detect statistically meaningful differences', 'Use AI to surface patterns, not conclusions', 'Generate comparative summaries'], rule: 'Surface signals and contrasts, not recommendations.' },
    E: { outputs: ['Segment performance scorecards', 'Funnel heatmaps by segment', 'Trend deltas over time', 'AI-generated insight summaries', 'Flags for anomalies or sudden shifts'], qualities: ['Easily consumable', 'Versioned', 'Comparable over time'] },
    F: { primary: ['Demand leadership', 'PMM', 'Sales leadership', 'RevOps', 'Executive leadership'], secondary: ['Content', 'Enablement'] },
    G: { informs: ['Segment prioritization', 'Budget allocation', 'Messaging focus', 'Territory strategy'], principle: { does: "Here's what's happening.", doesnt: "Here's what we should do." } },
    H: { checks: ['Consistent segment definitions', 'Data completeness thresholds', 'Minimum sample sizes', 'Clear caveats when data is directional', 'Alignment with RevOps definitions'], failure: 'Output is flagged and conclusions explicitly constrained' },
    I: { poor: ['Feeds post-mortem workflows', 'Compared against persona assumptions, use-case narratives, messaging hypotheses'], strong: ['Feeds experimentation workflows', 'Inputs reused to test scale assumptions'], outcome: 'Either way, learning compounds.' }
  }
};

// Keystone workflows with full detail
const keystoneWorkflows = [
  { id: 1, title: 'Unified GTM Signal Ingestion & Normalization', category: 'Market & Performance Signals', categoryNum: 1, description: 'Aggregate transcripts, engagement data, product signals, and funnel metrics into a single normalized signal layer.', keystone: { leverage: 'Feeds strategy, content, demand, sales, enablement, and analytics', dependency: 'Everything else depends on this', signalRisk: 'Currently highest risk area', executionFriction: 'Eliminates manual synthesis', outcomeExposure: 'Low — informs decisions, doesn\'t own them' } },
  { id: 2, title: 'Segment-Level Performance Intelligence', category: 'Market & Performance Signals', categoryNum: 1, description: 'Surface how segments convert, engage, and perform across acquisition, sales, and lifecycle stages.', keystone: { leverage: 'Improves targeting, prioritization, enablement relevance', dependency: 'Requires signal ingestion', signalRisk: 'Prevents misallocation of effort', executionFriction: 'Reduces guesswork', outcomeExposure: 'Low' } },
  { id: 3, title: 'Core Narrative → Multi-Channel Transformation Engine', category: 'Content & Narrative', categoryNum: 3, description: 'Turn one approved narrative or research asset into execution-ready content across channels.', keystone: { leverage: 'Collapses dozens of content workflows', dependency: 'Requires content strategy inputs', signalRisk: 'Prevents message drift', executionFriction: 'Eliminates rework', outcomeExposure: 'Low (execution only)' } },
  { id: 4, title: 'Web & Campaign Execution Infrastructure', category: 'Demand & Campaign', categoryNum: 4, description: 'Publish, wire, track, and iterate content and campaigns across owned and paid surfaces.', keystone: { leverage: 'Supports demand, content, and lifecycle', dependency: 'Builds on transformation engine', signalRisk: 'Fixes attribution blind spots', executionFriction: 'Removes launch delays', outcomeExposure: 'Medium (needs guardrails)' } },
  { id: 5, title: 'Adaptive Nurture & Outbound Experimentation', category: 'Demand & Campaign', categoryNum: 4, description: 'Enable fast testing of messaging and segments based on real buyer behavior.', keystone: { leverage: 'Improves inbound, outbound, and SDR workflows', dependency: 'Requires signal + campaign infra', signalRisk: 'Prevents stale messaging', executionFriction: 'Enables iteration', outcomeExposure: 'Medium — must stay enablement-focused' } },
  { id: 6, title: 'Sales & Lifecycle Signal Enablement', category: 'Sales & Lifecycle', categoryNum: 5, description: 'Surface the right buyer context at the right lifecycle moment for sales and post-sale teams.', keystone: { leverage: 'Improves handoffs, enablement, and retention', dependency: 'Requires signal ingestion', signalRisk: 'Reduces lifecycle blind spots', executionFriction: 'Eliminates context loss', outcomeExposure: 'Low (does not own selling)' } },
  { id: 7, title: 'Enablement Content Feedback Loop', category: 'Learning & Enablement', categoryNum: 6, description: 'Continuously update enablement assets based on real deal and lifecycle data.', keystone: { leverage: 'Improves training effectiveness', dependency: 'Requires lifecycle signals', signalRisk: 'Prevents outdated enablement', executionFriction: 'Shortens update cycles', outcomeExposure: 'Low' } },
  { id: 8, title: 'Standardized Post-Mortem & Learning System', category: 'Learning & Enablement', categoryNum: 6, description: 'Run consistent, data-backed retrospectives across campaigns, lifecycle, and initiatives.', keystone: { leverage: 'Feeds every improvement loop', dependency: 'Requires performance intelligence', signalRisk: 'Prevents repeating failures', executionFriction: 'Replaces ad hoc reviews', outcomeExposure: 'Low' } },
  { id: 9, title: 'GTM Systems, AI & Data Governance', category: 'Systems & Governance', categoryNum: 7, description: 'Ensure tools, AI, and data support execution without fragmentation.', keystone: { leverage: 'Protects all workflows', dependency: 'Parallel track', signalRisk: 'Prevents garbage-in/garbage-out', executionFriction: 'Reduces tech debt', outcomeExposure: 'Low (no budget ownership)' } },
  { id: 10, title: 'GTM Operating Cadence & Transparency', category: 'Operating Rhythm', categoryNum: 9, description: 'Establish predictable rhythms for reviewing execution health and risks.', keystone: { leverage: 'Keeps everything alive over time', dependency: 'Requires some workflows in place', signalRisk: 'Prevents silent decay', executionFriction: 'Reduces escalations', outcomeExposure: 'Low' } }
];

// All workflows by category
const allWorkflowCategories = [
  { id: 1, title: 'Market, Customer & Performance Signals', purpose: 'Create a trustworthy, shared signal layer that reflects how buyers, customers, and segments actually behave.', question: 'What signals do we trust when deciding where to focus?', icon: Radio, color: '#6366f1', workflows: [
    { id: 1, title: 'Unified GTM Signal Ingestion & Normalization', description: 'Aggregate transcripts, engagement data, funnel metrics, lifecycle signals, and product usage into a normalized signal layer.', isKeystone: true },
    { id: 2, title: 'Segment-Level Performance Intelligence', description: 'Surface conversion, engagement, and revenue performance by segment, persona, and motion.', isKeystone: true },
    { id: 3, title: 'Customer Language & Topic Mapping', description: 'Identify recurring themes, terminology, and concerns across buyer and customer conversations.', isKeystone: false },
    { id: 4, title: 'Lifecycle Signal Mapping', description: 'Map how customer priorities and risks change across pre-sale, onboarding, adoption, renewal, and expansion.', isKeystone: false }
  ]},
  { id: 2, title: 'Insight → Strategy Enablement', purpose: 'Improve decision quality by strengthening the inputs to strategy without owning strategy itself.', question: 'Are decisions being made with the full picture?', icon: Lightbulb, color: '#8b5cf6', workflows: [
    { id: 5, title: 'Evidence-Based Strategy Inputs', description: 'Translate market, customer, and performance signals into interpretable insight briefs.', isKeystone: false },
    { id: 6, title: 'ICP & Persona Validation', description: 'Surface mismatches between stated ICP strategy and observed buyer behavior.', isKeystone: false },
    { id: 7, title: 'Use Case Demand Discovery', description: 'Identify emerging or shifting use cases based on real buyer language.', isKeystone: false },
    { id: 8, title: 'Strategy Assumption Reconstruction', description: 'Rebuild historical decision contexts for retrospectives and learning.', isKeystone: false }
  ]},
  { id: 3, title: 'Content & Narrative Transformation', purpose: 'Ensure research and ideas become consistent, on-brand, and measurable execution.', question: 'How does one idea become consistent execution everywhere?', icon: FileText, color: '#a855f7', workflows: [
    { id: 9, title: 'Core Narrative → Multi-Channel Transformation Engine', description: 'Turn a single approved narrative into execution-ready assets across channels.', isKeystone: true },
    { id: 10, title: 'Content Reuse & Recomposition', description: 'Enable systematic reuse of content without message drift.', isKeystone: false },
    { id: 11, title: 'Brand & Narrative Guardrails for AI Content', description: 'Ensure AI-assisted content remains accurate, credible, and on-brand.', isKeystone: false }
  ]},
  { id: 4, title: 'Demand & Campaign Execution', purpose: 'Enable faster, smarter demand execution without shifting demand ownership.', question: 'How do campaigns move from idea to learning without friction?', icon: Megaphone, color: '#ec4899', workflows: [
    { id: 12, title: 'Web & Campaign Execution Infrastructure', description: 'Publish, wire, track, and iterate content and campaigns across channels.', isKeystone: true },
    { id: 13, title: 'Inbound Signal Integration', description: 'Ensure inbound engagement is routed into downstream nurture and SDR workflows.', isKeystone: false },
    { id: 14, title: 'Adaptive Nurture & Outbound Experimentation', description: 'Enable rapid testing of messaging and segments informed by real behavior.', isKeystone: true },
    { id: 15, title: 'Campaign Performance Diagnostics', description: 'Surface early indicators of campaign success or failure.', isKeystone: false }
  ]},
  { id: 5, title: 'Sales & Lifecycle Execution', purpose: 'Ensure lifecycle teams operate with the right context at the right time.', question: 'How does execution stay aligned as buyers move through the lifecycle?', icon: UserCheck, color: '#f43f5e', workflows: [
    { id: 16, title: 'Sales & Lifecycle Signal Enablement', description: 'Surface buyer engagement, intent, and risk signals at key lifecycle moments.', isKeystone: true },
    { id: 17, title: 'Handoff & Ownership Transition Standardization', description: 'Reduce leakage between marketing, SDR, AE, and post-sale teams.', isKeystone: false },
    { id: 18, title: 'Lifecycle Performance Visibility', description: 'Connect lifecycle execution activity to retention and expansion outcomes.', isKeystone: false }
  ]},
  { id: 6, title: 'Learning, Enablement & Feedback Loops', purpose: 'Turn execution experience into institutional learning.', question: 'How does the organization systematically learn from execution?', icon: BookOpen, color: '#f97316', workflows: [
    { id: 19, title: 'Enablement Content Feedback Loop', description: 'Update enablement assets based on real deal and lifecycle data.', isKeystone: true },
    { id: 20, title: 'Standardized Post-Mortem & Learning System', description: 'Run consistent retrospectives grounded in execution and performance data.', isKeystone: true },
    { id: 21, title: 'Skill Gap vs Process Failure Diagnosis', description: 'Differentiate training needs from systemic execution issues.', isKeystone: false }
  ]},
  { id: 7, title: 'Systems, Tooling & AI Governance', purpose: 'Ensure systems, tools, and AI enable execution rather than fragment it.', question: 'How do systems help rather than hinder execution?', icon: Settings, color: '#eab308', workflows: [
    { id: 22, title: 'GTM Systems, AI & Data Governance', description: 'Define guardrails, integration standards, and quality controls.', isKeystone: true },
    { id: 23, title: 'AI Workflow Enablement & Human-in-the-Loop Design', description: 'Operationalize AI safely and effectively across GTM workflows.', isKeystone: false },
    { id: 24, title: 'Tool Lifecycle Management', description: 'Evaluate, adopt, refactor, or retire tools based on execution impact.', isKeystone: false }
  ]},
  { id: 8, title: 'Measurement, Attribution & Performance', purpose: 'Create clarity on performance without metric disputes.', question: 'How do we understand what\'s working and why?', icon: PieChart, color: '#22c55e', workflows: [
    { id: 25, title: 'Unified Performance & Attribution Models', description: 'Connect execution activity to pipeline, revenue, and lifecycle outcomes.', isKeystone: false },
    { id: 26, title: 'Diagnostic Performance Analysis', description: 'Explain performance changes with supporting evidence.', isKeystone: false },
    { id: 27, title: 'Comparative Performance Analysis', description: 'Compare segments, motions, and channels meaningfully.', isKeystone: false }
  ]},
  { id: 9, title: 'Organizational Cadence & Governance', purpose: 'Ensure execution quality persists over time.', question: 'How does this operating model stay healthy quarter after quarter?', icon: Calendar, color: '#14b8a6', workflows: [
    { id: 28, title: 'GTM Operating Cadence & Transparency', description: 'Establish predictable rhythms for execution review and risk surfacing.', isKeystone: true },
    { id: 29, title: 'Cross-Functional Dependency Coordination', description: 'Manage execution dependencies across teams.', isKeystone: false },
    { id: 30, title: 'Workflow Evolution & Retirement', description: 'Continuously refactor or retire workflows as needs change.', isKeystone: false }
  ]}
];

type TabType = 'framework' | 'example' | 'keystone' | 'all';

export default function WorkflowsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('framework');
  const [activeDimension, setActiveDimension] = useState('A');

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-sm font-medium">
              <Layers className="w-4 h-4" />
              Workflow Operating Model
            </div>
            <h1 className="text-4xl font-bold text-[var(--foreground)]">GTM Workflows</h1>
            <p className="text-xl text-[var(--foreground-secondary)] max-w-2xl mx-auto">Standardized workflows that power marketing execution</p>
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center">
            <div className="inline-flex p-1 bg-[var(--background-secondary)] rounded-lg border border-[var(--border)] flex-wrap justify-center gap-1">
              {[
                { id: 'framework', label: 'The Framework' },
                { id: 'example', label: 'Example' },
                { id: 'keystone', label: 'Keystone Workflows' },
                { id: 'all', label: 'All Workflows' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-[var(--background)] text-[var(--foreground)] shadow-sm'
                      : 'text-[var(--foreground-secondary)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Framework View */}
          {activeTab === 'framework' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {workflowDimensions.map((dim, index) => (
                  <div key={dim.id} className="relative">
                    <div className="bg-[var(--background-secondary)] rounded-xl border border-[var(--border)] p-5 h-full hover:border-[var(--primary)] transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${dim.color}15` }}>
                          <dim.icon className="w-6 h-6" style={{ color: dim.color }} />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: `${dim.color}20`, color: dim.color }}>{dim.id}</span>
                            <h3 className="font-semibold text-[var(--foreground)]">{dim.title}</h3>
                          </div>
                          <p className="text-sm text-[var(--primary)] font-medium">{dim.subtitle}</p>
                          <p className="text-sm text-[var(--foreground-secondary)]">{dim.description}</p>
                        </div>
                      </div>
                    </div>
                    {index < workflowDimensions.length - 1 && index % 3 !== 2 && (
                      <ChevronRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[var(--foreground-tertiary)]" />
                    )}
                  </div>
                ))}
              </div>
              <div className="bg-gradient-to-r from-[var(--primary)]/10 via-transparent to-[var(--accent)]/10 rounded-xl p-6 border border-[var(--border)]">
                <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
                  {workflowDimensions.map((dim, index) => (
                    <div key={dim.id} className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded font-medium" style={{ backgroundColor: `${dim.color}20`, color: dim.color }}>{dim.title}</span>
                      {index < workflowDimensions.length - 1 && <ArrowRight className="w-4 h-4 text-[var(--foreground-tertiary)]" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Example View */}
          {activeTab === 'example' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent)]/10 rounded-xl p-6 border border-[var(--primary)]/20">
                <div className="flex items-center gap-3 mb-2">
                  <BarChart3 className="w-6 h-6 text-[var(--primary)]" />
                  <h2 className="text-xl font-bold text-[var(--foreground)]">{exampleWorkflow.title}</h2>
                </div>
                <p className="text-[var(--foreground-secondary)]">{exampleWorkflow.subtitle}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {workflowDimensions.map((dim) => (
                  <button key={dim.id} onClick={() => setActiveDimension(dim.id)} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeDimension === dim.id ? 'bg-[var(--foreground)] text-[var(--background)]' : 'bg-[var(--background-secondary)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] border border-[var(--border)]'}`}>
                    <span className="font-bold">{dim.id}</span>
                    <span className="hidden sm:inline">{dim.title}</span>
                  </button>
                ))}
              </div>
              <div className="bg-[var(--background-secondary)] rounded-xl border border-[var(--border)] overflow-hidden">
                <div className="p-5 border-b border-[var(--border)]" style={{ background: `linear-gradient(135deg, ${workflowDimensions.find(d => d.id === activeDimension)?.color}10, transparent)` }}>
                  <div className="flex items-center gap-3">
                    {(() => {
                      const dim = workflowDimensions.find(d => d.id === activeDimension);
                      if (!dim) return null;
                      const Icon = dim.icon;
                      return (<><div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${dim.color}20` }}><Icon className="w-5 h-5" style={{ color: dim.color }} /></div><div><h3 className="font-semibold text-[var(--foreground)]">{dim.title}</h3><p className="text-sm text-[var(--foreground-secondary)]">{dim.subtitle}</p></div></>);
                    })()}
                  </div>
                </div>
                <div className="p-6">
                  {activeDimension === 'A' && (<div className="space-y-4"><p className="text-[var(--foreground)]">{exampleWorkflow.dimensions.A.content}</p><div className="space-y-2"><p className="text-sm font-medium text-[var(--foreground-secondary)]">This workflow answers:</p>{exampleWorkflow.dimensions.A.questions.map((q, i) => (<div key={i} className="flex items-start gap-2 p-3 bg-[var(--background)] rounded-lg"><TrendingUp className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" /><span className="text-[var(--foreground)]">{q}</span></div>))}</div></div>)}
                  {activeDimension === 'B' && (<div className="space-y-4"><div className="inline-flex px-3 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-sm font-medium">{exampleWorkflow.dimensions.B.type}</div><div className="grid sm:grid-cols-3 gap-4">{exampleWorkflow.dimensions.B.schedule.map((item, i) => (<div key={i} className="p-4 bg-[var(--background)] rounded-lg border border-[var(--border)]"><p className="font-semibold text-[var(--foreground)]">{item.label}</p><p className="text-sm text-[var(--foreground-secondary)]">{item.description}</p></div>))}</div><div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20"><p className="text-sm text-amber-600 dark:text-amber-400 flex items-center gap-2"><AlertTriangle className="w-4 h-4" />{exampleWorkflow.dimensions.B.note}</p></div></div>)}
                  {activeDimension === 'C' && (<div className="grid sm:grid-cols-2 gap-6"><div className="space-y-3"><h4 className="font-medium text-[var(--foreground)] flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[var(--primary)]" />Primary Inputs</h4>{exampleWorkflow.dimensions.C.primary.map((item, i) => (<div key={i} className="p-3 bg-[var(--background)] rounded-lg text-sm text-[var(--foreground-secondary)]">{item}</div>))}</div><div className="space-y-3"><h4 className="font-medium text-[var(--foreground-secondary)]">Optional Enrichment</h4>{exampleWorkflow.dimensions.C.optional.map((item, i) => (<div key={i} className="p-3 bg-[var(--background)] rounded-lg text-sm text-[var(--foreground-tertiary)] border border-dashed border-[var(--border)]">{item}</div>))}</div></div>)}
                  {activeDimension === 'D' && (<div className="space-y-4"><div className="grid sm:grid-cols-2 gap-3">{exampleWorkflow.dimensions.D.activities.map((item, i) => (<div key={i} className="flex items-start gap-2 p-3 bg-[var(--background)] rounded-lg"><Cpu className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" /><span className="text-sm text-[var(--foreground-secondary)]">{item}</span></div>))}</div><div className="p-4 bg-[var(--primary)]/10 rounded-lg border-l-4 border-[var(--primary)]"><p className="font-medium text-[var(--foreground)]">Key Rule</p><p className="text-[var(--foreground-secondary)]">{exampleWorkflow.dimensions.D.rule}</p></div></div>)}
                  {activeDimension === 'E' && (<div className="space-y-4"><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">{exampleWorkflow.dimensions.E.outputs.map((item, i) => (<div key={i} className="p-4 bg-[var(--background)] rounded-lg border border-[var(--border)] text-center"><Package className="w-5 h-5 text-[var(--primary)] mx-auto mb-2" /><span className="text-sm text-[var(--foreground)]">{item}</span></div>))}</div><div className="flex flex-wrap gap-2">{exampleWorkflow.dimensions.E.qualities.map((q, i) => (<span key={i} className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-sm rounded-full">{q}</span>))}</div></div>)}
                  {activeDimension === 'F' && (<div className="grid sm:grid-cols-2 gap-6"><div className="space-y-3"><h4 className="font-medium text-[var(--foreground)]">Primary Consumers</h4><div className="flex flex-wrap gap-2">{exampleWorkflow.dimensions.F.primary.map((item, i) => (<span key={i} className="px-3 py-2 bg-[var(--primary)]/10 text-[var(--primary)] text-sm rounded-lg font-medium">{item}</span>))}</div></div><div className="space-y-3"><h4 className="font-medium text-[var(--foreground-secondary)]">Secondary Consumers</h4><div className="flex flex-wrap gap-2">{exampleWorkflow.dimensions.F.secondary.map((item, i) => (<span key={i} className="px-3 py-2 bg-[var(--background)] text-[var(--foreground-secondary)] text-sm rounded-lg border border-[var(--border)]">{item}</span>))}</div></div></div>)}
                  {activeDimension === 'G' && (<div className="space-y-4"><div className="flex flex-wrap gap-2">{exampleWorkflow.dimensions.G.informs.map((item, i) => (<span key={i} className="px-3 py-2 bg-[var(--background)] text-[var(--foreground)] text-sm rounded-lg border border-[var(--border)]">{item}</span>))}</div><div className="grid sm:grid-cols-2 gap-4"><div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20"><p className="text-sm text-green-600 dark:text-green-400 font-medium mb-1">Output answers:</p><p className="text-[var(--foreground)] font-medium">&quot;{exampleWorkflow.dimensions.G.principle.does}&quot;</p></div><div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20"><p className="text-sm text-red-500 font-medium mb-1">Not:</p><p className="text-[var(--foreground)] font-medium">&quot;{exampleWorkflow.dimensions.G.principle.doesnt}&quot;</p></div></div></div>)}
                  {activeDimension === 'H' && (<div className="space-y-4"><div className="grid sm:grid-cols-2 gap-3">{exampleWorkflow.dimensions.H.checks.map((item, i) => (<div key={i} className="flex items-center gap-2 p-3 bg-[var(--background)] rounded-lg"><ShieldCheck className="w-4 h-4 text-green-500 shrink-0" /><span className="text-sm text-[var(--foreground-secondary)]">{item}</span></div>))}</div><div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20"><p className="text-sm text-amber-600 dark:text-amber-400"><strong>If thresholds not met:</strong> {exampleWorkflow.dimensions.H.failure}</p></div></div>)}
                  {activeDimension === 'I' && (<div className="space-y-4"><div className="grid sm:grid-cols-2 gap-4"><div className="p-4 bg-red-500/5 rounded-lg border border-red-500/20"><p className="font-medium text-red-500 mb-3">If performance is poor:</p>{exampleWorkflow.dimensions.I.poor.map((item, i) => (<div key={i} className="flex items-start gap-2 mb-2"><ArrowRight className="w-4 h-4 text-red-500 shrink-0 mt-0.5" /><span className="text-sm text-[var(--foreground-secondary)]">{item}</span></div>))}</div><div className="p-4 bg-green-500/5 rounded-lg border border-green-500/20"><p className="font-medium text-green-500 mb-3">If performance is strong:</p>{exampleWorkflow.dimensions.I.strong.map((item, i) => (<div key={i} className="flex items-start gap-2 mb-2"><ArrowRight className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /><span className="text-sm text-[var(--foreground-secondary)]">{item}</span></div>))}</div></div><div className="p-4 bg-[var(--primary)]/10 rounded-lg text-center"><p className="font-medium text-[var(--foreground)]">{exampleWorkflow.dimensions.I.outcome}</p></div></div>)}
                </div>
              </div>
            </div>
          )}

          {/* Keystone Workflows View */}
          {activeTab === 'keystone' && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl p-6 border border-amber-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <Star className="w-6 h-6 text-amber-500" />
                  <h2 className="text-xl font-bold text-[var(--foreground)]">10 Keystone Workflows</h2>
                </div>
                <p className="text-[var(--foreground-secondary)]">High-leverage workflows that unlock or protect the most value across GTM execution. These are prioritized based on leverage, dependency chains, signal risk, execution friction, and outcome exposure.</p>
              </div>

              <div className="space-y-6">
                {keystoneWorkflows.map((workflow) => (
                  <div key={workflow.id} className="bg-[var(--background-secondary)] rounded-xl border border-[var(--border)] overflow-hidden">
                    <div className="p-6 border-b border-[var(--border)] bg-gradient-to-r from-amber-500/5 to-transparent">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold text-xl shrink-0">{workflow.id}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-[var(--foreground)]">{workflow.title}</h3>
                            <Star className="w-4 h-4 text-amber-500" />
                          </div>
                          <p className="text-sm text-[var(--foreground-tertiary)] mb-2">Category {workflow.categoryNum}: {workflow.category}</p>
                          <p className="text-[var(--foreground-secondary)]">{workflow.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-sm font-semibold text-[var(--foreground-tertiary)] uppercase tracking-wider mb-4">Why It&apos;s Keystone</h4>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="p-4 bg-[var(--background)] rounded-xl border border-[var(--border)]">
                          <div className="flex items-center gap-2 mb-2"><Zap className="w-5 h-5 text-yellow-500" /><span className="text-sm font-semibold text-[var(--foreground)]">Leverage</span></div>
                          <p className="text-sm text-[var(--foreground-secondary)]">{workflow.keystone.leverage}</p>
                        </div>
                        <div className="p-4 bg-[var(--background)] rounded-xl border border-[var(--border)]">
                          <div className="flex items-center gap-2 mb-2"><Link2 className="w-5 h-5 text-blue-500" /><span className="text-sm font-semibold text-[var(--foreground)]">Dependency</span></div>
                          <p className="text-sm text-[var(--foreground-secondary)]">{workflow.keystone.dependency}</p>
                        </div>
                        <div className="p-4 bg-[var(--background)] rounded-xl border border-[var(--border)]">
                          <div className="flex items-center gap-2 mb-2"><AlertCircle className="w-5 h-5 text-red-500" /><span className="text-sm font-semibold text-[var(--foreground)]">Signal Risk</span></div>
                          <p className="text-sm text-[var(--foreground-secondary)]">{workflow.keystone.signalRisk}</p>
                        </div>
                        <div className="p-4 bg-[var(--background)] rounded-xl border border-[var(--border)]">
                          <div className="flex items-center gap-2 mb-2"><Gauge className="w-5 h-5 text-green-500" /><span className="text-sm font-semibold text-[var(--foreground)]">Execution Friction</span></div>
                          <p className="text-sm text-[var(--foreground-secondary)]">{workflow.keystone.executionFriction}</p>
                        </div>
                        <div className="p-4 bg-[var(--background)] rounded-xl border border-[var(--border)]">
                          <div className="flex items-center gap-2 mb-2"><Shield className="w-5 h-5 text-purple-500" /><span className="text-sm font-semibold text-[var(--foreground)]">Outcome Exposure</span></div>
                          <p className="text-sm text-[var(--foreground-secondary)]">{workflow.keystone.outcomeExposure}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Workflows View */}
          {activeTab === 'all' && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 rounded-xl p-6 border border-[var(--primary)]/20">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-[var(--foreground)]">Complete Workflow Inventory</h2>
                    <p className="text-[var(--foreground-secondary)]">30 workflows organized across 9 categories that power GTM execution</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--background)] rounded-lg border border-[var(--border)]"><Layers className="w-4 h-4 text-[var(--primary)]" /><span className="text-sm font-medium">9 Categories</span></div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--background)] rounded-lg border border-[var(--border)]"><Target className="w-4 h-4 text-[var(--accent)]" /><span className="text-sm font-medium">30 Workflows</span></div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-lg border border-amber-500/20"><Star className="w-4 h-4 text-amber-500" /><span className="text-sm font-medium text-amber-600 dark:text-amber-400">10 Keystone</span></div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {allWorkflowCategories.map((category) => {
                  const CategoryIcon = category.icon;
                  return (
                    <div key={category.id} className="bg-[var(--background-secondary)] rounded-xl border border-[var(--border)] overflow-hidden">
                      <div className="p-6 border-b border-[var(--border)]" style={{ background: `linear-gradient(135deg, ${category.color}08, transparent)` }}>
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${category.color}15` }}>
                            <CategoryIcon className="w-7 h-7" style={{ color: category.color }} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-sm font-bold px-2.5 py-1 rounded-lg" style={{ backgroundColor: `${category.color}20`, color: category.color }}>Category {category.id}</span>
                              <h3 className="text-lg font-semibold text-[var(--foreground)]">{category.title}</h3>
                            </div>
                            <p className="text-[var(--foreground-secondary)] mb-2">{category.purpose}</p>
                            <p className="text-sm italic" style={{ color: category.color }}>&quot;{category.question}&quot;</p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-2xl font-bold" style={{ color: category.color }}>{category.workflows.length}</span>
                            <p className="text-xs text-[var(--foreground-tertiary)]">workflows</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                          {category.workflows.map((workflow) => (
                            <div key={workflow.id} className={`p-5 rounded-xl border transition-colors ${workflow.isKeystone ? 'bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40' : 'bg-[var(--background)] border-[var(--border)] hover:border-[var(--primary)]/50'}`}>
                              <div className="flex items-start gap-3">
                                <span className="text-sm font-bold px-2.5 py-1 rounded-lg shrink-0" style={{ backgroundColor: workflow.isKeystone ? 'rgba(245, 158, 11, 0.15)' : `${category.color}15`, color: workflow.isKeystone ? '#f59e0b' : category.color }}>{workflow.id}</span>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold text-[var(--foreground)]">{workflow.title}</h4>
                                    {workflow.isKeystone && <Star className="w-4 h-4 text-amber-500" />}
                                  </div>
                                  <p className="text-sm text-[var(--foreground-secondary)]">{workflow.description}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
