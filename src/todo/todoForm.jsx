import React from "react";
import Grid from "../template/grid";
import IconButton from "../template/iconButton";

export default function(props){
    return(
        <div role='form' className="todoForm">
            <Grid cols="12 9 10 ">
                <input id="description" className="form-control"
                    placeholder="Adicione uma terefa" value={props.description}
                    onChange={props.handleChange}/>
            </Grid>
            <Grid cols="12 3 2">
                <IconButton style="primary" icon="plus" onClick={props.handleAdd}/>
            </Grid>
        </div>
    );
}