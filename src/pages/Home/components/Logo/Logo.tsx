import React from 'react'
import './Logo.less'
import  logo from "@/static/images/logo.png";

/**
 * 定义Logo组件
 */
class Logo extends React.PureComponent {
  render(): React.ReactElement {
    return (
      
       
          <img 
            style={{ verticalAlign: 'middle' }}
            width="50"
            height="50"
            src={logo}
          />
       
     
    )
  }
}

export default Logo
