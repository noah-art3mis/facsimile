export function initializePageCounter() {
    const targetTotal = document.getElementById(
        'pages-total'
    ) as HTMLSpanElement;
    const pages = document.querySelectorAll('.page');
    const index = pages.length - 1
    targetTotal.textContent = index.toString();

    const targetCurrent = document.getElementById(
        'pages-current'
    ) as HTMLSpanElement;
    targetCurrent.textContent = '1';
}

export function selectPage(index: number) {
    document.getElementById('active-page')?.removeAttribute('id');

    const pages = document.querySelectorAll('.page');
    const totalPagesElement = document.getElementById('pages-total');
    let maxPage = totalPagesElement
        ? parseInt(totalPagesElement.textContent || '', 10)
        : 0;

    index = Math.max(1, Math.min(index, maxPage));
    const nextPage = pages[index];
    nextPage.id = 'active-page';

    const counter = document.getElementById('pages-current') as HTMLSpanElement;
    counter.textContent = index.toString();

    console.log(`Page ${index} selected`);
    return index
}
