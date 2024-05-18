import React from 'react'
import NavigationButton from './NavigationButton'

const NavigationBar = ({ bgColor , style}) => {
  const Style = style ? style : " ";
  return (
    <div className={`h-[75px] w-full`}>
      <nav>
        <div className='flex justify-end gap-8 '>
          <div className={`${Style}`}>
            <NavigationButton  buttonType="button" buttonName="Home" style={`text-white  hover:text-gray-400 transform hover:scale-110 `} path={"/"} width="60px" size={"text-[1rem]"}/>
          </div>
          <div className={`${Style}`}>
            <NavigationButton  buttonType="button" buttonName="Register" style={`text-white  hover:text-gray-400 transform hover:scale-110 `} path={"/register"} width="60px" size={"text-[1rem]"}/>
          </div>
          <div className={`${Style} mr-[80px]`}>
            <NavigationButton buttonType="button" buttonName="Log In" style={`text-white  hover:text-gray-400 transform hover:scale-110 `} path={"/login"} width="60px" size={"text-[1rem]"}/>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavigationBar
