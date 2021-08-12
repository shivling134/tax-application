import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Home from './Home';
import ViewUser from './ViewUser';
// import EditUser from './EditUser';
// import EditUser1 from './EditUser1';
import AddUser from './AddUser';
import NewEdit from './NewEdit'

function App() {
  return (

    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/addUser' component={AddUser} />
        {/* <Route exact path='/editUser' component={EditUser} />
        <Route exact path='/editUser1' component={EditUser1} /> */}
        <Route exact path ='/newEdit' component={NewEdit} />
        <Route exact path='/viewUser' component={ViewUser} />


      </Switch>
      
    </Router>



    
    
  );
}

export default App;
