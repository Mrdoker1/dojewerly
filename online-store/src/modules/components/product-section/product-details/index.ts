import template from './index.html';
import Component from '../../component';
import Product from '../../../interface/product';
import Settings from '../../../interface/settings';
import PageBuilder from '../../../view/pageBuilder';
import ProductList from '../../../interface/productList';
import SettingLoader from '../../../controller/settingLoader';
import './style.scss';

export default class ProductDetailsComponent extends Component {
    product: Product;
    settings: Settings;
    prevPage: string;
    constructor(temp: string = template, product: Product, settings: Settings, prevPage: string) {
        super(temp);
        this.marker = 'product-details';
        this.product = product;
        this.settings = settings;
        this.prevPage = prevPage;
        this.node = this.getNode();
    }

    getNode(): Node {
        let node = super.getNode();
        if (this.product) {
            let header = (node as HTMLElement).getElementsByClassName('product-details-header')[0];
            let material = (node as HTMLElement).getElementsByClassName('product-details-material-text')[0];
            let gender = (node as HTMLElement).getElementsByClassName('product-details-gender-text')[0];
            let id = (node as HTMLElement).getElementsByClassName('product-details-id-text')[0];
            let description = (node as HTMLElement).getElementsByClassName('product-details-description')[0];
            let price = (node as HTMLElement).getElementsByClassName('product-details-price')[0];
            let stock = (node as HTMLElement).getElementsByClassName('product-details-stock')[0];
            header.textContent = this.product.name;
            material.textContent = `Material: ${this.product.props.material}`;
            gender.textContent = `Gender: ${this.product.props.gender}`;
            id.textContent = `Item No.: ${this.product.props.id}`;
            description.textContent = `${this.product.props.description}`;
            price.textContent = `${this.settings.currency.default} ${this.product.price}`;
            stock.textContent = this.product.stock >= 0 ? `${this.product.stock} in stock` : `Preorder`;

            let nav = (node as HTMLElement).getElementsByClassName('product-details-nav')[0];

            nav.addEventListener('click', () => {
                let callback = (settings: Settings, productList: ProductList) => {
                    let builder = new PageBuilder();
                    builder.build(this.prevPage, productList, settings);
                };
                let settings: SettingLoader = new SettingLoader(true);
                settings.load('data/settings.json', callback);
            });
        }
        return node;
    }
}
