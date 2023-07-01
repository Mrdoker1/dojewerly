import './style.scss';
import Component from '../../component';
import template from './index.html';
import Collection from '../../../interface/collection';

export default class CollectionComponent extends Component {
    collection: Collection;
    language: string;
    constructor(temp: string = template, collection: Collection, language: string) {
        super(temp);
        this.marker = 'collection';
        this.collection = collection;
        this.language = language;
        this.node = this.getNode();
    }
    getNode(): Node {
        let node = super.getNode();
        let preview = (node as HTMLElement).getElementsByClassName('collection-preview')[0] as HTMLElement;
        let name = (node as HTMLElement).getElementsByClassName('collection-name')[0] as HTMLElement;
        let description = (node as HTMLElement).getElementsByClassName('collection-description')[0] as HTMLElement;

        document.addEventListener('pageBuilded', () => {
            preview.style.backgroundImage = `url(${this.collection.preview})`;
            name.innerText = this.collection.name;
            description.innerText = this.collection.description[this.language];
        });
        return node;
    }
}
