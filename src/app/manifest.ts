import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Corail Plongée",
    short_name: "Corail Plongée",
    description: "Centre de plongée à Saint-Gilles-les-Bains, La Réunion",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f0e8",
    theme_color: "#042330",
  };
}
