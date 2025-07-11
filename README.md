# Website Performance Analyzer

A modern, responsive Next.js application that analyzes website performance using the **Google PageSpeed Insights API**, providing real-time insights into load time, page size, and Core Web Vitals.

> **Note**: Puppeteer was initially used for performance analysis during development, but due to incompatibility with Vercel’s serverless production environment, it was replaced with the Google PageSpeed API for stable deployment.

---

## 🚀 Features

- **Real-Time Analysis** using Google PageSpeed Insights API
- **Core Web Vitals**: FCP, LCP, and CLS metrics
- **Detailed Metrics**:
  - Load Time (FCP)
  - Page Size
  - HTTP Request Count
  - Performance Score (0–100)
- **Responsive UI** built with Tailwind CSS
- **Mobile-Optimized** for all device sizes
- **Robust Error Handling** and input validation

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **API Integration**: Google PageSpeed Insights
- **Build Tool**: Turbopack

---

## 🧠 AI-Assisted Development

This project was built using a modern AI-driven development process:

### Tools Used

- **GitHub Copilot** for intelligent code suggestions
- **Claude 4 Sonnet** for architecture planning and feature development
- **Google AI Studio (Gemini)** for requirement analysis

### Development Highlights

- **Requirement Breakdown** via Gemini
- **Feature Development** through iterative prompting with Claude
- **Full-Project Awareness** during complex integrations like:
  - PageSpeed API integration
  - UI component responsiveness
  - Error management strategies

---

## 🌐 Deployment Considerations

### Local Development

- Initially used **Puppeteer** with headless Chromium
- Provided real metrics directly from web pages
- Requires local installation and larger dependencies

### Production (Vercel)

- Switched to **Google PageSpeed API** due to Puppeteer’s incompatibility with Vercel’s serverless environment
- Delivers reliable, scalable analysis with minimal setup

---

## 📦 Usage

1. Enter a website URL
2. Click “Analyze”
3. Wait ~5–15 seconds
4. View performance metrics and Core Web Vitals

---

## 📁 Project Setup

# 1. Clone the repository

git clone https://github.com/Sakar195/site-perfomance-analyzer.git

cd site-perfomance-analyzer

# 2. Install dependencies

npm install

# 3. Start the development server

npm run dev

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Deployed on Vercel

This project is deployed on [Vercel](https://vercel.com), optimized for serverless performance.
