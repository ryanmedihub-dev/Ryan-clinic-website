"use client";

function ShimmerBlock({ className = "" }) {
  return (
    <div
      className={`rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:400%_100%] animate-shimmer ${className}`}
    />
  );
}

export default function FormSkeleton() {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 100% 50%; }
          100% { background-position:   0% 50%; }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite linear;
        }
      `}</style>

      <div className="p-4 sm:p-6 max-w-screen-xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Shimmer Cards */}
          <div className="lg:col-span-2 space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-sm">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <ShimmerBlock className="h-5 w-40" />
                  <ShimmerBlock className="h-4 w-16 rounded-full" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <ShimmerBlock className="h-10 w-full" />
                  <ShimmerBlock className="h-10 w-full" />
                </div>
                <ShimmerBlock className="h-24 w-full" />
              </div>
            ))}
          </div>

          {/* Sidebar Shimmer */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-sm sticky top-6">
              <ShimmerBlock className="h-5 w-32 mb-4" />
              <ShimmerBlock className="h-10 w-full" />
              <ShimmerBlock className="h-6 w-3/4" />
              <ShimmerBlock className="h-6 w-2/3" />
              <ShimmerBlock className="h-12 w-full mt-4" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
