import { walk } from 'https://deno.land/std/fs/walk.ts';
import { join } from 'https://deno.land/std/path/mod.ts';

const megaJsonPath = './src/deno-db/db/megaFiles.json';
const megaJsonPathBackup = './src/deno-db/db/megaFilesBackup.json';

const filesLocation = '../res/flashsoft-sk/cert_pdf';
const megaFolder = 'cert_pdf';
const megaCmdPath = 'C:\\Users\\andrei0x309\\AppData\\Local\\MEGAcmd\\MEGAclient.exe';

const excludePatterns = ['/unopt/'];
const mustMatchPatterns = ['.pdf'];

// create a backup of the current megaFiles.json
try {
  if (Deno.statSync(megaJsonPath)) {
    Deno.copyFileSync(megaJsonPath, megaJsonPathBackup);
  }
} catch (e) {
  console.info('No backup created');
}

// load the current megaFiles.json
let megaFiles;
try {
  megaFiles = JSON.parse(Deno.readTextFileSync(megaJsonPath));
} catch (e) {
  megaFiles = {};
}

console.info('Loaded', Object.keys(megaFiles).length, 'files');

// const megaFiles = {}

async function crawlDirectory(relativePath: string): Promise<string[]> {
  const filePaths: string[] = [];
  const currentDir = Deno.cwd(); // Get the current working directory
  const absolutePath = join(currentDir, relativePath);

  for await (const entry of walk(absolutePath)) {
    if (entry.isFile) {
      // Calculate relative path from the starting directory
      const relativePath = entry.path.replace(absolutePath, '').replace(/\\/g, '/').replace(/^\//, '');

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
  }

  return filePaths;
}

const megaSyncFolder = async () => {
  const cmd = [];
  cmd.push('sync');
  cmd.push(filesLocation);
  cmd.push(`${megaFolder}`);
  const exec = new Deno.Command(megaCmdPath, {
    args: [...cmd]
  });
  const { code, stdout, stderr } = await exec.output();
  if (code !== 0) {
    console.warn('Error', code);
    console.warn(stderr);
    console.warn(new TextDecoder().decode(stdout));
  }
  console.info('Synced', megaFolder);
};

const megeGetExportedFile = async (file: string) => {
  const cmd = [];
  cmd.push('export');
  cmd.push(`${megaFolder}/${file}`);
  cmd.push('-a');
  const exec = new Deno.Command(megaCmdPath, {
    args: [...cmd]
  });
  const { code, stdout, stderr } = await exec.output();
  if (code !== 0) {
    console.warn('Error', code);
    console.warn(stderr);
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

Deno.writeTextFile(megaJsonPath, JSON.stringify(megaFiles, null, 2));
