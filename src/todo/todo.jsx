import React, {Component} from "react";
import Axios from "axios";
import PageHeader from "../template/pageHeader";
import TodoForm from "./todoForm";
import TodoList from "./todoList";


const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {


    constructor(props){
        super(props)
        this.state = {description: '', list: []}
        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.refresh()
    }

    refresh(){
        Axios.get(`${URL}?sort=-createdAt`)
            .then(resp => this.setState({...this.state, description: '', list: resp.data}))
    }

    handleChange(e){
        this.setState({...this.state, description: e.target.value})
    }

    handleAdd(){
        const description = this.state.description
        Axios.post(URL, {description})
            .then(resp => this.refresh())
    }

    handleRemove(todo){
        Axios.delete(`${URL}/${todo._id}`)
            .then(resp => this.refresh())
    }

    render(){
        return(
            <div>
                <h1>
                    <PageHeader name="Tarefas" small="Cadastro"/>
                    <TodoForm handleAdd={this.handleAdd} description={this.state.description}
                        handleChange={this.handleChange}/>
                    <TodoList list={this.state.list} handleRemove={this.handleRemove}/>
                </h1>
            </div>
        );
    }
}