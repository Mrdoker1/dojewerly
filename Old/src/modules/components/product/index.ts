import './style.scss';
import Component from '../component';
import template from './index.html';
import '../../../assets/img/products/example/1.jpg';
import Product from '../../interface/product';
import Cart from '../../interface/cart';
import LoaderComponent from '../../components/loader';
import PageBuilder from '../../view/pageBuilder';
import SettingLoader from '../../controller/settingLoader';
import Settings from '../../interface/settings';
import ProductList from '../../interface/productList';
import getElement from '../../../utils/getElement';
import getHTMLImageElement from '../../../utils/getHTMLImageElement';

export default class ProductComponent extends Component {
    marker: string;
    page: string;
    constructor(temp: string = template, productData: Product, currency: string, assetsRoot: string, page: string) {
        super(temp);
        this.marker = 'product';
        this.template = `<div class="product">
            <img class="product-image">
            <div class="product-wrapper">
                <div class="product-name">${productData.name}</div>
                <div class="product-info">${productData.props.info}</div>
                <div class="product-price">${currency}${productData.price}</div>
            </div>
        </div>`;
        this.page = page;
        this.node = this.getProductNode(assetsRoot, productData);
    }
    getProductNode(assetsRoot: string, productData: Product): Node {
        let node = super.getNode();
        let component = getHTMLImageElement(getElement(node).getElementsByClassName('product-image')[0]);

        let url = `${assetsRoot}${productData.props.id}/main.jpg`;
        if (this.imageExists(url)) {
            component.src = url;
        } else {
            component.src = `./assets/img/no-image.svg`;
        }

        component.src = `${assetsRoot}${productData.props.id}/main.jpg`;

        document.addEventListener('pageBuilded', () => {
            let cart: Cart = this.getCartInfo();
            this.updateView(productData, component, cart);
        });

        document.addEventListener('componentUpdated', () => {
            let cart: Cart = this.getCartInfo();
            this.updateView(productData, component, cart);
        });

        node.addEventListener('click', (e) => {
            this.showProduct(productData.props.id, this.page);

            // let cart: Cart = this.getCartInfo();

            // if (cart.products.length >= 20 && cart.products.indexOf(productData.props.id) == -1) {
            //     let notification = new Notification(undefined, 'popup', "You can't add more than 20 products in cart");
            //     notification.show();
            // } else {
            //     if (cart.products.indexOf(productData.props.id) == -1) {
            //         console.log(`Product ${productData.props.id} added to Shopping cart!`);
            //         cart.products.push(productData.props.id);
            //         window.localStorage.setItem('cart', JSON.stringify(cart));
            //     } else {
            //         console.log(`Product ${productData.props.id} removed from Shopping cart!`);
            //         cart.products.splice(cart.products.indexOf(productData.props.id), 1);
            //         window.localStorage.setItem('cart', JSON.stringify(cart));
            //     }
            //     this.updateView(productData, component, cart);
            // }
        });

        return node;
    }
    updateView(productData: Product, component: HTMLElement, cart: Cart) {
        let productCounter: HTMLElement = document.querySelector('.product-counter')!;

        if (cart.products.indexOf(productData.props.id) == -1) {
            productCounter.textContent = `${cart.products.length}`;
            component.style.borderRadius = ``;
            component.style.webkitFilter = ``;
        } else {
            productCounter.textContent = `${cart.products.length}`;
            component.style.borderRadius = `200px 200px 200px 200px`;
            component.style.webkitFilter = `grayscale(100%)`;
        }

        if (cart.products.length <= 0) {
            productCounter.classList.add('hide');
        } else {
            productCounter.classList.remove('hide');
        }
    }

    getCartInfo(): Cart {
        let cart: Cart = { summary: 0, products: [] };

        if (window.localStorage.getItem('cart')) {
            cart = JSON.parse(window.localStorage.getItem('cart')!);
        } else {
            window.localStorage.setItem('cart', JSON.stringify(cart));
        }

        return cart;
    }

    showProduct(productID: number, page: string) {
        let callback = (settings: Settings, productList: ProductList) => {
            let builder = new PageBuilder();
            builder.build('product-page', productList, settings, `${productID}`, page);
        };
        let settings: SettingLoader = new SettingLoader(true);
        settings.load('data/settings.json', callback);
    }

    imageExists(image_url: string) {
        var http = new XMLHttpRequest();
        http.open('HEAD', image_url, false);
        http.send();
        return http.status != 404;
    }
}