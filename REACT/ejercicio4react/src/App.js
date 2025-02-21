/*import './App.css';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import { Button } from 'reactstrap';
import UserList from './componentes/UserList';
import UserForm from './componentes/UserForm';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      users:[
        {id:1,name:"perico",email:"perico@myfpschool.com"},
        {id:2,name:"juanico",email:"juanico@myfpschool.com"},
        {id:3,name:"andres",email:"andres@myfpschool.com"}
      ]
    }
  }
  handleOnAddUser(event){
    event.preventDefault();
    let user={
      id:this.state.users.length+1,
      name:event.target.nombre.value,
      email:event.target.email.value
    }
    let aux=this.state.users;
    aux.push(user)
    this.setState({users:aux})
  }
  render() {
    return (
      <div className="App">
         <div className="App-header">
         <img src={logo} className="App-logo" alt="logo" />
          <h2>Me mola Myfpschool</h2>
        </div>
        <>
        <UserList users={this.state.users}/>
        <p><strong>Añade usuarios</strong></p>  
        <UserForm onAddUser={(e)=>this.handleOnAddUser(e)}/>
        </>
      </div>
    );
  }
}

export default App;
 */
import './App.css';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import { Button } from 'reactstrap';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      users:[
        {id:1, name:"perico", email:"perico@myfpschool.com"},
        {id:2, name:"juanico", email:"juanico@myfpschool.com"},
        {id:3, name:"andres", email:"andres@myfpschool.com"}
      ]
    };
  }

  handleOnAddUser(event){
    event.preventDefault();
    let user = {
      id: this.state.users.length + 1,
      name: event.target.nombre.value,
      email: event.target.email.value
    };

    let aux = this.state.users;
    if(aux.find(u => u.email === user.email)){
      //no hace nada, sino está lo agrega
      console.log("El email ya existe");
    }else{
      aux.push(user);
      this.setState({ users: aux });}
    
  }
  eventoBorrarUsuario(id){
    let aux = this.state.users.filter(u => u.id !== id);
    this.setState({ users: aux });
  }

  render() {
    const User = ({ id, name, email, eventoBorrarUsuario }) => {
      return <li>{name} - {email} <Button onClick={()=>eventoBorrarUsuario(id)}>X</Button></li>;
    };

    const UserList = ({ users, eventoBorrarUsuario }) => {
      return (
        <ul>
          {users.map(u => <User key={u.id} id={u.id} name={u.name} email={u.email} eventoBorrarUsuario={eventoBorrarUsuario}/>)}
        </ul>
      );
    };

    const UserForm = ({ onAddUser }) => {
      return (
        <form onSubmit={onAddUser}>
          <input type="text" name="nombre" id="nombre" placeholder="Nombre" />
          <input type="text" name="email" id="email" placeholder="Email" />
          <input type="submit" value="Guardar" />
        </form>
      );
    };

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Me mola Myfpschool</h2>
        </div>
        <UserList 
            users={this.state.users}
            eventoBorrarUsuario={(id) => this.eventoBorrarUsuario(id)}
         />
        <p><strong>Añade usuarios</strong></p>
        <UserForm onAddUser={(e) => this.handleOnAddUser(e)} />
      </div>
    );
  }
}

export default App;



