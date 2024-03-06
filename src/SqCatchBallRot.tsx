import React from "react";
import { useStyle } from "./hooks";
import withContext from "./withContext";

interface SqCatchBallRotProps {
    w : number, 
    h : number,
    scale : number, 
    onClick : () => void ,
    color : string 
}
const SqCatchBallRot : React.FC<SqCatchBallRotProps> = (props : SqCatchBallRotProps) => {
    const {parentStyle, circleStyle, blockStyle, fixInMiddleStyle} = useStyle(props.w, props.h, props.scale, props.color)
    return (
        <div style = {parentStyle()} onClick = {props.onClick}>
            <div style = {fixInMiddleStyle(180)}>
                <div style = {blockStyle()}>
                </div>
            </div>
            <div style = {fixInMiddleStyle(0)}>
                <div style = {circleStyle()}>
                </div>
            </div>
        </div>
    )
}

export default withContext(SqCatchBallRot)