# Website Performance Analyzer

A modern Next.js web application that analyzes website performance metrics. Uses Puppeteer for local development and provides realistic mock data for production deployment.

## 🚀 Features

- **Performance Analysis**: Analyze any website's performance metrics
- **Core Web Vitals**: Track First Contentful Paint (FCP), Largest Contentful Paint (LCP), and Cumulative Layout Shift (CLS)
- **Comprehensive Metrics**:
  - Load Time (First Contentful Paint)
  - Page Size (Total resource size)
  - HTTP Request Count
  - Performance Score (0-100)
- **Professional UI/UX**: Clean, responsive design with Tailwind CSS
- **Mobile Responsive**: Optimized for all device sizes
- **Error Handling**: Robust error handling with user-friendly messages
- **Input Validation**: Smart URL validation and normalization

## 🛠️ Technologies Used

- **Frontend**: Next.js 15 with React 19
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS 4
- **Performance Analysis**: Puppeteer (local development only)
- **Build Tool**: Next.js with Turbopack
- **API**: Next.js API Routes

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+ installed on your system
- npm, yarn, pnpm, or bun package manager

### 1. Clone the Repository

```bash
git clone <repository-url>
cd site-speed-inspector
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Install Puppeteer (Optional - Local Development Only)

For real performance analysis in local development:

```bash
npm install puppeteer
```

**Note**: Puppeteer will download Chromium (~100MB) during installation and only works in local development.

### 4. Start the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### 5. Open Your Browser

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🎯 Usage

1. **Enter a Website URL**: Input any website URL in the form field
2. **Click "Analyze"**: Start the performance analysis
3. **Wait for Results**: Analysis typically takes 5-15 seconds
4. **View Metrics**: Review comprehensive performance data including:
   - Overall Performance Score
   - Load Time (First Contentful Paint)
   - Page Size and Request Count
   - Core Web Vitals (LCP, CLS)

## 🌐 Production vs Development

### Local Development

- Uses **real Puppeteer analysis** with headless Chrome
- Provides **actual performance metrics** from target websites
- Requires Puppeteer installation

### Production (Vercel/Serverless)

- Uses **realistic mock data** based on website patterns
- Provides **simulated performance metrics** for demonstration
- No additional dependencies required

## 🏗️ Project Structure

````markdown
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

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
````
