import './style.scss';
import template from './index.html';
import Component from '../component';
import translate from './translation';

export default class LanguageSwitcherComponent extends Component {
    constructor(temp: string = template) {
        super(temp);
        this.marker = 'language-switcher';
        this.node = this.getNode();
    }
    getNode(): Node {
        let node = super.getNode();
        let component = (node as HTMLElement).getElementsByClassName('language-key')[0] as HTMLSelectElement;
        component.addEventListener('change', () => {
            console.log('Language changed');
            switch (component.value) {
                case '0':
                    this.setLanguage('en');
                    break;
                case '1':
                    this.setLanguage('ru');
                    break;
                case '2':
                    this.setLanguage('pl');
                    break;
            }
        });
        return node;
    }
    set() {
        const switcher: HTMLInputElement = document.querySelector('.language-key')!;
        switcher.addEventListener('change', () => {
            switch (switcher.value) {
                case '0':
                    this.setLanguage('en');
                    break;
                case '1':
                    this.setLanguage('ru');
                    break;
                case '2':
                    this.setLanguage('pl');
                    break;
            }
        });
    }
    setLanguage(language: string) {
        this.translatePage(language);
    }
    translatePage(language: string) {
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
