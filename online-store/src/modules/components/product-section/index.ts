import template from './index.html';
import Component from '../component';
import './style.scss';

export default class ProductSectionComponent extends Component {
    constructor(temp: string = template) {
        super(temp);
        this.marker = 'product-section';
        this.node = this.getNode();
    }

    getNode(): Node {
        let node = super.getNode();
        return node;
    }
}
