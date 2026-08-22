export const dynamic = "force-dynamic";

import { getAllServices } from "@/lib/serviceData";
import ServicePageClient from "./ServicePageClient";

export default async function ServicePage() {
  const services = await getAllServices();

  return <ServicePageClient initialServices={services} />;
}
