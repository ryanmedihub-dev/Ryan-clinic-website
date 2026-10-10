import PopupForm from "@/components/common/PopupForm";

export default function StandaloneLayout({ children }) {
  return (
    <>
      {children}
      <PopupForm />
    </>
  );
}
