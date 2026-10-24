import "./NavigationButton.css"
function NavigationButton(props){
    return <button
        type="button"
        onClick={props.handleClick}
        className="navigation-btn"
        aria-current={props.current ? "page" : undefined}
    >
        {props.name}
    </button>
}

export default NavigationButton;