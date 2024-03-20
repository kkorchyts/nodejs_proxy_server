import { extractType } from "@hapi/joi";
import { nasaManifestSchema } from "../schemas/nasa-manifest.schema";

export type NasaManifest = extractType<typeof nasaManifestSchema>;
