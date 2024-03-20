export interface MeteorFullInfo {
  id: string;
  name: string;
  estimated_diameter_in_meters: {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_date_full: Date;
  relative_velocity_kilometers_per_second: number;
}

export interface MeteorsCountInfo {
  count: number;
}

export interface MeteorsInfo {
  meteors: MeteorFullInfo[] | MeteorsCountInfo;
}
