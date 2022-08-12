import Builder from './builder';

/*Interfaces*/
import ProductList from '../interface/productList';
import Product from '../interface/product';
import Settings from '../interface/settings';
import Collections from '../interface/collections';
import Collection from '../interface/collection';

/*Components*/
import CollectionsComponent from '../components/collections';
import CollectionComponent from '../components/collections/collection';
import ProductComponent from '../components/product';
import BannerComponent from '../components/banner';
import InstagramComponent from '../components/instagram';
import HeroComponent from '../components/hero';
import SliderComponent from '../components/slider';
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
                return this.createHeader(props[0]);
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
            case 'hero':
                return this.createHeroSection();
            case 'slider':
                return this.createProductSlider();
            case 'instagram':
                return this.createInstagramSection();
            case 'banner':
                return this.createBannerSection(props[0]);
            case 'collections':
                return this.createCollectionsSection();
            case 'product':
                return this.createProductSection(
                    props[0],
                    props[1],
                    this.settings.roots.products.assets.images,
                    this.settings
                );
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
                    settings.roots.products.assets.images,
                    'catalog-page'
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
    createHeader(page: string = '') {
        let header = new HeaderComponent(undefined, page);
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
    createProductSection(productID: string, prevPage: string, assetRoot: string, settings: Settings) {
        let product: Product = this.data[productID];
        let section = new ProductSectionComponent(undefined, product.name, prevPage);
        let details = new ProductDetailsComponent(undefined, product, settings, prevPage);
        let gallery = new ProductGalleryComponent(undefined, assetRoot, productID);
        return section.insert(undefined, gallery.node, details.node);
    }
    createHeroSection() {
        let hero = new HeroComponent();
        return hero.node;
    }
    createInstagramSection() {
        let instagram = new InstagramComponent();
        return instagram.node;
    }
    createProductSlider() {
        let slider = new SliderComponent();
        let products = [];
        if (Object.keys(this.data).length > 0) {
            for (const key in this.data) {
                const product = new ProductComponent(
                    undefined,
                    this.data[key],
                    this.settings.currency.default,
                    this.settings.roots.products.assets.images,
                    'home-page'
                );

                const slide = document.createElement('div');
                slide.classList.add('swiper-slide');
                slide.appendChild(product.node);
                products.push(slide);
            }
        }

        return slider.insertAll(undefined, ...products);
    }
    createBannerSection(type: string) {
        let banner = new BannerComponent(undefined, type);
        return banner.node;
    }
    async createCollectionsSection() {
        let collections = new CollectionsComponent();

        async function getCollections(): Promise<Collections> {
            const response = await fetch('data/collections.json');
            if (response) {
                return response.json();
            } else {
                return {};
            }
        }

        let collectionList = await getCollections().then((collections) => {
            const list: Array<Node> = [];
            for (let key in collections) {
                const collection = new CollectionComponent(undefined, collections[key]);
                list.push(collection.node);
            }
            return list;
        });

        return collections.insertAll(undefined, ...collectionList);
    }
}
