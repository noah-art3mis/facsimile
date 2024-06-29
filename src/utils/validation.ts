import { Book } from './types.ts';

export function validateData(data: Book) {
    isBook(data);
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
