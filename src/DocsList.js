import { push } from "./router.js";

export default function DocsList({ $target, initialState, onCreateNewDoc, onRemoveDoc }) {
    const $docsList = document.createElement('div');

    $target.appendChild($docsList);

    this.state = initialState;

    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        $docsList.innerHTML = `<ul id="rootDocs">${getAllDocuments(this.state.docs)}</ul>`;

        $docsList.querySelectorAll('li.each-doc').forEach($li => {
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
            acc += `<li class="each-doc" data-id=${eachDoc.id}>
                        <section class="parent">
                            <label class="docs-title">${eachDoc.title || '제목없음'}</label>
                            <section class="list-btn-group">
                                <button class="add-btn"><i class="far fa-plus-square"></i></button>
                                <button class="remove-btn"><i class="far fa-trash-alt"></i></button>
                            </section>
                        </section>
                        ${eachDoc.documents.length > 0 
                            ? `<ul class="sub-docs">${getAllDocuments(eachDoc.documents)}</ul>` 
                            : ''
                        }
                    </li>`;
            return acc;
        }, ``);
    };

    this.render();

}