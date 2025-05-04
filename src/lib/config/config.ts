const title = "Web & App Development Portfolio - Software Dev Profile - andrei0x309"
const description = "andrei0x309's portfolio website showcasing his web and app development projects, software development profile, blog and technical work."
const IS_DEV_ENABLED = false
const baseSiteUrl = 'https://flashsoft.eu'
const devBaseUrl = 'https://tun-5173.flashsoft.eu'

export const config = {
  indexPageTitle: title,
  indexPageDescription:description,
  defaultOpenGraphImage: 'https://flashsoft.eu/res/og-flashsoft-v2.webp',
  defaultOpenGraphImageProjects: 'https://flashsoft.eu/res/og-flashsoft-projects-v2.webp',
  defaultOpenGraphImageCerts: 'https://flashsoft.eu/res/og-flashsoft-courses-v2.webp',
  hostname: 'flashsoft.eu',
  IS_DEV_ENABLED,
  farcaster: {
   miniAppEnabled: true,
   followButtonEnabled: true,
   followFid: 1791,
   extendedMetadata: {
       description,
       tags: ['developer', 'personal', 'flashsoft', 'sveltekit'],
       // games, social, finance, utility, productivity, health-fitness, news-media, music, shopping, education, developer-tools, entertainment, art-creativity
       primaryCategory: 'utility',
       subtitle: title,
       screenshotUrls: [
           IS_DEV_ENABLED ? devBaseUrl + '/hotlink-ok/screenshots/screenshot-1.png' : baseSiteUrl + '/hotlink-ok/screenshots/screenshot-1.png',
           IS_DEV_ENABLED ? devBaseUrl + '/hotlink-ok/screenshots/screenshot-2.png' : baseSiteUrl + '/hotlink-ok/screenshots/screenshot-2.png',
       ],
   }
}
};
