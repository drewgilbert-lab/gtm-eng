# Deploy to Google Cloud Storage

Deploy the marketing-viz-app to Google Cloud Storage.

## Instructions

Execute these steps in order:

1. **Build the static site**
   ```bash
   cd /Users/drew.gilbert/Documents/Marketing\ Process/marketing-viz-app && npm run build
   ```

2. **Upload to Google Cloud Storage**
   ```bash
   cd /Users/drew.gilbert/Documents/Marketing\ Process/marketing-viz-app && gcloud storage cp -r out/* gs://hg-ai-marketing-ops-static/
   ```

3. **Report the deployment URL**
   The site is available at: https://storage.googleapis.com/hg-ai-marketing-ops-static/index.html

## Configuration Reference

- **GCP Project:** hg-ai-marketing-ops
- **Storage Bucket:** hg-ai-marketing-ops-static
- **Region:** us-central1
- **Base Path:** /hg-ai-marketing-ops-static (configured in next.config.ts)

## Troubleshooting

If you get authentication errors, run:
```bash
gcloud auth login
gcloud config set project hg-ai-marketing-ops
```

If assets don't load (400 errors), verify `basePath` in next.config.ts matches the bucket name.
