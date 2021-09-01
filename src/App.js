import DocsPage from "./DocsPage.js";
import DocsEditPage from "./DocsEditPage.js";
import { initRouter } from "./router.js";

/* url 규칙
* 루트: docsPage 그리기
* 루트가 아닐 경우 /docss/{id} : id에 해당하는 docs 생성
* /documents/new : 새 docs 생성
*/

export default function App ({ $target }) {
    const $navBar = document.createElement('nav');
    const $mainViewer = document.createElement('main');

    

    const docsPage = new DocsPage({ 
        $target: $navBar
    })

    const docsEditPage = new DocsEditPage({ 
        $target: $mainViewer,
        initialState: {
            docId: 'new',
            docInfo: {
              title: '',
              content: ''
            }
        }
    })

    //라우팅 처리
    this.route = () => {
        $target.appendChild($navBar);
        $target.appendChild($mainViewer);

        const { pathname } = window.location

        docsPage.setState();

        if (pathname.indexOf('/documents/') === 0 ) {
            docsPage.setState();
            const [, , docId] = pathname.split('/')
            docsEditPage.setState({ docId })
            docsPage.setState();
        }
    }

    window.onpopstate = (e) => {
        this.route();
    }

    this.route();

    initRouter(() => this.route());
    
}
