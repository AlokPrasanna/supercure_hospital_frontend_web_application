import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import PrimaryButton from './PrimaryButton';
import { Colors } from '../../constants';

const ImageUpload = () => {
    const [Image, setImage] = useState([]);
    const MaxNumber = 1;

    const OnChange = (imageList , addUpdateIndex) => {
        console.log(addUpdateIndex);
        setImage(imageList);
    }
  return (
    <div>
      <ImageUploading
        multiple
        value={Image}
        onChange={OnChange}
        maxNumber={MaxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="p-2 ml-8">
            <div 
                className='transform hover:scale-105'
                style={isDragging ? { color: 'red' } : undefined}
                onClick={onImageUpload}
                {...dragProps} 
            >
            <PrimaryButton buttonTitle="Click or Drop here" buttonColor={Colors.green} />
            </div>
            &nbsp;
            {imageList.map((image, index) => (
              <div className='flex w-96 '>
                <div key={index} className="flex items-center gap-5">
                    <img src={image['data_url']} alt="" width="150" />             
                    <div className='transform hover:scale-105' onClick={() => onImageRemove(index)}><PrimaryButton buttonTitle="Remove" buttonColor={Colors.red} /></div> 
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  )
}

export default ImageUpload