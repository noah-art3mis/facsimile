import { Book } from './utils/types.ts';
import { validateData } from './utils/validation.ts';
import { initializePageCounter, selectPage } from './utils/navigation.ts';
import { generatePages } from './utils/plates.ts';
import { compilePlates } from './utils/compilation.ts';
import { downloadAllZip } from './utils/download.ts';

declare global {
    interface Window {
        book: Book;
        currentPage: number;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.currentPage = 1;

    document.getElementById('fileInput')?.addEventListener('change', (e) => {
        readBookData(e);
    });

    document
        .getElementById('color-text')
        ?.addEventListener('change', (e) => updateTextColor(e));

    document
        .getElementById('color-bg')
        ?.addEventListener('change', (e) => updateBackgroundColor(e));

    document
        .getElementById('btn-compile')
        ?.addEventListener('click', compilePlates);

    document
        .getElementById('btn-download')
        ?.addEventListener('click', () => downloadAllZip());

    window.addEventListener('keydown', (event) => handleInput(event), true);
});

function handleInput(event: KeyboardEvent) {
    {
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }

        switch (event.key) {
            case 'ArrowDown':
                window.currentPage = selectPage(window.currentPage - 1);
                break;
            case 'PageDown':
                window.currentPage = selectPage(window.currentPage - 1);
                break;
            case 'ArrowUp':
                window.currentPage = selectPage(window.currentPage + 1);
                break;
            case 'PageUp':
                window.currentPage = selectPage(window.currentPage + 1);
                break;
            default:
                return; // Quit when this doesn't handle the key event.
        }

        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    }
}

function readBookData(event: Event) {
    const files = (event.target as HTMLInputElement)?.files;
    if (files && files.length > 0) {
        const file: File = files[0];
        const reader = new FileReader();
        reader.readAsText(file); // triggers 'onload' event and sets 'result' attribute

        reader.onload = function (e) {
            document.querySelector('.page-container')?.remove(); // reset previous pages
            window.book = JSON.parse(e.target?.result as string);
            
            validateData(window.book);
            generatePages(window.book);
            initializePageCounter();
            const firstPage = document.querySelectorAll('.page')[0];
            firstPage.id = 'active-page';
        };
    }
}

function updateTextColor(event: Event) {
    const targetElement = event.target as HTMLInputElement;
    const color = targetElement.value;
    document.documentElement.style.setProperty('--plate-text-color', color);
}

function updateBackgroundColor(event: Event) {
    const targetElement = event.target as HTMLInputElement;
    const colors: string = targetElement.value;
    const colorsArray: string[] = colors.split(',').map((code) => code.trim());
    const gradient: string = `linear-gradient(0deg, ${colorsArray.join(', ')})`;
    document.documentElement.style.setProperty('--plate-background', gradient);
}
