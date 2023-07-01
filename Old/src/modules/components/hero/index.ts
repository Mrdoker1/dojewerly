import './style.scss';
import Component from '../component';
import template from './index.html';
import PageBuilder from '../../view/pageBuilder';
import SettingLoader from '../../controller/settingLoader';
import Settings from '../../interface/settings';
import ProductList from '../../interface/productList';

export default class HeroComponent extends Component {
    constructor(temp: string = template) {
        super(temp);
        this.marker = 'hero-section';
        this.node = this.getNode();
    }
    getNode(): Node {
        let node = super.getNode();
        let catalogButton = (node as HTMLElement).getElementsByClassName('hero-search-catalog')[0];
        let careGuideButton = (node as HTMLElement).getElementsByClassName('hero-care-guide')[0];
        let video = (node as HTMLElement).getElementsByClassName('hero-video')[0] as HTMLVideoElement;
        video.src = './assets/video/hero.mp4';

        document.addEventListener('pageBuilded', () => {
            video.src = './assets/video/hero.mp4';
        });

        catalogButton.addEventListener('click', () => {
            let callback = (settings: Settings, productList: ProductList) => {
                let builder = new PageBuilder();
                builder.build('catalog-page', productList, settings);
            };
            let settings: SettingLoader = new SettingLoader(true);
            settings.load('data/settings.json', callback);
        });
        return node;
    }
}
