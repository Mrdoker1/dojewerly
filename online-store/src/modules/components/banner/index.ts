import './style.scss';
import Component from '../component';
import template from './index.html';

export default class BannerComponent extends Component {
    type: string;
    constructor(temp: string = template, type: string) {
        super(temp);
        this.marker = 'banner';
        this.type = type;
        this.node = this.getNode();
    }

    getNode(): Node {
        let node = super.getNode();
        const text = (node as HTMLElement).getElementsByClassName('banner-text')[0] as HTMLSelectElement;

        if (this.type == 'left') {
            (node as HTMLElement).style.color = '#F4F4F2';
            (node as HTMLElement).style.background = 'url("./assets/img/banner/1.jpg") 60% 0% / cover no-repeat';
            (node as HTMLElement).style.backgroundSize = 'cover';
            text.style.paddingLeft = '15%';
            (node as HTMLElement).classList.add('banner-left');
        } else {
            (node as HTMLElement).style.color = '#161412';
            (node as HTMLElement).style.background = 'url("./assets/img/banner/2.jpg") 0% 0% / cover no-repeat';
            (node as HTMLElement).style.flexDirection = 'row-reverse';
            (node as HTMLElement).classList.add('banner-right');
            text.style.paddingRight = '15%';
        }

        return node;
    }
}
