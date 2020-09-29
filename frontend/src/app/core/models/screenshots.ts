export interface Screenshot {
  id: number;
  created: string;
  desktop_url: string;
  mobile_url: string;
  tablet_url: string;
  tracked_site: {
    category_id: {
      id?: number;
      title: string;
    }
    created: string;
    path_url: string;
    site_id: {
      title: string;
      utl: string;
    }
    updated: string;
  };
}