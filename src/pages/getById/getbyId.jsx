import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getById, deleteImg } from "../../todoSlise/todoSlice";
import { useParams } from "react-router-dom";

const API = 'http://65.108.148.136:8080/images';

const GetbyId = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    dispatch(getById(id));
  }, [dispatch, id]);

  const databyId = useSelector(state => state.TodoSlice.databyId);

  const handleAddImage = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('Images', selectedImage);
    formData.append('Id', id);

    try {
      await axios.post(`${API}/add-image`, formData);
      dispatch(getById(id)); 
      setSelectedImage(null);
    } catch (error) {
      console.error('Failed to add image', error);
    }
  };

  const handleDeleteImage = (imageId) => {
    dispatch(deleteImg(imageId));
  }
  
  

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-bold mb-4">{databyId?.name}</h2>
        <p className="text-gray-700 mb-4">{databyId?.description}</p>
        <div className="mb-4">
          <input 
            type="file" 
            onChange={(e) => setSelectedImage(e.target.files[0])} 
            className="block mb-2"
          />
          <button 
            onClick={handleAddImage} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Image
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {databyId?.images?.map((el) => (
            <div key={el.id} className="relative">
              <img className="w-full h-auto object-cover rounded" src={`${API}/${el.imageName}`} alt="" />
              <button 
                onClick={() => handleDeleteImage(el.id)} 
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GetbyId;
