import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  SharedSelection,
} from "@heroui/react";
import React from "react";

type Meta = { years: string[]; platforms: string[]; genres: string[] };
type PredictResponse = {
  hit: boolean;
  label: string;
  probability_hit: number | null;
  inputs: { year: number; platform: string; genre: string };
  training_year_range: { min: number; max: number };
  year_out_of_training_range: boolean;
};

export function AccuracyCard({ accuracy }: { accuracy: string }) {
  const [meta, setMeta] = React.useState<Meta | null>(null);
  const [selectedYear, setSelectedYear] = React.useState(new Set(["Year"]));
  const [selectedPlatform, setSelectedPlatform] = React.useState(
    new Set(["Platform"]),
  );
  const [selectedGenre, setSelectedGenre] = React.useState(new Set(["Genre"]));
  const [result, setResult] = React.useState<PredictResponse | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.API_BASE}metadata`);
      if (!res.ok) throw new Error("Failed to load metadata");
      setMeta(await res.json());
    })().catch(console.error);
  }, []);

  const selectedYearValue = React.useMemo(
    () => Array.from(selectedYear).join(", ").replace(/_/g, ""),
    [selectedYear],
  );

  const selectedPlatformValue = React.useMemo(
    () => Array.from(selectedPlatform).join(", ").replace(/_/g, ""),
    [selectedPlatform],
  );

  const selectedGenreValue = React.useMemo(
    () => Array.from(selectedGenre).join(", ").replace(/_/g, ""),
    [selectedGenre],
  );

  const predictModel = async () => {
    try {
      const response = await fetch(`${process.env.API_BASE}predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          year: selectedYearValue,
          platform: selectedPlatformValue,
          genre: selectedGenreValue,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setResult(data as PredictResponse);
    } catch (error) {
      console.error("Error during prediction:", error);
    }
  };

  const onYearSelectionChange = (keys: SharedSelection) => {
    // for single selection, `currentKey` is what you want
    const key = keys.currentKey;
    if (key) setSelectedYear(new Set([String(key)]));
  };

  const onPlatformSelectionChange = (keys: SharedSelection) => {
    // for single selection, `currentKey` is what you want
    const key = keys.currentKey;
    if (key) setSelectedPlatform(new Set([String(key)]));
  };
  const onGenreSelectionChange = (keys: SharedSelection) => {
    // for single selection, `currentKey` is what you want
    const key = keys.currentKey;
    if (key) setSelectedGenre(new Set([String(key)]));
  };
  const pct =
    result?.probability_hit == null
      ? null
      : Math.round(result.probability_hit * 1000) / 10;
  return (
    <div className="col-span-12 rounded-[10px] bg-white py-6 text-center shadow-1 dark:bg-gray-dark">
      <h2 className="text-body-2xl mb-5 px-7.5 font-bold text-dark dark:text-white">
        Accuracy: {accuracy}
      </h2>
      {/* Dropdown for selecting year */}
      <div className="mt-4 flex w-full items-center">
        <div className="flex-1" />
        <div className="flex items-center justify-center gap-4">
          <Dropdown>
            <DropdownTrigger>
              <Button className="capitalize" variant="bordered">
                {selectedYearValue}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              className="max-h-64 overflow-y-auto"
              disallowEmptySelection
              aria-label="Single selection example"
              selectedKeys={selectedYear}
              selectionMode="single"
              variant="flat"
              onSelectionChange={onYearSelectionChange}
            >
              {meta && meta.years
                ? meta.years.map((y) => (
                    <DropdownItem key={y}>{y}</DropdownItem>
                  ))
                : null}
            </DropdownMenu>
          </Dropdown>

          {/* Dropdown for selecting platform */}
          <Dropdown>
            <DropdownTrigger>
              <Button className="capitalize" variant="bordered">
                {selectedPlatformValue}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              className="max-h-64 overflow-y-auto"
              disallowEmptySelection
              aria-label="Single selection example"
              selectedKeys={selectedPlatform}
              selectionMode="single"
              variant="flat"
              onSelectionChange={onPlatformSelectionChange}
            >
              {meta && meta.platforms
                ? meta.platforms.map((p) => (
                    <DropdownItem key={p}>{p}</DropdownItem>
                  ))
                : null}
            </DropdownMenu>
          </Dropdown>

          {/* Dropdown for selecting genre */}
          <Dropdown>
            <DropdownTrigger>
              <Button className="capitalize" variant="bordered">
                {selectedGenreValue}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              className="max-h-64 overflow-y-auto"
              disallowEmptySelection
              aria-label="Single selection example"
              selectedKeys={selectedGenre}
              selectionMode="single"
              variant="flat"
              onSelectionChange={onGenreSelectionChange}
            >
              {meta && meta.genres
                ? meta.genres.map((g) => (
                    <DropdownItem key={g}>{g}</DropdownItem>
                  ))
                : null}
            </DropdownMenu>
          </Dropdown>
        </div>

        <div className="flex flex-1 justify-end">
          <Button
            onClick={() => predictModel()}
            className="ml-auto mr-4"
            color="primary"
          >
            Predict
          </Button>
        </div>
      </div>
      {/* results */}
      <div className="mt-6 px-7.5">
        <div className="rounded-lg border border-gray-200 p-4 text-left dark:border-gray-700">
          <div className="text-sm font-semibold text-dark dark:text-white">
            Results
          </div>

          {error && (
            <div className="mt-2 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {!error && !result && (
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Run a prediction to see results.
            </div>
          )}

          {result && (
            <div className="mt-3 space-y-2 text-sm text-gray-800 dark:text-gray-200">
              <div>
                <span className="font-medium">Label:</span> {result.label}
              </div>
              <div>
                <span className="font-medium">Hit:</span>{" "}
                {result.hit ? "Yes" : "No"}
              </div>
              {pct != null && (
                <div>
                  <span className="font-medium">Probability (Hit):</span> {pct}%
                </div>
              )}
              <div>
                <span className="font-medium">Inputs:</span>{" "}
                {result.inputs.year}, {result.inputs.platform},{" "}
                {result.inputs.genre}
              </div>
              <div>
                <span className="font-medium">Training year range:</span>{" "}
                {result.training_year_range.min}–
                {result.training_year_range.max}
              </div>
              {result.year_out_of_training_range && (
                <div className="text-amber-600 dark:text-amber-400">
                  Year is outside the training range.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
