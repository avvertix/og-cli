import * as fs from 'fs';

import { join } from 'path';

import satori from 'satori'

import parse from 'html-react-parser'


export default async function og(htmlFilePath, flags) {

  console.log(`Generating SVG from ${htmlFilePath}...`);

  if (!htmlFilePath) {
    throw new Error("Specify an html file path");
  }

  const html = fs.readFileSync(htmlFilePath, { encoding: 'utf8', flag: 'r' });

  // fonts.length
  //             ? fonts.map((font) => ({
  //                 name: font.name,
  //                 data: fs.readFileSync(font.path),
  //                 weight: font.weight,
  //                 style: font.style,
  //             }))
  //             : 

  const svg = await satori(
    parse(html),
    {
      width: flags.width || 1200,
      height: flags.height || 628,
      fonts: [
        {
          name: 'Inter',
          data: fs.readFileSync(join(flags.cwd, `fonts/Inter-Regular.ttf`)),
          weight: 400,
          style: 'regular',
        },
        {
          name: 'Inter',
          data: fs.readFileSync(join(flags.cwd, `fonts/Inter-Bold.ttf`)),
          weight: 700,
          style: 'bold',
        },
      ]
    },
  );


  await fs.promises.writeFile(flags.output, svg);


}