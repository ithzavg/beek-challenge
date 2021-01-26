import React, {Component} from "react";
import ChallengeDataService from '../services/service';
import { Link} from 'react-router-dom';
import success from '../assets/success.svg'

export default class UpdateAudiobook extends Component{
     
    constructor(props){

        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state ={
            audiobook: [],
            id: this.props.match.params.id,
            version: this.props.match.params.version,

            title: "",
            duration: "",
            cost: "",
            date: "",
            original: false,
            author: "",
            narrator: "",
            cover: "",

            addResponse: false
        }
    }

    componentDidMount(){
        this.findBook();
    }

    findBook(){
        
        ChallengeDataService.getAudiobook(this.state.id)
            .then(response => {
                response.data.items.map((content) => {
                    return(
                        this.setState({
                            title: content.fields.title["es-MX"],
                            duration: content.fields.duration["es-MX"],
                            cost: content.fields.cost_per_play["es-MX"],
                            date: content.fields.street_date["es-MX"],
                            original: content.fields.is_original["es-MX"],
                            author: content.fields.authors["es-MX"],
                            narrator: content.fields.narrators["es-MX"],
                            cover: content.fields.cover["es-MX"]
                   
                        })
                    )
                })
                
            })
    }

    onSubmit(e) {
        e.preventDefault();

        var data ={
            "fields": {
                "title": {
                  "es-MX": this.state.title
                },
                "is_original": {
                  "es-MX": this.state.original
                },
                "street_date": {
                  "es-MX": this.state.date
                },
                "cost_per_play": {
                  "es-MX": parseInt(this.state.cost)
                },
                "authors": {
                  "es-MX": [
                    this.state.author
                  ]
                },
                "narrators": {
                  "es-MX": [
                   this.state.narrator
                  ]
                },
                "duration": {
                  "es-MX": parseInt(this.state.duration)
                },
                "cover": {
                  "es-MX": this.state.cover
              }
            }
        }
        ChallengeDataService.updateAudioBook(this.state.id,data, this.state.version)
        .then(response => {
            this.setState({
                addResponse: true
            })
        })
        .catch(e => {
            console.log(e);
        })
    }


  render(){

       const { title, duration, cost, date, original, author, narrator, cover } = this.state;
       return(

        <section>

            {this.state.addResponse ? (
                <div className="alert-success">
                    <img src={success} alt="Icono de guardado exitoso" id="img-success__alert"/>

                    <p>Hemos actualizado el audiolibro</p>
                    <p>Para regresar a nuestro catálogo haz click en el botón</p>
                    <Link  className="button__submit-form button__update-form" to="/all">
                        Catálogo
                    </Link>
                </div>

            ): (

                <div className="form-container">
                    <div className="title-form">
                        <h2>Actualiza el libro que seleccionaste</h2>
                    </div>
                    <form className="login__container--form">
                        <label>Título</label>
                        <input type="text" 
                            className="input" 
                            placeholder="Título" 
                            required onChange = {(e) => {this.setState({title: e.target.value})}}
                            name="title" 
                            defaultValue={title}/>
                        <label>Duración</label>
                        <input type="number" 
                            className="input" 
                            placeholder="Duración" 
                            required onChange = {(e) => {this.setState({duration: e.target.value})}}
                            name="duration"
                            defaultValue= {duration}/>
                        <label>Autor</label>
                        <input type="text" 
                            className="input" 
                            placeholder="Autor" 
                            required onChange = {(e) => {this.setState({author: e.target.value})}}
                            name="author"
                            defaultValue= {author}/>
                        <label>Narrador</label>
                        <input type="text" 
                            className="input" 
                            placeholder="Narrador" 
                            required onChange = {(e) => {this.setState({narrator: e.target.value})}}
                            name="narrator"
                            defaultValue = {narrator}/>
                        <label>Fecha</label>
                        <input type="date" 
                            className="input" 
                            placeholder="Fecha de lanzamiento" 
                            required onChange = {(e) => {this.setState({date: e.target.value})}} 
                            name="date"
                            defaultValue= {date}/>
                        <label>Portada</label>
                        <input type="text" 
                            className="input" 
                            placeholder="Cover" 
                            required onChange = {(e) => {this.setState({cover: e.target.value})}}
                            name="cover"
                            defaultValue = {cover}/>
                        <label>Costo</label>
                        <input type="number" 
                            className="input" 
                            placeholder="Costo" 
                            required onChange = {(e) => {this.setState({cost: e.target.value})}}
                            name="cost"
                            defaultValue = {cost}/>
                        <label>
                            ¿Es original?
                            <input type="checkbox" 
                                className="input-checkbox"  
                                required onChange = {(e) => {this.setState({original: e.target.checked})}} 
                                name="original"
                                checked = {original}/>
                        </label>
                        <button  onClick={this.onSubmit} 
                                className="button__submit-form">
                            Actualizar
                        </button>
                    </form>
                </div>

            )}

                    

            
        </section>
        
        )
    
      
     
  }

}