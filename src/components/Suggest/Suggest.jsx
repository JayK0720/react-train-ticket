import React ,{useState,useEffect,useRef,memo} from 'react';
import './Suggest.scss';
import {connect} from 'react-redux';
import {setSelectedCity} from '../../index/actions';

const SuggestItem = memo(function SuggestItem(props){
    const {name,setSelectedCity} = props;
    return (
        <li
            className={"suggest-item"}
            onClick={() => {setSelectedCity(name)}}
        >{name}</li>
    )
})

function Suggest(props){
    const {searchKey,setSelectedCity} = props;
    const [result,setResult] = useState([]);
    const timer = useRef();
    useEffect(() => {
        if(searchKey.length === 0) return;
        timer.current = setTimeout(() => {
            fetch(`http://121.43.126.106:5000/api/ticket-server/search?key=${searchKey}`)
                .then(response => response.json())
                .then(data => {
                    const {result} = data;
                    setResult(result)
                });
        },300);
        return () => {
            clearInterval(timer.current);
        }
    },[searchKey]);
    return(
        <div className={'suggestList-wrapper'}>
            <ul className={"suggest-list"}>
            {
                result.length > 0 && result.map((suggest,index) =>
                    <SuggestItem
                        name={suggest}
                        key={index}
                        setSelectedCity={setSelectedCity}
                    />
                )
            }
            </ul>
        </div>
    )
}
Suggest = connect(
    null,
    {setSelectedCity}
)(Suggest)

export default Suggest;