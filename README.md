# Pallete

Helps you pick colors for simulacrum plates. Part of Semblance, which is part of AUTOMATON, the simulacrum automation package.

## How to

1.  get a palette. I usually do by uploading a book cover [here](https://color.adobe.com/create/image-gradient) .

1.  set configs in `configs.ts`:

    -   CONTRAST_THRESHOLD: value for skipping plates (3 ~ 4.5 should be good)
    -   SHUFFLE_PLATES: if true, shuffle plates
    -   CSS_FORMAT: if true, generates results in css format
    -   PALETTE: your palette

1.  open the client: `npm run dev -- --open`.

    -   every permutation is generated. low contrast ones are skipped according to `CONTRAST_THRESHOLD`.
    -   every time you reload the page, sentences are randomly assigned. if `SHUFFLE` is on, plates are shuffled.

1.  click the plates you don't want. they will be removed from the page.

1.  click `Get palette`
    -   results will be in the console. format depends on `CSS_FORMAT`

## palettes

    ksi

            [
                '#434343',
                '#e6dad3',
                '#3d4555',
            ];

    fg

            [
                '#CDC0BA',
                '#734C48',
                '#F2D0A7',
                '#9B95BF',
                '#37262C',
                '#836153',
            ];

from which i chose:

        --plate-background-color: rgb(115, 76, 72);
        --plate-text-color: rgb(242, 208, 167);


        --plate-background-color: rgb(55, 38, 44);
        --plate-text-color: rgb(242, 208, 167);


        --plate-background-color: rgb(55, 38, 44);
        --plate-text-color: rgb(155, 149, 191);


        --plate-background-color: rgb(131, 97, 83);
        --plate-text-color: rgb(242, 208, 167);

## TODO

-   add gradients
