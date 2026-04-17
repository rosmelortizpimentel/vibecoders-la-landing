export interface TopBuilder {
  username: string;
  name: string;
  avatarUrl: string;
}

export interface MapLocation {
  countryCode: string;
  country: string;
  latitude: number;
  longitude: number;
  builderCount: number;
  topBuilders: TopBuilder[];
}
