import React from 'react'
import closeIcon from '../img/close-result-popup.svg';

const RemoveButton = ({onClick}) => {

    return(
        <img className="remove-btn" src={closeIcon} onClick={onClick}/>
    )
}

export default RemoveButton