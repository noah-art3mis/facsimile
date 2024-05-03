import { Book } from './types.ts';

export function validateData(data: Book) {
    isBook(data);
    arePagesUnique(data);
    endsWithPunctuation(data);
    notTooLong(data);
}


function isBook(data: Book) {
    if (!data.author) {
        const message = `Book author is missing`;
        alert(message);
        console.log(message);
    }
    if (!data.title) {
        const message = `Book title is missing`;
        alert(message);
        console.log(message);
    }
    if (!data.id) {
        const message = `Book id is missing`;
        alert(message);
    }
    if (!data.pages) {
        const message = `Book pages are missing`;
        alert(message);
        console.log(message);
    }
}


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
