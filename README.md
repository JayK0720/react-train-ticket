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













