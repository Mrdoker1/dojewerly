import './style.scss';
import Component from '../component';
import template from './index.html';
import getHTMLElement from '../../../utils/getHTMLElement';
import getHTMLHeadingElement from '../../../utils/getHTMLHeadingElement';

export default class H1Component extends Component {
    page: string;
    name: string;
    constructor(temp: string = template, page: string, name: string = 'example') {
        //let heading = template.replaceAll(`Heading Example<\/h1>`, `${name}<\/h1>`);
        super(template);
        this.marker = 'h1';
        this.page = page;
        this.name = name;
        this.node = this.getNode();
    }

    getNode(): Node {
        let node = super.getNode();
        switch (this.page) {
            case 'Catalog':
                getHTMLElement(node).dataset.i18 = `h1${this.page}`;
                break;
            case 'Product':
                getHTMLHeadingElement(node).innerHTML = this.name;
                break;
            default:
                getHTMLElement(node).dataset.i18 = `h1${this.page}`;
                getHTMLHeadingElement(node).innerHTML = this.name;
        }
        return node;
    }
}
