
import './App.css';
import { Component } from 'react';
import UserList from './componentes/UserList';
import UserForm from './componentes/UserForm';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [
        {id:1,name:"perico",email:"perico@ejemplo.com"},
        {id:2,name:"juanito",email:"juanito@ejemplo.com"},
        {id:3,name:"andrés",email:"andrés@ejemplo.com"}
      ],
    }
  }
  handleOnAddUser(event){
    event.preventDefault();
    let user ={
      id:this.state.users.length+1,
      name: event.target.name.value,
      email:event.target.email.value
    }
    let copiaUsers = this.state.users;
    copiaUsers.push(user);
    this.setState({users:copiaUsers});
  }
  render() {
    return (
      <div className="App">
        <h1>Añade usuarios</h1>
          <UserList users={this.state.users}/>
          <UserForm onAddUser={(e)=>this.handleOnAddUser(e)}/>

      </div>
    );
  }
}


export default App;
