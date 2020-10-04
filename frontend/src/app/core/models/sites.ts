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
