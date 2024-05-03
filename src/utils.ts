import { Book } from './types.ts';

export default function rechunkSentences(book: Book, maxLength) {
    book.pages.forEach((page) => {
        const contentCopy: Array<string | null> = JSON.parse(
            JSON.stringify(page.content)
        ); // deep copy
        page.content = reduceSentences(contentCopy, maxLength);
    });
}

function reduceSentences(
    sentences: Array<string | null>,
    maxLength: number
): Array<string> {
    for (let i = 0; i < sentences.length; i++) {
        if (!sentences[i]) continue; // null

        let counter = 1;
        while (sentences[i]!.length < maxLength) {
            if (i + counter >= sentences.length) break; // out of bounds

            const combined = sentences[i] + ' ' + sentences[i + counter];

            if (combined.length > maxLength) break; // too long

            sentences[i] = combined;
            sentences[i + counter] = null;
            counter++;
        }
    }

    // @ts-ignore
    return sentences.filter((x) => x !== null);
}
