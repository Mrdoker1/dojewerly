import template from './index.html';
import Component from '../../component';
import Product from '../../../interface/product';
import './style.scss';

export default class ProductDetailsComponent extends Component {
    constructor(temp: string = template, product: Product) {
        super(temp);
        this.marker = 'product-details';
        this.node = this.getNode();
    }

    getNode(): Node {
        let node = super.getNode();
        return node;
    }
}
