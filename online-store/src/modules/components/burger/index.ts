import template from './index.html';
import Component from '../component';
import './style.scss';

export default class BurgerComponent extends Component {
    constructor(temp: string = template) {
        super(temp);
        this.marker = 'burger';
        this.node = this.getNode();
    }

    getNode(): Node {
        let node = super.getNode();
        //let search = (node as HTMLElement).getElementsByClassName('search-icon')[0] as HTMLSelectElement;
        return node;
    }
}
