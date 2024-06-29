# Facsimile

Make your own simulacrum plates. 

Available at https://facsimile.vercel.app/

Uses HTML/CSS/TS and [html2canvas](https://html2canvas.hertzen.com/). 

Part of AUTOMATON.

## How to

1.  Upload a "book" file. A "book" file is a JSON file with a specific structure that represents quotations. Use [Apothecary](https://github.com/noah-art3mis/apothecary) to get one.
1.  Adjust the color parameters. Use [Mirage](https://github.com/noah-art3mis/mirage) to find a color palette.
1.  Use `PageUp`/`UpArrow` and `PageDown`/`DownArrow` to check resulting images for any issues. If any arise, edit the book file directly and reupload it.
1.  Press `Compile` and wait for the images to be processed. Depending on the amount of images, this can take a minute or two. Wait until there are no more messages appearing in the console (`ctrl + shift + k`).
1.  Press `Download`.

## TODO

-   add: loading feedback for compilation stage.
