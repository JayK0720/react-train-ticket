import React ,{useState,useEffect,useRef,memo} from 'react';
import './Suggest.scss';
import {connect} from 'react-redux';
import {setSelectedCity} from '../../actions';
import PropTypes from 'prop-types';

const SuggestItem = memo(function SuggestItem(props){
    const {name,setSelectedCity,setSearchKey} = props;
    return (
        <li
            className={"suggest-item"}
            onClick={() => {
                // 设置好起点和终点城市之后 清除输入框的内容
                    setSelectedCity(name);
                    setSearchKey("");
                }
            }
        >{name}</li>
    )
})
SuggestItem.propType = {
    name:PropTypes.string.isRequired,
    setSelectedCity:PropTypes.func.isRequired
}
function NoResult(){
    return (
        <div className={'no-result-wrapper'}>
            <p className="no-result-text">无法查询到车站</p>
        </div>
    )
}
function Suggest(props){
    const {searchKey,setSelectedCity,setSearchKey} = props;
    const [result,setResult] = useState([]);
    const timer = useRef();
    useEffect(() => {
        if(searchKey.length === 0) return;
        timer.current = setTimeout(() => {
            fetch(`http://121.43.126.106:5000/api/ticket-server/search?key=${searchKey}`)
                .then(response => response.json())
                .then(data => {
                    const {result} = data;
                    setResult(result);
                });
        },300);
        return () => {
            clearInterval(timer.current);
        }
    },[searchKey]);
    return(
        <div className={'suggestList-wrapper'}>
            <ul className={"suggest-list"}>
                {result && result.length > 0
                    ? result.map((suggest,index) =>
                        <SuggestItem
                            name={suggest}
                            key={index}
                            setSelectedCity={setSelectedCity}
                            setSearchKey={setSearchKey}
                        />)
                    :<NoResult/>
                }
            </ul>
        </div>
    )
}
Suggest.propTypes = {
    searchKey:PropTypes.string.isRequired,
    setSelectedCity:PropTypes.func.isRequired
}

export default connect(
    null,
    {setSelectedCity}
)(Suggest)

