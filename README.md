This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Docker Setup

This project includes Docker and Docker Compose configuration for easy deployment and development.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Quick Start with Docker

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd 7luck-hotel
   ```

2. **Set up environment variables:**

   ```bash
   cp env.example .env.local
   # Edit .env.local and add your API keys and configuration
   ```

3. **Build and run with Docker Compose:**

   ```bash
   docker-compose up --build
   ```

4. **Access your application:**
   - Hotel Website: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin/dashboard
   - Database: PostgreSQL on port 5432
   - Redis: on port 6379

### Docker Services

- **app**: Next.js application (port 3000)
- **db**: PostgreSQL database (port 5432)
- **redis**: Redis cache (port 6379)

### Environment Variables

Copy `env.example` to `.env.local` and configure:

```bash
# Database
DATABASE_URL="postgresql://hotel_user:hotel_password@db:5432/hotel_db"

# Gemini AI API Key (for chatbot)
GEMINI_API_KEY="your-gemini-api-key-here"

# NextAuth.js (for authentication)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

### Development with Docker

For development with hot reload:

```bash
# Run in development mode
docker-compose -f docker-compose.dev.yml up

# Or mount source code for live editing
docker run -p 3000:3000 -v $(pwd):/app -w /app node:20-alpine npm run dev
```

### Production Deployment

```bash
# Build for production
docker-compose -f docker-compose.prod.yml up --build -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

### Database Migrations (if using Prisma)

```bash
# Run database migrations
docker-compose exec app npx prisma migrate deploy

# Generate Prisma client
docker-compose exec app npx prisma generate

# Seed database (if you have seed data)
docker-compose exec app npm run db:seed
```

### Prisma Setup (Local Development)

If running locally without Docker:

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up database:**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma migrate dev

   # (Optional) Open Prisma Studio
   npx prisma studio
   ```

3. **Available scripts:**
   ```bash
   npm run db:generate    # Generate Prisma client
   npm run db:migrate     # Run migrations
   npm run db:deploy      # Deploy migrations (production)
   npm run db:studio      # Open Prisma Studio
   npm run db:reset       # Reset database
   ```

## 🚀 CI/CD Pipeline

This project includes a comprehensive GitHub Actions CI/CD pipeline for automated testing and deployment.

### Pipeline Features

- **🔍 Code Quality**: ESLint, TypeScript checking, and build verification
- **🐳 Docker Build**: Multi-platform Docker image building (AMD64/ARM64)
- **📦 Registry Push**: Automated pushing to GitHub Container Registry
- **🚀 Deployment**: Automated deployment to staging/production environments
- **📢 Notifications**: Deployment status notifications

### Workflow Triggers

- **Push to `master`**: Triggers production deployment
- **Pull Requests**: Runs linting and testing

### Environment Variables Required

Add these secrets to your GitHub repository:

```bash
# Production Database
DATABASE_URL=postgresql://...

# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-domain.com

# AI Chatbot
GEMINI_API_KEY=your-gemini-api-key

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Payment Gateway (Optional)
STRIPE_SECRET_KEY=sk_live_...

# Docker Registry (for CI/CD)
DOCKER_USERNAME=your-github-username
DOCKER_PASSWORD=your-personal-access-token-with-packages-write-scope
```

### Deployment Commands

The pipeline automatically deploys when you:

1. **Push to `master` branch** → Production deployment
2. **Create a Pull Request** → Runs tests and linting

### Manual Deployment

```bash
# Deploy to production
git push origin master

# Check deployment status
# View GitHub Actions tab in your repository
```

### Docker Registry

Images are automatically pushed to **GitHub Container Registry**:

```bash
# GitHub Container Registry
ghcr.io/jobet1995/7luck-hotel:latest
ghcr.io/jobet1995/7luck-hotel:master
```

**Note for Organization Repositories:**
If this repository belongs to an organization, you need to:

1. **Create a Personal Access Token (PAT):**
   - Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Select scopes: ✅ `packages:write` and ✅ `repo` (for private repos)
   - Copy the generated token

2. **Add secrets to your repository:**
   - Go to repository Settings → Secrets and variables → Actions
   - Add `DOCKER_USERNAME` = your GitHub username
   - Add `DOCKER_PASSWORD` = your Personal Access Token

3. **Alternative:** Enable GITHUB_TOKEN permissions in repository settings if the organization allows it

### Troubleshooting

- **GHCR Permission Denied**: For organization repositories, use a Personal Access Token with `packages:write` scope instead of GITHUB_TOKEN
- **Port conflicts**: Change ports in `docker-compose.yml` if 3000, 5432, or 6379 are in use
- **Build issues**: Clear Docker cache with `docker system prune`
- **Database connection**: Ensure PostgreSQL container is fully started before the app container
