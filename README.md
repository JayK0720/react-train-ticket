# Problems
    
    运行 npm run eject报错:
    因为使用脚手架创建一个项目的时候,自动添加了一个.gitignore文件,而本地却没有仓库。解决方法：
        1. git init 
           git add .
           git commit -am 'Save before ejecting'
           npm run eject
           
    类型检查:
        npm install prop-types --save
```jsx harmony
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```
    处于性能方面考虑,propTypes仅在开发模式下进行检查

# 动态设置ClassName

    如果有一个固定的className,另一个className是动态计算的，不能这样写:
```jsx harmony
<div
    className={"citySelector-wrapper"}
    className={citySelectorVisible ? "hidden" : ""}
>
```
    可以使用下面的写法：
```jsx harmony
// 使用数组的方法
<div
    className={[
        'citySelector-wrapper',
        citySelectorVisible ? "" : "hidden"].join(" ")
    }
>
// 使用模板字符串 
<div
    className={`citySelector-wrapper ${citySelectorVisible ? "" : "hidden"} `}
>

// 引入第三方插件classnames
className={classnames({
    'citySelector-wrapper':true,
    hidden:!citySelectorVisible
})}
```

## 城市列表获取索引值

    在城市列表里,使用了 better-scroll 滚动插件,但在使用过程中,点击右侧字母索引 获取当前点击的 字母值时,
    回出现多次点击的现象。
    每次重新进入城市列表页面 点击字母索引时,便会 出现 比上次点击 多输出1次的 情况
    
    那是因为每次进入 CitySelector都初始化了一个 BScroll 实例。
    
![bug-1](https://github.com/JayK0720/react-train-ticket/blob/master/bug-imgs/bug-1.png)
    
    通过使用 useRef Hook 可以解决这个问题
```jsx harmony
const scrollRef = useRef();
if(!scrollRef.current) {
    scrollRef.current = new BScroll(cityWrapperRef.current,{
        scrollY:true,
        click:true,
        probeType:3
    })
}else{
    scrollRef.current.refresh();
}
```

# 获取时间戳

```js
// 获取当前的时间戳
var date = new Date();
date.getTime();


// 获取今天的时间戳
var date = new Date();
date.setHours(0);
date.setMinutes(0);
date.setSeconds(0);
date.setMillionSeconds(0);
date.getTime();
```

# 格式化时间
    
    通过传入 需要格式化的时间格式 yyyy-MM-dd hh-mm 转换出需要的时间
```js
// date为日期对象,fmt为转换的时间格式
function formatDate(date,fmt){
    // 如果检测到字符串包含y ，则将y替换为年份
    if((/y+/).test(fmt)){
                                    // 获取的时间是数字,拼接为字符串      如果传入的格式为yy-MM-dd,则只截取年份的后两位
        fmt = fmt.replace( RegExp.$1, (date.getFullYear()+"").substring(4 - RegExp.$1.length) );
    }
    const obj = {
        'M+':date.getMonth() + 1,
        'd+':date.getDate()
    }
    for(let key in obj){
        if( new RegExp(`(${key})`).test(fmt)){
            let str = obj[key]+"";
                        // 月份和日期的字符串长度为1时，直接返回对应的日期就可以
                        // 长度不为1时，则返回的日期为3 则返回03
            fmt = fmt.replace( RegExp.$1, RegExp.$1.length === 1 ? str : paddingLeftZero(str) );
        }
    }
    return fmt;
}

// 月份和日期为单数时前面是否补0,如果传入格式为 yyyy-MM-dd 则需要补0
function paddingLeftZero(str){
    return ("00"+str).substring( str.length );
}
```
![formatDate](https://github.com/JayK0720/react-train-ticket/blob/master/bug-imgs/format.png)






