import { push } from "./router.js";

export default function SubDocsList({ $target, initialState }) {
    const $subDocsList = document.createElement('div');
    $target.appendChild($subDocsList);

    this.state = initialState;

    this.setState = async (nextState) => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        if (this.state.documents) {
            $subDocsList.innerHTML = `
                <ul>
                    ${this.state.documents.map(subDoc => `
                        <li data-link="/documents/${subDoc.id}" class="sub-docs-link">
                            <i class="doc-icon ${subDoc.title ? 'far fa-file-alt' : 'far fa-file'}"></i>
                            <label class="sub-doc-title">${subDoc.title || '제목 없음'}</label>
                        </li>
                    `).join('')}
                </ul>
            `;
        }
    }

    this.render();

    $subDocsList.addEventListener('click', (e) => {
        const $li = e.target.closest('li');
        const { link } = $li.dataset;

        push(link);
    })
}
