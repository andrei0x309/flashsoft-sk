import fs from 'node:fs'
import path from 'node:path';
import { readdir } from "node:fs/promises";

const megaJsonPath = './src/utils-db/db/megaFiles.json';
const megaJsonPathBackup = './src/utils-db/db/megaFilesBackup.json';

const filesLocation = '../res/flashsoft-sk/cert_pdf';
const megaFolder = 'cert_pdf';
// Working Cmd Version 1.6.3
const megaCmdPath = 'C:\\Users\\andrei0x309\\AppData\\Local\\MEGAcmd\\MEGAclient.exe';

const excludePatterns = ['/unopt/'];
const mustMatchPatterns = ['.pdf'];

// create a backup of the current megaFiles.json
try {
  if (fs.statSync(megaJsonPath)) {
    fs.copyFileSync(megaJsonPath, megaJsonPathBackup);
  }
} catch (e) {
  console.info('No backup created');
}

// load the current megaFiles.json
let megaFiles;
try {
  megaFiles = JSON.parse(fs.readFileSync(megaJsonPath, { encoding: 'utf8' }));
} catch (e) {
  megaFiles = {};
}

console.info('Loaded', Object.keys(megaFiles).length, 'files');

// const megaFiles = {}

async function crawlDirectory(relativePath: string): Promise<string[]> {
  const filePaths: string[] = [];
  const currentDir = process.cwd(); // Get the current working directory
  const absolutePath = path.join(currentDir, relativePath);
  
  const filesFound = await readdir(absolutePath, { recursive: true });


  for await (const entry of filesFound) {
      const relativePath = entry.replace(absolutePath, '').replace(/\\/g, '/').replace(/^\//, '');

      if (excludePatterns.some((pattern) => relativePath.includes(pattern))) {
        console.info('Excluding', relativePath);
        continue;
      }

      if (!mustMatchPatterns.some((pattern) => relativePath.includes(pattern))) {
        console.info('Excluding', relativePath);
        continue;
      }

      filePaths.push(relativePath);
  }

  return filePaths;
}

const megaSyncFolder = async () => {
  const cmd = [];
  cmd.push('sync');
  cmd.push(filesLocation);
  cmd.push(`${megaFolder}`);
  const exec = Bun.spawnSync([megaCmdPath, ...cmd]);
  const { exitCode, stdout, stderr } = exec
  if (exitCode !== 0) {
    console.warn('Error', exitCode);
    console.warn(new TextDecoder().decode(stderr));
    console.warn(new TextDecoder().decode(stdout));
  }
  console.info('Synced', megaFolder);
};

const megeGetExportedFile = async (file: string) => {
  const cmd = [];
  cmd.push('export');
  cmd.push(`${megaFolder}/${file}`);
  cmd.push('-a');
  const exec = Bun.spawnSync([megaCmdPath, ...cmd]);
  const { exitCode, stdout, stderr } = exec
  if (exitCode !== 0) {
    console.warn('Error', exitCode);
    console.warn(new TextDecoder().decode(stderr));
    console.warn(new TextDecoder().decode(stdout));
  }
  const output = new TextDecoder().decode(stdout);
  const exportedLink = output.split(': ')[1].trim();
  return [file, exportedLink];
};

await megaSyncFolder();
console.info('Synced', megaFolder);

const files = await crawlDirectory(filesLocation);
const excludeFilesAlreadyExported = files.filter((file) => !megaFiles[file]);

const numFiles = excludeFilesAlreadyExported.length;
console.info('Files Length: ', files.length);
console.info('Found ', numFiles, ' files to export');

for (const file of excludeFilesAlreadyExported) {
  const [fileName, link] = await megeGetExportedFile(file);
  console.info('Exported', fileName, link);
  megaFiles[fileName] = link;
}

fs.writeFileSync(megaJsonPath, JSON.stringify(megaFiles, null, 2), { encoding: 'utf8' });
