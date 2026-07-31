import PopupForm from "@/components/common/PopupForm";

export default function StandaloneLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <PopupForm />
      </body>
    </html>
  );
}
