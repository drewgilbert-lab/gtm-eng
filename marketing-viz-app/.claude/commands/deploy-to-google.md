# Deploy to Google Cloud Storage

Deploy the GTM AI & Ops app to Google Cloud Storage.

## Live URL

**Website:** http://gtm-ai-ops.storage.googleapis.com/scope.html

Note: Start with scope.html as the entry point (the homepage is blank).

## Instructions

Execute these steps in order:

1. **Build the static site**
   ```bash
   cd /Users/drew.gilbert/Documents/gtm-eng/marketing-viz-app && npm run build
   ```

2. **Upload to Google Cloud Storage**
   ```bash
   cd /Users/drew.gilbert/Documents/gtm-eng/marketing-viz-app && gcloud storage cp -r out/* gs://gtm-ai-ops/
   ```

3. **Verify deployment**
   Open http://gtm-ai-ops.storage.googleapis.com/scope.html in your browser.

## Configuration Reference

- **GCP Project:** hg-ai-marketing-ops
- **Storage Bucket:** gtm-ai-ops
- **Region:** us-central1
- **Website Endpoint:** http://gtm-ai-ops.storage.googleapis.com/

## URLs

All pages must be accessed with the `.html` extension:

| Page | URL |
|------|-----|
| Scope | http://gtm-ai-ops.storage.googleapis.com/scope.html |
| Job Description | http://gtm-ai-ops.storage.googleapis.com/job-description.html |
| Workflows | http://gtm-ai-ops.storage.googleapis.com/workflows.html |
| Collaboration | http://gtm-ai-ops.storage.googleapis.com/collaboration.html |
| Prioritization | http://gtm-ai-ops.storage.googleapis.com/prioritization.html |
| Escalations | http://gtm-ai-ops.storage.googleapis.com/escalations.html |

## Important Technical Notes

### Why Navigation Uses onClick Handlers

GCS static hosting does NOT auto-serve directory index files, so URLs must include the `.html` extension. However, Next.js client-side JavaScript (React hydration) intercepts anchor tag clicks and strips the `.html` extension.

**Solution:** Navigation links use explicit `onClick` handlers that call `window.location.href` to force full page navigation:

```tsx
<a
  href={item.href}
  onClick={(e) => {
    e.preventDefault();
    window.location.href = item.href;
  }}
>
  {item.label}
</a>
```

This approach:
1. Prevents React from intercepting the click (`e.preventDefault()`)
2. Forces a full page navigation (`window.location.href`)
3. Preserves the `.html` extension in the URL

### Key Files

- **Navigation URLs:** `src/data/navigation.ts` - All hrefs must include `.html` extension
- **Header Component:** `src/components/layout/Header.tsx` - Uses onClick handlers for navigation
- **Next.js Config:** `next.config.ts` - NO `trailingSlash` setting (generates flat HTML files)

### Logo Link

The logo "GTM AI & Ops" links to `/scope.html` (the first content page) since the homepage is blank.

## Troubleshooting

### Authentication Errors
If you get authentication errors, run:
```bash
gcloud auth login
gcloud config set project hg-ai-marketing-ops
```

### Pages Not Loading (XML Error)
- Ensure you're accessing pages with the `.html` extension
- Check that files were uploaded: `gcloud storage ls gs://gtm-ai-ops/`
- Try adding a cache-busting query parameter: `?v=1`

### Navigation Not Working After Deploy
- Clear browser cache or use incognito mode
- Verify that Header.tsx uses onClick handlers (not just href)
- Check that navigation.ts has `.html` extensions in all hrefs

## Configuration Details

### next.config.ts
```typescript
const nextConfig: NextConfig = {
  output: 'export',           // Generate static HTML/CSS/JS
  images: {
    unoptimized: true,        // Required for static export
  },
  // NO trailingSlash - generates flat HTML files like scope.html
};
```

### navigation.ts
```typescript
export const mainNavigation: NavItem[] = [
  { label: 'Scope', href: '/scope.html' },
  { label: 'Job Description', href: '/job-description.html' },
  { label: 'Workflows', href: '/workflows.html' },
  { label: 'Collaboration', href: '/collaboration.html' },
  { label: 'Prioritization', href: '/prioritization.html' },
  { label: 'Escalations', href: '/escalations.html' },
];
```

### Header.tsx Navigation Pattern
```tsx
{navItems.map((item) => (
  <a
    key={item.href}
    href={item.href}
    onClick={(e) => {
      e.preventDefault();
      window.location.href = item.href;
    }}
    className={...}
  >
    {item.label}
  </a>
))}
```
