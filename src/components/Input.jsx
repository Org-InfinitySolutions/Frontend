import './Input.css';

function Input(props){

    return (
    <div className="container-input">
        <label htmlFor={props.id}>{props.label}</label>
        <input type={props.tipo} id={props.id} placeholder={props.placeholder}/>
    </div>
    )
}

export { Input };