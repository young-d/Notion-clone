import DocsList from "./DocsList.js";
import { request } from "./api.js";
import { push } from "./router.js";

export default function DocsPage({ $target }) {
    const $page = document.createElement('div');
    $page.className = 'docs-page';

    const $button = document.createElement('button');
    $button.textContent = '+';
    $page.appendChild($button);

    $button.addEventListener('click', async () => {
        const createdRootDoc = await request('/documents', {
            method: 'POST',
            body: JSON.stringify({
                "title": '',
                "parent": null
            })
        });

        console.log(createdRootDoc);

        push(`/documents/${createdRootDoc.id}`);
        this.setState();
    })


    const docslist = new DocsList({
        $target: $page,
        initialState: {
            docs: []
        },
        onCreateNewDoc: async (id) => {
            const createdDoc = await request('/documents', {
                method: 'POST',
                body: JSON.stringify({
                    "title": '',
                    "parent": id
                })
            })

            //DB에 넣고나서 url을 계속 new 로 두면 뒤로가기등으로 돌아왔을 때 동작이 이상해지기 때문에 생성된 id로 url을 바꿔준다
            history.replaceState(null, null, `/documents/${createdDoc.id}`);
            push(`/documents/${createdDoc.id}`);
            this.setState();
        },
        onRemoveDoc: async (id) => {
            await request(`/documents/${id}`, {
                method: 'DELETE'
            })

            this.setState();
        }
    })

    //this.setState로 lsit 데이터 업데이트해주기 (렌더링할 때말고) -> EditPage와 일관성 맞추기 위해서
    this.setState = async () => {
        const docs = await request('/documents');
        docslist.setState({
            docs: docs
        });
        this.render();
    }

    this.render = () => {
        $target.appendChild($page);
    }
}