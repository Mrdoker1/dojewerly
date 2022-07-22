export default interface Settings {
    type: string;
    roots: {
        products: {
            data: string;
            assets: {
                images: string;
                videos: string;
            };
        };
    };
    language: {
        default: string;
    };
}
