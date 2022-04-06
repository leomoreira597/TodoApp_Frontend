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
        this.handleDone = this.handleDone.bind(this)
        this.handlePending = this.handlePending.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.refresh()
    }

    refresh(description = ''){
        const search = description ? `&description__regex=/${description}/` : ''
        Axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => this.setState({...this.state, description, list: resp.data}))
    }

   

    handleSearch(){
        this.refresh(this.state.description)
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
            .then(resp => this.refresh(this.state.description))
    }

    handleDone(todo){
        Axios.put(`${URL}/${todo._id}`, {...todo, done: true})
            .then(resp => this.refresh(this.state.description))
    }

    handlePending(todo){
        Axios.put(`${URL}/${todo._id}`, {...todo, done: false})
            .then(resp => this.refresh(this.state.description))
    }

    handleClear(){
        this.refresh()
    }

    render(){
        return(
            <div>
                <h1>
                    <PageHeader name="Tarefas" small="Cadastro"/>
                    <TodoForm handleAdd={this.handleAdd} description={this.state.description}
                        handleChange={this.handleChange} handleSearch={this.handleSearch}
                        handleClear={this.handleClear}/>

                    <TodoList list={this.state.list} handleRemove={this.handleRemove}
                        handleDone={this.handleDone} handlePending={this.handlePending}/>
                </h1>
            </div>
        );
    }
}