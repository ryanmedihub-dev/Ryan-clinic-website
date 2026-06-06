
const getApiUrl = () => {
  // Client-side: relative URL always resolves to the correct domain
  if (typeof window !== "undefined") {
    return "/api/service/get-service";
  }
  // Server-side: need an absolute URL
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  return `${base}/api/service/get-service`;
};

export const getAllServices = async () => {
  try {
    const res = await fetch(getApiUrl(), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    const result = await res.json();
    return result.data || [];
  } catch (error) {
    console.error("getAllServices error:", error.message);
    return [];
  }
};

export const getServiceBySlug = async (id) => {
  try {
    const res = await fetch(getApiUrl(), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    const result = await res.json();
    const services = result.data || [];
    return services.find((s) => s.metadata?.pageurl === id) || null;
  } catch (error) {
    console.error("getServiceBySlug error:", error.message);
    return null;
  }
};
