import puppeteer from 'puppeteer-core';
import os from 'os';

const generateProjectOgs = async () => {
  const osType = os.type();
  let executablePath, userDataDir;
  if (osType === 'Windows_NT') {
    executablePath = `C:\\Program Files (x86)\\Microsoft\\Edge Dev\\Application\\msedge.exe`;
    userDataDir = `${os.homedir()}\\AppData\\Local\\Microsoft\\Edge Dev\\User Data`;
  } else if (osType === 'Linux') {
    executablePath = '/usr/bin/microsoft-edge-dev';
    userDataDir = '~/.config/microsoft-edge-dev';
  }

  const allProjectsPage = 'http://localhost:5173/projects/ogs/';
  const divSelector = `.project-main .card`
  const ogFolder = './static/images/projects-ogs/'


  const options = {
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--mute-audio'],
    userDataDir,
    ignoreDefaultArgs: ['--enable-automation'],
    browserContext: 'default',
    protocolTimeout: 2180000,
    waitForInitialPage: true
  };
  const browser = await puppeteer.launch(options);
  
  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto(allProjectsPage);

  await page.waitForSelector(divSelector);


  const allCards = await page.$$(divSelector);

  const onlyForFilenames = [] as string[];

  for (const card of allCards) {
    const divBoundingBox = await card.boundingBox();
    const slug = await page.evaluate(
      (element) => element?.querySelector('a.button ')?.getAttribute('href')
      , card
    );

  if(!slug || !divBoundingBox) {
     console.warn('Skipping card due to missing slug or bounding box:', card);
     continue;
  }

  const onlyFileName = slug.split('/').pop()

  if (!onlyFileName) {
    console.warn('Skipping card due to missing filename in slug:', card);
    continue;
  }

  if(onlyForFilenames.length && !onlyForFilenames.includes(onlyFileName)) {
    console.log(`Skipping ${onlyFileName} as it is not in the list of onlyForFilenames.`);
    continue;
  }

  await page.screenshot({
    path: `${ogFolder}${onlyFileName}.webp`,
    clip: {
      x: divBoundingBox.x,
      y: divBoundingBox.y,
      width: divBoundingBox.width,
      height: divBoundingBox.height
    },
    quality: 90,
    type: 'webp',
  });
 }
  await page.close();
  await browser.close();

  console.log('All screenshots saved successfully.');
};

generateProjectOgs();