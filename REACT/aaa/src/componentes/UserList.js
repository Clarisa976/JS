import React,{Component} from "react";
import User from "./Users";
class UserList extends Component{
    render () {
        return(
          <ul>
            {this.props.users.map(u=><User
                key={u.id}
                name = {u.name}
                email = {u.email}
                />
            )}
        </ul>  
        )      
    }
}
export default UserList;