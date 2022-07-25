import './style.scss';
import Component from '../component';
import template from './index.html';
import emptyTemplate from './empty.html';
import getHTMLElement from '../../../utils/getHTMLElement';

export default class CatalogComponent extends Component {
    productsCount: number;
    maxProductOnPage: number;
    constructor(temp: string = template, productsCount: number, maxProductOnPage: number = 9) {
        super(temp);
        this.marker = 'catalog';
        this.productsCount = productsCount;
        this.maxProductOnPage = maxProductOnPage;
        this.node = super.getNode();
    }
    getNode(): Node {
        let node = super.getNode();
        let button = getHTMLElement(getHTMLElement(node).getElementsByClassName('show-more')[0]);
        let catalog = getHTMLElement(getHTMLElement(node).getElementsByClassName('catalog-wrapper')[0]);

        document.addEventListener('pageBuilded', () => {
            let button = document.querySelector('.show-more')!;

            if (this.productsCount && button) {
                if (this.productsCount < this.maxProductOnPage) {
                    button.classList.add('hide');
                } else {
                    button.classList.remove('hide');
                    button.textContent = `Show more (${this.productsCount - this.maxProductOnPage})`;
                }
            }
        });

        document.addEventListener('componentUpdated', () => {
            let button = document.querySelector('.show-more')!;

            if (this.productsCount) {
                if (this.productsCount < this.maxProductOnPage) {
                    button.classList.add('hide');
                } else {
                    button.classList.remove('hide');
                    button.textContent = `Show more (${this.productsCount - this.maxProductOnPage})`;
                }
            }
        });

        button.addEventListener('click', () => {
            let button = document.querySelector('.show-more')!;

            if (catalog.classList.contains('hide-content')) {
                catalog.classList.remove('hide-content');
                catalog.classList.add('show-content');
                button.textContent = 'Hide';
            } else {
                catalog.classList.remove('show-content');
                catalog.classList.add('hide-content');
                button.textContent = `Show more (${this.productsCount - this.maxProductOnPage})`;
            }
        });
        return node;
    }
    getEmptyTemplateNode(): Node {
        return super.getNode(emptyTemplate);
    }
}
