import React ,{useState} from 'react';
import './CitySelector.scss';
import {connect} from 'react-redux';
import classnames from 'classnames';
import '../../common/css/iconfont.css';

import {hideCitySelector} from '../../index/actions'
function CitySelector(props){
    const {citySelectorVisible,hideCitySelector} = props;
    const [searchKey,setSearchKey] = useState("");
    const key = searchKey.trim();
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
        </div>
    )
}

const mapStateToProps = state => {
    return {
        citySelectorVisible:state.citySelectorVisible
    }
}
export default connect(
    mapStateToProps,
    {
        hideCitySelector
    }
)(CitySelector);