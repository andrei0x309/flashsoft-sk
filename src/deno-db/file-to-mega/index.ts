import { walk } from "https://deno.land/std/fs/walk.ts";
import { join } from "https://deno.land/std/path/mod.ts";

const megaFiles = {}

async function crawlDirectory(relativePath: string): Promise<string[]> {
  const filePaths: string[] = [];
  const currentDir = Deno.cwd(); // Get the current working directory
  const absolutePath = join(currentDir, relativePath);

  for await (const entry of walk(absolutePath)) {
    if (entry.isFile) {
      // Calculate relative path from the starting directory
      const relativePath = entry.path
        .replace(absolutePath, "")
        .replace(/\\/g, "/")
        .replace(/^\//, "");
      filePaths.push(relativePath);
    }
  }

  return filePaths;
}


const filesLocation = "../res/flashsoft-sk/cert_pdf"
const megaFolder = "cert_pdf"
const megaCmdPath = "C:\\Users\\andrei0x309\\AppData\\Local\\MEGAcmd\\MEGAclient.exe"

const megeGetExportedFile = async (file: string) => {
  const cmd = []
  cmd.push('export')
  cmd.push(`${megaFolder}/${file}`)
  cmd.push('-a')
  const exec =  new Deno.Command(megaCmdPath, {
      args: [...cmd],
    })
  const { code, stdout, stderr } = await exec.output();
  if (code !== 0) {
    console.log('Error', code)
    console.log(stderr)
    console.log(new TextDecoder().decode(stdout));
  }
  const output = new TextDecoder().decode(stdout);
  const exportedLink = output.split(': ')[1].trim()
  return [file, exportedLink]
}
  

const files = await crawlDirectory(filesLocation)
for (const file of files) {
  const [fileName, link] = await megeGetExportedFile(file)
  megaFiles[fileName] = link
}

Deno.writeTextFile('megaFiles.json', JSON.stringify(megaFiles, null, 2))
