import { jsPDF } from 'jspdf';

const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [1080, 1350],
});

function testPDF() {
    doc.text('Hello world!', 1, 1);
    const result = doc.output();
    console.log(result);
}

document.getElementById('generate')!.addEventListener('click', testPDF);

// type Book = {
//     author: string;
//     title: string;
//     pages: [
//         {
//             page: string;
//             content: string;
//         }
//     ];
// };
