import React from 'react';
import { ImageUrls } from '../constants';
import { NavigationBar , Text , NavigationButton , Footer } from '../components/atoms';

const Home = () => {
  return (
    <div 
        className='flex flex-col items-center justify-center px-4 py-6'
        style={{
            width: "100%",
            minHeight: "100vh",
            backgroundImage: `url(${ImageUrls.homeBg})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
             backgroundAttachment: "fixed",
             overflowY:'hidden'
        }}
    >
      <div className='w-full h-[100px] flex items-center top-0 absolute mt-5 '>
          <NavigationBar style={` `} />
        </div>
      <div className=''>
        <div className='flex flex-col items-center justify-center 2xl:h-[600px] md:h-[400px]'>
          <div className='flex items-center justify-center mb-8 font-bold'>
            <Text content="SuperCure Hospital Chatbot System" size="3.6rem" style={`font-serif  text-purple-900`} />
          </div>
          <div className='w-[40%]'>
            <Text 
              content="
                       Welcome to the SuperCure Hospital Chatbot System, 
                       your loyal healthcare partner. Our healthcare system 
                       is committed to providing professional, caring, and excellent medical services. 
                       We are here to assist you on your path to improved health, offering standard examinations and specialist therapies. 
                       Putting your well-being first, our team of highly qualified healthcare experts and modern facilities ensure exceptional care." 
               size="1.2rem" style={`font-sans break-words w-full text-slate-100`}S
            />
          </div>
          <div className='mt-5'>
            <NavigationButton buttonType="button" buttonName="Get start" style={`flex items-ceneter justify-center duration-300 transform ease-in-out text-white text-[1.1rem] border-[5px] border-slate-300 w-[100px] hover:border-yellow-300 hover:bg-white hover:text-black`} path={"/login"} />
          </div>  
        </div>
      </div>
      <div className='absolute bottom-0 w-full'>
        <Footer content="&copy; SuperCure Hospital - All rights reserved" style={`h-[58px] text-[1.1rem] text-slate-200 font-semibold w-full flex items-center justify-center bg-orange-100 bg-opacity-30`} />
      </div>
    </div>
  )
}

export default Home
