# S3 Image Upload System — Technical Documentation

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Dependencies](#2-dependencies)
3. [Environment Configuration](#3-environment-configuration)
4. [S3 Bucket Setup](#4-s3-bucket-setup)
5. [Upload Flow](#5-upload-flow)
6. [Server-Side Implementation](#6-server-side-implementation)
7. [Client-Side Component](#7-client-side-component)
8. [Next.js Image Configuration](#8-nextjs-image-configuration)
9. [Deletion Flow](#9-deletion-flow)
10. [Security Considerations](#10-security-considerations)
11. [Error Handling](#11-error-handling)

---

## 1. Architecture Overview

This project uses a **presigned URL upload pattern**. The AWS credentials never leave the server — the browser uploads files directly to S3 using a short-lived, scoped URL issued by a Next.js Server Action.

```
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER (Client)                         │
│                                                                 │
│   ImageUpload Component                                         │
│   ┌───────────────────────────────────┐                         │
│   │ 1. User drops / selects a file    │                         │
│   │ 2. Calls getPresignedUrl()        │ ──── Server Action ──►  │
│   │    (Server Action RPC)            │                         │
│   │ 3. Receives { signedUrl,          │ ◄─── { signedUrl,       │
│   │    publicUrl, key }               │      publicUrl, key }   │
│   │ 4. PUT file directly to S3        │ ──── PUT ──────────►    │
│   │    using signedUrl                │          AWS S3         │
│   │ 5. Stores publicUrl in state      │                         │
│   └───────────────────────────────────┘                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    NEXT.JS SERVER (Server Action)               │
│                                                                 │
│   getPresignedUrl(fileType, fileSize, folder)                   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ • Validate MIME type against allowlist                  │   │
│   │ • Validate file size ≤ 5 MB                             │   │
│   │ • Sanitize folder name                                  │   │
│   │ • Generate unique key: {folder}/{uuid}.{ext}            │   │
│   │ • Call S3 PutObjectCommand via @aws-sdk/s3-presigner    │   │
│   │ • Return signed URL (60 s TTL) + permanent public URL   │   │
│   └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Key Design Decisions

| Decision | Rationale |
|---|---|
| Presigned URLs over server-side proxy | Avoids streaming file bytes through the Next.js server, reducing memory pressure and egress costs |
| `'use server'` directive | Ensures AWS credentials are only used in a Node.js runtime, never bundled into client JS |
| UUID-based file names | Prevents filename collisions and blocks path traversal / overwrite attacks |
| 60-second expiry on signed URLs | Minimises the window during which a leaked URL can be abused |
| Server-side MIME + size validation | Client-side validation is easily bypassed; the server is the authoritative gate |

---

## 2. Dependencies

```json
"@aws-sdk/client-s3": "^3.1007.0",
"@aws-sdk/s3-request-presigner": "^3.1007.0"
```

Both packages belong to the **AWS SDK for JavaScript v3** modular family.  
`react-dropzone` is used in the UI component to handle drag-and-drop.

---

## 3. Environment Configuration

Add the following variables to your `.env.local` file (never commit this file):

```env
# ─── AWS Credentials ─────────────────────────────────────────────
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_REGION=us-east-1
AWS_BUCKET_NAME=your-bucket-name
```

> [!IMPORTANT]
> The module `lib/s3-actions.ts` validates all four variables **at startup**. If any are missing the server will throw and refuse to start:
>
> ```ts
> for (const key of requiredEnvVars) {
>   if (!process.env[key]) {
>     throw new Error(`Missing required environment variable: ${key}`);
>   }
> }
> ```

### Docker / CI

Pass these as Docker secrets or CI environment variables — **not** as build args (build args are baked into the image layer and visible in `docker history`).

```yaml
# docker-compose.yml example
services:
  web:
    env_file:
      - .env.local
```

---

## 4. S3 Bucket Setup

### 4.1 Recommended Bucket Settings

| Setting | Value | Reason |
|---|---|---|
| Block all public access | **OFF** for objects served publicly | Blog cover images must be publicly readable |
| Versioning | Optional — enable for production | Allows rollback of accidentally overwritten files |
| Server-side encryption | SSE-S3 (AES-256) | Encrypts objects at rest with no cost overhead |
| Object ownership | Bucket owner enforced | Prevents ACL-based permission confusion |

### 4.2 Bucket Policy

Attach the following resource-based policy to allow public read on all objects while restricting write access to your IAM user/role only:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
    }
  ]
}
```

> The write access is NOT granted here — this keeps public users read-only. Writes are controlled exclusively by the IAM identity used by the application.

### 4.3 CORS Configuration

The browser performs a direct `PUT` request to S3. CORS must be enabled on the bucket to allow this from your domain:

```json
[
  {
    "AllowedHeaders": ["Content-Type"],
    "AllowedMethods": ["PUT"],
    "AllowedOrigins": [
      "http://localhost:3000",
      "https://your-production-domain.com"
    ],
    "ExposeHeaders": [],
    "MaxAgeSeconds": 3000
  }
]
```

> [!WARNING]
> Do **not** use `"AllowedOrigins": ["*"]` in production. Wildcard origins allow any website to PUT objects to your bucket using a valid presigned URL, enabling content injection attacks.

### 4.4 IAM Policy for the Application User

Create a dedicated IAM user (or role for EC2/ECS) with the minimum required permissions. Do not use your root account or an admin user:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowPresignedPut",
      "Effect": "Allow",
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
    },
    {
      "Sid": "AllowDeleteBlogObjects",
      "Effect": "Allow",
      "Action": "s3:DeleteObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/blog/*"
    }
  ]
}
```

The `DeleteObject` permission is scoped to `blog/*` because the server-side guard in `deleteS3Object` also enforces this prefix before executing the delete command.

### 4.5 Folder Structure Inside the Bucket

```
YOUR_BUCKET_NAME/
└── blog/
    ├── {uuid}.jpg        ← default: getPresignedUrl(type, size, 'blog')
    ├── main/
    │   └── {uuid}.jpg    ← blog post cover images
    ├── authors/
    │   └── {uuid}.jpg    ← author profile pictures
    └── content/
        └── {uuid}.webp   ← inline images in article body
```

Folder names are passed as the `folder` parameter to `getPresignedUrl`. They are sanitised server-side to `[a-zA-Z0-9-_]` before being used as a key prefix.

---

## 5. Upload Flow

### Step-by-step sequence

```
Browser                     Next.js Server Action         AWS S3
   │                                │                        │
   │  1. onDrop(file)               │                        │
   │─────────────────────────────►  │                        │
   │  getPresignedUrl(              │                        │
   │    file.type,                  │                        │
   │    file.size,                  │                        │
   │    'blog'                      │                        │
   │  )                             │                        │
   │                                │  2. Validate type      │
   │                                │     Validate size      │
   │                                │     Sanitize folder    │
   │                                │     Build key:         │
   │                                │     blog/{uuid}.jpg    │
   │                                │                        │
   │                                │  3. PutObjectCommand   │
   │                                │─────────────────────►  │
   │                                │  ◄── signed URL (60s)  │
   │                                │                        │
   │  4. { signedUrl, publicUrl,    │                        │
   │       key }                    │                        │
   │  ◄─────────────────────────────│                        │
   │                                │                        │
   │  5. fetch(signedUrl, {         │                        │
   │       method: 'PUT',           │                        │
   │       body: file,              │                        │
   │       headers: {               │                        │
   │         Content-Type: type     │                        │
   │       }                        │                        │
   │     })                         │                        │
   │────────────────────────────────────────────────────►    │
   │                                │                        │
   │                                │           200 OK ◄───  │
   │  6. Store publicUrl in state   │                        │
   │     (and eventually in DB)     │                        │
```

### Presigned URL anatomy

A generated presigned URL looks like:

```
https://YOUR_BUCKET.s3.amazonaws.com/blog/550e8400-e29b-41d4-a716-446655440000.jpg
  ?X-Amz-Algorithm=AWS4-HMAC-SHA256
  &X-Amz-Credential=AKID%2F20260313%2Fus-east-1%2Fs3%2Faws4_request
  &X-Amz-Date=20260313T120000Z
  &X-Amz-Expires=60
  &X-Amz-SignedHeaders=content-type%3Bhost
  &X-Amz-Signature=<hex-signature>
```

Key parameters:
- `X-Amz-Expires=60` — The URL is valid for exactly 60 seconds from generation.
- `X-Amz-SignedHeaders=content-type;host` — The `Content-Type` header **must** match what was declared when generating the URL. Attempting to upload a different MIME type will return `403 Forbidden`.

---

## 6. Server-Side Implementation

**File:** [lib/s3-actions.ts](../lib/s3-actions.ts)

### `getPresignedUrl(fileType, fileSize, folder?)`

```ts
export async function getPresignedUrl(
  fileType: string,   // e.g. 'image/jpeg'
  fileSize: number,   // bytes
  folder: string = 'blog'
): Promise<{ signedUrl: string; publicUrl: string; key: string }>
```

**Validation pipeline:**

1. `ALLOWED_TYPES` check — rejects anything not in `{ image/jpeg, image/png, image/webp, image/gif }`
2. `MAX_FILE_SIZE` check — rejects files larger than **5 MB** (5 × 1024 × 1024 bytes)
3. `sanitizeFolder` — strips characters outside `[a-zA-Z0-9-_]` from the folder name
4. UUID generation — `crypto.randomUUID()` ensures collision-resistant, unpredictable object keys
5. 60-second TTL — limits the exposure window of the signed URL

**Return value:**

| Property | Description |
|---|---|
| `signedUrl` | Temporary PUT URL with embedded signature. Used once by the browser. |
| `publicUrl` | Permanent `https://BUCKET.s3.amazonaws.com/KEY` URL. Store this in the database. |
| `key` | The S3 object key (e.g. `blog/550e8400....jpg`). Useful for later deletion. |

### Constants

```ts
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB — exported for reuse in client-side validation
```

Exporting `MAX_FILE_SIZE` allows the client component to show an early rejection message without a server round-trip.

---

## 7. Client-Side Component

**File:** [examples/image-upload.tsx](../examples/image-upload.tsx)

`ImageUpload` is a controlled React component built on top of `react-dropzone`.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Visible field label |
| `value` | `ImageFile[]` | `[]` | Controlled list of uploaded images |
| `onChange` | `(images: ImageFile[]) => void` | — | Called after every add/remove |
| `multiple` | `boolean` | `false` | Allow picking more than one file |
| `disableMetadata` | `boolean` | `false` | Hides alt-text / title / caption inputs |

### `ImageFile` type

```ts
interface ImageFile {
  id?: string;       // DB row ID (present after saving)
  url: string;       // S3 public URL
  altText?: string;  // Accessibility description
  title?: string;
  caption?: string;
  description?: string;
  file?: File;       // Raw File object (present before saving to DB)
}
```

### Upload sequence in the component

```ts
// 1. Server Action call
const { signedUrl, publicUrl } = await getPresignedUrl(file.type);

// 2. Direct PUT to S3 — credentials never leave the server
await fetch(signedUrl, {
  method: 'PUT',
  body: file,
  headers: { 'Content-Type': file.type },
});

// 3. Append to controlled value
onChange([...value, { url: publicUrl, altText: '', ... }]);
```

### Metadata modal

When `disableMetadata` is `false` (the default), each uploaded image shows an **Edit** button that opens a modal for:
- `altText` — required for accessibility (a `MISSING ALT` badge appears when empty)
- `title`
- `caption`
- `description`

---

## 8. Next.js Image Configuration

**File:** [next.config.ts](../next.config.ts)

Next.js's `<Image />` component requires an explicit allowlist of external hostnames to prevent open-redirect image proxying:

```ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '*.s3.amazonaws.com',  // Covers all S3 regional endpoints
    },
    // ... other patterns
  ],
}
```

> [!NOTE]
> The wildcard `*.s3.amazonaws.com` is intentionally broad to support multi-region deployments. If the bucket region is fixed, you can narrow this to `YOUR_BUCKET_NAME.s3.amazonaws.com` or `YOUR_BUCKET_NAME.s3.REGION.amazonaws.com`.

> [!IMPORTANT]
> Restart the development server after changing `next.config.ts`. The image optimiser reads this config at startup.

---

## 9. Deletion Flow

**Function:** `deleteS3Object(urlOrKey: string)` in [lib/s3-actions.ts](../lib/s3-actions.ts)

```
Blog post deleted
       │
       ▼
deleteS3Object(publicUrl)
       │
       ├─ Parse URL → extract path as S3 key
       │    e.g. "https://bucket.s3.amazonaws.com/blog/uuid.jpg"
       │    → key = "blog/uuid.jpg"
       │
       ├─ Guard: key must start with "blog/"
       │    (prevents deleting arbitrary bucket objects)
       │
       └─ Send DeleteObjectCommand to S3
```

The path guard (`key.startsWith('blog/')`) is a **server-side defence-in-depth** measure. Even if a malformed or attacker-supplied URL were passed in, the function refuses to delete anything outside the `blog/` prefix.

---

## 10. Security Considerations

### OWASP Top 10 Mapping

| Risk | Mitigation in this system |
|---|---|
| **A01 Broken Access Control** | IAM policy restricts writes to the application identity only; deletion is further scoped to `blog/*`; folder names are sanitised to prevent path traversal |
| **A02 Cryptographic Failures** | Presigned URLs use HMAC-SHA256 (SigV4); credentials are server-only; SSE-S3 encrypts data at rest |
| **A03 Injection** | `sanitizeFolder` strips all special characters; UUID keys prevent user-controlled filenames; `ALLOWED_TYPES` prevents MIME injection |
| **A05 Security Misconfiguration** | CORS `AllowedOrigins` must list explicit domains; bucket does not grant write to `Principal: "*"`; env vars are validated at startup |
| **A07 Auth Failures** | The Server Action is the only path to obtain a signed URL; no credentials are exposed client-side |
| **A10 SSRF** | Presigned URL PUT goes to `*.amazonaws.com` — an AWS-controlled domain, not an arbitrary user-supplied URL |

### Additional Notes

- **Signed URL expiry (60 s):** A leaked URL (e.g. via browser history or network logs) becomes useless within one minute. Reduce to 30 s if your upload UX can tolerate it.
- **Content-Type enforcement:** SigV4 signs the `Content-Type` header, so an attacker cannot upload an executable disguised as an image by changing the header after the URL is issued.
- **No server-side byte inspection:** The system trusts the MIME type declared by the client. For a higher-security context, add a virus scan (e.g. ClamAV via S3 Event Notifications → Lambda) or validate magic bytes server-side before issuing the signed URL.
- **File size:** S3 does not enforce a maximum object size for presigned PUTs. The 5 MB limit is enforced by the server before issuing the URL. If a client bypasses the Server Action and constructs its own signed URL, this guard is skipped — mitigated by the IAM policy restricting who can generate signed URLs.

---

## 11. Error Handling

### Server Action errors

| Condition | Error message | HTTP equivalent |
|---|---|---|
| Unsupported MIME type | `'Invalid file type'` | 400 |
| File exceeds 5 MB | `'File too large'` | 413 |
| Missing env vars | `'Missing required environment variable: X'` | 500 (startup crash) |
| Key outside `blog/` | `'Invalid key path'` | 400 |

### Client-side error handling

The `ImageUpload` component wraps the upload in a try/catch. On failure it:
1. Logs to `console.error`
2. Shows an `alert('Error uploading image')` to the user

For production, replace the `alert` with a toast notification tied to your UI library.

### S3 errors to monitor

| Error code | Likely cause |
|---|---|
| `403 Forbidden` on PUT | CORS origin not whitelisted, or `Content-Type` header mismatch |
| `403 Forbidden` on GET | Bucket public access is blocked or bucket policy is missing |
| `400 Bad Request` | Presigned URL has expired (> 60 s elapsed) |
| `EntityTooLarge` | Object exceeds S3 bucket upload limit (5 GB for standard PUT) |
