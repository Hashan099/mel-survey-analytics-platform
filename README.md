# MEL-NLD — Monitoring, Evaluation & Learning Platform

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React 18](https://img.shields.io/badge/React-18-blue?style=flat&logo=react)](https://react.dev/)
[![SurveyJS](https://img.shields.io/badge/SurveyJS-Core%20%7C%20Creator%20%7C%20Analytics-green?style=flat)](https://surveyjs.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase Auth](https://img.shields.io/badge/Firebase-Authentication-FFCA28?style=flat&logo=firebase)](https://firebase.google.com/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **National Languages Division (NLD)**  
> **Ministry of Public Administration, Home Affairs, Provincial Councils and Local Government, Sri Lanka**

A full-stack enterprise web application built for the **National Languages Division (NLD)** under the Ministry of Public Administration in Sri Lanka. The platform digitizes and automates the end-to-end **Monitoring, Evaluation & Learning (MEL)** lifecycle for Official Languages Policy (OLP) compliance, public service bilingual capacity training (Sinhala & Tamil), and citizen front-office service evaluations across Sri Lanka's **9 Provinces** and **331+ Divisional Secretariats**.

---

## 🌟 Interactive Portfolio Demo (No Cloud Setup Required)

If you are evaluating this repository for portfolio review or testing, the application includes a **zero-config Demo Mode**:

1. Clone and install dependencies:
   ```bash
   git clone https://github.com/Hashan099/mel-survey-analytics-platform.git
   cd mel-survey-analytics-platform
   npm install
   ```
2. Start the local development server:
   ```bash
   npm run dev
   ```
3. Visit [http://localhost:3000/auth/login](http://localhost:3000/auth/login)
4. Click the **Auto-fill** button (or enter credentials):
   - **Username**: `superadmin`
   - **Password**: `admin`
5. Explore the pre-seeded Sri Lankan administrative dataset:
   - 📝 **Survey Form (`/survey`)**: Interactive multi-page language evaluation survey with rating scales and matrix questions.
   - 📊 **Visual Analytics (`/survey/surveyAnalytics`)**: Dynamic SurveyJS visualization panel displaying percentage charts and response breakdowns.
   - 📋 **Data Table (`/survey/tabulator`)**: Searchable, filterable, sortable Datatables view with column reordering.
   - 🛠️ **Survey Designer (`/survey/editor`)**: Drag-and-drop SurveyJS Creator question designer.

---

## 🏛️ Background & Purpose

The **National Languages Division (NLD)** coordinates the implementation of Sri Lanka's Official Languages Policy, ensuring that public administration services are delivered equitably in both Sinhala and Tamil. 

### Key Objectives:
- **Language Training Evaluation**: Assessing the impact of second-language competency training conducted by the National Institute of Language Education and Training (NILET) for public sector officers.
- **Counter Service Monitoring**: Tracking whether Divisional Secretariats and District Secretariats provide adequate bilingual front-desk citizen services.
- **Policy Compliance Tracking**: Moving away from fragmented paper surveys and spreadsheets into a unified cloud-native analytics dashboard.

---

## ✨ Features

- 🔐 **Authentication & Session Persistence**: Secure email/password login and registration powered by **Firebase Authentication** with server-side token verification using the **Firebase Admin SDK**.
- 📝 **Dynamic Survey Engine**: Multi-page, conditional-logic surveys built with **SurveyJS React UI** with auto-save progress preservation in `localStorage`.
- 🛠️ **Visual Survey Creator**: Integrated **SurveyJS Creator** widget allowing administrators to build, modify, and preview questions via drag-and-drop.
- 📊 **Visual Analytics & Charting**: Comprehensive response visualization with **SurveyJS Analytics** and **Chart.js** displaying histograms, percentage bars, and satisfaction ratings.
- 📋 **Tabulator & DataTables**: Interactive response tables with column reordering, instant search, pagination, and multi-format export capabilities.
- 🗄️ **Three-Tier Database Architecture**: MongoDB Atlas connection manager with isolated connection pools for **Admin**, **ReadWrite**, and **ReadOnly** roles.
- 🛡️ **Route Guards**: Client-side authentication wrappers (`<Protected>`) preventing unauthorized access to internal dashboards.

---

## 🛠 Tech Stack

| Domain | Technology | Purpose |
|---|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) | Full-stack React framework with SSR and API routes |
| **Frontend** | [React 18](https://react.dev/) + [Tailwind CSS](https://tailwindcss.com/) | Component library, UI styling, and responsive layout |
| **UI Components** | MUI Joy + Flowbite React + React Icons | Polished user interface and dashboard widgets |
| **Survey Engine** | [SurveyJS Core & React UI](https://surveyjs.io/) | Interactive questionnaire renderer |
| **Survey Creator**| [SurveyJS Creator](https://surveyjs.io/create-survey) | Drag-and-drop visual survey builder |
| **Analytics** | [SurveyJS Analytics](https://surveyjs.io/analytics) + [Chart.js](https://www.chartjs.org/) | Data visualization, breakdown charts, and metrics |
| **Tables** | DataTables + ColReorder + Buttons | Advanced tabular data display and manipulation |
| **Authentication**| [Firebase Auth](https://firebase.google.com/docs/auth) + Admin SDK | Client authentication and server JWT verification |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/atlas) | Document store for surveys, questions, and responses |
| **HTTP Client** | [Axios](https://axios-http.com/) | Client-server API communication |

---

## 📁 Project Structure

```
mel-nld/
├── app/
│   ├── api/                          # Next.js App Router API endpoints
│   │   ├── auth/                     # Login, register, and session endpoints
│   │   ├── survey/questions/         # Survey questions GET / POST
│   │   ├── survey/responses/         # Survey responses GET / POST
│   │   ├── count/                    # Submission count endpoint
│   │   └── provinces/                # Sri Lankan provinces & secretariats API
│   ├── auth/
│   │   ├── login/                    # Login page with demo bypass auto-fill
│   │   └── register/                 # Officer registration page
│   ├── survey/
│   │   ├── page.jsx                  # Main public officer survey form
│   │   ├── editor/                   # Admin survey designer (SurveyJS Creator)
│   │   ├── surveyAnalytics/          # SurveyJS visualization dashboard
│   │   └── tabulator/                # Datatables tabular viewer
│   ├── Components/                   # Shared UI (Navbar, Modals, Spinners, Hero)
│   ├── chart.js/                     # Custom Chart.js components
│   ├── layout.jsx                    # Root layout with NLD branding & AuthProvider
│   └── page.jsx                      # Home dashboard launchpad
├── Contexts/
│   ├── AuthContext.jsx               # Auth state, persistence, superadmin demo flag
│   └── Protected.jsx                 # Client-side protected route wrapper
├── Firebase/
│   ├── config.js                     # Client Firebase SDK initialization
│   └── firebaseAdmin.js              # Server-side Firebase Admin SDK
├── mongodb/
│   └── mongodb.js                    # Multi-client MongoDB Atlas pool manager
├── SurveyConfigs/
│   ├── DemoSurvey.js                 # Pre-seeded Sri Lankan NLD survey definition
│   ├── DemoResponses.js              # 20 realistic participant response records
│   └── Fallback.js                   # Static fallback survey schema
├── .env.example                      # Template for environment variables
└── README.md                         # Project documentation
```

---

## 🚀 Full Production Setup (With Your Own Backend)

To connect this application to your own live Firebase and MongoDB Atlas backends:

### 1. Prerequisites
- **Node.js** v20.16.0 or higher
- A **Firebase Project** with Email/Password Authentication enabled
- A **MongoDB Atlas Cluster**

### 2. Environment Variables Configuration
Copy the template file:
```bash
cp .env.example .env.local
```

Populate the required credentials in `.env.local`:

```env
# Firebase Client SDK (Firebase Console > Project Settings > General)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Dev Superadmin Bypass (Development Only)
NEXT_PUBLIC_DEV_SUPERADMIN_USER=superadmin
NEXT_PUBLIC_DEV_SUPERADMIN_PASS=admin

# Firebase Admin SDK (Firebase Console > Project Settings > Service Accounts)
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project_id.iam.gserviceaccount.com
FIREBASE_ADMIN_CLIENT_ID=your_client_id

# MongoDB Atlas URIs (Database > Connect > Drivers)
MONGODB_ADMIN_URI="mongodb+srv://admin:pass@cluster.mongodb.net/?retryWrites=true&w=majority"
MONGODB_READ_ONLY_URI="mongodb+srv://readonly:pass@cluster.mongodb.net/?retryWrites=true&w=majority"
MONGODB_READ_AND_WRITE_URI="mongodb+srv://readwrite:pass@cluster.mongodb.net/?retryWrites=true&w=majority"
```

### 3. Build & Run
```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 🔌 API Endpoints Summary

| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `POST` | `/api/auth/login` | Validates Firebase user token and initiates session | Yes |
| `POST` | `/api/auth/register` | Creates a new user profile record | Yes |
| `POST` | `/api/auth/logout` | Terminates authenticated session | Yes |
| `GET` | `/api/survey/questions` | Retrieves active survey JSON schema | Yes (or Demo Header) |
| `POST` | `/api/survey/questions` | Updates survey schema via Survey Creator | Yes (or Demo Header) |
| `GET` | `/api/survey/responses` | Retrieves all submitted survey responses | Yes (or Demo Header) |
| `POST` | `/api/survey/responses` | Submits a completed officer survey | Yes (or Demo Header) |
| `GET` | `/api/count` | Returns the count of submitted surveys | No |
| `GET` | `/api/provinces` | Returns Sri Lankan provinces and secretariats | No |

---

## 🔒 Security & Privacy

- **Credential Isolation**: All live secrets (`.env.local` and `Secrets/`) are strictly ignored via `.gitignore` to prevent credential leakage.
- **Dual-Token Validation**: Protected API routes verify incoming Firebase ID Tokens before processing sensitive database operations.
- **Role Isolation**: MongoDB operations use least-privilege connection strings (read-only for viewing, read-write for submission).

---

## 📜 Authors & Acknowledgments

- **Internship Project**: Developed as a software engineering contribution for the **National Languages Division (NLD)**, Ministry of Public Administration, Home Affairs, Provincial Councils and Local Government, Sri Lanka.
- **Repository Maintainer**: [Hashan](https://github.com/Hashan099)
