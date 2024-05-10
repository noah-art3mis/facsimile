import { fakeBook } from './mocks.ts';

export function generatePlateWithColor(colors: string[]): HTMLDivElement {
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
    plate.style.color = colors[0];
    if (colors.length === 2) {
        plate.style.backgroundColor = colors[1];
    } else {
        const otherColors = colors.slice(1);
        const gradient = `linear-gradient(0deg, ${otherColors.join(', ')})`;
        plate.style.backgroundImage = gradient;
    }
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
