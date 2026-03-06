export default function AppointmentFormField({ label, required, icon: Icon, children }) {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />}
        {children}
      </div>
    </div>
  );
}
