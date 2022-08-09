import './style.scss';
import Component from '../component';
import template from './index.html';
import PageBuilder from '../../view/pageBuilder';
import SettingLoader from '../../controller/settingLoader';
import Settings from '../../interface/settings';
import ProductList from '../../interface/productList';

export default class BreadcrumbsComponent extends Component {
    constructor(temp: string = template) {
        super(temp);
        this.marker = 'breadcrumbs';
        this.node = this.getNode();
    }
    getNode(): Node {
        let node = super.getNode();
        let main = (node as HTMLElement).getElementsByClassName('breadcrumbs-home')[0] as HTMLSelectElement;

        main.addEventListener('click', () => {
            let callback = (settings: Settings, productList: ProductList) => {
                let builder = new PageBuilder();
                builder.build('home-page', productList, settings);
            };

            let settings: SettingLoader = new SettingLoader(true);
            settings.load('data/settings.json', callback);
        });

        return node;
    }
}
