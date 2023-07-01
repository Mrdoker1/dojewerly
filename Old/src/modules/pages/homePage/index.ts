import './style.scss';
import Component from '../../components/component';
import template from './index.html';

export default class ProductPage extends Component {
    constructor(temp: string = template) {
        super(temp);
        this.marker = 'home-page';
        this.node = super.getNode();
    }
}
