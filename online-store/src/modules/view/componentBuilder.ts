import Builder from './builder';

/*Interfaces*/
import ProductList from '../interface/productList';
import Product from '../interface/product';
import Settings from '../interface/settings';

/*Components*/
import ProductComponent from '../components/product';
import HeaderComponent from '../components/header';
import FooterComponent from '../components/footer';
import CatalogComponent from '../components/catalog';
import LanguageSwitcherComponent from '../components/language-switcher';
import H1Component from '../components/h1';
import BreadcrumbsComponent from '../components/breadcrumbs';
import NavigationComponent from '../components/navigation';
import FiltersComponent from '../components/filters';
import FilterComponent from '../components/filters/filter';
import RangeFilterComponent from '../components/filters/rangeFilter';
import SearchComponent from '../components/search';
import BurgerComponent from '../components/burger';
import ProductSectionComponent from '../components/product-section';
import ProductDetailsComponent from '../components/product-section/product-details';
import ProductGalleryComponent from '../components/product-section/product-gallery';

import getHTMLElement from '../../utils/getHTMLElement';

import translate from '../components/translation';

export default class ComponentBuilder extends Builder {
    data: ProductList;
    settings: Settings;
    constructor(data: ProductList, settings: Settings) {
        super();
        this.data = data;
        this.settings = settings;
    }
    build(component: string, ...props: Array<string>) {
        switch (component) {
            case 'header':
                return this.createHeader();
            case 'footer':
                return this.createFooter();
            case 'catalog':
                return this.createCatalog();
            case 'navigation':
                return this.createNavigation(props[0]);
            case 'filter':
                return this.createFilters();
            case 'burger':
                return this.createBurger();
            case 'product-section':
                return this.createProductSection(props[0], this.settings.roots.products.assets.images);
        }
    }

    createCatalog(data: ProductList = this.data, settings: Settings = this.settings) {
        let catalog = new CatalogComponent(undefined, Object.keys(data).length, 9, settings.language.default);

        if (Object.keys(data).length > 0) {
            let productList = [];
            for (const key in this.data) {
                let product = new ProductComponent(
                    undefined,
                    data[key],
                    settings.currency.default,
                    settings.roots.products.assets.images
                );
                productList.push(product.node);
            }
            return catalog.insertAll(undefined, ...productList);
        } else {
            let language = window.localStorage.getItem('language');
            let emptyNode = catalog.getEmptyTemplateNode();
            let note = getHTMLElement(getHTMLElement(emptyNode).getElementsByClassName('emptyCatalog')[0]);

            if (language) {
                note.textContent = translate[language].emptyCatalog;
            } else {
                note.textContent = translate[settings.language.default].emptyCatalog;
            }
            return emptyNode;
        }
    }
    createHeader() {
        let header = new HeaderComponent();
        let langSwitcher = new LanguageSwitcherComponent(undefined, this.settings.language.default);
        return header.insert(undefined, langSwitcher.node);
    }
    createFooter() {
        let langSwitcher = new LanguageSwitcherComponent(undefined, this.settings.language.default);
        let footer = new FooterComponent();
        return footer.insert(undefined, langSwitcher.node);
    }
    createNavigation(page: string) {
        let breadcrumbs = new BreadcrumbsComponent();
        let h1 = new H1Component(undefined, page);
        let navigation = new NavigationComponent();
        let node = navigation.insert(undefined, h1.node, breadcrumbs.node);
        return node;
    }
    createFilters() {
        const materialFilter = new FilterComponent(undefined, 'material');
        const genderFilter = new FilterComponent(undefined, 'gender');
        const stockFilter = new FilterComponent(undefined, 'stock');
        const typeFilter = new FilterComponent(undefined, 'type');
        const rangeFilter = new RangeFilterComponent(undefined);
        const filters = new FiltersComponent();
        const search = new SearchComponent();
        return filters.insert(
            undefined,
            materialFilter.node,
            genderFilter.node,
            stockFilter.node,
            typeFilter.node,
            rangeFilter.node,
            search.node
        );
    }
    createBurger() {
        let burger = new BurgerComponent();
        let langSwitcher = new LanguageSwitcherComponent(undefined, this.settings.language.default);
        return burger.insert(undefined, langSwitcher.node);
    }
    createProductSection(productID: string, assetRoot: string) {
        let product: Product = this.data[productID];
        let section = new ProductSectionComponent();
        let details = new ProductDetailsComponent(undefined, product);
        let gallery = new ProductGalleryComponent(undefined, assetRoot, productID);
        return section.insert(undefined, gallery.node, details.node);
    }
}
