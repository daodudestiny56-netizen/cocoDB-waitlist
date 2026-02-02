# CocoDB Waitlist

A high-performance landing page for CocoDB, a managed serverless Postgres platform. This project serves as the public entry point for user interest registration and email capture.

## Project Overview

CocoDB is marketed as an affordable, serverless Postgres solution offering true isolation and zero-ops architecture. The landing page captures user interest through an email waitlist form.

## Tech Stack

- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend/Auth**: Cocobase SDK

## Key Features

- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewports.
- **Modern User Interface**: Uses gradient text, smooth transitions, and a dark mode aesthetic.
- **Waitlist Integration**: Captures user emails and secures them using Cocobase Authentication.
- **Form Validation**: Includes comprehensive error handling for invalid emails, duplicates, and network issues.

## Project Structure

- `src/components/Hero.jsx`: Main landing component containing the value proposition and signup form.
- `src/components/Footer.jsx`: Standard footer with social links and copyright.
- `src/config/cocobase.js`: Centralized configuration for the Cocobase SDK.
- `src/assets/`: Contains project static assets like the logo.

## Setup Instructions

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure environment variables:
   Create a `.env` file in the root directory with the following keys:

   - `VITE_COCOBASE_API_KEY`
   - `VITE_COCOBASE_PROJECT_ID`
   - `VITE_COCOBASE_BASE_URL`

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Security

This project enforces strict security practices:

- No hardcoded API credentials.
- Environment variables are required for all sensitive configuration.
- Dependencies are audited for vulnerabilities.
