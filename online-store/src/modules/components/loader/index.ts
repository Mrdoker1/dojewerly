import template from './index.html';
import Component from '../component';
import translate from '../../components/translation';
import getVideoElement from '../../../utils/getVideoElement';
import './style.scss';

export default class LoaderComponent extends Component {
    constructor(temp: string = template) {
        super(temp);
        this.marker = 'loader';
        this.node = this.getNode();
    }

    getNode(): Node {
        let node = super.getNode();
        //let video = getVideoElement((node as HTMLElement).getElementsByClassName('loader-video')[0]);
        // document.addEventListener('loaderStatusUpdated', (e: CustomEventInit) => {
        //     status.style.width = `${e.detail.percent}px`;
        // });

        // video.src = './assets/video/loader.mp4';

        document.addEventListener('pageBuilded', () => {
            const loader = document.querySelector('.page-loader-div');
            loader?.remove();
        });

        document.addEventListener('componentUpdated', () => {
            const loader = document.querySelector('.page-loader-div');
            loader?.remove();
        });

        document.addEventListener('pageTranslated', () => {
            const loader = document.querySelector('.page-loader-div');
            loader?.remove();
        });

        return node;
    }

    displayLoading() {
        document.body.prepend(this.getFragment());

        let language = window.localStorage.getItem('language');
        if (!language) {
            language = 'en';
        }
        this.translate(language);
    }
    translate(language: string) {
        document.querySelectorAll('[data-i18]').forEach((element) => {
            let data: string = (element as HTMLElement).dataset.i18!;

            if (element instanceof HTMLInputElement) {
                element.placeholder = translate[language][data];
            } else {
                element.textContent = translate[language][data];
            }
        });
    }
}
