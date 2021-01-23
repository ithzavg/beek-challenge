import React, {Component} from "react";
import ChallengeDataService from "../services/service";
import '../css/add.css';
import success from '../assets/success.svg'

export default class AddAudiobook extends Component{
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.newAudiobook = this.newAudiobook.bind(this);

        this.state={
            addResponse: false
        }
    }


      onSubmit(e) {
        e.preventDefault();

        var data ={
            "fields": {
                "title": {
                  "es-MX": this.title.value
                },
                "is_original": {
                  "es-MX": this.original.checked
                },
                "street_date": {
                  "es-MX": this.fecha.value
                },
                "cost_per_play": {
                  "es-MX": parseInt(this.costo.value)
                },
                "authors": {
                  "es-MX": [
                    this.autor.value
                  ]
                },
                "narrators": {
                  "es-MX": [
                   this.narrador.value
                  ]
                },
                "duration": {
                  "es-MX": parseInt(this.duracion.value)
                },
                "cover": {
                  "es-MX": this.cover.value
              }
            }
        }

        ChallengeDataService.createAudiobook(data)
        .then(response => {
            this.setState({
                addResponse: true
            })
        })
        .catch(e => {
            console.log(e);
        })
    }

    newAudiobook(){
        this.setState({
            addResponse: false
        })
    }


    render(){
        return(
            <section> 
                {this.state.addResponse ? (
                    <div className="alert-success">
                        <img src={success} alt="Icono de guardado exitoso" id="img-success__alert"/>

                        <p>Hemos agregado el audiolibro</p>
                        <p>Para agregar un audiolibro nuevo haz click en el botón</p>
                        <button  className="button__submit-form" onClick={this.newAudiobook}>
                            Nuevo
                        </button>
                    </div>
                ):(
                   <section>
                        <div className="form-container">
                            <div className="title-form">
                                <h2>Agrega nuevos audiolibros a nuestro catálogo</h2>
                            </div>
                            <form className="login__container--form">
                                <input type="text" className="input" placeholder="Título" required ref={(c) => this.title = c} name="title"/>
                                <input type="number" className="input" placeholder="Duración" required ref={(c) => this.duracion = c} name="duracion"/>
                                <input type="text" className="input" placeholder="Autor" required ref={(c) => this.autor = c} name="autor"/>
                                <input type="text" className="input" placeholder="Narrador" required ref={(c) => this.narrador = c} name="narrador"/>
                                <input type="date" className="input" placeholder="Fecha de lanzamiento" required ref={(c) => this.fecha = c} name="fecha"/>
                                <input type="text" className="input" placeholder="Cover" required ref={(c) => this.cover = c} name="cover"/>
                                <input type="number" className="input" placeholder="Costo" required ref={(c) => this.costo = c} name="costo"/>
                                <label>
                                    ¿Es original?
                                    <input type="checkbox" className="input-checkbox"  
                                    required ref={(c) => this.original = c} name="original"/>
                                </label>
                                <button  onClick={this.onSubmit} 
                                        className="button__submit-form">
                                    Agregar
                                </button>
                            </form>    
                        </div>
                   </section>
                )}
                
            </section>
        )
    }
}