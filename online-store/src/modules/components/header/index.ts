import template from './index.html';
import Component from '../component';
import './style.scss';
import PageBuilder from '../../view/pageBuilder';
import { disableScroll, enableScroll } from '../scrollControl';
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
        const logo = (node as HTMLElement).getElementsByClassName('logo')[0] as HTMLElement;

        document.addEventListener('scroll', ()=> {
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                (node as HTMLElement).style.backgroundColor = '#fff';
            } else {
                (node as HTMLElement).style.backgroundColor = 'transparent';
            }
        });

        burger.addEventListener('click', () => {
            const burgerMenu = document.querySelector('.burger-menu')! as HTMLElement;
            const body = document.querySelector('body')!;
            const header = document.querySelector('.header')! as HTMLElement;
            if (burgerMenu.classList.contains('hide')) {
                burgerMenu.classList.remove('hide');
                burgerMenu.style.display = 'flex';
                if (window.pageYOffset > 0) {
                    burgerMenu.style.top = `${window.pageYOffset}px`;
                } else {
                    burgerMenu.style.top = `0px`;
                }
                header.style.backgroundColor = '#F4F4F2';

                disableScroll();
                burger.style.background = 'url("./assets/img/close.svg")';
            } else {
                burgerMenu.classList.add('hide');
                burgerMenu.style.display = '';
                burgerMenu.style.position = '';
                header.style.backgroundColor = '#FFF';
                enableScroll();
                burger.style.background = 'url("./assets/img/burger.svg")';
            }
        });

        search.addEventListener('click', () => {
            //window.location.href = '';
            enableScroll();
            let callback = (settings: Settings, productList: ProductList) => {
                let builder = new PageBuilder();
                builder.build('catalog-page', productList, settings);
                const filters = document.querySelector('.filters')! as HTMLElement;
                const searchField = document.querySelector('.search-field')! as HTMLElement;
                filters.classList.add('show-filter');
                searchField.focus();
            };

            let settings: SettingLoader = new SettingLoader(true);
            settings.load('data/settings.json', callback);
        });

        logo.addEventListener('click', () => {
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
