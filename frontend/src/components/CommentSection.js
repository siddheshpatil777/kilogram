import useFetch from "./useFetch";
import BASE_URL from "./METADATA";

const CommentSection=()=>{
    const {data, isPending, error} = useFetch(BASE_URL + '/api/commentSection');
    if(isPending){
        return <h3 >loading</h3>;
    }
    if(error){
        return <h3>There was Error</h3>
    }
    if(data){
        data.sort((a,b)=>{
            let a_date=new Date(a.date_posted);
            let b_date=new Date(b.date_posted);
            return a<b;
        });
        data.forEach((comment=>{
            comment.child=[];
        }));
        let map = new Map();
        // parent=[];
        // for(let i=0;i<date.length;i++){
        //     parent.push([]);
        // }
        data.forEach((comment=>{
            if(map.has(comment.parent)===true){
                let commentArray=map.get(comment.parent);
                commentArray.push(comment);
                map.set(comment.parent,commentArray);
            }
            else{
                 map.set(comment.parent,[comment]);
            }
        }));
        console.log(data);
        console.log(map);
    }
    return(
        <h3>{data && data[0].content}</h3>
    );
}
export default  CommentSection;