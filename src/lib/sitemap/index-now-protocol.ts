import { generatePaths } from './index';
import { wait } from '@/lib/common/misc';
import { config } from '@/lib/config/index';

// This is safe must match the /616E647265693078333039.txt
const indexNowKey = '616E647265693078333039';

const IndexNowParticipants = {
  IndexNow: 'https://api.indexnow.org/indexnow',
  Bing: 'https://www.bing.com/indexnow',
  Naver: 'https://searchadvisor.naver.com/indexnow',
  'Seznam.cz': 'https://search.seznam.cz/indexnow',
  Yandex: 'https://yandex.com/indexnow',
  Yep: 'https://indexnow.yep.com/indexnow'
};

export const submitNewUrls = async () => {
  const paths = await generatePaths();
  // make sure paths are less then 10k
  const urlSets = [] as string[][];
  const urls = paths.map((path) => path.url);
  if (urls.length > 10000) {
    do {
      urlSets.push(urls.splice(0, 10000));
    } while (urls.length > 0);
  } else {
    urlSets.push(urls);
  }

  // You, only need to submit to one search engine, the protocol states that the other search engines will automatically be notified.
  const choosenSearchEngine = IndexNowParticipants['Bing'];

  for (const urls of urlSets) {
    const res = await fetch(choosenSearchEngine, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        host: config.hostname,
        key: indexNowKey,
        urlList: urls
      })
    });
    console.info(`IndexNow ${urls.length} urls submitted to ${choosenSearchEngine}, response: ${res.status}`);
    await wait(1000);
  }
};
