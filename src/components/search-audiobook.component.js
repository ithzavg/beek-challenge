import React, {Component} from "react";
import '../css/search.css';
import '../css/commons.css';
import ChallengeDataService from "../services/service";
import search from '../assets/search.svg'



export default class SearchAudiobook extends Component{
    constructor(props){
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.searchString = this.searchString.bind(this);

        this.state ={
            searchString:"",
            audiobooks: [],
            submitted: false,
            result: false
        }
    }

    onChangeSearchTitle(e){
        const searchString = e.target.value;

        this.setState({
            searchString: searchString
        });

    }

    searchString(){
        ChallengeDataService.searchAudioBook(this.state.searchString)
            .then(response => {
                if(response.data.items.length > 0){
                    
                this.setState({
                        audiobooks: response.data.items,
                        result: true,
                        submitted: true
                    });
                }else{
                    this.setState({
                        submitted: true,
                        result: false
                    })
                }
                
                
            
            })
            .catch(e => {
                console.log(e);
            });
    }
    
    render(){
        const { audiobooks } = this.state;

        const renderResultSearch = audiobooks.map((list, index) => {
            if(Object.keys(list.fields).length !== 0){
                return (
                    <div className="container-item__content">
                        <div className="container-item__img">
                            <img src={list.fields.cover["es-MX"]} alt="Audiobook Cover"></img>
                        </div>
                        <div className="container-item__details">
                            <div>
                                <label><strong>Título:</strong></label>
                                {list.fields.title["es-MX"]}
                            </div>
                            <div>
                                <label><strong>Autor: </strong></label>
                                {list.fields.authors["es-MX"]}
                            </div>
                            <div>
                                <label><strong>Narrador: </strong></label>
                                {list.fields.narrators["es-MX"]}
                            </div>
                            <div>
                                <label><strong>Fecha de lanzamiento: </strong></label>
                                {list.fields.street_date["es-MX"]}
                            </div>
                            <div>
                                {list.fields.duration["es-MX"]} min | {list.fields.is_original["es-MX"] ? (<span>Beek Original</span>): (<span></span>)}
                            </div>
                        </div>
                    </div>
                );
            }

            return null

         });
        return(
            <section className="container">
                <section className="main__container">
                    <div className="main__title">
                        <h2>¿Qué quieres escuchar hoy?</h2>
                    </div>
                    <div className="main__search">
                        <input className="input-search" 
                            type="text" 
                            value={this.state.searchString} 
                            onChange={this.onChangeSearchTitle} 
                            placeholder="Buscar..." required/>
                        <button onClick={this.searchString} className="btn-search">
                            <img src={search} alt="search button" id="search__img-button"/>
                        </button>
                    </div>
                </section>
                <div className="container-item">
                    {this.state.submitted && this.state.result ? (
                       renderResultSearch
                    ) : (
                        <span>
                            {this.state.submitted && this.state.result === false ?
                             <span>No se encontraron resultados</span>
                             :
                             <span></span>
                            }
                        </span> 
                    )}
                </div>

            </section>
        )
    }
}