import Builder from './builder';
import ComponentBuilder from './componentBuilder';
import CatalogPage from '../pages/catalogPage';
import ProductPage from '../pages/productPage';
import ProductList from '../interface/productList';
import Settings from '../interface/settings';
import Notification from '../components/notification';
import getHTMLElement from '../../utils/getHTMLElement';
import * as noUiSlider from 'nouislider';
interface noUiSliderInstance extends HTMLElement {
    noUiSlider: noUiSlider.API;
}

export default class PageBuilder extends Builder {
    constructor() {
        super();
    }
    build(component: string, data?: ProductList, settings?: Settings, ...props: Array<string>) {
        let body = document.querySelector('body')!;
        switch (component) {
            case 'catalog-page':
                let catalog = this.createCatalogPage(data!, settings!);
                body.innerHTML = '';
                this.setTopNotification();
                body.appendChild(catalog);
                this.setSlider(settings!);
                this.callBuildEvent(component);
                break;
            case 'product-page':
                let product = this.createProductPage(data!, settings!, props[0], props[1]);
                body.innerHTML = '';
                this.setTopNotification();
                body.appendChild(product);
                this.callBuildEvent(component);
                break;
        }
    }
    createCatalogPage(data: ProductList, settings: Settings) {
        let builder = new ComponentBuilder(data, settings);
        let page = new CatalogPage();
        let temp = page.insert(
            undefined,
            builder.build('burger')!,
            builder.build('header')!,
            builder.build('navigation', 'Catalog')!,
            builder.build('filter')!,
            builder.build('catalog')!,
            builder.build('footer')!
        );
        return temp;
    }
    createProductPage(data: ProductList, settings: Settings, productID: string, prevPage: string) {
        let builder = new ComponentBuilder(data, settings);
        let page = new ProductPage();
        let temp = page.insert(
            undefined,
            builder.build('burger')!,
            builder.build('header')!,
            builder.build('product-section', productID, prevPage)!,
            builder.build('footer')!
        );
        return temp;
    }
    callBuildEvent(component: string) {
        const event = new CustomEvent('pageBuilded', {
            detail: {
                component: component,
            },
        });
        document.dispatchEvent(event);
    }
    setTopNotification() {
        let notification = new Notification(undefined, 'top', 'Working in progress');
        notification.show();
    }
    setSlider(settings: Settings) {
        let slider = getHTMLElement(document.querySelector('.price-slider'));
        (slider as noUiSliderInstance).noUiSlider.on('update', () => {
            let value = (slider as noUiSliderInstance).noUiSlider.get() as Array<string>;
            let startRange = getHTMLElement(document.querySelector('.price-filter-start-range'));
            let finishRange = getHTMLElement(document.querySelector('.price-filter-finish-range'));
            startRange.textContent = `${settings.currency.default}${value[0]}`;
            finishRange.textContent = `${settings.currency.default}${value[1]}`;
        });
    }
}
