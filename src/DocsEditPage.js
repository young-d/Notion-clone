import Editor from "./Editor.js";
import { request } from "./api.js";

export default function DocsEditPage({ $target, initialState }) {
    const $page = document.createElement('div');
    $page.className = 'edit-page';

    this.state = initialState;

    let timer = null;

    //에디팅하기
    const editor = new Editor({
        $target: $page,
        onEditing: (docInfo) => {
            if (timer !== null) {
                clearTimeout(timer);
            }

            timer = setTimeout(async () => {

                //DB에서 수정으로 반영해주고 로컬스토리지 비워주기 
                await request(`/documents/${docInfo.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        "title": docInfo.title,
                        "content": docInfo.content
                    })
                })
                
            }, 1000);
        }
    })

    this.setState = async nextState => {
        if (this.state.docId !== nextState.docId) {

            this.state = nextState;

            await fetchEachDoc(); 
            
            return;
        }

        this.state = {
            docId: nextState,
            docInfo: nextState.docInfo,
        }

        this.render();

        editor.setState(this.state.docInfo
            || {
                title: '',
                content: ''
                });
    }

    this.render = () => {
        $target.appendChild($page);
    }

    const fetchEachDoc = async () => {
        const { docId } = this.state;

        //새로운 페이지가 아닌 경우 기존의 포스트 꺼내오기
        if (this.state.docId !== 'new') {
            const docInfo = await request(`/documents/${docId}`);

            this.setState({
                ...this.state,
                docInfo
            })
        }
    }
}
