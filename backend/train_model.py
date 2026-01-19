from pathlib import Path
import pickle

import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder

BASE_DIR = Path(__file__).resolve().parent
csv_path = BASE_DIR / "data" / "vgsales.csv"

MODEL_PATH = BASE_DIR / "model.pkl"
META_PATH = BASE_DIR / "metadata.pkl"

def main():
    if not csv_path.exists():
        raise FileNotFoundError(f"Could not find dataset: {csv_path}")

    df = pd.read_csv(csv_path)

    # Keep only the important columns that will be used for modeling
    df = df[["Platform", "Genre", "Year", "Global_Sales"]].copy()

    # Clean Year and drop missing required fields
    df["Year"] = pd.to_numeric(df["Year"], errors="coerce")
    df = df.dropna(subset=["Year", "Platform", "Genre", "Global_Sales"]).copy()
    df["Year"] = df["Year"].astype(int)

    # Target: Hit if Global_Sales is greater than or equal to 1 million in sales
    df["Hit"] = (df["Global_Sales"] >= 1.0).astype(int)

    X = df[["Platform", "Genre", "Year"]]
    y = df["Hit"]

    # Train test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    # Preprocess categorical features
    categorical = ["Platform", "Genre"]
    numeric = ["Year"]

    preprocessor = ColumnTransformer(
        transformers=[
            ("cat", OneHotEncoder(handle_unknown="ignore"), categorical),
            ("num", "passthrough", numeric),
        ]
    )

    model = LogisticRegression(
        max_iter=2000,
        class_weight="balanced",
        n_jobs=None
    )
    # Pipeline is created for 1 hot encoding and model fitment
    pipeline = Pipeline(
        steps=[
            ("preprocess", preprocessor),
            ("model", model),
        ]
    )

    pipeline.fit(X_train, y_train)

    # Evaluate
    preds = pipeline.predict(X_test)
    acc = accuracy_score(y_test, preds)
    print(f"Accuracy: {acc:.4f}\n")
    print("Classification report:")
    print(classification_report(y_test, preds, digits=4))

    # Save model.pkl
    with open(MODEL_PATH, "wb") as f:
        pickle.dump(pipeline, f)
    print(f"\nSaved model to: {MODEL_PATH}")

    # Save metadata for dropdowns
    metadata = {
        "platforms": sorted(df["Platform"].dropna().unique().tolist()),
        "genres": sorted(df["Genre"].dropna().unique().tolist()),
        "year_min": int(df["Year"].min()),
        "year_max": int(df["Year"].max()),
        "hit_threshold_global_sales_millions": 1.0,
    }
    with open(META_PATH, "wb") as f:
        pickle.dump(metadata, f)
    print(f"Saved metadata to: {META_PATH}")

if __name__ == "__main__":
    main()
