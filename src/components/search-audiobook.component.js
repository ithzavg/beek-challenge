import React, {Component} from "react";
import '../css/search.css'


export default class SearchAudiobook extends Component{
    
    render(){
        return(
            <section class="search-audiobook">
                <h2 class="main__title">¿What do you want to hear today?</h2>
                <input class="input" type="text" placeholder="Search..."/>
            </section>
        )
    }
}