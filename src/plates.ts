import { Book, Page } from './types.ts';

export function generatePages(book: Book) {
    const container = document.createElement('div');
    container.classList.add('page-container');
    document.querySelector('body')?.appendChild(container);

    for (let i = 0; i < book.pages.length; i++) {
        const page = document.createElement('div');
        page.classList.add('page');
        container.appendChild(page);
        page.id = book.id + '-' + book.pages[i].number;

        for (let j = 0; j < book.pages[i].content.length; j++) {
            const plate = createPlate(book, book.pages[i], j);
            page.appendChild(plate);
        }
    }
}

export function createPlate(book: Book, page: Page, index: number) {
    const plate = document.createElement('div');
    plate.classList.add('plate');
    plate.id = book.id + '-' + page.number + '-' + index;

    const plateBlock = document.createElement('div');
    plateBlock.classList.add('plate-block');
    plate.appendChild(plateBlock);

    const content = document.createElement('p');
    content.textContent = page.content[index];
    content.classList.add('content');
    plateBlock.appendChild(content);

    const reference = document.createElement('div');
    reference.classList.add('reference');
    plateBlock.appendChild(reference);

    const author = document.createElement('p');
    author.textContent = book.author;
    author.classList.add('author');
    reference.appendChild(author);

    const title = document.createElement('p');
    title.textContent = book.title;
    title.classList.add('title');
    reference.appendChild(title);

    return plate;
}
