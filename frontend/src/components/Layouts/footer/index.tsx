import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center sm:px-6 lg:px-8">
        © {year} Vincent Vitale - For Educational Purposes Only
      </div>
    </footer>
  );
}
