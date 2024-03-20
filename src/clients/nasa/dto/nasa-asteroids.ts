import { extractType } from "@hapi/joi";
import { nasaAsteroidsSchema } from "../schemas/nasa-asteroids.schema";

export type NasaAsteroids = extractType<typeof nasaAsteroidsSchema>;
