import React from "react";
import { TextField } from "@material-ui/core";
export default props => (
    <div
        style={{
            display: "flex",
            flex: 1,
            flexWrap: "wrap",
            justifyContent: "center"
        }}
    >
        <TextField
            id="outlined-email-input"
            label={props.label}
            type={props.type}
            name={props.label}
            margin="normal"
            variant="outlined"
            style={{ display: "flex", flex: 0.5 }}
            onChange={e => props.handleChange(props.index, e)}
        />
    </div>
);
