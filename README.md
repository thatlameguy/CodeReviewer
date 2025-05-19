# CodeReviewer

An AI-powered automated code review platform that provides instant feedback on code quality, best practices, and potential improvements.

## Features

- Instant code reviews powered by Google's Generative AI (Gemini)
- Support for JavaScript and Python
- Detailed feedback on code quality, structure, performance, and security
- Actionable suggestions with code examples

## Quick Start

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Google Generative AI API key

### Backend Setup
```bash
cd backend
npm install
# Create .env file with GOOGLE_GEMINI_KEY=your_api_key_here
npm start
```

### Frontend Setup
```bash
cd frontend/vite-project
npm install
npm run dev
```

## Usage
1. Select language (JavaScript/Python)
2. Paste or write your code
3. Click "Review"
4. View detailed feedback and suggestions

## Project Structure
- `backend/`: Node.js/Express server with Gemini AI integration
- `frontend/`: React/Vite application with code editor

## Future Plans
- Support for additional programming languages
- CI/CD integration
- Customizable review criteria
