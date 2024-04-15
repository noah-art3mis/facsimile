import html2canvas from 'html2canvas';
import { downloadZip } from 'client-zip';
import FileSaver from 'file-saver';

import { Book, Page } from './types.ts';
import {
    PREVIEW_SIZE,
    DATA,
    MAX_LENGTH_CONTENT,
    IMAGE_TYPE,
} from './config.ts';
import { validateData } from './validateData.ts';

document.addEventListener('DOMContentLoaded', () => {
    validateData(DATA);

    document
        .querySelector('#btn-preview')
        ?.addEventListener('click', compilePlates);

    document
        .querySelector('#btn-download')
        ?.addEventListener('click', downloadAllZip);

    populateOriginals(DATA);
});

function populateOriginals(book: Book) {
    const container = document.createElement('div');
    container.classList.add('original-pages');
    document.querySelector('body')?.appendChild(container);

    for (let i = 0; i < book.pages.length; i++) {
        const page = document.createElement('div');
        page.classList.add('page');
        document.querySelector('.original-pages')?.appendChild(page);
        page.id = book.code + '-' + book.pages[i].number;

        for (let j = 0; j < book.pages[i].content.length; j++) {
            const plate = createPlate(book, book.pages[i], j);
            page.appendChild(plate);
        }
    }
}

function createPlate(book: Book, page: Page, index: number) {
    const plate = document.createElement('div');
    plate.classList.add('plate');
    plate.id = book.code + '-' + page.number + '-' + index;

    const content = document.createElement('p');
    content.textContent = page.content[index];
    content.classList.add('content');
    plate.appendChild(content);

    const reference = document.createElement('div');
    reference.classList.add('reference');
    plate.appendChild(reference);

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

function compilePlates() {
    const container = document.createElement('div');
    container.classList.add('preview-pages');
    document.querySelector('body')?.appendChild(container);

    const pages = document.querySelector('.original-pages');

    for (const page of pages!.children) {
        const _page = document.createElement('div');
        _page.classList.add('preview-page');
        container.appendChild(_page);

        for (const plate of page.children) {
            html2canvas(plate as HTMLElement).then(
                (canvas: HTMLCanvasElement) => {
                    const src = canvas.toDataURL(`image/${IMAGE_TYPE}`, 1.0);
                    const div = createPreview(src, plate.id);
                    _page.appendChild(div);
                    plate.style.display = 'none';
                }
            );
        }
    }

    const btnPreview = document.getElementById(
        'btn-preview'
    ) as HTMLButtonElement;
    btnPreview.disabled = true;
    const btnDownload = document.getElementById(
        'btn-download'
    ) as HTMLButtonElement;
    btnDownload.disabled = false;
}

function createPreview(src: string, name: string) {
    const container = document.createElement('div');
    container.classList.add('preview');

    const a = document.createElement('a');
    a.href = src;
    a.download = `${name}.${IMAGE_TYPE}`;
    container.appendChild(a);

    const img = document.createElement('img');
    img.src = src;
    img.style.width = 1080 / PREVIEW_SIZE + 'px';
    img.style.height = 1350 / PREVIEW_SIZE + 'px';
    a.appendChild(img);

    return container;
}

async function downloadAll() {
    const links = document.querySelectorAll('.preview a');
    for (const link of links) {
        if (link instanceof HTMLAnchorElement) {
            link.click();
            console.log(`downloading...`);
        }
    }
    console.log(`download end`);
}

async function downloadAllZip() {
    const links = document.querySelectorAll('.preview a');
    const files = await Promise.all(
        Array.from(links).map(async (link: Element) => {
            const name = link.getAttribute('download');
            if (link instanceof HTMLAnchorElement) {
                const response = await fetch(link.href);
                const blob = await response.blob();
                return { name: name, input: blob };
            }
            return null;
        })
    );

    // https://www.npmjs.com/package/client-zip

    const content = await downloadZip(files).blob();
    FileSaver.saveAs(content, 'download.zip');
}
