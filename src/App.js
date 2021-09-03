import DocsPage from "./DocsPage.js";
import DocsEditPage from "./DocsEditPage.js";
import { initRouter } from "./router.js";
import { HEADER_TITLE } from "./constant.js";
import Header from "./Header.js";
import { removeItem } from "./storage.js";
import { LOCAL_SELECTED_DOC_KEY } from "./constant.js";

export default function App ({ $target }) {
    const $navBar = document.createElement('nav');
    $navBar.id = 'sideBar';

    const $handler = document.createElement('div');
    $handler.id = 'handler';
   

    const $docsViewer = document.createElement('article');   
    $docsViewer.id = 'docsViewer';

    new Header({
        $target: $navBar,
        text: HEADER_TITLE,
        onLoadIntro: () => {
            
        }
    })

    const docsPage = new DocsPage({ 
        $target: $navBar,
    })

    const docsEditPage = new DocsEditPage({ 
        $target: $docsViewer,
        initialState: {
            docId: '',
            docInfo: {
              title: '',
              content: ''
            }
        }
    })


    this.route = () => {
        $target.appendChild($navBar);
        $target.appendChild($handler);
        $target.appendChild($docsViewer);

        const { pathname } = window.location;
        
        if (pathname === '/') {
            docsPage.setState();
        } else if (pathname.indexOf('/documents/') === 0 ) {
            docsPage.setState();
            const [, , docId] = pathname.split('/')
            docsEditPage.setState({ docId });
        }
    }

    //뒤로가기or앞으로가기 시 라우팅
    window.onpopstate = () => {
        this.route();
    }

    this.route();

    initRouter(() => this.route());

    //사이드 바 resizing handler
    let isHandlerDragging = false;
 
    document.addEventListener('mousedown', function(e) {
        if (e.target === $handler) {
            isHandlerDragging = true;
        }
    });

    document.addEventListener('mousemove', function(e) {
        if (!isHandlerDragging) {
            return false;
        }

        const containerOffsetLeft = $target.offsetLeft;

        const pointerRelativeXpos = e.clientX - containerOffsetLeft;

        const navBarMinWidth = 60;

        $navBar.style.width = (Math.max(navBarMinWidth, pointerRelativeXpos - 8)) + 'px';
        $navBar.style.flexGrow = 0;
    });

    document.addEventListener('mouseup', function(e) {
        isHandlerDragging = false;
    });

}
