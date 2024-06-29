export function initializePageCounter() {
    window.currentPage = 1;

    const targetTotal = document.getElementById(
        'pages-total'
    ) as HTMLSpanElement;
    const pages = document.querySelectorAll('.page');
    const index = pages.length;
    targetTotal.textContent = index.toString();

    const targetCurrent = document.getElementById(
        'pages-current'
    ) as HTMLSpanElement;
    targetCurrent.textContent = window.currentPage.toString();
}

export function selectPage(index: number) {
    const totalPagesElement = document.getElementById(
        'pages-total'
    ) as HTMLSpanElement;
    let maxPage: number = totalPagesElement.textContent
        ? parseInt(totalPagesElement.textContent)
        : 9999;

    const clampedNewIndex = Math.max(1, Math.min(index, maxPage));

    if (clampedNewIndex == window.currentPage) {
        return window.currentPage;
    }

    const pages = document.querySelectorAll('.page');
    document.getElementById('active-page')?.removeAttribute('id');
    pages[clampedNewIndex - 1].id = 'active-page'; //account for 1-indexing

    updatePageCounter(clampedNewIndex);

    return clampedNewIndex;
}

function updatePageCounter(page: number) {
    const counter = document.getElementById('pages-current') as HTMLSpanElement;
    counter.textContent = page.toString();
}

export function toggleCounterVisibility() {
    const counter = document.getElementById('page-counter') as HTMLElement;
    if (counter.style.display === 'none') {
        counter.style.display = 'block';
    } else {
        counter.style.display = 'none';
    }
}
