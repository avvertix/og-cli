import * as fs from 'fs';

import {join} from 'path';

import satori from 'satori'

import parse from 'html-react-parser'

// import { Resvg } from '@resvg/resvg-js'


export default async function og(htmlFilePath, flags) {

    console.log("Generating image...");

    console.log(flags);

    if(!htmlFilePath){
      throw new Error("Specify an html file path");
    }

    const html = fs.readFileSync(htmlFilePath, { encoding:'utf8', flag:'r' });

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
            width: 1200,
            height: 628,
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

    const opts = {
        // background: 'rgba(238, 235, 230, .9)',
        fitTo: {
          mode: 'width',
          value: 1200,
        },
        font: {
          fontFiles: [
            './fonts/Inter-Regular.ttf',
            './fonts/Inter-Bold.ttf'
          ], // Load custom fonts.
          loadSystemFonts: false, // Faster to disable loading system fonts.
          defaultFontFamily: 'Inter',
        },
        // imageRendering: 1,
        // shapeRendering: 2,
        // logLevel: 'debug', // Default Value: error
      }

    // const resvg = new Resvg(svg, opts)
    // const pngData = resvg.render()
    // const pngBuffer = pngData.asPng()

    // // console.log(svg);

    // await fs.promises.writeFile(flags.output, pngBuffer);


}