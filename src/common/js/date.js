const dateUtil = {
    // 返回当天0点的时间戳
    getTodayUnix:function(timestamp=Date.now()){
        const date = new Date(timestamp);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    formatDate(time ,fmt){
        const date = new Date(time);
        if(/(y+)/.test(fmt)){
            fmt = fmt.replace(RegExp.$1, (date.getFullYear()+'').substring(4 - RegExp.$1.length));
        }
        const obj = {
            'M+':date.getMonth() + 1,
            'd+':date.getDate()
        }
        for(let key in obj){
            if( new RegExp(`(${key})`).test(fmt) ){
                let str = obj[key] + "";
                fmt = fmt.replace( RegExp.$1,  RegExp.$1.length === 1 ? str : paddingLeftZero(str) );
            }
        }
        return fmt;
    }
}

function paddingLeftZero(str){
    return ('00'+str).substring(str.length);
}
export default dateUtil;