import React from 'react';
import * as icons from '../../theme/icons/index'

const Icons = (props) => {
    const {type, color, width, height} = props;

    const icon = icons[type];
    return (
        <span style={{width: width, height: height}}>
            {icon(width, height, color)}
        </span>
    );
};

export default Icons;