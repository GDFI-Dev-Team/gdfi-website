# Guiuan Development Foundation, Inc. (GDFI) - Official Website

Welcome to the official repository for the GDFI website. This project is built on a **Jamstack architecture** using **Next.js (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

Instead of a traditional database, the application acts as a localized Headless CMS. Data is driven by flat Markdown files stored in the repository and managed via **Sveltia CMS**.

---

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Package Manager:** [PNPM](https://pnpm.io/)
- **Content Management:** [Sveltia CMS](https://sveltia.org/) (Git-based Markdown CMS)
- **Code Quality:** ESLint, Prettier, Husky, lint-staged

---

## 🛠 Prerequisites

Before you begin, make sure you have the following installed on your local machine:

- **Node.js**: `v20.x` or higher
- **PNPM**: `v8.x` or higher (`npm install -g pnpm`)

---

## 💻 Local Development Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/gdfi-website.git
   cd gdfi-website
   ```

2. **Install dependencies**
   We strictly use `pnpm` to respect the lockfile and manage dependencies efficiently.

   ```bash
   pnpm install
   ```

   _(Note: This will automatically trigger the `prepare` script to initialize Husky Git hooks)._

3. **Start the development server**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser. The server will hot-reload upon changes to both the `src/` codebase and the `content/` markdown directories.

4. **Test the production build locally**
   To verify that Static Site Generation (SSG) and Markdown ingestion work correctly:
   ```bash
   pnpm build
   pnpm start
   ```

---

## 📂 Project Structure

The codebase follows a modular, feature-driven architecture:

| Directory         | Purpose                                                                                                                           |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| `/content`        | **CMS Data Layer**: Contains all Markdown (`.md`) files that drive the site's content (Announcements, Programs, Personnel, etc.). |
| `/src/app`        | **Routing Layer**: Next.js App Router definitions, page generation, dynamic routing (`[slug]`), and SEO metadata.                 |
| `/src/components` | **Shared UI**: Strictly presentational, cross-feature components (e.g., `/layout` for Header/Footer, `/ui` for Buttons/Cards).    |
| `/src/features`   | **Domain Layer**: Encapsulated business logic and UI grouped by feature (e.g., `about-us`, `home`, `resources`).                  |
| `/src/lib`        | **Core Utilities**: Headless logic, including `/content` for Markdown parsing (`gray-matter`/`remark`) and pagination.            |

---

## 📝 Content Management & Markdown Workflow

This project does not use a runtime database. All dynamic content (Programs, Updates, Resources) is statically generated at build time from the `/content` directory.

### The Sveltia CMS Workflow

1. Content editors author articles via the **Sveltia CMS** admin interface.
2. Upon publishing, Sveltia commits the new/updated `.md` file directly to the `main` branch of this repository.
3. The Git push triggers a webhook to the hosting platform (e.g., Vercel).
4. The platform runs `pnpm build`, ingests the new Markdown files, generates the static HTML, and deploys the update with zero downtime.

> ⚠️ **Important:** Because content is baked into the static HTML at build time, **any manual updates to the Markdown files require a fresh build (`pnpm build`) to reflect in production.**

---

## ☁️ Production Deployment

The project is optimized for deployment on modern Git-integrated platforms like **Vercel** or **Netlify**.

### Standard Environment Configurations

Configure your hosting provider with the following build settings:

- **Framework Preset:** `Next.js`
- **Build Command:** `pnpm build`
- **Install Command:** `pnpm install`
- **Output Directory:** `.next`

### External Image Domains

If you are self-hosting or configuring strict network policies, note that `next.config.ts` whitelists the following remote patterns for Next.js Image Optimization:

- `pub-a32043e692ef4f1f91a01e5573fd355d.r2.dev` (Cloudflare R2 Storage)
- `img.youtube.com` (YouTube Video Thumbnails)

---

## 🛡 Code Quality & Git Hooks

To maintain high code quality and prevent broken builds in CI/CD, this repository utilizes **Husky** and **lint-staged**.

When you run `git commit`, Husky intercepts the commit and automatically runs the following on your _staged_ files:

- **TypeScript/JavaScript (`*.ts, *.tsx`)**: Runs `eslint --fix` and `prettier --write`.
- **Styles & Configs (`*.css, *.json, *.md`)**: Runs `prettier --write`.

If ESLint encounters an error it cannot automatically fix, the commit will be **aborted**. You must manually resolve the error before committing again.

### Manual Quality Commands

You can run these checks manually at any time:

```bash
# Run ESLint
pnpm lint

# Auto-fix ESLint errors
pnpm lint:fix

# Check Prettier formatting
pnpm format:check

# Auto-format all files
pnpm format
```
