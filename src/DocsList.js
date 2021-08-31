import { push } from "./router.js";

export default function DocsList({ $target, initialState }) {
    const $docsList = document.createElement('div');

    $target.appendChild($docsList);

    this.state = initialState;

    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        $docsList.innerHTML = getAllDocuments(this.state.docs);
    };

    const getAllDocuments = (docs) => {
        if(docs.length === 0) return '';

        return docs.reduce((acc, eachDoc) => {
            acc += `<li data-id=${eachDoc.id}>
                        <label class="docs">${eachDoc.title}</label> 
                        ${eachDoc.documents.length > 0 
                            ? `<ul>${getAllDocuments(eachDoc.documents)}</ul>` 
                            : ''
                        }
                    </li>`;
            return acc;
        }, ``);
    };

    this.render();

    $docsList.addEventListener('click', (e) => {
        const $li = e.target.closest('li');

        if ($li) {
            const { id } = $li.dataset;
            push(`/documents/${id}`);
        }
    })
}