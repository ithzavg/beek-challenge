
import './App.css';
import logo from './assets/beek-logo.svg'

function App() {
  return (
    <div className="main-container">
      <header className="header">
        <nav className="nav-header">
          <ul className="items__nav-header">
            <li>
              <figure className="figure__logo-header">
                <img src={logo} alt="imagenLogo" id="logo__img-header"/>
              </figure>
            </li>
            <li className="item__centered">
              <h2>Beek Challenge</h2>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default App;
