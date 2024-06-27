# Facsimile

Make your own simulacrum plates. Uses HTML/CSS/TS with [html2canvas](https://html2canvas.hertzen.com/). Part of AUTOMATON.

Use at https://facsimile.vercel.app/

## How to

1.  Upload a "book" file. A "book" file is a JSON file with a specific structure that represents quotations. Use [Apothecary](https://github.com/noah-art3mis/apothecary) to get one.
1.  Adjust the color parameters. Use [Mirage](https://github.com/noah-art3mis/mirage) to find a color palette.
1.  Use `PageUp`/`UpArrow` and `PageDown`/`DownArrow` to check resulting images for any issues. If any arise, edit the book file directly and reupload it. (Reload the page before doing so).
1.  If everything is ok, press `Compile` and wait for the images to be processed. Depending on the amount of images, this can take a minute or two. For a quick way to check progress, see if the scrollbar is moving.
1.  After compilation, press `Download`.
1.  If you want to use the tool again, you must reload the page to discard the current pages.

## TODO

-   add resetting so you don't need to refresh the page to use it again
-   add loading feedback for compilation stage
-   add scrolling when a page has more than 6 plates
-   fix indexing bug where you can't see the first plate after navigating away
