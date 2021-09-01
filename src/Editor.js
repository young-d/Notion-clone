export default function Editor({
    $target,
    initialState = {
        title: '',
        content: ''
    },
    onEditing
}) {
    const $editor = document.createElement('div');

    //밖에서 그려주기
    $editor.innerHTML = `
                <input type="text" name="title" autoComplete="off" style="width: 600px;"/>
                <div id="contentEditor" name="content" contenteditable="true" style="width: 600px; height: 400px; border: 1px solid black; padding: 8px;"></div>
            `;

    this.state = initialState;

    $target.appendChild($editor);

    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }
    
    this.render = () => {
        let content = this.state.content || '';

        if (content) {
            content = this.state.content.split('<div>').map(line => {
                console.log(line);
                if (line.indexOf('# ') === 0) {
                    return `<h1>${line.substr(2)}</h1>`;
                } else if (line.indexOf('## ') === 0) {
                    return `<h2>${line.substr(3)}</h2>`;
                } else if (line.indexOf('### ') === 0) {
                    return `<h3>${line.substr(4)}</h3>`;
                }
                return line;
            }).join('<br>');
        }

        $editor.querySelector(`[name=title]`).value = this.state.title;
        $editor.querySelector(`[name=content]`).innerHTML = content;
    };

    this.render();

    //title 이벤트 등록
    $editor.querySelector('[name=title]').addEventListener('keyup', e => {
        const nextState = {
            ...this.state,
            title: e.target.value
        }
        this.setState(nextState);
        onEditing(this.state);
    })

    //content 이벤트 등록
    $editor.querySelector('[name=content]').addEventListener('keypress', e => {
        const nextState = {
            ...this.state,
            content: e.target.innerHTML
        }
        this.setState(nextState);
        onEditing(this.state);
        this.render();

        //내용 입력 시 커서 위치 설정
        const selection = window.getSelection();
        selection.selectAllChildren(document.querySelector('[name=content]'));
        selection.collapseToEnd();
    })
}
