import React, { memo } from "react";
import {View, ViewStyle} from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useSelector } from "react-redux";

interface skeletonPropModel  {
    style?: ViewStyle,
    loadFlag?: boolean,
    children: any
}

const CustomSkeleton = memo(({style ,loadFlag, children }:skeletonPropModel) => {

    const childStyle = style ?? React.Children.only(children).props.style;

    return (
        <>
        {loadFlag ?
        <SkeletonPlaceholder>
            <View style={ childStyle}></View>
        </SkeletonPlaceholder> :
        children
        }
        </>
    )
})

export default CustomSkeleton;