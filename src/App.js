
import { Link, Route, Switch } from 'react-router-dom';
import './App.css';
import logo from './assets/beek-logo.svg'
import AddAudiobook from './components/add-audiobook.component';
import SearchAudiobook from './components/search-audiobook.component';
import AllAudiobooks from './components/all-audiobook.component';
import UpdateAudiobook from './components/update-audiobook.component';

function App() {
  return (
    <div className="main-container">
      <header className="header">
          <Link to={"/beek"}>
              <figure className="header__img">
                <img src={logo} alt="imagenLogo"/>
              </figure> 
          </Link>
        <nav className="header__menu">
          <ul>
            <li>
              <Link to="/add" className="item-header__menu">
                Agregar
              </Link>
            </li>
            <li>
              <Link to="/all" className="item-header__menu">
                Ver todos
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      
      
      
      <div>
          <Switch>
            <Route exact path="/add" component={AddAudiobook}></Route>
            <Route exact path={["/", "/beek"]} component={SearchAudiobook}></Route>
            <Route exact path="/all" component={AllAudiobooks}></Route>
            <Route exact path="/update/:id/:version" component={UpdateAudiobook}></Route>
          </Switch>
      </div>
    </div>
  );
}

export default App;
