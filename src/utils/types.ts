export type Book = {
    author: string;
    title: string;
    id: string;
    pages: Array<Page>;
};

export type Page = {
    number: string;
    content: Array<string>;
};
