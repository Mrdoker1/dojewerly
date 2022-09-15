import './style.scss';
import Component from '../component';
import template from './index.html';

export default class InstagramComponent extends Component {
    constructor(temp: string = template) {
        super(temp);
        this.marker = 'instagram';
        this.node = this.getNode();
    }

    getNode(): Node {
        let node = super.getNode();
        let left = (node as HTMLElement).getElementsByClassName('instagram-gallery')[0] as HTMLSelectElement;
        let right = (node as HTMLElement).getElementsByClassName('instagram-gallery')[1] as HTMLSelectElement;
        let instagram = (node as HTMLElement).getElementsByClassName('instagram')[0];

        for (let i = 1; i < 5; i++) {
            const wrapper = document.createElement('div');
            const img = document.createElement('img');
            const icon = document.createElement('div');
            wrapper.classList.add('instagram-image-wrapper');
            img.src = `./assets/img/instagram/${i}.jpg`;
            icon.classList.add('instagram-icon');
            wrapper.append(img, icon);
            left.appendChild(wrapper);
            img.addEventListener('click', () => {
                window.location.href = 'https://www.instagram.com/do.jewelry/';
            });
        }

        for (let i = 5; i < 9; i++) {
            const wrapper = document.createElement('div');
            const img = document.createElement('img');
            const icon = document.createElement('div');
            wrapper.classList.add('instagram-image-wrapper');
            img.src = `./assets/img/instagram/${i}.jpg`;
            icon.classList.add('instagram-icon');
            wrapper.append(img, icon);
            right.appendChild(wrapper);
            img.addEventListener('click', () => {
                window.location.href = 'https://www.instagram.com/do.jewelry/';
            });
        }

        instagram.addEventListener('click', () => {
            window.location.href = 'https://www.instagram.com/do.jewelry/';
        });

        return node;
    }
}
