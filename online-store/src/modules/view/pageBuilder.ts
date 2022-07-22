import Builder from './builder';
import ComponentBuilder from './componentBuilder';
import CatalogPage from '../pages/catalogPage';
import Products from '../interface/products';
import Settings from '../interface/settings';
import Notification from '../components/notification';

export default class PageBuilder extends Builder {
    constructor() {
        super();
    }
    build(component: string, data?: Products, settings?: Settings) {
        switch (component) {
            case 'catalog-page':
                return this.createCatalogPage(data!, settings!);
        }
    }
    createCatalogPage(data: Products, settings: Settings) {
        let builder = new ComponentBuilder(data, settings);
        let page = new CatalogPage();
        let temp = page.insert(
            undefined,
            builder.build('header')!,
            builder.build('navigation')!,
            builder.build('filter')!,
            builder.build('catalog')!,
            builder.build('footer')!
        );
        document.querySelector('body')!.appendChild(temp);
        const event = new CustomEvent('pageBuilded', {
            detail: {
                component: `catalog-page`,
            },
        });
        document.dispatchEvent(event);
        let notification = new Notification(undefined, 'top', 'Working in progress');
        notification.show();
    }
}
