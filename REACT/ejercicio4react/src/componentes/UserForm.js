import React,{Component} from "react";
class UserForm extends Component{
    render(){
        return(
            <form onSubmit={this.props.onAddUser}>
                <input type="text" name="nombre" id="nombre" placeholder="Nombre"/>
                <input type="text" name="email" id="email" placeholder="Email"/>
                <input type="submit" name="Guardar"/>
            </form>
        )
    }
}
export default UserForm;