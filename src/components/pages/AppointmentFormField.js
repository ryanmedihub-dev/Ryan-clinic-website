export default function AppointmentFormField({
  label,
  required,
  icon: Icon,
  isTextarea,
  helperText,
  children,
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center justify-between">
        <label className="text-[12px] sm:text-[13px] font-semibold text-slate-800 tracking-tight flex items-center gap-1">
          {label}
          {required && <span className="text-[#c0020e] font-bold">*</span>}
        </label>
        {helperText && (
          <span className="text-[11px] text-slate-400 font-medium">{helperText}</span>
        )}
      </div>
      <div className="relative group transition-all duration-200">
        {Icon && (
          <Icon
            className={`absolute left-3.5 text-[#c0020e] pointer-events-none z-10 transition-colors duration-200 ${
              isTextarea ? "top-3.5 h-4 w-4" : "top-1/2 -translate-y-1/2 h-4 w-4"
            }`}
          />
        )}
        {children}
      </div>
    </div>
  );
}

