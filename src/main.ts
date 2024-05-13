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
        const palettes: string[][] = getResult();
        const result: string = formatResult(palettes);
        copyTextToClipboard(result);
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
    let palettes: string[][] = [];
    document.querySelectorAll('.plate').forEach((plate) => {
        const c: string = (plate as HTMLDivElement).style.color;
        let bg: string = (plate as HTMLDivElement).style.backgroundImage;

        if (!bg) {
            bg = (plate as HTMLDivElement).style.backgroundColor;
        }

        palettes.push([c, bg]);
    });
    return palettes;
}

function formatResult(palettes: string[][]) {
    let text: string = '';
    palettes.forEach((palette) => {
        const text_color: string = palette[0];
        const bg_color: string = palette[1];
        const item = `color: ${text_color};\nbackground-image: ${bg_color};\n\n`;
        text += item;
    });
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
