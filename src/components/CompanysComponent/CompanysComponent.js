import React from "react"
import { Typography, Card, CardContent, CardHeader, CardActions, Button, CardActionArea } from "@material-ui/core";

export default props => (
    <Card
        style={{ margin: "10px" }}
    >
        <CardActionArea onClick={props.showDashboard}>
            <CardHeader
                title={props.name}
                classes={{
                    title: props.customColor,
                }}
            />

            <CardContent>
                <Typography component="p">
                    {props.description}
                </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            {
                !props.dontShow ?
                    <Button variant="outlined" size="small" color="primary" onClick={props.joinUs}>
                        Join Us
                    </Button> : null
            }
        </CardActions>
    </Card>
)



// export default props => (
//     <Typography>
//         <span style={{ color: "rgb(63, 81, 181)", marginBottom: 10 }}>
//             {props.name} :{" "}
//         </span>
//         {props.location}
//         {
//             props.description
//         }
//     </Typography>
// )