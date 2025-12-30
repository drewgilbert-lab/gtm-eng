# Deploy to Google Cloud Storage

Deploy the GTM AI & Ops app to Google Cloud Storage.

## Live URL

**Website:** http://gtm-ai-ops.storage.googleapis.com/index.html

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
   Open http://gtm-ai-ops.storage.googleapis.com/index.html in your browser.

## Configuration Reference

- **GCP Project:** hg-ai-marketing-ops
- **Storage Bucket:** gtm-ai-ops
- **Region:** us-central1
- **Website Endpoint:** http://gtm-ai-ops.storage.googleapis.com/

## URLs

All pages must be accessed with the `.html` extension:

| Page | URL |
|------|-----|
| Home | http://gtm-ai-ops.storage.googleapis.com/index.html |
| Scope | http://gtm-ai-ops.storage.googleapis.com/scope.html |
| Job Description | http://gtm-ai-ops.storage.googleapis.com/job-description.html |
| Workflows | http://gtm-ai-ops.storage.googleapis.com/workflows.html |
| Collaboration | http://gtm-ai-ops.storage.googleapis.com/collaboration.html |
| Prioritization | http://gtm-ai-ops.storage.googleapis.com/prioritization.html |
| Escalations | http://gtm-ai-ops.storage.googleapis.com/escalations.html |

## Important Notes

### URL Format
- **GCS does NOT auto-serve directory index files**. Always use the full `.html` extension when accessing pages directly.
- Navigation within the app uses `.html` extensions in the href attributes.
- The app uses regular `<a>` tags (not Next.js `Link` components) to ensure proper navigation on GCS static hosting.

### Why This Configuration Works
1. **Flat HTML files**: Next.js is configured without `trailingSlash`, generating files like `scope.html` instead of `scope/index.html`.
2. **Direct file serving**: GCS serves the HTML files directly without needing directory index resolution.
3. **Standard anchor tags**: The navigation uses plain HTML `<a>` tags to avoid client-side routing issues on static hosting.

## Troubleshooting

### Authentication Errors
If you get authentication errors, run:
```bash
gcloud auth login
gcloud config set project hg-ai-marketing-ops
```

### Pages Not Loading
- Ensure you're accessing pages with the `.html` extension
- Check that files were uploaded: `gcloud storage ls gs://gtm-ai-ops/`
- Verify bucket permissions allow public read access

### Navigation Not Working
- The navigation links use `.html` extensions
- Verify that the Header component uses plain `<a>` tags, not Next.js `Link` components
- Check that `next.config.ts` does NOT have `trailingSlash: true`

## Configuration Details

### next.config.ts
```typescript
const nextConfig: NextConfig = {
  output: 'export',           // Generate static HTML/CSS/JS
  images: {
    unoptimized: true,        // Required for static export
  },
  // NO trailingSlash setting - generates flat HTML files
};
```

### navigation.ts
Navigation items should use `.html` extensions:
```typescript
export const mainNavigation: NavItem[] = [
  { label: 'Scope', href: '/scope.html' },
  { label: 'Job Description', href: '/job-description.html' },
  // ...
];
```

### Header.tsx
The Header component should use plain `<a>` tags:
```tsx
<a href={item.href} className="...">
  {item.label}
</a>
```

This ensures proper navigation without client-side routing interference on GCS static hosting.
