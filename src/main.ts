import { isLowContrast } from './contrastUtils.ts';
import { fakeBook } from './mocks.ts';

export const palette = [
    '#CDC0BA',
    '#734C48',
    '#F2D0A7',
    '#9B95BF',
    '#37262C',
    '#836153',
];

document.addEventListener('DOMContentLoaded', () => {
    //get palette from remaining pages
    document.getElementById('get-palette')?.addEventListener('click', (e) => {
        let pairs: string[][] = [];
        document.querySelectorAll('.plate').forEach((plate) => {
            const bg = (plate as HTMLDivElement).style.backgroundColor;
            const c = (plate as HTMLDivElement).style.color;
            const pair = [bg, c];
            pairs.push(pair);
        });

        //use either this or just get the pairs directly
        let text = '';
        pairs.forEach((pair) => {
            console.log(pair);
            text += `
        --plate-background-color: ${pair[0]};
        --plate-text-color: ${pair[1]};
        
        `;
        });
        console.log(text);
    });

    //generate plates with colors
    const colorPairs: string[][] = getColorPairs();
    for (let i = 0; i < colorPairs.length; i++) {
        const [bg, c] = colorPairs[i];
        if (isLowContrast(bg, c)) continue;
        const plate = generatePlateWithColor(bg, c);
        document.querySelector('.palette-plate-container')?.appendChild(plate);
    }

    //remove plate if clicked
    document.querySelectorAll('.palette-plate').forEach((plate) => {
        plate.addEventListener('click', () => {
            plate.remove()
        });
    });
});

function getColorPairs(): string[][] {
    const colorPairs = [];
    for (let i = 0; i < palette.length; i++) {
        for (let j = 0; j < palette.length; j++) {
            if (i === j) continue;
            colorPairs.push([palette[i], palette[j]]);
        }
    }
    return colorPairs;
}

function generatePlateWithColor(bg: string, c: string): HTMLDivElement {
    //get random content
    const pageIndex = Math.floor(Math.random() * fakeBook.pages.length);
    const sentenceIndex = Math.floor(
        Math.random() * fakeBook.pages[0].content.length
    );
    const content = fakeBook.pages[pageIndex].content[sentenceIndex];

    //create plate
    const plate = createPlate(fakeBook.author, fakeBook.title, content);
    plate.classList.add('palette-plate');

    //set colors
    plate.style.backgroundColor = bg;
    plate.style.color = c;
    return plate;
}

function createPlate(_author: string, _title: string, _content: string) {
    const plate = document.createElement('div');
    plate.classList.add('plate');

    const plateBlock = document.createElement('div');
    plateBlock.classList.add('plate-block');
    plate.appendChild(plateBlock);

    const content = document.createElement('p');
    content.textContent = _content;
    content.classList.add('content');
    plateBlock.appendChild(content);

    const reference = document.createElement('div');
    reference.classList.add('reference');
    plateBlock.appendChild(reference);

    const author = document.createElement('p');
    author.textContent = _author;
    author.classList.add('author');
    reference.appendChild(author);

    const title = document.createElement('p');
    title.textContent = _title;
    title.classList.add('title');
    reference.appendChild(title);

    return plate;
}
