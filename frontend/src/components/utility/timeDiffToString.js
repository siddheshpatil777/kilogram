const timeDiffToString=(time1,time2)=>{
    let elaspedTime = time1 - time2;
    elaspedTime = elaspedTime / (1000.0*60.0);
    let result = "";
    if (elaspedTime < 1.0) {
        result = "just now";
    } else if (1.0 <= elaspedTime && elaspedTime < 60.0) {
        elaspedTime = elaspedTime | 0;
        result = elaspedTime + " minutes ago";
    } else if (60.0 <= elaspedTime && elaspedTime < 1440.0) {
        elaspedTime = elaspedTime / 60.0;
        elaspedTime = elaspedTime | 0;
        result = elaspedTime + " hours ago";
    } else if (1440.0 <= elaspedTime && elaspedTime < 43200.0) {
        elaspedTime = elaspedTime / 60.0;
        elaspedTime = elaspedTime / 24.0;
        elaspedTime = elaspedTime | 0;
        result = elaspedTime + " days ago";
    }else if (1440.0 <= elaspedTime && elaspedTime < 525600.0) {
         elaspedTime = elaspedTime / 30.0;
        elaspedTime = elaspedTime / 60.0;
        elaspedTime = elaspedTime / 24.0;
        elaspedTime = elaspedTime | 0;
        result = elaspedTime + " months ago";
    }
    else {
        // elaspedTime=elaspedTime/60.0;
        // elaspedTime=elaspedTime | 0;
        result = "a long time ago";
    }
    return result;
}
export default timeDiffToString;