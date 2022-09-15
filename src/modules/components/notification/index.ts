import './style.scss';
import Component from '../component';
import topNotification from './top.html';
import popupNotification from './popup.html';

export default class NotificationComponent extends Component {
    message: string;
    type: string;
    constructor(temp: string = topNotification, type: string, message: string) {
        switch (type) {
            case 'top':
                temp = topNotification;
                break;
            case 'popup':
                temp = popupNotification;
                break;
            default:
                temp = topNotification;
        }
        super(temp);
        this.marker = 'footer';
        this.type = type;
        this.message = message;
        this.node = this.getNode();
    }
    getNode(): Node {
        let node = super.getNode();
        let close = (node as HTMLElement).getElementsByClassName('close-icon')[0] as HTMLSelectElement;
        let message = (node as HTMLElement).getElementsByClassName('notification-message')[0] as HTMLElement;
        message.textContent = this.message;

        if (this.type == 'top') {
            document.addEventListener('pageBuilded', () => {
                const header = document.querySelector('.header')! as HTMLElement;
                const filters = document.querySelector('.filters')! as HTMLElement;
                if (header) {
                    header.style.top = `${40}px`;
                }
                // if (filters) {
                //     filters.style.top = `${90}px`;
                // }
            });

            close.addEventListener('click', () => {
                const header = document.querySelector('.header')! as HTMLElement;
                const filters = document.querySelector('.filters')! as HTMLElement;
                if (header) {
                    let size = parseInt(header.style.top.replace('\\d+', '')) - 40;
                    header.style.top = `${size}px`;
                }
                if (filters) {
                    let style = window.getComputedStyle(filters);
                    let top = style.getPropertyValue('top');
                    let size = parseInt(top.replace('\\d+', '')) - 40;
                    console.log(top);
                    filters.style.top = `${size}px`;
                }
            });
        }

        if (this.type == 'popup') {
            let image = (node as HTMLElement).getElementsByClassName('notification-image')[0] as HTMLSelectElement;
            image.style.background = 'url("./assets/img/search.svg")';
        }

        close.addEventListener('click', () => {
            (node as HTMLElement).remove();
        });
        return node;
    }
    show() {
        document.body.prepend(this.node);
    }
}
