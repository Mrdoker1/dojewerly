import './style.scss';
import Component from '../component';
import template from './index.html';
import getHTMLElement from '../../../utils/getHTMLElement';

export default class CatalogComponent extends Component {
    maxProductOnPage: number;
    constructor(temp: string = template, maxProductOnPage: number = 9) {
        super(temp);
        this.marker = 'catalog';
        this.node = super.getNode();
        this.maxProductOnPage = maxProductOnPage;
    }
    getNode(): Node {
        let node = super.getNode();
        let button = getHTMLElement(getHTMLElement(node).getElementsByClassName('show-more')[0]);
        let catalog = getHTMLElement(getHTMLElement(node).getElementsByClassName('catalog-wrapper')[0]);

        document.addEventListener('pageBuilded', () => {
            let products = document.querySelectorAll('.product');
            let button = document.querySelector('.show-more')!;

            if (products.length < this.maxProductOnPage) {
                button.classList.add('hide');
            } else {
                button.classList.remove('hide');
                button.textContent = `Show more (${products.length - this.maxProductOnPage})`;
            }
        });

        document.addEventListener('componentUpdated', () => {
            let button = document.querySelector('.show-more')!;
            let products = document.querySelectorAll('.product');

            if (products.length < this.maxProductOnPage) {
                button.classList.add('hide');
            } else {
                button.classList.remove('hide');
                button.textContent = `Show more (${products.length - this.maxProductOnPage})`;
            }
        });

        button.addEventListener('click', () => {
            let products = document.querySelectorAll('.product');
            let button = document.querySelector('.show-more')!;

            if (catalog.classList.contains('hide-content')) {
                catalog.classList.remove('hide-content');
                catalog.classList.add('show-content');
                button.textContent = 'Hide';
            } else {
                catalog.classList.remove('show-content');
                catalog.classList.add('hide-content');
                button.textContent = `Show more (${products.length - this.maxProductOnPage})`;
            }
        });
        return node;
    }
}
