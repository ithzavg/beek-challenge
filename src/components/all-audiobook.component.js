import React, {Component} from "react";
import ChallengeDataService from "../services/service";
import '../css/commons.css';
import '../css/retrieveAudiobooks.css';
import borrar from '../assets/delete.svg';
import actualizar from '../assets/update.svg';


export default class AllAudiobooks extends Component{
    constructor(props){
        super(props);

        this.getAudiobooks = this.getAudiobooks.bind(this);
        this.deleteAudiobook = this.deleteAudiobook.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            audiobooksList: [],
            currentPage: 1,
            audiobooksPerPage: 10
        } 
    }

    componentDidMount(){
        this.getAudiobooks();
    }

    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }

    getAudiobooks(){
        ChallengeDataService.getAllAudiobooks()
        .then(response => {
            this.setState({
                audiobooksList: response.data.items
            });
        })
        
        .catch(e => {
            console.log(e);
        });
    }

    deleteAudiobook(id){
        ChallengeDataService.deleteAudiobook(id)
            .then(response => {
                this.getAudiobooks();
            })
    }
    
    render(){
        const { audiobooksList, currentPage, audiobooksPerPage } = this.state;

        const indexOfLast = currentPage * audiobooksPerPage;
        const indexOfFirst = indexOfLast - audiobooksPerPage;
        const currentAudiobooks = audiobooksList.slice(indexOfFirst, indexOfLast);

        const renderAudiobooks = currentAudiobooks.map((content, index) => {
            if(Object.keys(content.fields).length !== 0){
                return ( 
                    <div className="container-item__content">
                        <div className="container-item__img">
                            <img src={content.fields.cover["es-MX"]} alt="Audiobook Cover"></img>
                        </div>
                        <div className="container-item__details">
                            <div>
                                <label><strong>Título:</strong></label>
                                {content.fields.title["es-MX"]}
                            </div>
                            <div>
                                <label><strong>Autor: </strong></label>
                                {content.fields.authors["es-MX"]}
                            </div>
                            <div>
                                <label><strong>Narrador: </strong></label>
                                {content.fields.narrators["es-MX"]}
                            </div>
                            <div>
                                <label><strong>Fecha de lanzamiento: </strong></label>
                                {content.fields.street_date["es-MX"]}
                            </div>
                            <div>
                                {content.fields.duration["es-MX"]} min | {content.fields.is_original["es-MX"] ? (<span>Beek Original</span>): (<span></span>)}
                            </div>
                            <div className="action-container__item">
                                <button>
                                    <img src={actualizar} id="update__action" alt="Icono para actualizar"></img>
                                </button>
                                <button onClick={() => this.deleteAudiobook(content.sys.id)}>
                                    <img src={borrar} id="delete__action" alt="Icono para borrar"></img>
                                </button>
                            </div>
                        </div>
                        
                    </div>
                );
            }
         });


        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(audiobooksList.length / audiobooksPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
              <li
                key={number}
                id={number}
                onClick={this.handleClick}
              >
                {number}
              </li>
            );
          });

          return (
            <div>
                <div className="header__title">
                    <h2>Te presentamos nuestro catálogo de Audiolibros disponibles</h2>
                </div>
                {renderAudiobooks}
                <ul id="list-pages">
                    {renderPageNumbers}
                </ul>
            </div>
          );
    }
}