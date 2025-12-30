import Link from 'next/link';

const topicsLinks = [
  { label: 'GTM Strategy', href: '/topics/gtm-strategy' },
  { label: 'Content Strategy', href: '/topics/content-strategy' },
  { label: 'Lead Enrichment', href: '/topics/lead-enrichment' },
  { label: 'Outbound Sales', href: '/topics/outbound' },
  { label: 'Product-Led Growth', href: '/topics/plg' },
  { label: 'AI Agents', href: '/topics/ai-agents' },
];

const processesLinks = [
  { label: 'Demand Generation', href: '/processes/demand-gen' },
  { label: 'Lead Management', href: '/processes/lead-management' },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 font-semibold text-lg mb-4">
              <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center text-white text-sm font-bold">
                MP
              </div>
              <span>Marketing Process Hub</span>
            </div>
            <p className="text-sm text-[var(--foreground-secondary)]">
              Visual documentation for marketing processes and GTM strategies.
            </p>
          </div>

          {/* Topics */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Topics</h3>
            <ul className="space-y-2">
              {topicsLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/topics"
                  className="text-sm text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors"
                >
                  View all topics →
                </Link>
              </li>
            </ul>
          </div>

          {/* Processes */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Processes</h3>
            <ul className="space-y-2">
              {processesLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                >
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--border)]">
          <p className="text-sm text-[var(--foreground-tertiary)] text-center">
            © {new Date().getFullYear()} Marketing Process Hub. Internal documentation.
          </p>
        </div>
      </div>
    </footer>
  );
}
