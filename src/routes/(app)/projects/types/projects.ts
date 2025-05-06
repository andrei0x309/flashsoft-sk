export interface ProjectData {
  res: {
    data: {
      title: string;
      short_description: string;
      feature_image: string;
      open_source: boolean;
      links: {
        [key: string]: string;
      };
      screen_pics: {
        [key: string]: string;
      };
      cat: {
        cat_name: string;
        cat_description: string;
        slug: string;
      };
      techs: [
        {
          name: string;
          slug: string;
        }
      ];
      mega: string;
      youtube: string;
      slug: string;
      og_image: string;
    }[];
    totalPages: number;
    page: number;
    tech?: {
        name: string;
        slug: string;
      }
    cat?: {
      cat_name: string;
      cat_description: string;
      slug: string;
    }
  };
}

export interface ProjectDataPage extends ProjectData {
  pageTitle: string;
  pageDescription: string;
  pageKeywords: string;
  rest: string;
}