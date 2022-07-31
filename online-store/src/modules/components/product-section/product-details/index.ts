import template from './index.html';
import Component from '../../component';
import Product from '../../../interface/product';
import Settings from '../../../interface/settings';
import './style.scss';

export default class ProductDetailsComponent extends Component {
    product: Product;
    settings: Settings;
    constructor(temp: string = template, product: Product, settings: Settings) {
        super(temp);
        this.marker = 'product-details';
        this.product = product;
        this.settings = settings;
        this.node = this.getNode();
    }

    getNode(): Node {
        let node = super.getNode();
        if (this.product) {
            let material = (node as HTMLElement).getElementsByClassName('product-details-material-text')[0];
            let gender = (node as HTMLElement).getElementsByClassName('product-details-gender-text')[0];
            let id = (node as HTMLElement).getElementsByClassName('product-details-id-text')[0];
            let description = (node as HTMLElement).getElementsByClassName('product-details-description')[0];
            let price = (node as HTMLElement).getElementsByClassName('product-details-price')[0];
            let stock = (node as HTMLElement).getElementsByClassName('product-details-stock')[0];
            material.textContent = `Material: ${this.product.props.material}`;
            gender.textContent = `Gender: ${this.product.props.gender}`;
            id.textContent = `Item No.: ${this.product.props.id}`;
            description.textContent = `${this.product.props.description}`;
            price.textContent = `${this.settings.currency.default} ${this.product.price}`;
            stock.textContent = `${this.product.stock} in stock`;
        }
        return node;
    }
}
