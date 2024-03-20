import { extractType } from "@hapi/joi";
import { nasaRoverPhotosSchema } from "../schemas/nasa-rover-photos.schema";

export type NasaRoverPhotos = extractType<typeof nasaRoverPhotosSchema>;
