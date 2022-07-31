import template from './index.html';
import Component from '../component';
import './style.scss';

export default class ProductSectionComponent extends Component {
    productName: string;
    constructor(temp: string = template, productName: string) {
        super(temp);
        this.marker = 'product-section';
        this.productName = productName;
        this.node = this.getNode();
    }

    getNode(): Node {
        let node = super.getNode();
        let header = (node as HTMLElement).getElementsByClassName('product-details-header')[0];
        header.textContent = this.productName;
        return node;
    }
}
