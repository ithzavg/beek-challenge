
import { Link, Route, Switch } from 'react-router-dom';
import './App.css';
import logo from './assets/beek-logo.svg'
import AddAudiobook from './components/add-audiobook.component';
import SearchAudiobook from './components/search-audiobook.component';

function App() {
  return (
    <div className="main-container">
      <header className="header">
        <nav className="nav-header">
          <ul className="items__nav-header">
            <li>
              <Link to={"/beek"}>
                 <figure className="figure__logo-header">
                    <img src={logo} alt="imagenLogo" id="logo__img-header"/>
                 </figure> 
              </Link>
            </li>
            <li className="item__centered">
              <h2>Beek Challenge</h2>
            </li>
            <li>
              <Link to="/add">
                Add new Audiobook
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      
      <section className>

      </section>
      
      
      
      <div>
          <Switch>
            <Route exact path="/add" component={AddAudiobook}></Route>
            <Route exact path={["/", "/beek"]} component={SearchAudiobook}></Route>
            <Route></Route>
          </Switch>
      </div>
    </div>
  );
}

export default App;
