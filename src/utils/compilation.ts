import { PREVIEW_SIZE, IMAGE_TYPE } from './config.ts';
import html2canvas from 'html2canvas';
import { toggleCounterVisibility } from './navigation.ts';

export function compilePlates() {
    toggleCounterVisibility();

    const btnCompile = document.getElementById(
        'btn-compile'
    ) as HTMLButtonElement;
    btnCompile.disabled = true;

    const btnDownload = document.getElementById(
        'btn-download'
    ) as HTMLButtonElement;
    btnDownload.disabled = false;

    document.documentElement.style.setProperty('--scale', '5');

    // https://html2canvas.hertzen.com/faq
    if (document.documentElement.scrollHeight > 32000) {
        console.log(document.documentElement.scrollHeight + 'bigwindow');
        alert('Big window');
    }

    const container = document.createElement('div');
    container.classList.add('compiled-pages');
    document.querySelector('body')?.appendChild(container);

    const pages = document.querySelectorAll('.page');

    for (const page of pages) {
        container?.appendChild(page);
        (page as HTMLElement).style.display = 'flex';

        for (const plate of page.children) {
            html2canvas(plate as HTMLDivElement).then(
                (canvas: HTMLCanvasElement) => {
                    const src = canvas.toDataURL(`image/${IMAGE_TYPE}`, 1.0);
                    const div = createPreview(src, plate.id);
                    page.appendChild(div);
                    (plate as HTMLElement).style.display = 'none';
                }
            );
        }
    }
}

function createPreview(src: string, name: string) {
    const container = document.createElement('div');
    container.classList.add('compiled');

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
