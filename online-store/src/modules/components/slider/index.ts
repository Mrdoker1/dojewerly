import './style.scss';
import Component from '../component';
import template from './index.html';
import Swiper, { Autoplay } from 'swiper';

/*Slider*/
import 'swiper/scss';

export default class SliderComponent extends Component {
    constructor(temp: string = template) {
        super(temp);
        this.marker = 'slider';
        this.node = this.getNode();
    }

    getNode(): Node {
        let node = super.getNode();
        document.addEventListener('pageBuilded', () => {
            let swiper = new Swiper('.mySwiper', {
                direction: 'horizontal',
                autoplay: {
                    delay: 2000,
                },
                speed: 400,
                loop: true,
                slidesPerView: 2,
                spaceBetween: 10,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    dynamicBullets: true,
                },
                breakpoints: {
                    640: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 6,
                        spaceBetween: 20,
                    },
                    1280: {
                        slidesPerView: 8,
                        spaceBetween: 20,
                    },
                },
            });
            Swiper.use([Autoplay]);
        });
        return node;
    }
}
