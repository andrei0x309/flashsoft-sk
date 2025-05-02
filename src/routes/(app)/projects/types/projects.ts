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
      };
      techs: [
        {
          name: string;
        }
      ];
      mega: string;
      youtube: string;
      slug: string;
    }[];
  };
}
