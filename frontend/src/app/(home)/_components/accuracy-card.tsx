type AccuracyCardProps = { accuracy: string };

export function AccuracyCard({ accuracy }: AccuracyCardProps) {
  return (
    <div className="col-span-12 text-center rounded-[10px] bg-white py-6 shadow-1 dark:bg-gray-dark">
      <h2 className="text-body-2xl mb-5 px-7.5 font-bold text-dark dark:text-white">
        Accuracy: {accuracy}
      </h2>

      {/* existing content */}
    </div>
  );
}
