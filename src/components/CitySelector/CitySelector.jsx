import React ,{
    useState,
    useMemo,
    useEffect,
    memo,
    useRef
} from 'react';
import './CitySelector.scss';
import {connect} from 'react-redux';
import classnames from 'classnames';
import '../../common/css/iconfont.css';
import PropTypes from 'prop-types';
import {hideCitySelector,fetchCityData,setSelectedCity} from '../../index/actions';
import Loading from '../Loading/Loading';
import BScroll from 'better-scroll';
const SEARCH_HISTORY_CACHE = "SEARCH_HISTORY_CACHE";

const CityItem = memo(function CityItem(props){
    const {name,onSelect} = props;
    return (
        <li
            className={"city-item"}
            onClick={onSelect}
        >{name}</li>
    )
});
CityItem.propTypes = {
    name:PropTypes.string,
    onSelect:PropTypes.func
}

const CitySection = memo(function CitySection(props){
    const {cities,title,onSelect} = props;
    return(
        <div className={'city-section'}>
            <p className={"city-title"}>{title}</p>
            <ul className="city-list">
                {
                    cities && cities.length > 0 && cities.map((city,index) => {
                        return (
                            <CityItem
                                key={index}
                                name={city.name}
                                onSelect={() => onSelect(city.name)}
                            />
                        )
                    })
                }
            </ul>
        </div>
    )
});
CitySection.propTypes = {
    onSelect:PropTypes.func,
    title:PropTypes.string,
    cities:PropTypes.array
}

const CityList = memo(function CityList(props){
    const {cityList,onSelect} = props;
    return(
        <div className={"city-list"}>
            { cityList.length > 0 && cityList.map((cityList) =>
                <CitySection
                    cities={cityList.cities}
                    title={cityList.title}
                    key={cityList.title}
                    onSelect={onSelect}
                />
            )}
        </div>
    )
});
CityList.propTypes = {
    cityList:PropTypes.array,
    onSelect:PropTypes.func
}

const HotCityList = memo(function HotCityList(props){
    const {hotCities} = props;
    return (
        <div className={"hotCity-wrapper"}>
            <p className="hotCity-title">热门站点</p>
            <ul className={"hotCity-list"}>
                {
                    hotCities && hotCities.length > 0 && hotCities.map((hotCity,index) =>
                        <CityItem
                            name={hotCity.name}
                            key={index}
                        />
                    )
                }
            </ul>
        </div>
    )
});

const CityListHistory = memo(function CityListHistory(props){
    const {searchHistory} = props;
    if(!searchHistory.length) return null;
    return(
        <div className={"searchHistory-wrapper"}>
            <p className={"searchHistory-title"}>搜索历史</p>
            <ul className={'searchHistory-list'}>

            </ul>
        </div>
    )
});

const AlphaIndex = memo(function AlphaIndex(props){
    const {title,onSelectIndex} = props;
    return (
        <li
            className={"city-index"}
            onClick={ () => onSelectIndex(title) }
        >{title}</li>
    )
});

const CitySelector = memo(function CitySelector(props){
    const {
        citySelectorVisible,
        hideCitySelector,
        fetchCityData,
        isLoadingCityData,
        cityData,
        onSelect
    } = props;
    // 设置输入框搜索城市的初始值 以及修改的方法
    const [searchKey,setSearchKey] = useState("");
    const [searchHistory,setSearchHistory] = useState([]);
    // 去除搜索时的空格
    const key = useMemo( () => searchKey.trim() ,[searchKey]) ;
    // 当城市页面没有显示 且不再加载状态时 获取城市列表数据
    useEffect(() => {
        if(!citySelectorVisible || isLoadingCityData) return;
        fetchCityData();
    },[citySelectorVisible]);

    const cityWrapperRef = useRef();
    // 阻止点击时多次触发
    const scrollRef = useRef();
    useEffect(() => {
        if(!scrollRef.current) {
            scrollRef.current = new BScroll(cityWrapperRef.current,{
                scrollY:true,
                click:true,
                probeType:3
            })
        }else{
            scrollRef.current.refresh();
        }
/*        const scroll = new BScroll(cityWrapperRef.current,{
            scrollY:true,
            click:true,
            probeType:3
        })*/
    },[cityData]);
    // 设置搜索城市的输入框的值
    const handleSetSearchKey = (event) =>{
        setSearchKey(event.target.value);
    }
    // 获取搜索列表历史
    useEffect(() => {
        const searchCache = JSON.parse(window.localStorage.getItem(SEARCH_HISTORY_CACHE) || '[]' );
        setSearchHistory(searchCache);
    },[])
    // 将搜索历史添加进缓存
    useEffect(() => {
        window.localStorage.setItem(
            SEARCH_HISTORY_CACHE,
            JSON.stringify(searchHistory)
        )
    },[searchHistory]);
    const onSelectIndex = (index) => {
        console.log(index);
    }
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
                        onChange={ handleSetSearchKey }
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
            <div className="cityList-wrapper" ref={cityWrapperRef}>
                <section>
                    <CityListHistory
                        searchHistory={searchHistory}
                    />
                    <HotCityList
                        hotCities={cityData.hotCities}
                    />
                    {cityData.cityList && cityData.cityList.length > 0
                            ? <CityList
                                cityList={cityData.cityList}
                                onSelect={onSelect}
                            />
                            : <Loading/>
                    }
                </section>
                <ul className="cityIndex-list">
                    {cityData.cityList && cityData.cityList.map(({title}) =>
                        <AlphaIndex
                            key={title}
                            title={title}
                            onSelectIndex={onSelectIndex}
                        />
                    )}
                </ul>
            </div>
        </div>
    )
});
CitySelector.propTypes = {
    citySelectorVisible:PropTypes.bool.isRequired,
    cityData:PropTypes.object,
    fetchCityData:PropTypes.func,
    hideCitySelector:PropTypes.func,
    isLoadingCityData:PropTypes.bool,
    onSelect:PropTypes.func
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
    {
        hideCitySelector,
        fetchCityData,
        onSelect:setSelectedCity
    }
)(CitySelector);

