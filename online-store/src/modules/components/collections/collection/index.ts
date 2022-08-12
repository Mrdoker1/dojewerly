import './style.scss';
import Component from '../../component';
import template from './index.html';
import Collection from '../../../interface/collection';

export default class CollectionComponent extends Component {
    collection: Collection;
    constructor(temp: string = template, collection: Collection) {
        super(temp);
        this.marker = 'collection';
        this.collection = collection;
        this.node = this.getNode();
    }
    getNode(): Node {
        let node = super.getNode();
        let preview = (node as HTMLElement).getElementsByClassName('collection-preview')[0] as HTMLElement;

        document.addEventListener('pageBuilded', () => {
            //preview.style.backgroundImage = `linear-gradient(90deg, #F4F4F2 0%, rgba(244, 244, 242, 0.83) 36.46%, rgba(244, 244, 242, 0) 73.44%, rgba(244, 244, 242, 0) 100%), url(${this.collection.preview})`;
            preview.style.backgroundImage = `url(${this.collection.preview})`;
        });
        return node;
    }
}