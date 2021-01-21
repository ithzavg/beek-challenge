import React, {Component} from "react";
import '../css/search.css';
import ChallengeDataService from "../services/service";
import search from '../assets/search.svg'



export default class SearchAudiobook extends Component{
    constructor(props){
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.searchString = this.searchString.bind(this);

        this.state ={
            searchString:"",
    
            authors:"",
            costPerPlay:"",
            cover:"",
            duration:"",
            isOriginal:"",
            narrators: "",
            streetDate:"",
            title:"",

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
                    console.log(response.data)

                    this.setState({
                        authors: response.data.items[0].fields.authors["es-MX"],
                        costPerPlay: response.data.items[0].fields.cost_per_play["es-MX"],
                        cover: response.data.items[0].fields.cover["es-MX"],
                        duration: response.data.items[0].fields.duration["es-MX"],
                        isOriginal: response.data.items[0].fields.is_original["es-MX"],
                        narrators: response.data.items[0].fields.narrators["es-MX"],
                        streetDate: response.data.items[0].fields.street_date["es-MX"],
                        title:response.data.items[0].fields.title["es-MX"],
                        
                        result: true,

                        submitted: true
                    });
                }else{
                    console.log(response.data)
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
                            placeholder="Buscar..."/>
                        <button onClick={this.searchString} className="btn-search">
                            <img src={search} alt="search button" id="search__img-button"/>
                        </button>
                    </div>
                </section>
                <div className="container-item">
                    {this.state.submitted && this.state.result ? (
                       <div className="container-item__content">
                           <div className="container-item__img">
                               <img src={this.state.cover} alt="Book Cover"></img>
                           </div>
                            <div className="container-item__details">
                                <div>
                                    <label>
                                    <strong>Título:</strong>
                                    </label>
                                    {this.state.title}
                                </div>
                                <div>
                                    <label>
                                    <strong>Autor:</strong>
                                    </label>
                                    {this.state.authors}
                                </div>
                                <div>
                                    <label>
                                    <strong>Narrador:</strong>
                                    </label>
                                    {this.state.narrators}
                                </div>
                                <div>
                                    <label>
                                    <strong>Fecha de Lanzamiento:</strong>
                                    </label>
                                    {this.state.streetDate}
                                </div>
                                <div>
                                    {this.state.duration} min | {this.state.isOriginal ? (<span>Beek Original</span>): (<span></span>)}
                                </div>
                            </div>
                       </div>
                       
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