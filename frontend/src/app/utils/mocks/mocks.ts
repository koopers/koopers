import { Category } from '@core/models/categories';
import { SuggestedSite } from '@core/models/suggested-sites';
import { Site } from '@core/models/sites';
import { Screenshot } from '@core/models/screenshots';
import { TrackedSite } from '@core/models/tracked-sites';
import { User } from '@core/models/users';

export const categories: Category[] = [
  {
      id: 1,
      title: "Portada",
      slug: "portada",
      created: "2020-09-21T11:35:52.413002-05:00",
      updated: "2020-09-21T11:35:52.413002-05:00"
  },
  {
      id: 2,
      title: "Internacional",
      slug: "internacional",
      created: "2020-09-21T11:36:08.965369-05:00",
      updated: "2020-09-21T11:36:08.965369-05:00"
  }
];

export const suggestedSites: SuggestedSite[] = [
  {
    id: 5,
    title: "Propuesta 1",
    url: "https://www.eluniversal.com.mx/",
    categories: "[\"asdasd1\",\"hola\"]",
    created: "2020-09-29",
    updated: "2020-09-29"
  },
  {
    id: 7,
    title: "Propuest 2333",
    url: "https://www.nytimes.com/es/",
    categories: "[\"prop12\",\"prop34\"]",
    created: "2020-10-01",
    updated: "2020-10-01"
  }
];

export const sites: Site[] = [
  {
    id: 1,
    title: "El universal",
    url: "https://www.eluniversal.com.co/",
    available: true,
    created: "2020-09-27",
    updated: "2020-09-28"
  },
  {
    id: 2,
    title: "New York Times",
    url: "https://www.nytimes.com/es/",
    available: true,
    created: "2020-09-27",
    updated: "2020-09-28"
  }
];

export const screenshots: Screenshot[] = [
  {
    id: 1,
    mobile_url: 'https://static01.nyt.com/images/2020/05/24/reader-center/NYT-front-page-05-24-20/NYT-front-page-05-24-20-videoSixteenByNineJumbo1600-v2.jpg',
    tablet_url: 'https://static01.nyt.com/images/2020/05/24/reader-center/NYT-front-page-05-24-20/NYT-front-page-05-24-20-videoSixteenByNineJumbo1600-v2.jpg',
    desktop_url: 'https://static01.nyt.com/images/2020/05/24/reader-center/NYT-front-page-05-24-20/NYT-front-page-05-24-20-videoSixteenByNineJumbo1600-v2.jpg',
    tracked_site: {
      path_url: 'https://www.nytimes.com/es/',
      created: "2020-09-27",
      updated: "2020-09-28",
      category_id: {
        id: 5,
        title: 'Sociedad'
      },
      site_id: {
        id: 2,
        title: 'New York Times',
        utl: 'https://www.nytimes.com/es/'
      }
    },
    created: "2020-09-27",
  },
  {
    id: 2,
    mobile_url: 'https://static01.nyt.com/images/2020/05/24/reader-center/NYT-front-page-05-24-20/NYT-front-page-05-24-20-videoSixteenByNineJumbo1600-v2.jpg',
    tablet_url: 'https://static01.nyt.com/images/2020/05/24/reader-center/NYT-front-page-05-24-20/NYT-front-page-05-24-20-videoSixteenByNineJumbo1600-v2.jpg',
    desktop_url: 'https://static01.nyt.com/images/2020/05/24/reader-center/NYT-front-page-05-24-20/NYT-front-page-05-24-20-videoSixteenByNineJumbo1600-v2.jpg',
    tracked_site: {
      path_url: 'https://www.eluniversal.com.mx/mundo',
      created: "2020-09-27",
      updated: "2020-09-28",
      category_id: {
        id: 4,
        title: 'Internacional'
      },
      site_id: {
        id: 1,
        title: 'New York Times',
        utl: 'https://www.eluniversal.com.mx/'
      }
    },
    created: "2020-09-27",
  }
];

export const trackedSites: TrackedSite[] = [
  {
    id: 1,
    path_url: 'https://www.nytimes.com/section/technology',
    category_id: {
      id: 15,
      title: 'Tecnología'
    },
    site_id: {
      id: 1,
      title: 'New York Times',
      url: 'https://www.eluniversal.com.mx/'
    },
    created: "2020-09-27",
    updated: "2020-09-28",
  },
  {
    id: 2,
    path_url: 'https://www.nytimes.com/section/opinion',
    category_id: {
      id: 17,
      title: 'Opinión'
    },
    site_id: {
      id: 1,
      title: 'New York Times',
      url: 'https://www.eluniversal.com.mx/'
    },
    created: "2020-09-27",
    updated: "2020-09-28",
  }
];

export const users: User[] = [
  {
    id: 1,
    username: 'g.tellezv@hotmail.com',
    is_staff: false,
    date_joined: "2020-09-21T12:07:52.830686-05:00"
  },
  {
    id: 2,
    username: 'oscar.pay4@gmail.com',
    is_staff: true,
    date_joined: "2020-09-21T12:07:52.830686-05:00"
  }
];
