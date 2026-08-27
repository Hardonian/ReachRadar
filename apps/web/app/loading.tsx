export default function Loading() {
  return (
    <div className="min-h-screen bg-[#070A12] flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-3 font-mono text-xs text-slate-400">
        <div className="w-10 h-10 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
        <span>Loading Telemetry...</span>
      </div>
    </div>
  );
}
