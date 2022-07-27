import './style.scss';
import Component from '../component';
import topNotification from './top.html';
import popupNotification from './popup.html';

export default class NotificationComponent extends Component {
    message: string;
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
        this.message = message;
        this.node = this.getNode();
    }
    getNode(): Node {
        let node = super.getNode();
        let close = (node as HTMLElement).getElementsByClassName('close-icon')[0] as HTMLSelectElement;
        let message = (node as HTMLElement).getElementsByClassName('notification-message')[0] as HTMLElement;
        message.textContent = this.message;

        document.addEventListener('pageBuilded', () => {
            const header = document.querySelector('.header')! as HTMLElement;
            header.style.top = `${header.style.top + 40}px`;
        });

        close.addEventListener('click', () => {
            (node as HTMLElement).remove();
            const header = document.querySelector('.header')! as HTMLElement;
            let size = parseInt(header.style.top.replace('\\d+', '')) - 40;
            header.style.top = `${size}px`;
        });

        node.addEventListener('click', () => {
            (node as HTMLElement).remove();
        });
        return node;
    }
    show() {
        document.body.prepend(this.node);
    }
}
