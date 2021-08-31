import DocsList from "./DocsList.js";
import { request } from "./api.js";
import LinkButton from "./LinkButton.js";

export default function DocsPage({ $target }) {
    const $page = document.createElement('div');

    const docslist = new DocsList({
        $target: $page,
        initialState: {
            docs: []
        }
    })

    //버튼 이벤트(새글쓰기)
    new LinkButton({
        $target: $page,
        initialState: {
            text: 'New document',
            link: '/documents/new'
        }
    })
    // const $newPostButton = document.createElement('button');
    // $newPostButton.textContent = 'New Post';
    // $page.appendChild($newPostButton);

    // $newPostButton.addEventListener('click', () => {
    //     push(`/posts/new`);
    // });

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