import Builder from './builder';

/*Interfaces*/
import Products from '../interface/products';
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

export default class ComponentBuilder extends Builder {
    data: Products;
    settings: Settings;
    constructor(data: Products, settings: Settings) {
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
        }
    }

    createCatalog(data: Products = this.data, settings: Settings = this.settings) {
        let catalog = new CatalogComponent();
        let productList = [];

        for (const key in this.data.en.products) {
            let product = new ProductComponent(undefined, data.en.products[key], settings.roots.products.assets.images);
            productList.push(product.node);
        }
        return catalog.insertAll(undefined, ...productList);
    }
    createHeader() {
        let header = new HeaderComponent();
        let langSwitcher = new LanguageSwitcherComponent();
        return header.insert(undefined, langSwitcher.node);
    }
    createFooter() {
        let langSwitcher = new LanguageSwitcherComponent();
        let footer = new FooterComponent();
        return footer.insert(undefined, langSwitcher.node);
    }
    createNavigation(h1Name: string) {
        let breadcrumbs = new BreadcrumbsComponent();
        let h1 = new H1Component(undefined, h1Name);
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
}
