import template from './index.html';
import Component from '../../component';
import './style.scss';

export default class ProductGalleryComponent extends Component {
    assetRoot: string;
    productID: string;
    constructor(temp: string = template, assetRoot: string, productID: string) {
        super(temp);
        this.marker = 'product-gallery';
        this.assetRoot = assetRoot;
        this.productID = productID;
        this.node = this.getNode();
    }

    getNode(): Node {
        let node = super.getNode();
        const images = [];
        for (let i = 1; i <= 4; i++) {
            const image = new Image();
            image.setAttribute('src', `${this.assetRoot}${this.productID}/${i}.jpg`);
            images.push(image);
        }
        images.forEach((image) => {
            node.appendChild(image);
        });
        return node;
    }
}
