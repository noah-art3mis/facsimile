import html2canvas from 'html2canvas';
import { downloadZip } from 'client-zip';
import FileSaver from 'file-saver';
import { Book, Page } from './types.ts';
import { PREVIEW_SIZE, IMAGE_TYPE, MAX_LENGTH_CONTENT } from './config.ts';
import { validateData } from './validateData.ts';
import rechunkSentences from './utils.ts';

declare global {
    interface Window {
        book: Book;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('fileInput')?.addEventListener('change', (e) => {
        document.querySelector('.small-page-container')?.remove();
        getBook(e);
    });

    // document
    //     .getElementById('btn-expand')
    //     ?.addEventListener('click', expandPlates);

    document
        .getElementById('btn-preview')
        ?.addEventListener('click', compilePlates);

    document
        .getElementById('btn-download')
        ?.addEventListener('click', () => downloadAllZip());

    document
        .getElementById('current-text')
        ?.addEventListener('input', (event) => {
            const text = (event.target as HTMLInputElement).value;
            if (text) {
                const ui = document.getElementById('ui-current-page');
                const index = ui?.textContent;

                if (index) {
                    const page = getPageByIndex(parseInt(index));
                    const content = page.querySelector(
                        '.plate .plate-block .content'
                    ) as HTMLParagraphElement;
                    content.textContent = text;
                } else {
                    console.error(
                        'The element or its text content is not found.'
                    );
                }
            }
        });

    window.addEventListener(
        'keydown',
        (event) => {
            if (event.defaultPrevented) {
                return; // Do nothing if the event was already processed
            }

            switch (event.key) {
                case 'ArrowDown':
                    nextPage();
                    break;
                case 'PageDown':
                    nextPage();
                    break;
                case 'ArrowUp':
                    prevPage();
                    break;
                case 'PageUp':
                    prevPage();
                    break;
                case 'ArrowLeft':
                    // Do something for "left arrow" key press.
                    break;
                case 'ArrowRight':
                    // Do something for "right arrow" key press.
                    break;
                case 'Enter':
                    // Do something for "enter" or "return" key press.
                    break;
                case ' ':
                    // Do something for "space" key press.
                    break;
                default:
                    return; // Quit when this doesn't handle the key event.
            }

            // Cancel the default action to avoid it being handled twice
            event.preventDefault();
        },
        true
    );

    function getBook(event: Event) {
        const files = (event.target as HTMLInputElement)?.files;
        if (files && files.length > 0) {
            const file: File = files[0];
            const reader = new FileReader();
            reader.readAsText(file); // triggers 'onload' event and sets 'result' attribute

            reader.onload = function (e) {
                window.book = JSON.parse(e.target?.result as string);
                validateData(window.book);
                // rechunkSentences(window.book, MAX_LENGTH_CONTENT);
                generatePlates(window.book);
                setNumberOfPages();
                getPageByIndex(0).id = 'active-page';
            };
        }
    }

    function nextPage() {
        const i = currentPageIndex();
        selectPage(i + 1);
    }

    function prevPage() {
        const i = currentPageIndex();
        selectPage(i - 1);
    }

    function currentPageIndex(): number {
        const activePage = document.getElementById('active-page');
        const pages = document.querySelectorAll('.page');

        for (let i = 0; i < pages.length; i++) {
            if (pages[i] == activePage) {
                return i;
            }
        }
        throw new Error('active page not found');
    }

    function selectPage(index: number) {
        //remove previous
        document.getElementById('active-page')?.removeAttribute('id');

        //set next
        const nextPage = getPageByIndex(index);
        nextPage.id = 'active-page';

        //update ui
        const counter = document.getElementById('ui-current-page')!;
        counter.textContent = index.toString();
    }

    function getPageByIndex(index: number) {
        const pages = document.querySelectorAll('.page');
        if (index === -1) index = pages.length - 1; // wrap around from -1
        const page = pages[index % pages.length]; // wrap around from last page
        return page;
    }

    function setNumberOfPages() {
        const totalPagesElement = document.getElementById('ui-total-pages');
        const pages = document.querySelectorAll('.page');
        if (totalPagesElement) {
            totalPagesElement.textContent = pages.length.toString();
        }
    }

    function generatePlates(book: Book) {
        const container = document.createElement('div');
        container.classList.add('small-page-container');
        document.querySelector('body')?.appendChild(container);

        for (let i = 0; i < book.pages.length; i++) {
            const page = document.createElement('div');
            page.classList.add('page');
            document.querySelector('.small-page-container')?.appendChild(page);
            page.id = book.id + '-' + book.pages[i].number;

            for (let j = 0; j < book.pages[i].content.length; j++) {
                const plate = createPlate(book, book.pages[i], j);
                page.appendChild(plate);
            }
        }
    }

    function createPlate(book: Book, page: Page, index: number) {
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

    function expandPlates() {
        document.documentElement.style.setProperty('--scale', '5');

        // https://html2canvas.hertzen.com/faq
        if (document.documentElement.scrollHeight > 32000) {
            console.log(document.documentElement.scrollHeight + 'bigwindow');
            alert('Big window');
        }
    }

    function compilePlates() {
        document.body.style.cursor = 'wait';
        expandPlates();

        const container = document.querySelector('.summary-pages');
        const pages = document.querySelectorAll('.page');

        for (const page of pages) {
            container?.appendChild(page);
            (page as HTMLElement).style.display = 'flex';

            for (const plate of page.children) {
                html2canvas(plate as HTMLDivElement).then(
                    (canvas: HTMLCanvasElement) => {
                        const src = canvas.toDataURL(
                            `image/${IMAGE_TYPE}`,
                            1.0
                        );
                        const div = createPreview(src, plate.id);
                        page.appendChild(div);
                        (plate as HTMLElement).style.display = 'none';
                    }
                );
            }
        }

        // const btnPreview = document.getElementById(
        //     'btn-preview'
        // ) as HTMLButtonElement;
        // btnPreview.disabled = true;
        const btnDownload = document.getElementById(
            'btn-download'
        ) as HTMLButtonElement;
        btnDownload.disabled = false;

        document.body.style.cursor = 'default';
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

    async function downloadAllZip() {
        const links = document.querySelectorAll('.preview a');
        const files = await Promise.all(
            Array.from(links).map(async (link: Element) => {
                const name = link.getAttribute('download');
                const folder = name!.split('-')[0] + name!.split('-')[1];
                const name_final = folder + '/' + name;
                if (link instanceof HTMLAnchorElement) {
                    const response = await fetch(link.href);
                    const blob = await response.blob();
                    return { name: name_final, input: blob };
                }
                return null;
            })
        );

        // @ts-ignore
        const content = await downloadZip(files).blob();
        const fileName = window.book.id;
        FileSaver.saveAs(
            content,
            `${fileName ? fileName : 'semblance-results'}.zip`
        );
    }
});
