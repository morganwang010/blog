import { getNavYamlData } from "@/lib/yaml";
import WebsiteClient from "./WebsiteClient";

export default function NavIndexPage() {
  const data = getNavYamlData();

  return <WebsiteClient initialData={data} />;
}