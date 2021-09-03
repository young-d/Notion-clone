import { push } from "./router.js";

export default function Header({ $target, text, onLoadIntro }) {
    const $header = document.createElement('header');
    $header.id = 'header';

    $header.innerHTML = `<h3>${text}</h3>`;

    this.render = () => {
        $target.appendChild($header);
    }

    $header.addEventListener('click', () => {
        push('/');
        onLoadIntro();
    })

    this.render();
}