import DocsPage from "./DocsPage.js";
import DocsEditPage from "./DocsEditPage.js";
import { initRouter } from "./router.js";

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
