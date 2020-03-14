import React ,{useState,useMemo,useEffect} from 'react';
import './CitySelector.scss';
import {connect} from 'react-redux';
import classnames from 'classnames';
import '../../common/css/iconfont.css';

import {hideCitySelector,fetchCityData} from '../../index/actions'
function CitySelector(props){
    const {citySelectorVisible,hideCitySelector,cityData,fetchCityData,isLoadingCityData} = props;
    const [searchKey,setSearchKey] = useState("");
    const key = useMemo( () => searchKey.trim() ,[searchKey]) ;
    useEffect(() => {
        if(!citySelectorVisible || isLoadingCityData) return;
        fetchCityData();
    },[citySelectorVisible])
    return (
        <div
            className={classnames({
                'citySelector-wrapper':true,
                hidden:!citySelectorVisible
            })}
        >
            <div className="citySelector-top">
                <div
                    className="icon-back"
                    onClick={() => {hideCitySelector()}}
                >
                    <i className="iconfont">
                        &#xe64e;
                    </i>
                </div>
                <div className="search-box">
                    <input
                        type="text"
                        value={key}
                        placeholder={'北京/bg/beijing'}
                        className={'search-input'}
                        onChange={(event) => setSearchKey(event.target.value)}
                    />
                    <div
                        className={['icon-clear',key.length === 0 ? "hidden":""].join(" ")}
                        onClick={() => setSearchKey("")}
                    >
                        <i className="iconfont">
                            &#xe62a;
                        </i>
                    </div>
                </div>
            </div>
            <div className="city-wrapper">

            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        citySelectorVisible:state.citySelectorVisible,
        cityData:state.cityData,
        isLoadingCityData:state.isLoadingCityData,
    }
}
export default connect(
    mapStateToProps,
    {hideCitySelector,fetchCityData}
)(CitySelector);