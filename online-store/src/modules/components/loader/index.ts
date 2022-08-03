import template from './index.html';
import Component from '../component';
import './style.scss';

export default class LoaderComponent extends Component {
    constructor(temp: string = template) {
        super(temp);
        this.marker = 'loader';
        this.node = this.getNode();
    }

    getNode(): Node {
        let node = super.getNode();
        let status = (node as HTMLElement).getElementsByClassName('page-loader-status')[0] as HTMLSelectElement;
        // document.addEventListener('loaderStatusUpdated', (e: CustomEventInit) => {
        //     status.style.width = `${e.detail.percent}px`;
        // });

        document.addEventListener('pageBuilded', () => {
            const loader = document.querySelector('.page-loader-div');
            loader?.remove();
        });

        document.addEventListener('componentUpdated', () => {
            const loader = document.querySelector('.page-loader-div');
            loader?.remove();
        });

        return node;
    }

    displayLoading() {
        document.body.prepend(this.getFragment());
    }
}
