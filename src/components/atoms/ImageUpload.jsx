import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import PrimaryButton from './PrimaryButton';
import { Colors } from '../../constants';
import { ImageDb } from '../../helper/Config';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 } from "uuid";
import Swal from "sweetalert2";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImageUpload = ({ imageUrl }) => {
  const [Image, setImage] = useState([]);
  const MaxNumber = 1;

  const authenticationDetails = {
    userId: localStorage.getItem('userId'),
    token: localStorage.getItem('token')
  };

  const notify = (message, type) => {
    switch (type) {
      case 'success':
        toast.success(message, { position: "top-right" });
        break;
      case 'info':
        toast.info(message, { position: "top-right" });
        break;
      case 'warning':
        toast.warning(message, { position: "top-right" });
        break;
      case 'error':
        toast.error(message, { position: "top-right" });
        break;
      default:
        toast(message, { position: "top-right" });
    }
  };

  const OnChange = (imageList, addUpdateIndex) => {
    console.log(addUpdateIndex);
    setImage(imageList);
  }

  const UserImageUpload = async (image) => {
    Swal.fire({
      title: "Are you sure to upload this image?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Upload!"
    }).then(async (result) => {
      if (!result.isConfirmed) {
        Swal.fire({
          title: "Cancel!",
          icon: "success"
        });
        return;
      } else {
        if (image?.file && imageUrl === "") {
          const ImageRef = ref(ImageDb, `files/${v4()}`);
          const uploadResult = await uploadBytes(ImageRef, image.file);
          const url = await getDownloadURL(uploadResult.ref);
          updateData(url);
        } else if (image?.file && imageUrl !== "") {
          const parts = imageUrl.split("%2F");
          const fileNameToken = parts[parts.length - 1];
          const fileName = fileNameToken.split("?")[0];

          const storageRef = ref(ImageDb, `files/${fileName}`);
          await deleteObject(storageRef);

          const ImageRef = ref(ImageDb, `files/${v4()}`);
          const uploadResult = await uploadBytes(ImageRef, image.file);
          const url = await getDownloadURL(uploadResult.ref);
          updateData(url);
        }
      }
    });
  }

  const updateData = async (url) => {
    const currentDate = new Date();

    // Current Date
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    // Current Time
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    const data = {
      imageUrl: url,
      dateUpdated: formattedDate,
      timeUpdated: formattedTime
    };

    try {
      const response = await fetch(`http://localhost:3300/api/users/update/${authenticationDetails.userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'token': `Bearer ${authenticationDetails.token}`
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (responseData.status) {
        console.log(responseData.user);
        notify("Data Updated!", 'success');
      } else {
        notify("Data Could not update!", 'error');
      }
    } catch (error) {
      console.log("Error! ", error);
      notify("Data Could not update!", 'error');
    }
  }

  return (
    <div className='w-full'>
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
              className='w-full duration-300 hover:scale-105'
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              <PrimaryButton buttonTitle="Click or Drop here" buttonColor={Colors.lightBlue} />
            </div>
            &nbsp;
            {imageList.map((image, index) => (
              <div className='flex w-96' key={index}>
                <div className="flex items-center gap-5">
                  <img src={image['data_url']} alt="" width="150" />
                  <PrimaryButton
                    buttonTitle="Remove"
                    buttonColor={Colors.red}
                    style={"duration-300 transform hover:scale-105"}
                    onClickFunc={() => onImageRemove(index)}
                    width="100px"
                  />
                  <PrimaryButton
                    buttonTitle="Upload"
                    buttonColor={Colors.green}
                    style={"duration-300 transform hover:scale-105"}
                    onClickFunc={() => UserImageUpload(image)}
                    width="100px"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  )
}

export default ImageUpload;
