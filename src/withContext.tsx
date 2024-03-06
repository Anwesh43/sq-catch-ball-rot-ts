import React from "react";
import { useAnimatedScale, useDimension } from "./hooks";

const withContext = (MainFC: React.FC<any>) : React.FC<any> => {
    return (props : any) => {
        const {scale, start : onClick} = useAnimatedScale()
        const {w, h} = useDimension()
        const newProps = {
            ...props,
            w, 
            h, 
            scale, 
            onClick
        }
        return (<MainFC {...newProps}></MainFC>)
    } 
}

export default withContext 