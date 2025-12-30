'use client';

import { motion } from 'framer-motion';
import { Briefcase, Target, Zap, BarChart3, Settings, BookOpen, Award, Users, CheckCircle2, XCircle, GraduationCap, TrendingUp, Building2 } from 'lucide-react';

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

export default function JobDescriptionPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={fadeIn} className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-sm font-medium">
              <Briefcase className="w-4 h-4" />
              Job Description
            </div>
            <h1 className="text-4xl font-bold text-[var(--foreground)]">
              Senior Director, GTM AI & Operations
            </h1>
            <p className="text-xl text-[var(--foreground-secondary)]">Marketing</p>
          </motion.div>

          {/* Role Summary */}
          <motion.section variants={fadeIn} className="space-y-4">
            <h2 className="text-2xl font-semibold text-[var(--foreground)] flex items-center gap-2">
              <Target className="w-6 h-6 text-[var(--primary)]" />
              Role Summary
            </h2>
            <div className="bg-[var(--background-secondary)] rounded-xl p-6 border border-[var(--border)]">
              <p className="text-[var(--foreground-secondary)] leading-relaxed">
                The Senior Director, GTM AI & Operations (Marketing) owns how marketing work gets done. This role designs, operationalizes, and continuously improves marketing execution through systems, workflows, analytics, and AI-enabled processes so Demand, Product Marketing, Content, and Enablement teams can execute faster, learn continuously, and demonstrate impact.
              </p>
              <p className="text-[var(--foreground-secondary)] leading-relaxed mt-4 p-4 bg-[var(--background)] rounded-lg border-l-4 border-[var(--primary)]">
                <strong>Key distinction:</strong> This role does not own marketing strategy or outcomes. Instead, it owns the execution engine that translates strategy into repeatable, measurable marketing operations.
              </p>
            </div>
          </motion.section>

          {/* Why This Role Exists */}
          <motion.section variants={fadeIn} className="space-y-4">
            <h2 className="text-2xl font-semibold text-[var(--foreground)] flex items-center gap-2">
              <Zap className="w-6 h-6 text-[var(--primary)]" />
              Why This Role Exists
            </h2>
            <div className="bg-[var(--background-secondary)] rounded-xl p-6 border border-[var(--border)]">
              <p className="text-[var(--foreground-secondary)] leading-relaxed">
                Marketing execution has grown more complex across channels, tools, and buyer journeys. Without a unified operating system, teams move quickly but inconsistently, measurement fragments, and learning slows.
              </p>
              <p className="text-[var(--foreground-secondary)] leading-relaxed mt-4">
                This role exists to build the <strong className="text-[var(--foreground)]">Marketing GTM Engine</strong>: the systems, workflows, analytics, and AI-assisted processes that allow Marketing to scale execution efficiently while maintaining alignment with Revenue Operations and Sales.
              </p>
            </div>
          </motion.section>

          {/* Core Responsibilities */}
          <motion.section variants={fadeIn} className="space-y-6">
            <h2 className="text-2xl font-semibold text-[var(--foreground)] flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-[var(--primary)]" />
              Core Responsibilities
            </h2>
            
            <div className="grid gap-4">
              {/* Marketing Execution Operating System */}
              <div className="bg-[var(--background-secondary)] rounded-xl p-6 border border-[var(--border)]">
                <h3 className="text-lg font-semibold text-[var(--foreground)] flex items-center gap-2 mb-4">
                  <Settings className="w-5 h-5 text-[var(--accent)]" />
                  Marketing Execution Operating System
                </h3>
                <ul className="space-y-2 text-[var(--foreground-secondary)]">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] mt-1">•</span>
                    Own the end-to-end operating model for marketing execution across Demand, PMM, Content, and Enablement
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] mt-1">•</span>
                    Define and standardize marketing workflows from strategy handoff through execution and measurement
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] mt-1">•</span>
                    Establish operating cadences and governance for marketing execution reviews
                  </li>
                </ul>
              </div>

              {/* AI & Workflow Enablement */}
              <div className="bg-[var(--background-secondary)] rounded-xl p-6 border border-[var(--border)]">
                <h3 className="text-lg font-semibold text-[var(--foreground)] flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-[var(--accent)]" />
                  AI & Workflow Enablement for Marketing
                </h3>
                <ul className="space-y-2 text-[var(--foreground-secondary)]">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] mt-1">•</span>
                    Design and operationalize AI (agents and assisted workflows) for research synthesis, content creation, campaign execution, and performance analysis
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] mt-1">•</span>
                    Define guardrails for AI usage to ensure accuracy, brand alignment, and compliance
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] mt-1">•</span>
                    Enable marketing teams to use AI safely and effectively without replacing strategic judgment
                  </li>
                </ul>
              </div>

              {/* Marketing Analytics */}
              <div className="bg-[var(--background-secondary)] rounded-xl p-6 border border-[var(--border)]">
                <h3 className="text-lg font-semibold text-[var(--foreground)] flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-[var(--accent)]" />
                  Marketing Analytics & Performance Intelligence
                </h3>
                <ul className="space-y-2 text-[var(--foreground-secondary)]">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] mt-1">•</span>
                    Own marketing analytics and performance intelligence
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] mt-1">•</span>
                    Standardize metric definitions, attribution approaches, and reporting for marketing initiatives
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] mt-1">•</span>
                    Provide analysis that informs marketing prioritization and optimization without owning decisions
                  </li>
                </ul>
              </div>

              {/* Marketing Systems */}
              <div className="bg-[var(--background-secondary)] rounded-xl p-6 border border-[var(--border)]">
                <h3 className="text-lg font-semibold text-[var(--foreground)] flex items-center gap-2 mb-4">
                  <Settings className="w-5 h-5 text-[var(--accent)]" />
                  Marketing Systems & Tooling
                </h3>
                <ul className="space-y-2 text-[var(--foreground-secondary)]">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] mt-1">•</span>
                    Own marketing systems and tooling architecture in partnership with Revenue Operations
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] mt-1">•</span>
                    Ensure marketing tools are integrated, instrumented, and aligned with GTM data standards
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] mt-1">•</span>
                    Evaluate, test, and rationalize marketing technology based on execution impact
                  </li>
                </ul>
              </div>

              {/* Learning & Continuous Improvement */}
              <div className="bg-[var(--background-secondary)] rounded-xl p-6 border border-[var(--border)]">
                <h3 className="text-lg font-semibold text-[var(--foreground)] flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-[var(--accent)]" />
                  Learning & Continuous Improvement
                </h3>
                <ul className="space-y-2 text-[var(--foreground-secondary)]">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] mt-1">•</span>
                    Establish standardized post-mortems for campaigns, content initiatives, and programs
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] mt-1">•</span>
                    Ensure learnings from execution feed back into enablement, workflows, and systems
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] mt-1">•</span>
                    Create durable documentation and institutional knowledge for marketing operations
                  </li>
                </ul>
              </div>

              {/* GTM Center of Excellence */}
              <div className="bg-[var(--background-secondary)] rounded-xl p-6 border border-[var(--border)]">
                <h3 className="text-lg font-semibold text-[var(--foreground)] flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-[var(--accent)]" />
                  GTM Center of Excellence
                </h3>
                <ul className="space-y-2 text-[var(--foreground-secondary)]">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] mt-1">•</span>
                    Use all of HG's data and technology assets to the fullest extent as a first option
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] mt-1">•</span>
                    Define and document GTM best practices using HG data and technology
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--primary)] mt-1">•</span>
                    Create external facing content supporting the use of HG data and technology
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* What This Role Does Not Own */}
          <motion.section variants={fadeIn} className="space-y-4">
            <h2 className="text-2xl font-semibold text-[var(--foreground)] flex items-center gap-2">
              <XCircle className="w-6 h-6 text-red-500" />
              What This Role Does Not Own
            </h2>
            <div className="bg-red-500/5 rounded-xl p-6 border border-red-500/20">
              <ul className="space-y-2 text-[var(--foreground-secondary)]">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-1 shrink-0" />
                  Marketing strategy, positioning, or messaging decisions
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-1 shrink-0" />
                  Campaign themes, budgets, or targets
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-1 shrink-0" />
                  Revenue targets, pipeline ownership, or forecasting
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-1 shrink-0" />
                  Sales or customer success execution
                </li>
              </ul>
              <p className="text-[var(--foreground-secondary)] mt-4 pt-4 border-t border-red-500/20 italic">
                This role enables marketing execution and learning; it does not own business outcomes.
              </p>
            </div>
          </motion.section>

          {/* Cross-Functional Partnership */}
          <motion.section variants={fadeIn} className="space-y-4">
            <h2 className="text-2xl font-semibold text-[var(--foreground)] flex items-center gap-2">
              <Users className="w-6 h-6 text-[var(--primary)]" />
              Cross-Functional Partnership
            </h2>
            <div className="bg-[var(--background-secondary)] rounded-xl p-6 border border-[var(--border)]">
              <p className="text-[var(--foreground-secondary)] mb-4">This role partners closely with:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 bg-[var(--background)] rounded-lg">
                  <Users className="w-4 h-4 text-[var(--primary)]" />
                  <span className="text-[var(--foreground)]">Marketing leadership (Demand, PMM, Content, Enablement)</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-[var(--background)] rounded-lg">
                  <Settings className="w-4 h-4 text-[var(--primary)]" />
                  <span className="text-[var(--foreground)]">Revenue Operations and Sales Operations</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-[var(--background)] rounded-lg">
                  <Briefcase className="w-4 h-4 text-[var(--primary)]" />
                  <span className="text-[var(--foreground)]">Sales leadership</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-[var(--background)] rounded-lg">
                  <BarChart3 className="w-4 h-4 text-[var(--primary)]" />
                  <span className="text-[var(--foreground)]">Data and Analytics teams</span>
                </div>
              </div>
              <p className="text-[var(--foreground-secondary)] mt-4 italic">
                The role operates through influence, standards, and systems rather than direct control over strategy.
              </p>
            </div>
          </motion.section>

          {/* Team & Scope */}
          <motion.section variants={fadeIn} className="space-y-4">
            <h2 className="text-2xl font-semibold text-[var(--foreground)] flex items-center gap-2">
              <Building2 className="w-6 h-6 text-[var(--primary)]" />
              Team & Scope
            </h2>
            <div className="bg-[var(--background-secondary)] rounded-xl p-6 border border-[var(--border)]">
              <ul className="space-y-2 text-[var(--foreground-secondary)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--primary)] mt-1">•</span>
                  Leads Marketing Analytics and Marketing Operations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--primary)] mt-1">•</span>
                  Builds and scales a lean, high-leverage team focused on execution enablement
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--primary)] mt-1">•</span>
                  Acts as a hands-on leader/contributor, hiring GTM Engineer(s) to scale
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Qualifications */}
          <motion.section variants={fadeIn} className="space-y-4">
            <h2 className="text-2xl font-semibold text-[var(--foreground)] flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-[var(--primary)]" />
              Qualifications
            </h2>
            <div className="bg-[var(--background-secondary)] rounded-xl p-6 border border-[var(--border)]">
              <ul className="space-y-2 text-[var(--foreground-secondary)]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                  15+ years experience in Business Operations, GTM Operations, or related roles
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                  Deep understanding of B2B marketing execution across channels
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                  Proven experience building scalable workflows, systems, and analytics
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                  Hands-on experience applying AI to operations
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                  Strong cross-functional communication and influence skills
                </li>
              </ul>
            </div>
          </motion.section>

          {/* What Success Looks Like */}
          <motion.section variants={fadeIn} className="space-y-4">
            <h2 className="text-2xl font-semibold text-[var(--foreground)] flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-[var(--primary)]" />
              What Success Looks Like
            </h2>
            <div className="bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent)]/10 rounded-xl p-6 border border-[var(--primary)]/20">
              <ul className="space-y-3 text-[var(--foreground)]">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-sm font-bold shrink-0">1</div>
                  Marketing execution is faster, more consistent, and easier to measure
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-sm font-bold shrink-0">2</div>
                  Campaigns and content are launched with less friction and clearer attribution
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-sm font-bold shrink-0">3</div>
                  Marketing performance insights are trusted and actionable
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-sm font-bold shrink-0">4</div>
                  Learnings from execution are systematically applied
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Reporting */}
          <motion.section variants={fadeIn} className="space-y-4">
            <h2 className="text-2xl font-semibold text-[var(--foreground)] flex items-center gap-2">
              <Building2 className="w-6 h-6 text-[var(--primary)]" />
              Reporting
            </h2>
            <div className="bg-[var(--background-secondary)] rounded-xl p-6 border border-[var(--border)]">
              <p className="text-[var(--foreground-secondary)]">
                This role reports into the <strong className="text-[var(--foreground)]">CMO</strong>. Scope and mandate are designed to align closely with Revenue Operations through formal partnership and shared standards.
              </p>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </main>
  );
}
