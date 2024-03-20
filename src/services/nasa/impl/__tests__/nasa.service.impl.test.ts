import { faker } from "@faker-js/faker";
import { when } from "jest-when";
import { nasaClient } from "../../../../clients";
import { NasaServiceImpl } from "../nasa.service.impl";

jest.mock("../../../../clients");

describe("nasa service", () => {
  describe("getAsteroidsByPeriod", () => {
    const nasaAsteroidRightResponse = {
      near_earth_objects: {
        "2024-03-05": [
          {
            id: "2490636",
            name: "490636 (2010 DP)",
            estimated_diameter: {
              meters: {
                estimated_diameter_min: 515.8874662642,
                estimated_diameter_max: 1153.5594433068
              }
            },
            is_potentially_hazardous_asteroid: false,
            close_approach_data: [
              {
                close_approach_date_full: new Date(
                  Date.parse("2024-Mar-05 18:20")
                ),
                relative_velocity: {
                  kilometers_per_second: "18.0459038649"
                }
              }
            ]
          }
        ],
        "2024-03-06": [
          {
            id: "3267403",
            name: "(2005 CE41)",
            estimated_diameter: {
              meters: {
                estimated_diameter_min: 46.1907460282,
                estimated_diameter_max: 103.2856480504
              }
            },
            is_potentially_hazardous_asteroid: true,
            close_approach_data: [
              {
                close_approach_date_full: new Date(
                  Date.parse("2024-Mar-05 18:40")
                ),
                relative_velocity: {
                  kilometers_per_second: "23.0754818446"
                }
              }
            ]
          }
        ]
      }
    };

    const initialPeriod = {
      from: faker.date.past({ years: 2 }),
      to: faker.date.past({ years: 1 })
    };

    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it("succeeded when dangerous true, count true", async () => {
      const expectedResult = {
        "2024-03-05": {
          meteors: [
            {
              close_approach_date_full: new Date(
                Date.parse("2024-03-05T17:20:00.000Z")
              ),
              estimated_diameter_in_meters: {
                estimated_diameter_max: 1153.5594433068,
                estimated_diameter_min: 515.8874662642
              },
              id: "2490636",
              is_potentially_hazardous_asteroid: false,
              name: "490636 (2010 DP)",
              relative_velocity_kilometers_per_second: "18.0459038649"
            }
          ]
        },
        "2024-03-06": {
          meteors: [
            {
              close_approach_date_full: new Date(
                Date.parse("2024-03-05T17:40:00.000Z")
              ),
              estimated_diameter_in_meters: {
                estimated_diameter_max: 103.2856480504,
                estimated_diameter_min: 46.1907460282
              },
              id: "3267403",
              is_potentially_hazardous_asteroid: true,
              name: "(2005 CE41)",
              relative_velocity_kilometers_per_second: "23.0754818446"
            }
          ]
        }
      };

      when(nasaClient.getAsteroid)
        .calledWith(initialPeriod)
        .mockResolvedValue(nasaAsteroidRightResponse);

      const nasaService = new NasaServiceImpl(nasaClient);

      const actualResult = await nasaService.getAsteroidsByPeriod(
        initialPeriod,
        false,
        false
      );
      expect(actualResult).toEqual(expectedResult);
    });
  });
});
