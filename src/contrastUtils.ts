export function isLowContrast(hex1: string, hex2: string) {
    const rgb1 = hexToRgb(hex1) || [0, 0, 255];
    const rgb2 = hexToRgb(hex2) || [255, 0, 0];

    return contrast(rgb1, rgb2) < 3;
}
function hexToRgb(hex: string): number[] | null {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? [
              parseInt(result[1], 16),
              parseInt(result[2], 16),
              parseInt(result[3], 16),
          ]
        : null;
}
function contrast(rgb1: number[], rgb2: number[]): number {
    // @ts-ignore
    var lum1 = luminance(...rgb1);
    // @ts-ignore
    var lum2 = luminance(...rgb2);
    var brightest = Math.max(lum1, lum2);
    var darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
}
function luminance(r: number, g: number, b: number): number {
    const RED = 0.2126;
    const GREEN = 0.7152;
    const BLUE = 0.0722;
    const GAMMA = 2.4;

    var a = [r, g, b].map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, GAMMA);
    });
    return a[0] * RED + a[1] * GREEN + a[2] * BLUE;
}
