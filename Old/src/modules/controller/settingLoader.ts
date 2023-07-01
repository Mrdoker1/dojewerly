import Loader from './loader';
import ProductLoader from './productLoader';
import Settings from '../interface/settings';
import LoaderComponent from '../components/loader';

export default class SettingLoader extends Loader {
    constructor(showLoader: Boolean, ...callbacks: Array<Function>) {
        super(...callbacks);
        if (showLoader == true) {
            this.showLoad();
        }
    }
    async run(url: string) {
        await fetch(url)
            .then(super.errorHandler)
            .then((res: Response) => res.json())
            .then((data: Settings) => {
                let language = window.localStorage.getItem('language');
                if (language) {
                    data.language.default = language;
                }
                const productLoader: ProductLoader = new ProductLoader(data);
                productLoader.run();
            })
            .catch((err: Error) => {
                console.error(err);
            });
    }
    async load(url: string, ...callbacks: Array<Function>) {
        await fetch(url)
            .then(super.errorHandler)
            .then((res: Response) => res.json())
            .then((settings: Settings) => {
                const products: ProductLoader = new ProductLoader(settings, ...callbacks);
                products.load();
            })
            .catch((err: Error) => {
                console.error(err);
            });
    }

    showLoad() {
        let loader = new LoaderComponent();
        loader.displayLoading();
    }
}
