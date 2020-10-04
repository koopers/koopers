export interface Site {
  id: number;
  title: string;
  url: string;
  available: boolean;
  created: string;
  updated?: string;
}

export interface SiteDetails {
  site: {
    title: string;
    url: string;
    avaliable: boolean;
  };
  categories: [
    {
      category_id: {
        id: number;
        title: string;
      };
    }
  ];
}

export interface CustomSite {
  last_sshot_mobile: string;
  last_sshot_desktop: string;
  last_sshot_tablet: string;
}
