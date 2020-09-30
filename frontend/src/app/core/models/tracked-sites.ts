// export interface TrackedSite {
//   id: number;
//   path_url: string;
//   site_id: number;
//   category_id: number;
//   created: string;
//   updated: string;
// }

import { UrlHandlingStrategy } from '@angular/router';

export interface TrackedSite {
  id: number;
  path_url: string;
  site_id: {
    id: number,
    title: string,
    url: string
  };
  category_id: {
    id: number,
    title: string,
  };
  created: string;
  updated: string;
}
