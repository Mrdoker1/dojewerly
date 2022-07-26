import template from './index.html';
import Component from '../component';
import './style.scss';
import PageBuilder from '../../view/pageBuilder';
import BurgerComponent from '../../components/burger';
import SettingLoader from '../../controller/settingLoader';
import Settings from '../../interface/settings';
import ProductList from '../../interface/productList';

export default class HeaderComponent extends Component {
    constructor(temp: string = template) {
        super(temp);
        this.marker = 'header';
        this.node = this.getNode();
    }

    getNode(): Node {
        let node = super.getNode();
        const search = (node as HTMLElement).getElementsByClassName('search-icon')[0] as HTMLElement;
        const burger = (node as HTMLElement).getElementsByClassName('burger-icon')[0] as HTMLElement;

        burger.addEventListener('click', () => {
            const burgerMenu = document.querySelector('.burger-menu')! as HTMLElement;
            const body = document.querySelector('body')!;
            const header = document.querySelector('.header')! as HTMLElement;
            if (burgerMenu.classList.contains('hide')) {
                burgerMenu.classList.remove('hide');
                body.style.overflow = 'hidden';
                header.style.position = 'absolute';
                header.style.width = '91%';
                burger.style.background = 'url("./assets/img/close.svg")';
            } else {
                burgerMenu.classList.add('hide');
                body.style.overflow = 'initial';
                header.style.position = 'relative';
                header.style.width = '';
                header.style.top = '';
                burger.style.background = 'url("./assets/img/burger.svg")';
            }

        });

        search.addEventListener('click', () => {
            //window.location.href = '';

            let callback = (settings: Settings, productList: ProductList) => {
                document.body.innerHTML = '';
                let builder = new PageBuilder();
                builder.createCatalogPage(productList, settings);
            };

            let settings: SettingLoader = new SettingLoader();
            settings.load('data/settings.json', callback);
        });
        return node;
    }
}
