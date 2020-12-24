import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Search.less';
import { Button, Empty, Dropdown } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { Input, Menu, Select ,Spin} from 'antd';
import request from '@/common/request';
const { Search } = Input;
const { Option } = Select;

import debounce from 'lodash/debounce';
import { Link } from 'umi';





const SearchBar = () => {
  const [value, setvalue] = useState('');
  const [data, setdata] = useState([]);
  const [acid, setacid] = useState(null)

  const Debounce = (e, fn, delay, dep = []) => {
    const { current } = useRef({ fn, timer: null });
    useEffect(
      function() {
        current.fn = fn;
      },
      [fn],
    );

    return useCallback(function f(...args) {
      if (current.timer) {
        clearTimeout(current.timer);
      }
      setvalue(e.target.value);
      current.timer = setTimeout(() => {
        current.fn.call(this, ...args);
      }, delay);
    }, dep);
  };

 


  let timeout: any;
  const handle = e => {
    e.persist();
    setvalue(e.target.value);
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      getSearch(e.target.value);
    }, 1000);
  };



 

const getSearch = value => {
    request('/api/searchActivity', {
      method: 'GET',
      params: { content: value, type: 0 },
    })
      .then(function(response) {
        setdata(response.activities);
      })
      .catch(function(error) {
        console.log(error);
      });
  };


  const handleMenuClick = (e, value) => {
    setvalue(value);
    setacid(e.key)
};






  const menu =  (
      
    <Menu className="search_menu">
        { data.length?
            data.map((item, key)=>(
                <Menu.Item key={item.activityId} className='search_item' onClick={(e)=>handleMenuClick(e, item.activityName)}>
                 <Link to={`/details?id=${item.activityId}`}  target="_blank" > 
                  {item.activityName}
                </Link>
              </Menu.Item>
            ))  : (
                <Menu.Item>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </Menu.Item>
                
            )
        } 
    
    </Menu>
  )



 
  return (

    <Dropdown overlay={menu} placement="bottomLeft" >
        
         <div className="search" style={{ width: 260 }}>
       
       <Input
         placeholder="输入关键字搜索"
         allowClear
         value={value}
         size="large"
         className="search_bar"
         style={{ width: 260 }}
         prefix={<SearchOutlined />}
         onChange={handle}
        //  onKeyUp={handleSearch}
       />
     </div>
    
      
      </Dropdown>
    

   

      
  );
};

export default SearchBar;



