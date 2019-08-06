import React from 'react'
import './Palette.css'

const Color = ({colors, selected}) => {

    const colorList = colors.map(
        (color,id) => (
            <div
                className="color-section"
                id={id}
                style={{background:color}}
                key={id}
                onClick= {selected}
            />
        )
    )

    return (
        <div className="color-wrapper">
            {colorList}
        </div>
    )
}

export default Color