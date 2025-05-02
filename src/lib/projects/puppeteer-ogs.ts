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

  // const page = await browser.newPage();

  // // Set viewport size (optional)
  // await page.setViewport({ width: 1200, height: 800 });

  // // Load the local HTML file
  // await page.goto(`file://${htmlFilePath}`);

  // // Wait for the div element to be available
  // await page.waitForSelector(divSelector);

  // // Get bounding box of the div element
  // const divBoundingBox = await page.evaluate(selector => {
  //   const element = document.querySelector(selector);
  //   const { x, y, width, height } = element.getBoundingClientRect();
  //   return { x, y, width, height };
  // }, divSelector);

  // // Capture screenshot of the div element
  // await page.screenshot({
  //   path: 'div_image.png',
  //   clip: {
  //     x: divBoundingBox.x,
  //     y: divBoundingBox.y,
  //     width: divBoundingBox.width,
  //     height: divBoundingBox.height
  //   }
  // });

  // console.log('Image captured for div:', divSelector);

  // // Close the browser
  // await browser.close();
};
