import {Paper} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const MyComment = ({data, mapForTcom, level}) => {
    let spacing = "";

    for (let i = 0; i < level; i++) {
        // spacing.push(>);
        spacing += "====";
    }

    return (
        <div>
            <Grid container direction="row" alignItems="center">
                 <Typography fontWeight="fontWeightMedium" item noWrap>
                     {spacing}{data.author_name}
                </Typography>
                 <Typography fontWeight="fontWeightMedium" item noWrap>
                  {data.content}
                </Typography>
            </Grid>

            {/*<Typography noWrap>*/}
            {/*    text1*/}
            {/*    <Typography noWrap>*/}
            {/*        text2*/}
            {/*    </Typography>*/}
            {/*</Typography>*/}

            {/*<Paper elevation={3}>*/}
            {/*<Box textAlign="left" fontWeight="fontWeightMedium" >*/}
            {/*     <div> </div>  {data.content}*/}
            {/*</Box>*/}
            {/*<p></p>*/}

            {mapForTcom.has(data.id) && mapForTcom.get(data.id).map((comment) => {
                if (level == 0) {
                    return (
                        <MyComment key={comment.id} data={comment} mapForTcom={mapForTcom} level={level + 1}/>
                    );
                }
            })}
            {/*</Paper>*/}
        </div>
    );


}
export default MyComment;