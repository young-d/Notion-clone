import DocsPage from "./DocsPage.js";
import DocsEditPage from "./DocsEditPage.js";
import { initRouter } from "./router.js";

export default function App ({ $target }) {
    const $navBar = document.createElement('nav');
    $navBar.id = 'sideBar';

    const $dragBar = document.createElement('div');
    $dragBar.id = 'dragBar';
    $navBar.appendChild($dragBar);

    const $mainViewer = document.createElement('main');   
    $mainViewer.id = 'mainViewer';

    // new Header({
    //     $target: $navBar,
    //     text: 
    // })

    const docsPage = new DocsPage({ 
        $target: $navBar
    })

    const docsEditPage = new DocsEditPage({ 
        $target: $mainViewer,
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

    let dragging = 0,
    body = document.body,
    target = document.getElementById('dragBar');

    console.log(target);

    function clearJSEvents() {
    dragging = 0;
    body.removeEventListener("mousemove", resize);
    body.classList.remove('resizing');
    }

    function resize(e) {
    if (e.pageX > 400 || e.pageX < 200) {
        return;
    }
    body.style.setProperty("--left-width", e.pageX + 'px');
    }

    target.addEventListener('mousedown', (e) => {
    e.preventDefault();
    dragging = 1;
    body.addEventListener('mousemove', resize);
    body.classList.add('resizing');
    });

    document.addEventListener('mouseup', function() {
    dragging ? clearJSEvents() : '';
    });
}
