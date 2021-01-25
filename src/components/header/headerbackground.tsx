import React from "react";
import { LinearGradient } from "expo-linear-gradient";

 const headerBackground = () => (
    <LinearGradient
        colors={['#ED3269', '#F05F3E']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        style={{flex: 1}}
    />
);

export default headerBackground