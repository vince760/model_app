from pathlib import Path
import pickle

import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS
import re

BASE_DIR = Path(__file__).resolve().parents[1]
MODEL_PATH = BASE_DIR / "model.pkl"
META_PATH = BASE_DIR / "metadata.pkl"

app = Flask(__name__)
CORS(app, origins=[
    re.compile(r"^https://model-app-.*-vince760s-projects\.vercel\.app$"),
    "http://localhost:3000",
])

# Load artifacts once at startup
if not MODEL_PATH.exists():
    raise FileNotFoundError(f"Missing model file: {MODEL_PATH}")
if not META_PATH.exists():
    raise FileNotFoundError(f"Missing metadata file: {META_PATH}")

with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)

with open(META_PATH, "rb") as f:
    meta = pickle.load(f)   # renamed (was `metadata`)
    

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"ok": True})

@app.route("/metadata", methods=["GET"])
def get_metadata():
    y_min = meta.get("year_min")
    y_max = meta.get("year_max")
    years = []
    if y_min is not None and y_max is not None:
        years = list(range(int(y_min), int(y_max) + 1))

    platforms = meta.get("platforms") or meta.get("Platform") or []
    genres = meta.get("genres") or meta.get("Genre") or []

    return jsonify({
        "years": list(years),
        "platforms": list(platforms),
        "genres": list(genres),
    })

@app.route("/predict", methods=["POST"])
def predict():
    payload = request.get_json(silent=True) or {}

    platform = payload.get("platform")
    genre = payload.get("genre")
    year = payload.get("year")

    missing = [k for k in ("platform", "genre", "year") if payload.get(k) is None]
    if missing:
        return jsonify({"error": f"Missing required fields: {', '.join(missing)}"}), 400

    try:
        year = int(year)
    except Exception:
        return jsonify({"error": "year must be an integer"}), 400

    X = pd.DataFrame([{
        "Platform": str(platform),
        "Genre": str(genre),
        "Year": year,
    }])

    pred = int(model.predict(X)[0])
    proba_hit = float(model.predict_proba(X)[0][1]) if hasattr(model, "predict_proba") else None

    year_min = int(meta.get("year_min", year))
    year_max = int(meta.get("year_max", year))
    out_of_range = bool(year < year_min or year > year_max)

    return jsonify({
        "hit": bool(pred),
        "probability_hit": proba_hit,
        "label": "Hit (>= 1M Global Sales)" if pred == 1 else "Not Hit (< 1M Global Sales)",
        "inputs": {"platform": platform, "genre": genre, "year": year},
        "training_year_range": {"min": year_min, "max": year_max},
        "year_out_of_training_range": out_of_range,
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)