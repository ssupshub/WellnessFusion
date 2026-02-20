# WellnessFusion 🍃

A modern holistic wellness ecosystem built with React (Vite), Express, Tailwind CSS, and Drizzle ORM.

## 🚀 Project Setup

This repository requires **Node.js 18+** to run correctly.

### 📥 Local Installation

1. **Verify installation:**

   ```sh
   node -v
   npm -v
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

### �️ Development & Build Config

To start the development server with Vite HMR:

```sh
npm run dev
```

To build the client and statically output to `dist`:

```sh
npm run build
```

---

## ☁️ Vercel Deployment

This project is configured out-of-the-box for **Vercel** with a split Serverless setup:

- The React SPA is built by Vite into the `dist` directory.
- The backend API is routed through `api/index.ts` natively using `@vercel/node`.

### Deploying to Vercel

1. Import the project in your Vercel dashboard.
2. Vercel will automatically detect **Vite** as the frontend framework.
3. The serverless functions configuration is pre-configured in `vercel.json` to seamlessly route `/api/(.*)` requests to the Express backend while falling back all frontend routes to `/dist/index.html`.

> **⚠️ CRITICAL WARNING FOR VERCEL DEPLOYMENT:**
> Currently, the API uses **In-Memory Storage (`server/storage.ts`)**. Because Vercel Serverless Functions spin up and down on demand, **all data (users, cart items, products) will be reset frequently.**
>
> To run this in production securely, you **must**:
>
> 1. Implement the Drizzle ORM PostgreSQL connection (`server/db.ts`).
> 2. Add a `DATABASE_URL` environment variable in your Vercel settings pointing to a remote PostgreSQL provider (e.g. Neon).
> 3. Implement hashing for user passwords.

---

## 🛠️ Advanced Linux VPS Setup (Optional)

If deploying to a traditional Ubuntu/Debian VPS (like AWS EC2 or DigitalOcean Droplet) using PM2 and Nginx instead of Vercel:

```bash
# 1. Update and install Node 18
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 2. Clone and install
git clone https://github.com/ssupshub/WellnessFusion.git
cd WellnessFusion/
npm install
npm run build

# 3. Setup PM2 for the backend
npm install -g pm2
pm2 start "npm run start" --name wellness-fusion

# 4. Configure Nginx
sudo apt install nginx -y
# Link your Nginx site configuration to point to localhost:5000
```
