# Semblance

Possible names:

-   Demeanor
-   Semblance
-   Depiction
-   Façade
-   Facsimile
-   Mirage
-   Likenessnp
-   Sillhouette
-   Effigy

        \\wsl$\Ubuntu\home\art3mis\projects\socratic\socratic-apothecary\output

Generates simulacrum plates using HTML and CSS using [html2canvas](https://html2canvas.hertzen.com/). Part of AUTOMATON, the simulacrum automation package.

-   [ ] https://gist.github.com/ricardoleme/8a4578493cf345d3fea381c796007f08

## How to

1.  get a book file. a book file is a json file in the following format:

        author: string;
        title: string;
        code: string;
        pages: Array<Page>;

    where a page is

        number: string;
        content: Array<string>;

1.  set background and text color in `src/style.css`
    -   https://color.adobe.com/create/image-gradient
    -   https://color.adobe.com/create/image
    -   https://cssgradient.io/
1.  `npm run dev` to start the server and then open the browser
1.  upload the file using the interface.
1.  wait for it to process all pages
1.  press `download all`
1.  if you want to use it again, reload the page

## TODO

-   pallete tools
    -   combine all cases
    -   preview
    -   invert colors
    -   add gradients
-   weird centering issues with the plates
-   add manual sentence rechunking
-   check content for ai api errors
-   set background and text color with ui
-   ui to change number of sentences per page
-   ui to change text size
-   change one page without having to recompile everything
-   check if over pixel limit
    -   https://html2canvas.hertzen.com/faq
    -   32k px height

## Palletes

### ksi

        /* #434343 */
        /* #e6dad3 */
        /* #3d4555 */
