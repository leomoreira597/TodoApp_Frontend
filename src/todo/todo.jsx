import React, {Component} from "react";
import PageHeader from "../template/pageHeader";

export default class Todo extends Component {
    render(){
        return(
            <div>
                <h1>
                    <PageHeader name="Tarefas" small="Cadastro"/>
                </h1>
            </div>
        );
    }
}