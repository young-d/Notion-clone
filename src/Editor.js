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
                <div id="contentEditor" name="content" contenteditable="true" style="width: 600px; height: 400px; border: 1px solid black; padding: 8px;"></div>
            `;

    $target.appendChild($editor);

    this.setState = nextState => {
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
            content = this.state.content.split('\n').map(line => {
                // content = parseMd(line);
                
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

        //내용 입력 시 커서 위치 설정
        const selection = window.getSelection();
        selection.selectAllChildren(document.querySelector('[name=content]'));
        selection.collapseToEnd();
    })




    //md
    function parseMd(md){
  
        if (md.indexOf())
        //ul
        md = md.replace(/^\s*\n\*/gm, '<ul>\n*');
        md = md.replace(/^(\*.+)\s*\n([^\*])/gm, '$1\n</ul>\n\n$2');
        md = md.replace(/^\*(.+)/gm, '<li>$1</li>');
        
        //ol
        md = md.replace(/^\s*\n\d\./gm, '<ol>\n1.');
        md = md.replace(/^(\d\..+)\s*\n([^\d\.])/gm, '$1\n</ol>\n\n$2');
        md = md.replace(/^\d\.(.+)/gm, '<li>$1</li>');
        
        //blockquote
        md = md.replace(/^\>(.+)/gm, '<blockquote>$1</blockquote>');
        
        //h
        md = md.replace(/[\#]{6}(.+)/g, '<h6>$1</h6>');
        md = md.replace(/[\#]{5}(.+)/g, '<h5>$1</h5>');
        md = md.replace(/[\#]{4}(.+)/g, '<h4>$1</h4>');
        md = md.replace(/[\#]{3}(.+)/g, '<h3>$1</h3>');
        md = md.replace(/[\#]{2}(.+)/g, '<h2>$1</h2>');
        md = md.replace(/[\#]{1}(.+)/g, '<h1>$1</h1>');
        
        // //alt h
        // md = md.replace(/^(.+)\n\=+/gm, '<h1>$1</h1>');
        // md = md.replace(/^(.+)\n\-+/gm, '<h2>$1</h2>');
        
        //images
        md = md.replace(/\!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" />');
        
        //links
        md = md.replace(/[\[]{1}([^\]]+)[\]]{1}[\(]{1}([^\)\"]+)(\"(.+)\")?[\)]{1}/g, '<a href="$2" title="$4">$1</a>');
        
        //font styles
        md = md.replace(/[\*\_]{2}([^\*\_]+)[\*\_]{2}/g, '<b>$1</b>');
        md = md.replace(/[\*\_]{1}([^\*\_]+)[\*\_]{1}/g, '<i>$1</i>');
      md = md.replace(/[\~]{2}([^\~]+)[\~]{2}/g, '<del>$1</del>');
      
    //   //pre
    //   md = md.replace(/^\s*\n\`\`\`(([^\s]+))?/gm, '<pre class="$2">');
    //   md = md.replace(/^\`\`\`\s*\n/gm, '</pre>\n\n');
      
      //code
      md = md.replace(/[\`]{1}([^\`]+)[\`]{1}/g, '<code>$1</code>');
      
    //   //p
    //   md = md.replace(/^\s*(\n)?(.+)/gm, function(m){
    //     return  /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m) ? m : '<p>'+m+'</p>';
    //   });
      
    //   //strip p from pre
    //   md = md.replace(/(\<pre.+\>)\s*\n\<p\>(.+)\<\/p\>/gm, '$1$2');
      
      return md;
      
    };

}
