import React, { useState, useEffect } from 'react';
import { Link } from 'umi';

import './index.less';

export default props => {

    const createElements = (n)=>{
        var elements = [];
        for(let i =0; i < n; i++){
            elements.push(<li></li>);
        }
        return elements;
    }
  return (
    <ul className="bg-bubbles">
        {createElements(20)}
    </ul>
    
  );
};
