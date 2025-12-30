# Deploy to Google Cloud Storage

Deploy the GTM AI & Ops app to Google Cloud Storage.

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

3. **Report the deployment URL**
   The site is available at: https://storage.googleapis.com/gtm-ai-ops/index.html

## Configuration Reference

- **GCP Project:** hg-ai-marketing-ops
- **Storage Bucket:** gtm-ai-ops
- **Region:** us-central1
- **Base Path:** /gtm-ai-ops (configured in next.config.ts)

## Troubleshooting

If you get authentication errors, run:
```bash
gcloud auth login
gcloud config set project hg-ai-marketing-ops
```

If assets don't load (400 errors), verify `basePath` in next.config.ts matches the bucket name.
