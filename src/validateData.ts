import { Book } from './types.ts';

export function validateData(data: Book) {
    function arePagesUnique(data: Book) {
        const pageNumbers = new Set<string>();
        for (const page of data.pages) {
            if (pageNumbers.has(page.number)) {
                const message = `Page number ${page.number} is not unique`;
                alert(message);
                console.log(message);
            }
            pageNumbers.add(page.number);
        }
    }

    function endsWithPunctuation(data: Book) {
        for (const page of data.pages) {
            for (const plate of page.content) {
                if (plate.endsWith('.')) {
                    continue;
                }

                if (plate.endsWith('?')) {
                    continue;
                }

                if (plate.endsWith('!')) {
                    continue;
                }

                const message = `${page.number} should end with punctuation`;
                alert(message);
                console.log(message);
            }
        }
    }

    function notTooLong(data: Book) {
        for (const page of data.pages) {
            if (page.content.length > 10) {
                const message = `${page.number} should end with punctuation`;
                alert(message);
                console.log(message);
            }
        }
    }

    arePagesUnique(data);
    endsWithPunctuation(data);
    notTooLong(data);
    // cleanup with askgpt
}
