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
                <input type="text" name="title" style="width: 600px;"/>
                <div name="content" contenteditable="true" style="width: 600px; height: 400px; border: 1px solid black; padding: 8px;"></div>
            `;

    this.state = initialState;

    $target.appendChild($editor);

    this.setState = nextState => {
        this.state = nextState;
        
        //서버에서 내려오는 개행값 \n
        //textarea 에서는 \n으로 개행을 처리해줌 
        this.render();
    }
    
    this.render = () => {
        // const richContent = this.state.content.split('\n').map(line => {
        //     if (line.indexOf('# ') === 0) {
        //         return `<h1>${line.substr(2)}</h1>`;
        //     } else if (line.indexOf('## ') === 0) {
        //         return `<h2>${line.substr(3)}</h2>`;
        //     } else if (line.indexOf('### ') === 0) {
        //         return `<h3>${line.substr(4)}</h3>`;
        //     }
        //     return line;
        // }).join('<br>');

        $editor.querySelector(`[name=title]`).value = this.state.title;
        $editor.querySelector(`[name=content]`).innerHTML = this.state.content;
    };

    this.render();

    //title 이벤트 등록
    $editor.querySelector('[name=title]').addEventListener('keyup', e => {
        const nextState = {
            ...this.state,
            title: e.target.value
        }
        // console.log(nextState);
        this.setState(nextState);
        //편집중 이벤트
        onEditing(this.state);
    })

    //content 이벤트 등록
    $editor.querySelector('[name=content]').addEventListener('input', e => {
        const nextState = {
            ...this.state,
            content: e.target.innerHTML
        }
        this.setState(nextState);
        onEditing(this.state);
    })

}