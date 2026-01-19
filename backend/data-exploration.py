from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent
csv_path = BASE_DIR / "data" / "vgsales.csv"

if not csv_path.exists():
    raise FileNotFoundError(f"Could not find: {csv_path.resolve()}")

print("Using CSV:", csv_path.resolve())

# Load
df = pd.read_csv(csv_path)

# Basic checks
print("\nShape (rows, cols):", df.shape)
print("\nColumns:", list(df.columns))

print("\nHead (first 10 rows):")
print(df.head(10))

print("\nTail (last 10 rows):")
print(df.tail(10))

print("\nDataFrame info:")
df.info()

print("\nMissing values per column:")
print(df.isnull().sum())

print("\nDescriptive stats (numeric columns):")
print(df.describe())


# Since we have missing data for year, and year is crucial for out prediction modeling we will drop rows with missing year values well leave publisher in there becuse 
# its not as important at the moment.
df = df.dropna(subset=['Year'])
print("\nMissing values per column:")
print(df.isnull().sum())


