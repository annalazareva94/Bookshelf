import React from 'react'

const TemplateButton = ({onClick, children}) => {

    return(
        <button className="template-button" onClick={onClick}>
          {children}
        </button>
    )
}

export default TemplateButton