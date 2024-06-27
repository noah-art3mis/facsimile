# Facsimile

Generates simulacrum plates using HTML and CSS using [html2canvas](https://html2canvas.hertzen.com/).

Part of AUTOMATON, the simulacrum automation package:

## How to

1.  Use [Apothecary](https://github.com/noah-art3mis/apothecary) to get a "book" file. A "book" file is a JSON file with a specific structure that represents quotations.
    - Upload the file.
1.  Use [Mirage](https://github.com/noah-art3mis/mirage) to find a color palette.
    - Adjust the color parameters.
1.  Use `PageUp`/`UpArrow` and `PageDown`/`DownArrow` to check resulting images for any issues. 
    - If they arise, edit the book file directly.
1.  if everything is ok, press `Compile` and wait for it to process all images. This can take a while (see the movement of the scrollbar for an indication).
1.  After compilation, press `Download`.
1.  If you want to use the tool again, you must reload the page to discard the current pages.

## TODO

-   deploy
-   add loading to mouse
-   add scrolling when a page has more than 6 plates
-   fix bug where you lose the first plate
