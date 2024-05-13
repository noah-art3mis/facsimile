export function shuffle<T>(array: T[]): T[] {
    // Fisher-Yates (Durstenfeld) shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}
export function copyTextToClipboard(text: string) {
    navigator.clipboard
        .writeText(text)
        .then(() => {
            console.log('Palettes copied to clipboard!');
            console.log(text);
        })
        .catch((err) => {
            alert(`Failed to copy text: ${err}`);
        });
}
