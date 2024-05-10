import {
    CONTRAST_THRESHOLD,
    CSS_FORMAT,
    PALETTE,
    SHUFFLE_PLATES,
} from './config.ts';
import { isLowContrast } from './contrast.ts';
import { generatePlateWithColor } from './plates.ts';
import { copyTextToClipboard } from './utils.ts';
import { shuffle } from './utils.ts';

document.addEventListener('DOMContentLoaded', () => {
    //generate plates with colors
    const colorPairs: string[][] = getColorPairs(PALETTE);
    generatePlatesWithColors(colorPairs);

    //get palette from remaining pages
    document.getElementById('get-palette')?.addEventListener('click', () => {
        let pairs: string[][] = getResult();
        let text = formatResult(pairs);
        copyTextToClipboard(text);
        displayMessage();
    });
});

function getColorPairs(palette: string[]): string[][] {
    const colorPairs = [];
    for (let i = 0; i < palette.length; i++) {
        for (let j = 0; j < palette.length; j++) {
            if (i === j) continue;
            colorPairs.push([palette[i], palette[j]]);
        }
    }
    return colorPairs;
}

function generatePlatesWithColors(colorPairs: string[][]) {
    const plates = [];
    for (let i = 0; i < colorPairs.length; i++) {
        const [bg, c] = colorPairs[i];
        if (isLowContrast(bg, c, CONTRAST_THRESHOLD)) continue;
        const plate = generatePlateWithColor(bg, c);
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
    }
}
