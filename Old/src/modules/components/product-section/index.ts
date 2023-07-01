import template from './index.html';
import Component from '../component';
import PageBuilder from '../../view/pageBuilder';
import SettingLoader from '../../controller/settingLoader';
import Settings from '../../interface/settings';
import ProductList from '../../interface/productList';
import './style.scss';

export default class ProductSectionComponent extends Component {
    productName: string;
    prevPage: string;
    constructor(temp: string = template, productName: string, prevPage: string) {
        super(temp);
        this.marker = 'product-section';
        this.productName = productName;
        this.prevPage = prevPage;
        this.node = this.getNode();
    }

    getNode(): Node {
        let node = super.getNode();
        let header = (node as HTMLElement).getElementsByClassName('product-details-header')[0];
        let nav = (node as HTMLElement).getElementsByClassName('product-details-nav')[0];
        header.textContent = this.productName;

        nav.addEventListener('click', () => {
            let callback = (settings: Settings, productList: ProductList) => {
                let builder = new PageBuilder();
                builder.build(this.prevPage, productList, settings);
            };
            let settings: SettingLoader = new SettingLoader(true);
            settings.load('data/settings.json', callback);
        });
        return node;
    }
}
