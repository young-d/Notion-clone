import Editor from "./Editor.js";
import { setItem, getItem, removeItem } from "./storage.js";
import { request } from "./api.js";
import LinkButton from "./LinkButton.js";

export default function DocsEditPage({ $target, initialState }) {
    const $page = document.createElement('div');

    this.state = initialState;

    //로컬스토리지 초기값 설정
    let localDocsSaveKey = `temp-docs-${this.state.docId}`;

    const docInfo = getItem(localDocsSaveKey, {
        title: '',
        content: ''
    });

    let timer = null;

    //에디팅하기
    const editor = new Editor({
        $target: $page,
        initialState: docInfo,
        onEditing: (docInfo) => {
            //가장 마지막에 발생한 이벤트만 실행 
            //(연속으로 입력할 때는 이벤트 발생을 지연시키다가 작성을 다 하고 1초뒤에 스토리지에 저장 => 성능최적화에 도움!)
            if (timer !== null) {
                clearTimeout(timer);
            }

            //디바운스
            timer = setTimeout(async () => {
                //작성중인 내용을 현재시간과 함께 로컬스토리지에 저장해둔다
                setItem(localDocsSaveKey, {
                    ...docInfo,
                    tempSaveData: new Date()
                })

                //새글이 아니면 DB에서 수정으로 반영해주고 로컬스토리지 비워주기 
                JSON.stringify(docInfo)
                await request(`/documents/${docInfo.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        "title": docInfo.title,
                        "content": docInfo.content
                    })
                })
                removeItem(localDocsSaveKey);
                
            }, 2000);
        }
    })

    this.setState = async nextState => {
        //방어코드
        if (this.state.docId !== nextState.docId) {
            localDocsSaveKey = `temp-docs-${nextState.docId}`;

            this.state = nextState;

            if (this.state.docId === 'new') {
                const docInfo = getItem(localDocsSaveKey, {
                    title: '',
                    content: ''
                })
                this.render();
                editor.setState(docInfo);
            } else {
                await fetchEachDoc(); 
            }
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

            //임시 포스트 (DB에 반영되기 전 수정중인 docInfo)
            const tempDocInfo = getItem(localDocsSaveKey, {
                title: '',
                content: ''
            })
            
            //포스트를 수정하고 날짜가 기존의 DB데이터(update_at) 보다 큰 경우(최신인경우) temp데이터를 로딩할지 물어보고 ok하면 불러오기
            if (tempDocInfo.tempSaveData && tempDocInfo.tempSaveData > docInfo.updated_at) {
                if (confirm('저장되지 않은 임시 데이터가 있습니다. 불러올까요?')) {
                    this.setState({
                        ...this.state,
                        docInfo: tempDocInfo
                    });
                    
                    return;
                }
            }

            this.setState({
                ...this.state,
                docInfo
            })
        }
    }

    
    
    //버튼 이벤트
    new LinkButton({
        $target: $page,
        initialState: {
            text: '목록으로 이동',
            link: '/'
        }
    });
    // const $moveListButton = document.createElement('button');
    // $moveListButton.innerText = '목록으로';
    // $page.appendChild($moveListButton);

    // $moveListButton.addEventListener('click', () => {
    //     push('/');
    // })
}
