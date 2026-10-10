"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center font-sans">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6 max-w-md">An unexpected error occurred. Please try again.</p>
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 bg-[#D32F2F] text-white rounded-lg font-medium hover:bg-[#b71c1c] transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
