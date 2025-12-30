# Deploy to Google Cloud Storage

Deploy the GTM AI & Ops app to Google Cloud Storage.

## Live URL

**Website:** http://gtm-ai-ops.storage.googleapis.com/

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
   Open http://gtm-ai-ops.storage.googleapis.com/ in your browser.

## Configuration Reference

- **GCP Project:** hg-ai-marketing-ops
- **Storage Bucket:** gtm-ai-ops
- **Region:** us-central1
- **Website Endpoint:** http://gtm-ai-ops.storage.googleapis.com/

## URLs

| Page | URL |
|------|-----|
| Home | http://gtm-ai-ops.storage.googleapis.com/ |
| Scope | http://gtm-ai-ops.storage.googleapis.com/scope/ |
| Job Description | http://gtm-ai-ops.storage.googleapis.com/job-description/ |
| Workflows | http://gtm-ai-ops.storage.googleapis.com/workflows/ |
| Collaboration | http://gtm-ai-ops.storage.googleapis.com/collaboration/ |
| Prioritization | http://gtm-ai-ops.storage.googleapis.com/prioritization/ |
| Escalations | http://gtm-ai-ops.storage.googleapis.com/escalations/ |

## Troubleshooting

If you get authentication errors, run:
```bash
gcloud auth login
gcloud config set project hg-ai-marketing-ops
```

## Note on URL Formats

- **Website endpoint** (recommended): `http://gtm-ai-ops.storage.googleapis.com/`
  - Supports navigation between pages
  - Auto-serves index.html for directories with trailing slash
  
- **API endpoint** (direct file access): `https://storage.googleapis.com/gtm-ai-ops/path/index.html`
  - Requires explicit `index.html` in URL
  - Navigation links may not work correctly
