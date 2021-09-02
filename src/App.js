import DocsPage from "./DocsPage.js";
import DocsEditPage from "./DocsEditPage.js";
import { initRouter } from "./router.js";
import { HEADER_TITLE } from "./constant.js";
import Header from "./Header.js";

export default function App ({ $target }) {
    const $navBar = document.createElement('nav');
    $navBar.id = 'sideBar';

    const $handler = document.createElement('div');
    $handler.id = 'handler';
   

    const $mainViewer = document.createElement('article');   
    $mainViewer.id = 'mainViewer';

    new Header({
        $target: $navBar,
        text: HEADER_TITLE
    })

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
        $target.appendChild($handler);
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

 ///////////////////////////

 var handler = document.querySelector('#handler');
 var wrapper = handler.closest('#app');
 var boxA = wrapper.querySelector('#sideBar');
 var isHandlerDragging = false;
 
 document.addEventListener('mousedown', function(e) {
   // If mousedown event is fired from .handler, toggle flag to true
   if (e.target === handler) {
     isHandlerDragging = true;
   }
 });
 
 document.addEventListener('mousemove', function(e) {
   // Don't do anything if dragging flag is false
   if (!isHandlerDragging) {
     return false;
   }
 
   // Get offset
   var containerOffsetLeft = wrapper.offsetLeft;
 
   // Get x-coordinate of pointer relative to container
   var pointerRelativeXpos = e.clientX - containerOffsetLeft;
   
   // Arbitrary minimum width set on box A, otherwise its inner content will collapse to width of 0
   var boxAminWidth = 60;
 
   // Resize box A
   // * 8px is the left/right spacing between .handler and its inner pseudo-element
   // * Set flex-grow to 0 to prevent it from growing
   boxA.style.width = (Math.max(boxAminWidth, pointerRelativeXpos - 8)) + 'px';
   boxA.style.flexGrow = 0;
 });
 
 document.addEventListener('mouseup', function(e) {
   // Turn off dragging flag when user mouse is up
   isHandlerDragging = false;
 });

}
