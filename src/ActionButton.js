export default function ActionButton({ $target,initialState, onClick }) {
    const $actionButton = document.createElement('button');
    $target.appendChild($actionButton);

    this.state = initialState;

    $actionButton.className = this.state.className;

    this.render = () => {
        $actionButton.innerHTML = this.state.icon;
    }

    this.render();

    $actionButton.addEventListener('click', () => {
        onClick();
    })
}