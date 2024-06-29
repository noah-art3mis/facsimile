import { PREVIEW_SIZE, IMAGE_TYPE } from './config.ts';
import html2canvas from 'html2canvas';

export function compilePlates() {
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
                    const src = canvas.toDataURL(`image/${IMAGE_TYPE}`, 1.0);
                    const div = createPreview(src, plate.id);
                    page.appendChild(div);
                    (plate as HTMLElement).style.display = 'none';
                }
            );
        }
    }

    // const btnPreview = document.getElementById(
    //     'btn-compile'
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
