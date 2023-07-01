import './style.scss';
import Component from '../component';
import template from './index.html';
import PageBuilder from '../../view/pageBuilder';
import SettingLoader from '../../controller/settingLoader';
import Settings from '../../interface/settings';
import ProductList from '../../interface/productList';

export default class CollectionsComponent extends Component {
    constructor(temp: string = template) {
        super(temp);
        this.marker = 'collections';
        this.node = this.getNode();
    }
    getNode(): Node {
        let node = super.getNode();
        //let main = (node as HTMLElement).getElementsByClassName('breadcrumbs-home')[0] as HTMLSelectElement;

        return node;
    }
}
