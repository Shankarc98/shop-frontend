
function NavigationButton(props){
    return <button onClick = {props.handleClick} className="navigation-btn">{props.name}</button>
}

export default NavigationButton;