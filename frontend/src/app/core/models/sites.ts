export interface Site {
  id: number;
  title: string;
  url: string;
  available: boolean;
  created: string;
  updated?: string;
  screenshots: {
    mobile_url: string;
    tablet_url: string;
    desktop_url: string;
  };
}
