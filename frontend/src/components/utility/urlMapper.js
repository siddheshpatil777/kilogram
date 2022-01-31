export const HOME_URL = 0;
export const LOGIN_URL = 1;
export const REGISTER_URL = 2;
export const LOGOUT_URL = 3;
export const POSTS_URL=4;
export const CURRENT_INFO_URL=5;
export const USERNAME_EXISTENCE_URL=6;
export const EMAIL_EXISTENCE_URL=7;
export const COMMENT_SECTION_URL=8;
export const COMMENT_LIKE_URL=9;
export const COMMENT_DISLIKE_URL=10;
export const POST_LIKE_URL=11;
export const POST_DISLIKE_URL=12;
export const USER_URL=13;
export const PROFILE_URL=14;
export const POST_CREATE_URL=15;
export const COMMENT_URL=16;




/***
 * @example parameterizedString("my name is %s1 and surname is %s2", "John", "Doe");
 * @return "my name is John and surname is Doe"
 *
 * @firstArgument {String} like "my name is %s1 and surname is %s2"
 * @otherArguments {String | Number}
 * @returns {String}
 */
const parameterizedString = (...args) => {
    const str = args[0];
    const params = args.filter((arg, index) => index !== 0);
    if (!str) return "";
    return str.replace(/%s[0-9]+/g, matchedStr => {
        const variableIndex = matchedStr.replace("%s", "") - 1;
        return params[variableIndex];
    });
}
const BASE_URL = "http://localhost:8000/";
const URL_MAP = [
    '',
    'api/auth/login',
    'api/auth/register',
    'api/auth/logout',
    'api/posts',
    'api/currentInfo',
    'api/checkUserNameExistence',
    'api/checkEmailExistence',
    'api/commentSection',
    'api/comment/like',
    'api/comment/dislike',
    'api/post/like',
    'api/post/dislike',
    'api/auth/user',
    'api/profile',
    'api/post',
    'api/comment',
];
export const urlMapper = (URL_HEADER) => {
    // console.log(URL_MAP);
    // console.log(URL_HEADER);
    // let url = URL_MAP[URL_HEADER];
    // url = parameterizedString(url, ...arguement_list);
    console.log(BASE_URL + URL_MAP[URL_HEADER]);
    return BASE_URL + URL_MAP[URL_HEADER];

}