export default function Editor({
    $target,
    initialState = {
        title: '',
        content: ''
    },
    onEditing
}) {
    const $editor = document.createElement('div');

    this.state = initialState;

    $editor.innerHTML = `
                <input type="text" name="title" autoComplete="off" placeholder="제목 없음" />
                <hr>
                <div id="editor" name="content" contenteditable="true"></div>
            `;

    $target.appendChild($editor);

    this.setState = nextState => {
        console.log(nextState);
        this.state = nextState;
        this.render();
    }
    
    this.render = () => {
        //title이 비어있을 경우 title 입력창에 포커스
        if (this.state.title === '') {
            $editor.querySelector('[name=title]').focus();
        } 

        let content = this.state.content || '';

        if (content) {
            console.log(content);
            content = content.split('<div>').map(line => {
                if (line.indexOf('# ') === 0) {
                    return `<div><h1>${line}</h1></div>`;
                } else if (line.indexOf('## ') === 0) {
                    return `<div><h2>${line}</h2></div>`;
                } else if (line.indexOf('### ') === 0) {
                    return `<div><h3>${line}</h3></div>`;
                } else if (line.indexOf('- ') === 0 || line.indexOf('* ') === 0) {
                    return `<li>${line}</li>`
                }
                return line;
            }).join('<div>');
        }

        $editor.querySelector(`[name=title]`).value = this.state.title;
        $editor.querySelector(`[name=content]`).innerHTML = content;
    };

    this.render();

    //title 이벤트
    $editor.querySelector('[name=title]').addEventListener('keyup', e => {
        const nextState = {
            ...this.state,
            title: e.target.value
        }
        this.setState(nextState);
        onEditing(this.state);
    })

    //content 이벤트
    $editor.querySelector('[name=content]').addEventListener('keypress', e => {
        const nextState = {
            ...this.state,
            content: e.target.innerHTML
        }
        this.setState(nextState);
        onEditing(this.state);

        //내용 입력 시 커서 위치 설정
        const selection = window.getSelection();
        selection.selectAllChildren(document.querySelector('[name=content]'));
        selection.collapseToEnd();
    })
}
