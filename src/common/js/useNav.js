import {useCallback} from 'react';
import dateUtil from "./date";

export default function useNav(departDate,setPrevDay,setNextDay){
    // 当天0点的时间戳
    const now = dateUtil.getTodayUnix(Date.now());
    // 判断前一天和后一天切换日期时是否可以点击
    const isNextDisabled =  departDate >= now + 86400000 * 29;
    const isPrevDisabled =  departDate <= now;

    // 点击左侧 前一天按钮, 出发日期 切换为上一天,但是如果时间小于今天，则无法再切换
    const handleSetPrevDay = useCallback(() => {
        if(isPrevDisabled) return;
        setPrevDay()
    },[isPrevDisabled,setPrevDay]);

    // 点击右侧 下一天按钮，出发日期切换为后一天,无法选择30天后的日期
    const handleSetNextDay = useCallback(() => {
        if(isNextDisabled) return;
        setNextDay()
    },[isNextDisabled,setNextDay]);

    return {
        isNextDisabled,
        isPrevDisabled,
        handleSetPrevDay,
        handleSetNextDay
    }
}