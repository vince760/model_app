# ANA680 Project - Video Game Sales Prediction Platform

A full-stack monorepo application that predicts video game sales using machine learning. Built with a **Next.js frontend** for visualization and a **Python Flask backend API** for ML predictions.

## 📋 Overview

This project combines a modern React/Next.js UI with a scikit-learn based ML model to predict video game global sales based on platform, genre, and year. The frontend provides an interactive dashboard with charts and analytics, while the backend exposes a REST API for real-time predictions.

## 📁 Repository Structure

```
project/
├── frontend/                  # Next.js React application
│   ├── src/
│   │   ├── app/             # Next.js app router pages
│   │   ├── components/      # Reusable React components
│   │   ├── assets/          # Icons, logos, fonts
│   │   └── services/        # API services & utilities
│   ├── package.json
│   ├── tailwind.config.ts   # Tailwind CSS configuration
│   └── tsconfig.json
│
└── backend/                  # Flask Python API
    ├── api/
    │   └── app.py           # Main Flask application
    ├── data/
    │   └── vgsales.csv      # Video game sales dataset
    ├── train_model.py       # ML model training script
    ├── requirements.txt     # Python dependencies
    ├── Procfile             # Heroku deployment config
    └── model.pkl            # Trained ML model artifact
```

## 🔧 Prerequisites

### Frontend Requirements
- **Node.js** 18+ (recommended 20.x LTS)
- **npm** or **yarn** package manager

### Backend Requirements
- **Python** 3.12 (recommended)
- **pip** package manager

## 🚀 Quick Start (Both Services)

### Step 1: Install Dependencies

```bash
# Frontend setup
cd frontend
npm install

# Backend setup (from repo root)
cd ../backend
pip install -r requirements.txt
```

### Step 2: Start the Backend API

```bash
cd backend

# Create and activate virtual environment
python -m venv venv

# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Run Flask app (runs on http://localhost:5000)
python -m flask run
```

### Step 3: Start the Frontend (in a new terminal)

```bash
cd frontend
npm run dev
```

The application will be available at **http://localhost:3000**

---

## 📦 Backend Setup (Detailed)

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Create Virtual Environment

```bash
python -m venv venv
```

### 3. Activate Virtual Environment

**Windows:**
```bash
venv\Scripts\activate
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

### 5. Train the Model (Optional)

If you need to retrain the ML model from the dataset:

```bash
python train_model.py
```

This generates:
- `model.pkl` - Serialized trained model
- `metadata.pkl` - Model metadata

### 6. Run the Flask API

```bash
python -m flask run
```

The API runs on `http://localhost:5000`

**Available Endpoints:**
- `POST /predict` - Make predictions
- `GET /metadata` - Get model information
- `GET /health` - Health check

---

## 🎨 Frontend Setup (Detailed)

### 1. Navigate to Frontend Directory

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The page will auto-reload when you make changes.

### 4. Build for Production

```bash
npm run build
npm start
```

### 5. Run Linter

```bash
npm run lint
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.0.10 (React 19)
- **Styling**: Tailwind CSS 3.4.19
- **UI Components**: HeroUI 2.8.7
- **Charts**: ApexCharts 4.5.0
- **Language**: TypeScript 5
- **Build Tool**: Next.js (Webpack)

### Backend
- **Framework**: Flask 3.1.2
- **ML Library**: scikit-learn 1.6.1
- **Data Processing**: pandas 2.3.3, numpy 2.0.2
- **Server**: Gunicorn 23.0.0 (production)
- **CORS**: flask-cors 6.0.2
- **Language**: Python 3.12
- **Serialization**: joblib (model artifacts)

---

## 📊 Dataset

The project uses the **VGSales dataset** (`backend/data/vgsales.csv`) containing video game sales data:

**Key Features:**
- **Platform**: Gaming platform (PS4, Xbox, Nintendo, etc.)
- **Genre**: Game genre (Action, Sports, RPG, etc.)
- **Year**: Release year
- **Global_Sales**: Target variable (global sales in millions)

**Model Type:** Classification/Regression with scikit-learn pipeline

---

## 🌐 Deployment

### Deploy Backend to Heroku

From the project root:

```bash
git subtree push --prefix backend heroku master
```

The `Procfile` automatically configures the startup command.

### Deploy Frontend

The frontend can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Custom server**

Push the `frontend/` directory to your platform of choice.

---

## ⚙️ Environment Variables

### Backend
Create a `.env` file in `backend/` (optional):

```
FLASK_ENV=production
FLASK_DEBUG=false
FLASK_PORT=5000
```

### Frontend
Create a `.env.local` file in `frontend/` (optional):

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 🔄 API Communication

The frontend communicates with the backend via HTTP requests:

```typescript
// Example fetch from frontend
const response = await fetch('http://localhost:5000/predict', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    platform: 'PS4',
    genre: 'Action',
    year: 2020
  })
});
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Frontend won't connect to backend | Ensure backend is running on `http://localhost:5000` and check CORS settings |
| `ModuleNotFoundError` in backend | Activate virtual environment and run `pip install -r requirements.txt` |
| Model not found error | Run `python train_model.py` in backend directory |
| Port 3000 already in use (Frontend) | Run `npm run dev -- -p 3001` |
| Port 5000 already in use (Backend) | Modify Flask config or set `FLASK_PORT` environment variable |
| Build fails | Clear cache with `npm run build` or `npm cache clean --force` |

---

## 📝 Development Workflow

1. **Frontend changes**: Modify files in `frontend/src/` - Next.js dev server auto-reloads
2. **Backend changes**: Modify files in `backend/` - Flask must be manually restarted
3. **Model retraining**: Run `python train_model.py` when dataset changes
4. **Testing**: Frontend has `npm run lint`, add backend tests as needed

---

## 📄 License

Educational project for ANA680 Course

---

## 👤 Contact

For questions or issues, refer to individual `README.md` files in `frontend/` and `backend/` directories.
