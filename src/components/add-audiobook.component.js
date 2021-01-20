import React, {Component} from "react";
import ChallengeDataService from "../services/service";

export default class AddAudiobook extends Component{
    constructor(props){

        super(props);

        this.createAudiobook = this.createAudiobook.bind(this);

        this.state ={
            title: "",
            is_original: false,
            street_date: "",
            cost_per_play: "",
            authors:"",
            narrators: "",
            duration: "",
            cover:"",

            submitted: false

        }
    }

    createAudiobook(){
        var data ={
            title: this.state.title,
            is_original: this.state.is_original,
            street_date: this.state.street_date,
            cost_per_play: this.state.cost_per_play,
            authors: this.state.authors,
            narrators: this.state.narrators,
            duration: this.state.duration,
            cover: this.state.cover
        }

        ChallengeDataService.createAudiobook(data)
        .then(response => {
            this.setState({
                title: response.data.title,
                is_original: response.data.is_original,
                street_date: response.data.street_date,
                cost_per_play: response.data.cost_per_play,
                authors: response.data.authors,
                narrators: response.data.narrators,
                duration: response.data.duration,
                cover: response.data.cover,

                submitted: true
            })
           console.log(response.data);
        })

        .catch( e => {
            console.log(e);
        });
    }

    newAudiobook(){
        this.setState({
            title: "",
            is_original: "",
            street_date: "",
            cost_per_play: "",
            authors:"",
            narrators: "",
            duration: "",
            cover:"",

            submitted: false
        });
    }

    render(){
        return(
            <section className="submit-form"> 
                { this.state.submitted ? (
                    <div>
                        <h3>Your audiobook has been successfully added!</h3>
                        <button className="button" onClick={this.newAudiobook}> 
                            Add new
                        </button>
                    </div>
                ):(
                    <form>
                        <label htmlFor="title">
                            <span>Audiobook Title</span>
                            <input type="text" id="title" required value={this.state.title} placeholder="The little prince"/>
                        </label>
                        <label for="is-original">
                            <span>Is the book original?</span>
                            <input type="checkbox" id="is-original" required />
                        </label>
                        <label for="street-date">
                            <span>Select the Street Date</span>
                            <input type="date" id="street-date"/>
                        </label>
                        <label for="authors">
                            <span>Authors</span>
                            <input type="text" id="authors" required value={this.state.authors} placeholder="A1, A2, A3"/>
                        </label>
                        <label for="narrators">
                            <span>Narrators</span>
                            <input type="text" id="narrators" required value={this.state.narrators} placeholder="N1, N2, N3"/>
                        </label>
                        <label for="duration">
                            <span>Duration</span>
                            <input type="text" id="duration" required value={this.state.duration} placeholder="100"/>
                        </label>
                        <label for="cover">
                            <span>Cover</span>
                            <input type="text" id="cover" required value={this.state.cover} placeholder=""/>
                        </label>

                        <button onClick={this.createAudiobook} className="button">
                            Add
                        </button>
                    </form>
                )
                }
            </section>
        )
    }
}