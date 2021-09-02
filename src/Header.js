export default function Header({ $target, text }) {
    const $header = document.createElement('header');
    $header.id = 'header';

    $header.innerHTML = `<h3>${text}</h3>`;

    this.render = () => {
        $target.appendChild($header);
    }

    this.render();
}