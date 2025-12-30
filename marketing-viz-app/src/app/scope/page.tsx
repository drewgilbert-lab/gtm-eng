'use client';

import { motion } from 'framer-motion';
import { 
  Target, 
  AlertTriangle, 
  BarChart3, 
  Settings, 
  Cpu, 
  ShieldX, 
  Key,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Workflow,
  Layers,
  Gauge,
  Calendar
} from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const pillars = [
  {
    id: 'analytics',
    title: 'Marketing Analytics',
    icon: BarChart3,
    color: 'var(--primary)',
    scope: [
      'Funnel and lifecycle analysis connecting marketing activity → SDR follow-up → opportunities → pipeline → closed-won',
      'Experimentation measurement and learning loops',
      'Standard reporting packages for Demand, PMM, Sales, and RevOps',
      'Data quality monitoring for marketing lifecycle measurement'
    ],
    boundary: 'Analytics does not set the strategy; it provides the operating truth that strategy owners use.'
  },
  {
    id: 'ops',
    title: 'Marketing Ops',
    icon: Settings,
    color: 'var(--accent)',
    scope: [
      'Marketing systems administration and process configuration (aligned with RevOps)',
      'Lifecycle configuration support: routing rules, SLAs, views, campaign plumbing, attribution',
      'Tool governance: intake, evaluation, rollout standards, and adoption support'
    ],
    boundary: 'Marketing Ops is not a general "ticket desk." It is the operational arm of the GTM execution engine.'
  },
  {
    id: 'engineering',
    title: 'GTM Engineering',
    icon: Cpu,
    color: '#10b981',
    scope: [
      'AI-first workflow design: how work is created, transformed, distributed, tracked, and improved',
      'Execution engine: converting inputs into campaigns, nurture, outbound experiments, and sales enablement outputs',
      'Automation and augmentation: reducing cycle time without dropping quality',
      'Operational documentation: playbooks, templates, QA checklists, prompts, and enablement'
    ],
    boundary: 'GTM Engineering runs the execution, not the strategy.'
  }
];

const problemsWithoutRole = [
  { icon: AlertTriangle, text: 'Shipping fast but inconsistently—quality varies; compliance/SEO/analytics are missed' },
  { icon: Layers, text: 'Operating in disconnected tools and spreadsheets' },
  { icon: Gauge, text: 'Lacking clear feedback loops—unclear what\'s working vs. not, and why' },
  { icon: Workflow, text: 'Repeating the same work across teams due to no shared execution engine' }
];

const nonScope = [
  'Owning prioritization without clear decision rights (becomes strategy ownership by another name)',
  'Being accountable for outcomes without authority (measured like Demand/PMM, but without the levers they control)',
  'Becoming the default owner of "everything broken" across GTM because the role is adjacent to systems'
];

const authorityAreas = [
  {
    title: 'Process Authority',
    icon: Workflow,
    items: [
      'Define and enforce standard GTM execution workflows (intake → build → QA → launch → measure → post-mortem)',
      'Require that launches meet baseline standards (tracking, compliance, handoffs) before going live'
    ]
  },
  {
    title: 'Systems Authority',
    icon: Settings,
    items: [
      'Manage marketing operations and analytics resources directly',
      'Co-govern tool decisions with RevOps (no unilateral tool adoption)'
    ]
  },
  {
    title: 'Measurement Authority',
    icon: BarChart3,
    items: [
      'Set definitions for measurement outputs (what gets measured, how, and how often)',
      'Run the operating cadence: weekly/biweekly performance reviews, experiment readouts, post-mortems'
    ]
  },
  {
    title: 'Operating Cadence Authority',
    icon: Calendar,
    items: [
      'Run post-mortems and ensure follow-through',
      'Require attendance/inputs from partner teams when the workflow demands it'
    ]
  }
];

export default function ScopePage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="space-y-16"
        >
          {/* Hero / Thesis */}
          <motion.section variants={fadeIn} className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-sm font-medium">
              <Target className="w-4 h-4" />
              Role Scope
            </div>
            <h1 className="text-4xl font-bold text-[var(--foreground)] max-w-3xl mx-auto leading-tight">
              How Work Gets Done Across Marketing's GTM Execution Layer
            </h1>
            <p className="text-xl text-[var(--foreground-secondary)] max-w-2xl mx-auto">
              Systems, workflows, automation, measurement, and the operating cadence that turns strategy into repeatable execution.
            </p>
          </motion.section>

          {/* Core Principle */}
          <motion.section variants={fadeIn}>
            <div className="bg-gradient-to-r from-[var(--primary)]/10 via-[var(--accent)]/10 to-[var(--primary)]/10 rounded-2xl p-8 border border-[var(--primary)]/20">
              <div className="flex items-center gap-4 justify-center">
                <div className="text-center">
                  <p className="text-lg text-[var(--foreground)] font-medium">
                    Speed + Quality + Measurability
                  </p>
                  <p className="text-[var(--foreground-secondary)] mt-2">
                    come from a centralized execution and measurement layer, with explicit handoffs to strategy owners.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Problems Without This Role */}
          <motion.section variants={fadeIn} className="space-y-6">
            <h2 className="text-2xl font-semibold text-[var(--foreground)] text-center">
              What Happens Without a Unified Operating Layer
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {problemsWithoutRole.map((problem, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="flex items-start gap-4 p-5 bg-red-500/5 rounded-xl border border-red-500/20"
                >
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                    <problem.icon className="w-5 h-5 text-red-500" />
                  </div>
                  <p className="text-[var(--foreground-secondary)]">{problem.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Three Pillars */}
          <motion.section variants={fadeIn} className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-[var(--foreground)]">
                Three Functional Pillars
              </h2>
              <p className="text-[var(--foreground-secondary)]">
                Ownership of systems, execution, and analysis—not strategy
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {pillars.map((pillar) => (
                <motion.div
                  key={pillar.id}
                  variants={fadeIn}
                  className="bg-[var(--background-secondary)] rounded-xl border border-[var(--border)] overflow-hidden"
                >
                  {/* Header */}
                  <div 
                    className="p-5 border-b border-[var(--border)]"
                    style={{ background: `linear-gradient(135deg, ${pillar.color}10, transparent)` }}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${pillar.color}20` }}
                      >
                        <pillar.icon className="w-5 h-5" style={{ color: pillar.color }} />
                      </div>
                      <h3 className="font-semibold text-[var(--foreground)]">{pillar.title}</h3>
                    </div>
                  </div>

                  {/* Scope Items */}
                  <div className="p-5 space-y-3">
                    {pillar.scope.map((item, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: pillar.color }} />
                        <span className="text-[var(--foreground-secondary)]">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Boundary */}
                  <div className="px-5 pb-5">
                    <div className="p-3 bg-[var(--background)] rounded-lg border-l-2" style={{ borderColor: pillar.color }}>
                      <p className="text-xs text-[var(--foreground-tertiary)] italic">{pillar.boundary}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Non-Scope */}
          <motion.section variants={fadeIn} className="space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-sm font-medium">
                <ShieldX className="w-4 h-4" />
                Explicit Non-Scope
              </div>
              <h2 className="text-2xl font-semibold text-[var(--foreground)]">
                Guardrails to Prevent Role Failure
              </h2>
            </div>

            <div className="bg-[var(--background-secondary)] rounded-xl border border-[var(--border)] p-6">
              <div className="space-y-4">
                {nonScope.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-red-500/5 rounded-lg border border-red-500/10">
                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-[var(--foreground-secondary)]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-[var(--background)] rounded-lg border border-[var(--border)]">
                <p className="text-sm text-[var(--foreground-secondary)]">
                  <strong className="text-[var(--foreground)]">The operating model:</strong> Run the operating system and learning loops. Strategy owners decide what gets prioritized. Execution is fast, consistent, and measurable.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Minimum Authority */}
          <motion.section variants={fadeIn} className="space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-sm font-medium">
                <Key className="w-4 h-4" />
                Required Authority
              </div>
              <h2 className="text-2xl font-semibold text-[var(--foreground)]">
                Minimum Viable Authority Set
              </h2>
              <p className="text-[var(--foreground-secondary)]">
                This role requires minimum viable authority to enforce how work gets done
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {authorityAreas.map((area, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="bg-[var(--background-secondary)] rounded-xl border border-[var(--border)] p-5"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
                      <area.icon className="w-5 h-5 text-[var(--primary)]" />
                    </div>
                    <h3 className="font-semibold text-[var(--foreground)]">{area.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {area.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-sm">
                        <ArrowRight className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
                        <span className="text-[var(--foreground-secondary)]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* What is NOT asked for */}
            <div className="bg-[var(--background-secondary)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="font-semibold text-[var(--foreground)] mb-4">Boundaries Maintained</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-[var(--foreground-tertiary)] shrink-0" />
                  <div>
                    <p className="text-[var(--foreground)]">No strategy ownership</p>
                    <p className="text-sm text-[var(--foreground-tertiary)]">Explicitly not the point of the role</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-[var(--foreground-tertiary)] shrink-0" />
                  <div>
                    <p className="text-[var(--foreground)]">No direct PMM or Demand headcount control</p>
                    <p className="text-sm text-[var(--foreground-tertiary)]">Requires clear handoffs and SLAs instead</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </main>
  );
}
