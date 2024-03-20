import { nasaAsteroidsSchema } from "../nasa-asteroids.schema";

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
            close_approach_date_full: "2024-Mar-05 18:20",
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
            close_approach_date_full: "2024-Mar-05 18:40",
            relative_velocity: {
              kilometers_per_second: "23.0754818446"
            }
          }
        ]
      }
    ]
  }
};

const nasaAsteroidWrongResponse = {
  near_earth_objects: {
    "2024-03-05": [
      {
        name: "490636 (2010 DP)",
        estimated_diameter: {
          meters: {
            estimated_diameter_min: 515.8874662642,
            estimated_diameter_max: 1153.5594433068
          }
        }
      }
    ]
  }
};

const nasaAsteroidValidated = {
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
            close_approach_date_full: new Date(Date.parse("2024-Mar-05 18:20")),
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
            close_approach_date_full: new Date(Date.parse("2024-Mar-05 18:40")),
            relative_velocity: {
              kilometers_per_second: "23.0754818446"
            }
          }
        ]
      }
    ]
  }
};

describe("nasaAsteroidSchema", () => {
  it("succeeded", async () => {
    const actual = await nasaAsteroidsSchema.validateAsync(
      nasaAsteroidRightResponse
    );
    expect(actual).toEqual(nasaAsteroidValidated);
  });

  it("failed", async () => {
    await expect(
      async () =>
        await nasaAsteroidsSchema.validateAsync(nasaAsteroidWrongResponse)
    ).rejects.toThrow();
  });
});
