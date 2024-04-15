export type Book = {
    author: string;
    title: string;
    code: string;
    pages: Array<Page>;
};

export type Page = {
    number: string;
    content: Array<string>;
};
