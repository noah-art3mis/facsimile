import html2canvas from 'html2canvas';
import { downloadZip } from 'client-zip';
import FileSaver from 'file-saver';
import { Book } from './types.ts';
import { PREVIEW_SIZE, IMAGE_TYPE } from './config.ts';
import { validateData } from './validateData.ts';
import { initializePageCounter, selectPage } from './navigation.ts';
import { generatePages } from './plates.ts';

declare global {
    interface Window {
        book: Book;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let currentPage = -1;

    document.getElementById('fileInput')?.addEventListener('change', (e) => {
        document.querySelector('.page-container')?.remove();
        getBook(e);
    });

    function getBook(event: Event) {
        const files = (event.target as HTMLInputElement)?.files;
        if (files && files.length > 0) {
            const file: File = files[0];
            const reader = new FileReader();
            reader.readAsText(file); // triggers 'onload' event and sets 'result' attribute

            reader.onload = function (e) {
                window.book = JSON.parse(e.target?.result as string);
                validateData(window.book);
                generatePages(window.book);
                initializePageCounter();
                currentPage = 1;
                const firstPage = document.querySelectorAll('.page')[0];
                firstPage.id = 'active-page';
            };
        }
    }

    document
        .getElementById('color-text')
        ?.addEventListener('change', (e) => updateTextColor(e));

    function updateTextColor(event: Event) {
        const targetElement = event.target as HTMLInputElement;
        const color = targetElement.value;
        document.documentElement.style.setProperty('--plate-text-color', color);
    }

    document
        .getElementById('color-bg')
        ?.addEventListener('change', (e) => updateBackgroundColor(e));

    function updateBackgroundColor(event: Event) {
        const targetElement = event.target as HTMLInputElement;
        const colors: string = targetElement.value;
        const colorsArray: string[] = colors
            .split(',')
            .map((code) => code.trim());
        const gradient: string = `linear-gradient(0deg, ${colorsArray.join(', ')})`;
        document.documentElement.style.setProperty(
            '--plate-background',
            gradient
        );
    }

    document
        .getElementById('btn-preview')
        ?.addEventListener('click', compilePlates);

    document
        .getElementById('btn-download')
        ?.addEventListener('click', () => downloadAllZip());

    window.addEventListener(
        'keydown',
        (event) => {
            if (event.defaultPrevented) {
                return; // Do nothing if the event was already processed
            }

            switch (event.key) {
                case 'ArrowDown':
                    currentPage = selectPage(currentPage - 1);
                    break;
                case 'PageDown':
                    currentPage = selectPage(currentPage - 1);
                    break;
                case 'ArrowUp':
                    currentPage = selectPage(currentPage + 1);
                    break;
                case 'PageUp':
                    currentPage = selectPage(currentPage + 1);
                    break;
                default:
                    return; // Quit when this doesn't handle the key event.
            }

            // Cancel the default action to avoid it being handled twice
            event.preventDefault();
        },
        true
    );

    function compilePlates() {
        document.body.style.cursor = 'wait';
        
        document.documentElement.style.setProperty('--scale', '5');

        // https://html2canvas.hertzen.com/faq
        if (document.documentElement.scrollHeight > 32000) {
            console.log(document.documentElement.scrollHeight + 'bigwindow');
            alert('Big window');
        }

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
            `${fileName ? fileName : 'facsimile-results'}.zip`
        );
    }
});
