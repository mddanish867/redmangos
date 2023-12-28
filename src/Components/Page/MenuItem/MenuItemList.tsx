import React from 'react';
import { useEffect } from "react";
import { menuItemModel } from '../../../Interfaces';
import MenuItemCard from './MenuItemCard';
import { useGetMenuItemQuery } from '../../../Apis/menuItemApi';
import { useDispatch } from 'react-redux';
import { setMenuItem } from '../../../Storage/Redux/menuItemSlice';
import { MainLoader } from '../../../Pages/Common';

function MenuItemList() {
    //const [menuItem,setMenuItems] = useState<menuItemModel[]>([]);
    const {data,isLoading} = useGetMenuItemQuery(null);
    const disPatch = useDispatch();

  useEffect(() =>{
   if(!isLoading){
 disPatch(setMenuItem(data.result));
   }
  },[isLoading]);
 
  if(isLoading){
    return <MainLoader/>
  }
  
  return (
    <div className='container row'>
      {data.result.length > 0 && data.result.map((menuItem: menuItemModel,index: number)=>(
        <MenuItemCard menuItem={menuItem} key={index}/>
      ))}
    </div>
  )
}

export default MenuItemList
