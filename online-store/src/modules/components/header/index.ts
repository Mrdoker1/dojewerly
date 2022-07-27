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

        const keys: { [key: number]: number } = { 37: 1, 38: 1, 39: 1, 40: 1 };

        function preventDefault(e: Event) {
            e.preventDefault();
        }

        function preventDefaultForScrollKeys(e: KeyboardEvent) {
            if (keys[e.keyCode]) {
                preventDefault(e);
                return false;
            }
        }

        // modern Chrome requires { passive: false } when adding event
        let supportsPassive = false;
        try {
            let options = Object.defineProperty({}, 'passive', {
                get: function () {
                    supportsPassive = true;
                },
            });
            window.addEventListener('test', () => {}, options);
        } catch (e) {
            throw e;
        }

        var wheelOpt = (supportsPassive ? { passive: false } : false) as EventListenerOptions;
        var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

        function disableScroll() {
            window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
            window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
            window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
            window.addEventListener('keydown', preventDefaultForScrollKeys, false);
        }

        // call this to Enable
        function enableScroll() {
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
            window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
            window.removeEventListener('touchmove', preventDefault, wheelOpt);
            window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
        }

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
