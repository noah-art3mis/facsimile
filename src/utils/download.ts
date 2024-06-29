import { downloadZip } from 'client-zip';
import FileSaver from 'file-saver';

export async function downloadAllZip() {
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
