import {
    CONTRAST_THRESHOLD,
    CSS_FORMAT,
    GRADIENT_SIZE,
    PALETTE,
    SHUFFLE_PLATES,
} from './config.ts';
import { getPermutations, filterColorsGradient } from './colors.ts';
import { generatePlateWithColor } from './plates.ts';
import { copyTextToClipboard } from './utils.ts';
import { shuffle } from './utils.ts';

document.addEventListener('DOMContentLoaded', () => {
    let colors = getPermutations(PALETTE, GRADIENT_SIZE + 1);
    colors = filterColorsGradient(colors, CONTRAST_THRESHOLD);
    generatePlatesWithColors(colors);

    //get palette from remaining pages
    document.getElementById('get-palette')?.addEventListener('click', () => {
        let pairs: string[][] = getResult();
        let text = formatResult(pairs);
        copyTextToClipboard(text);
        displayMessage();
    });
});

function generatePlatesWithColors(colors: string[][]) {
    const plates = [];
    for (let i = 0; i < colors.length; i++) {
        const plate = generatePlateWithColor(colors[i]);
        plate.addEventListener('click', () => {
            plate.remove();
        });
        plates.push(plate);
    }
    if (SHUFFLE_PLATES) {
        shuffle(plates);
    }
    plates.forEach((plate) => {
        document.querySelector('.palette-plate-container')?.appendChild(plate);
    });
}

function getResult() {
    let pairs: string[][] = [];
    document.querySelectorAll('.plate').forEach((plate) => {
        const bg = (plate as HTMLDivElement).style.backgroundColor;
        const c = (plate as HTMLDivElement).style.color;
        const pair = [bg, c];
        pairs.push(pair);
    });
    return pairs;
}

function formatResult(pairs: string[][]) {
    let text = '';
    if (CSS_FORMAT) {
        pairs.forEach((pair) => {
            console.log(pair);
            text += `
            --plate-background-color: ${pair[0]};
            --plate-text-color: ${pair[1]};
            
            `;
        });
    } else {
        text = JSON.stringify(pairs);
    }
    return text;
}

function displayMessage() {
    const message = document.getElementById('result-message');
    if (message) {
        message.style.display = 'block';
        setTimeout(() => {
            message.style.display = 'none';
        }, 1250);
    }
}
