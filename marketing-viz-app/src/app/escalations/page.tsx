'use client';

import { useState } from 'react';
import { 
  Shield, 
  Target, 
  Settings, 
  BarChart3, 
  Wrench, 
  Users, 
  UserCircle, 
  Lock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  AlertTriangle,
  Zap,
  TrendingUp,
  Info,
  ChevronRight
} from 'lucide-react';

// Authority types
const authorityTypes = [
  { type: 'Owns', color: '#22c55e', description: 'Final decision authority', icon: CheckCircle2 },
  { type: 'Executes', color: '#3b82f6', description: 'Responsible for delivery, not decision', icon: Zap },
  { type: 'Influences', color: '#f59e0b', description: 'Provides analysis and recommendation', icon: TrendingUp },
  { type: 'Escalates', color: '#ef4444', description: 'Flags risk or conflict for leadership decision', icon: AlertTriangle },
  { type: 'Out of Scope', color: '#6b7280', description: 'Explicitly not owned by this role', icon: XCircle }
];

// Domain data
const domains = [
  {
    id: 'strategy',
    title: 'Strategy & Business Direction',
    icon: Target,
    color: '#8b5cf6',
    items: [
      { area: 'Marketing strategy', authority: 'Out of Scope', notes: 'Explicitly not owned' },
      { area: 'Campaign themes & priorities', authority: 'Out of Scope', notes: 'Demand / PMM owned' },
      { area: 'Revenue targets', authority: 'Out of Scope', notes: 'Sales / Exec owned' },
      { area: 'GTM segmentation strategy', authority: 'Influences', notes: 'Provides data-driven insight only' },
      { area: 'ICP & persona definition', authority: 'Influences', notes: 'Enables research & synthesis' }
    ],
    escalationTrigger: 'Strategy lacks measurable inputs or cannot be operationalized with existing systems.'
  },
  {
    id: 'execution',
    title: 'Execution & Workflow Design',
    icon: Settings,
    color: '#22c55e',
    items: [
      { area: 'Marketing execution workflows', authority: 'Owns', notes: 'End-to-end workflow design' },
      { area: 'AI-assisted execution models', authority: 'Owns', notes: 'Guardrails + enablement' },
      { area: 'Process standardization', authority: 'Owns', notes: 'Across Marketing execution' },
      { area: 'Execution prioritization', authority: 'Executes', notes: 'Strategy sets priorities' },
      { area: 'Experimentation frameworks', authority: 'Owns', notes: 'How tests run, not what to test' }
    ],
    escalationTrigger: 'Execution blocked due to unclear ownership or conflicting requests.'
  },
  {
    id: 'analytics',
    title: 'Analytics, Measurement & Learning',
    icon: BarChart3,
    color: '#3b82f6',
    items: [
      { area: 'Marketing analytics', authority: 'Owns', notes: 'Team + outputs' },
      { area: 'Metric definitions (Marketing)', authority: 'Owns', notes: 'Aligned with RevOps' },
      { area: 'Attribution modeling', authority: 'Influences', notes: 'RevOps partnership' },
      { area: 'Performance reporting', authority: 'Owns', notes: 'Trusted source' },
      { area: 'Post-mortems', authority: 'Owns', notes: 'Mandatory for learning' }
    ],
    escalationTrigger: 'Disagreement over metric definitions or interpretation impacting decisions.'
  },
  {
    id: 'systems',
    title: 'Systems, Tools & Architecture',
    icon: Wrench,
    color: '#f59e0b',
    items: [
      { area: 'Marketing tools', authority: 'Owns', notes: 'Day-to-day ownership' },
      { area: 'AI tooling for Marketing', authority: 'Owns', notes: 'Usage & governance' },
      { area: 'Tool evaluation', authority: 'Owns', notes: 'Pilot → recommendation' },
      { area: 'GTM data standards', authority: 'Influences', notes: 'RevOps alignment' },
      { area: 'Salesforce schema', authority: 'Out of Scope', notes: 'RevOps owned' }
    ],
    escalationTrigger: 'New tool adoption conflicts with GTM data integrity or security standards.'
  },
  {
    id: 'crossfunctional',
    title: 'Cross-Functional Interfaces',
    icon: Users,
    color: '#ec4899',
    items: [
      { area: 'Demand Gen', authority: 'Executes', notes: 'Supports execution' },
      { area: 'Product Marketing', authority: 'Executes', notes: 'Enables output' },
      { area: 'Content', authority: 'Executes', notes: 'Workflow enablement' },
      { area: 'Enablement', authority: 'Executes', notes: 'Learning loops' },
      { area: 'Sales', authority: 'Influences', notes: 'Field insights' },
      { area: 'RevOps', authority: 'Partners', notes: 'Shared standards' }
    ],
    escalationTrigger: 'Repeated execution friction due to unclear handoffs.'
  },
  {
    id: 'people',
    title: 'People & Team Management',
    icon: UserCircle,
    color: '#14b8a6',
    items: [
      { area: 'Marketing Ops', authority: 'Owns', notes: 'Direct report' },
      { area: 'Marketing Analytics', authority: 'Owns', notes: 'Direct report' },
      { area: 'GTM AI / Execution', authority: 'Owns', notes: 'Direct or dotted' },
      { area: 'Hiring plans', authority: 'Influences', notes: 'Budget alignment' },
      { area: 'Performance management', authority: 'Owns', notes: 'For direct reports' }
    ],
    escalationTrigger: 'Team capacity misaligned with scope or expectations.'
  },
  {
    id: 'governance',
    title: 'Governance & Risk Management',
    icon: Lock,
    color: '#ef4444',
    items: [
      { area: 'AI usage policies (Marketing)', authority: 'Owns', notes: 'With Legal/Security' },
      { area: 'Brand guardrails', authority: 'Executes', notes: 'PMM alignment' },
      { area: 'Compliance workflows', authority: 'Executes', notes: 'Legal partnership' },
      { area: 'Data privacy', authority: 'Escalates', notes: 'Security owned' }
    ],
    escalationTrigger: 'AI or tooling introduces compliance or reputational risk.'
  }
];

// Escalation principles
const escalationPrinciples = [
  'Accountability exceeds authority',
  'Execution is blocked by unresolved ownership',
  'Data definitions conflict across GTM teams',
  'Strategy cannot be operationalized safely',
  'Learning is ignored after repeated failure'
];

// Impact comparison
const withoutMatrix = [
  'Execution slows',
  'Accountability blurs',
  'AI adoption becomes unsafe',
  'The role becomes a catch-all'
];

const withMatrix = [
  'Marketing moves faster',
  'Learning compounds',
  'RevOps alignment is preserved',
  'Leadership gets clarity, not noise'
];

function getAuthorityStyle(authority: string) {
  const type = authorityTypes.find(t => t.type === authority) || authorityTypes.find(t => authority.includes(t.type));
  if (type) {
    return { color: type.color, bg: `${type.color}15`, border: `${type.color}30` };
  }
  return { color: '#6b7280', bg: '#6b728015', border: '#6b728030' };
}

export default function EscalationsPage() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>('execution');

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-sm font-medium">
              <Shield className="w-4 h-4" />
              Authority & Escalation
            </div>
            <h1 className="text-4xl font-bold text-[var(--foreground)]">Authority & Escalation Matrix</h1>
            <p className="text-xl text-[var(--foreground-secondary)] max-w-3xl mx-auto">
              This matrix makes authority explicit, prevents accountability without control, and ensures fast execution without organizational confusion.
            </p>
          </div>

          {/* Authority Types Legend */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[var(--foreground)] text-center">Decision Authority Framework</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {authorityTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <div 
                    key={type.type}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border"
                    style={{ backgroundColor: `${type.color}10`, borderColor: `${type.color}30` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: type.color }} />
                    <span className="font-semibold text-sm" style={{ color: type.color }}>{type.type}</span>
                    <span className="text-xs text-[var(--foreground-tertiary)] hidden sm:inline">— {type.description}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Domain Selector */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[var(--foreground)] text-center">Authority by Domain</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {domains.map((domain) => {
                const Icon = domain.icon;
                return (
                  <button
                    key={domain.id}
                    onClick={() => setSelectedDomain(selectedDomain === domain.id ? null : domain.id)}
                    className={`p-3 rounded-xl border transition-all text-center ${
                      selectedDomain === domain.id
                        ? 'border-2 shadow-lg'
                        : 'bg-[var(--background-secondary)] border-[var(--border)] hover:border-[var(--primary)]/50'
                    }`}
                    style={selectedDomain === domain.id ? { borderColor: domain.color, backgroundColor: `${domain.color}08` } : {}}
                  >
                    <div 
                      className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center"
                      style={{ backgroundColor: `${domain.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: domain.color }} />
                    </div>
                    <p className="text-xs font-medium text-[var(--foreground)] leading-tight">{domain.title}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Domain Detail */}
          {selectedDomain && (
            <div className="space-y-6">
              {domains.filter(d => d.id === selectedDomain).map((domain) => {
                const DomainIcon = domain.icon;
                return (
                  <div key={domain.id} className="bg-[var(--background-secondary)] rounded-2xl border border-[var(--border)] overflow-hidden">
                    {/* Domain Header */}
                    <div 
                      className="p-6 border-b border-[var(--border)]"
                      style={{ background: `linear-gradient(135deg, ${domain.color}10, transparent)` }}
                    >
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${domain.color}20` }}
                        >
                          <DomainIcon className="w-7 h-7" style={{ color: domain.color }} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[var(--foreground)]">{domain.title}</h3>
                          <p className="text-sm text-[var(--foreground-secondary)]">{domain.items.length} areas defined</p>
                        </div>
                      </div>
                    </div>

                    {/* Authority Table */}
                    <div className="p-6">
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr>
                              <th className="p-3 text-left bg-[var(--background)] border border-[var(--border)] font-semibold text-[var(--foreground)] rounded-tl-lg">Area</th>
                              <th className="p-3 text-center bg-[var(--background)] border border-[var(--border)] font-semibold text-[var(--foreground)] w-36">Authority</th>
                              <th className="p-3 text-left bg-[var(--background)] border border-[var(--border)] font-semibold text-[var(--foreground)] rounded-tr-lg">Notes</th>
                            </tr>
                          </thead>
                          <tbody>
                            {domain.items.map((item, index) => {
                              const style = getAuthorityStyle(item.authority);
                              return (
                                <tr key={item.area}>
                                  <td className={`p-3 border border-[var(--border)] text-[var(--foreground)] ${index === domain.items.length - 1 ? 'rounded-bl-lg' : ''}`}>
                                    {item.area}
                                  </td>
                                  <td className="p-3 border border-[var(--border)] text-center">
                                    <span 
                                      className="px-3 py-1 rounded-full text-sm font-semibold"
                                      style={{ backgroundColor: style.bg, color: style.color }}
                                    >
                                      {item.authority}
                                    </span>
                                  </td>
                                  <td className={`p-3 border border-[var(--border)] text-[var(--foreground-secondary)] text-sm ${index === domain.items.length - 1 ? 'rounded-br-lg' : ''}`}>
                                    {item.notes}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      {/* Escalation Trigger */}
                      <div className="mt-6 p-4 bg-red-500/5 rounded-xl border border-red-500/20">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-red-500 mb-1">Escalation Trigger</p>
                            <p className="text-[var(--foreground-secondary)]">{domain.escalationTrigger}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Authority Summary Chart */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[var(--foreground)] text-center">Authority Distribution</h2>
            
            <div className="bg-[var(--background-secondary)] rounded-2xl border border-[var(--border)] p-6">
              <div className="space-y-4">
                {domains.map((domain) => {
                  const DomainIcon = domain.icon;
                  const owns = domain.items.filter(i => i.authority === 'Owns').length;
                  const executes = domain.items.filter(i => i.authority === 'Executes' || i.authority === 'Partners').length;
                  const influences = domain.items.filter(i => i.authority === 'Influences').length;
                  const outOfScope = domain.items.filter(i => i.authority === 'Out of Scope' || i.authority === 'Escalates').length;
                  const total = domain.items.length;

                  return (
                    <div key={domain.id} className="flex items-center gap-4">
                      <div className="w-48 flex items-center gap-2 shrink-0">
                        <DomainIcon className="w-4 h-4" style={{ color: domain.color }} />
                        <span className="text-sm font-medium text-[var(--foreground)] truncate">{domain.title}</span>
                      </div>
                      <div className="flex-1 flex h-8 rounded-lg overflow-hidden">
                        {owns > 0 && (
                          <div 
                            className="flex items-center justify-center text-xs font-semibold text-white"
                            style={{ width: `${(owns/total)*100}%`, backgroundColor: '#22c55e' }}
                            title={`Owns: ${owns}`}
                          >
                            {owns}
                          </div>
                        )}
                        {executes > 0 && (
                          <div 
                            className="flex items-center justify-center text-xs font-semibold text-white"
                            style={{ width: `${(executes/total)*100}%`, backgroundColor: '#3b82f6' }}
                            title={`Executes: ${executes}`}
                          >
                            {executes}
                          </div>
                        )}
                        {influences > 0 && (
                          <div 
                            className="flex items-center justify-center text-xs font-semibold text-white"
                            style={{ width: `${(influences/total)*100}%`, backgroundColor: '#f59e0b' }}
                            title={`Influences: ${influences}`}
                          >
                            {influences}
                          </div>
                        )}
                        {outOfScope > 0 && (
                          <div 
                            className="flex items-center justify-center text-xs font-semibold text-white"
                            style={{ width: `${(outOfScope/total)*100}%`, backgroundColor: '#6b7280' }}
                            title={`Out of Scope: ${outOfScope}`}
                          >
                            {outOfScope}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chart Legend */}
              <div className="flex flex-wrap justify-center gap-4 mt-6 pt-6 border-t border-[var(--border)]">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#22c55e' }}></div>
                  <span className="text-sm text-[var(--foreground-secondary)]">Owns</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#3b82f6' }}></div>
                  <span className="text-sm text-[var(--foreground-secondary)]">Executes/Partners</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#f59e0b' }}></div>
                  <span className="text-sm text-[var(--foreground-secondary)]">Influences</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#6b7280' }}></div>
                  <span className="text-sm text-[var(--foreground-secondary)]">Out of Scope/Escalates</span>
                </div>
              </div>
            </div>
          </div>

          {/* Escalation Principles */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[var(--foreground)] text-center">Escalation Principles</h2>
            
            <div className="bg-[var(--background-secondary)] rounded-2xl border border-[var(--border)] p-6">
              <p className="text-[var(--foreground-secondary)] text-center mb-6">
                Escalation is triggered when any of the following conditions are met:
              </p>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {escalationPrinciples.map((principle, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-red-500/5 rounded-xl border border-red-500/20">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                      <span className="text-red-500 font-bold">{index + 1}</span>
                    </div>
                    <p className="text-sm text-[var(--foreground)]">{principle}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                <div className="flex items-center gap-3">
                  <Info className="w-5 h-5 text-amber-500 shrink-0" />
                  <p className="text-sm text-amber-600 dark:text-amber-400">
                    <strong>Important:</strong> Escalation is a <strong>last-mile safety mechanism</strong>, not a management bypass.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Impact Comparison */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[var(--foreground)] text-center">Why This Matrix Matters</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Without Matrix */}
              <div className="bg-red-500/5 rounded-2xl border border-red-500/20 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--foreground)]">Without This Matrix</h3>
                    <p className="text-sm text-red-500">Organizational confusion</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {withoutMatrix.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-[var(--background)] rounded-lg">
                      <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                      <span className="text-[var(--foreground-secondary)]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* With Matrix */}
              <div className="bg-green-500/5 rounded-2xl border border-green-500/20 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--foreground)]">With This Matrix</h3>
                    <p className="text-sm text-green-500">Clear accountability</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {withMatrix.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-[var(--background)] rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-[var(--foreground-secondary)]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Reference */}
          <div className="bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 rounded-2xl border border-[var(--primary)]/20 p-8">
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-6 text-center">Quick Reference: What This Role...</h3>
            
            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-4 bg-[var(--background)] rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <h4 className="font-semibold text-[var(--foreground)]">Decides</h4>
                </div>
                <ul className="text-sm text-[var(--foreground-secondary)] space-y-1">
                  <li>• Execution workflows</li>
                  <li>• AI governance</li>
                  <li>• Process standards</li>
                  <li>• Metric definitions</li>
                </ul>
              </div>
              
              <div className="p-4 bg-[var(--background)] rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-amber-500" />
                  <h4 className="font-semibold text-[var(--foreground)]">Influences</h4>
                </div>
                <ul className="text-sm text-[var(--foreground-secondary)] space-y-1">
                  <li>• Segmentation strategy</li>
                  <li>• Attribution models</li>
                  <li>• GTM data standards</li>
                  <li>• Hiring plans</li>
                </ul>
              </div>
              
              <div className="p-4 bg-[var(--background)] rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-blue-500" />
                  <h4 className="font-semibold text-[var(--foreground)]">Executes</h4>
                </div>
                <ul className="text-sm text-[var(--foreground-secondary)] space-y-1">
                  <li>• Strategy priorities</li>
                  <li>• Brand guardrails</li>
                  <li>• Compliance workflows</li>
                  <li>• Partner enablement</li>
                </ul>
              </div>
              
              <div className="p-4 bg-[var(--background)] rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <h4 className="font-semibold text-[var(--foreground)]">Escalates</h4>
                </div>
                <ul className="text-sm text-[var(--foreground-secondary)] space-y-1">
                  <li>• Blocked execution</li>
                  <li>• Data conflicts</li>
                  <li>• Scope misalignment</li>
                  <li>• Compliance risk</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
