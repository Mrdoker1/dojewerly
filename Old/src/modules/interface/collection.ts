export default interface Collection {
    [key: string]: string | number | {};
    name: string;
    items: Array<Number>;
    preview: string;
    description: {
        [key: string]: string;
        en: string;
        ru: string;
        pl: string;
    };
}
