import { push } from "./router.js";
import { request } from "./api.js";

export default function DocsList({ $target, initialState, onCreateNewDoc, onRemoveDoc }) {
    const $docsList = document.createElement('div');

    this.state = initialState;

    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        $docsList.innerHTML = `<ul>${getAllDocuments(this.state.docs)}</ul>`;

        $target.appendChild($docsList);

        $docsList.querySelectorAll('li.docs').forEach($li => {
            const $docsTitle = $li.getElementsByClassName('docs-title').item(0);
            const $addButton = $li.getElementsByClassName('add-btn').item(0);
            const $removeButton = $li.getElementsByClassName('remove-btn').item(0);
    
            const { id } = $li.dataset;
    
            $docsTitle.addEventListener('click', () => {
                push(`/documents/${id}`);
            })
    
            $addButton.addEventListener('click', () => {
                onCreateNewDoc(parseInt(id));
            })

            $removeButton.addEventListener('click', () => {
                onRemoveDoc(parseInt(id));
            })
        })
    };

    const getAllDocuments = (docs) => {
        if(docs.length === 0) return '';

        return docs.reduce((acc, eachDoc) => {
            acc += `<li class="docs" data-id=${eachDoc.id}>
                        <label class="docs-title">${eachDoc.title || '제목없음'}</label> 
                        <button class="add-btn">add</button>
                        <button class="remove-btn">x</button>
                        ${eachDoc.documents.length > 0 
                            ? `<ul>${getAllDocuments(eachDoc.documents)}</ul>` 
                            : ''
                        }
                    </li>`;
            return acc;
        }, ``);
    };

    this.render();

}