const baseSiteUrl = 'https://flashsoft.eu'

const baseData = `User-agent: *
Disallow:`

export const renderRobots = () => {
    const sitemap = `Sitemap: ${baseSiteUrl}/sitemap.xml`
    return baseData + '\n\n' + sitemap
}