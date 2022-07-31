import template from './index.html';
import Component from '../component';
import './style.scss';

export default class ProductGalleryComponent extends Component {
    constructor(temp: string = template) {
        super(temp);
        this.marker = 'product-gallery';
        this.node = this.getNode();
    }

    getNode(): Node {
        let node = super.getNode();
        return node;
    }
}
