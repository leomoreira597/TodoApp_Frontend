import React from "react";
import IconButton from "../template/iconButton";

export default function(props){

    function renderRows(){
        const list = props.list || []
        return list.map(todo => (
            <tr key={todo._id}>
                <td className={todo.done ? 'markedAsDone' : ''}>{todo.description}</td>
                <td>
                    <IconButton style="success" icon="check" hide={todo.done}
                        onClick={() => props.handleDone(todo)}/>

                    <IconButton  style="warning" icon="undo" hide={!todo.done}
                        onClick={() => props.handlePending(todo)}/>   

                    <IconButton style="danger" icon="trash-o" hide={!todo.done}
                        onClick={() => props.handleRemove(todo)}/>
                </td>
            </tr>
        ))
    }

    return(
        <table className="table">
            <thead>
                <tr>
                    <th>
                        Descrição
                    </th>
                    <th className="tableActions">
                        Ações
                    </th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    );
}