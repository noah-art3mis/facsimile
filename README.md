# Socratic Sync Plate Maker

Generates simulacrum plates using HTML and CSS using [html2canvas](https://html2canvas.hertzen.com/).

## How to

1. set `DATA` parameter in `config.ts`
    - ⚠️ DATA should be a json object. The format should fit the `Book` type in `types.ts`
1. set background and text color in `style.css`
1. press `compile`. check previews to see if anything is amiss
    - each row is one quote.
1. press `download`

## Advanced usage

-   change text size
-   manually change breaks in data

## TODO

-   gradient backgrounds
-   integrate with data generation and cleanup
-   download zipped
-   change one page without having to recompile everything
-   hide big images & auto-compile
-   add upload field


