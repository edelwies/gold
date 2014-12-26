// JScript 文件
/*Email验证*/
function v_emailtest(email) {
    if (!(/^[0-9a-zA-Z|\-|\.|\_]{2,50}[@]{1}[0-9a-zA-Z|\-]{2,50}[\.]{1}[0-9a-zA-Z|\-\.]{2,50}$/.test(email)))
        return false;
    return true;
}
/*密码验证*/
function v_passwordtest(password) {
    if (!(/^[a-zA-Z0-9]{6,32}$/.test(password)))
        return false;
    return true;
}
function v_webSite(webUrl) {
    if (!(/^((http|https):\/\/[\w|\-]+\.[a-z|A-Z|0-9|`|~|!|@|#|$|%|^|&|*|(|)|_|+|\-|=|{|}|\[|\]|\"|\'|;|:|?|<|>|,|.| |\/]+$)/.test(webUrl)))
        return false;
    return true;
}
/*整数*/
function v_integer(integer) {
    if (!(/^[0-9]*$/.test(integer)))
        return false;
    return true;
}
/*数字和字母*/
function v_CharOrNum(input) {
    if (!(/^[0-9|a-z|A-Z]*$/.test(input)))
        return false;
    return true;
}
/*是否是16进制颜色*/
function v_color(color) {
    if (!(/^#[0-9|a-f|A-F]{6}$/.test(color)))
        return false;
    return true;
}

