import {Paper} from "@material-ui/core";

const MyComment = ({data, mapForTcom, level}) => {
    let spacing = "";

    for (let i = 0; i < level; i++) {
        // spacing.push(>);
        spacing += "====";
    }

    return (
        <div>
            <Paper elevation={3}>
            <h4>{spacing}{data.content}</h4>
            {mapForTcom.has(data.id) && mapForTcom.get(data.id).map((comment) => {
                return (
                    <MyComment key={comment.id} data={comment} mapForTcom={mapForTcom} level={level + 1}/>
                );
            })}
                </Paper>
        </div>
    );


}
export default MyComment;