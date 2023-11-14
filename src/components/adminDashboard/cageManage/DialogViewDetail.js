
import { Dialog } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function DialogViewDetail({ open, onClose, selectedData }) {
  const [imageID, setImageID] = useState([]);
  const [imgCage, setImgCage] = useState([]);
  const [error, setError] = useState(null);
  console.log("selectedData", selectedData)
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/api/v1/cage/${selectedData && selectedData._id}`)
  //     .then((response) => {
  //       const dataCage = response.data.data.component;
  //       console.log(dataCage);
  //       setImageID(dataCage.image[0]._id);
  //       console.log(imageID)
  //       // setCage(dataCage);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setError('Unable to fetch Cage data.');
  //     });
  // }, [selectedData && selectedData._id]);
  useEffect(() => {
    if(selectedData && selectedData.images){
      const images = selectedData?.images?.map(i => i.imagePath);
      setImgCage(images)
      console.log(images)
    }
    // setImgCage(images)
  }, [selectedData]);
  return (
    <div>
      <Dialog width={1000} open={open} onClose={onClose}>
        <section class="text-gray-600 body-font">
          <div class="container px-2 py-12 mx-auto">
            <div class="text-center">
              <h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">{selectedData && selectedData.name}</h1>
              <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-2">
                <div class="mx-auto max-w-2xl py-0 mb-3 pb-0 sm:py-0 lg:max-w-none lg:py-0">
                  <div>
                    <div class="relative h-full w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                      <img src={selectedData && selectedData.imagePath} alt='Main image' class="h-full w-full object-contain object-center" />
                    </div>
                  </div>
                  {imgCage.length > 0 && (
                    <h2 class="text-2xl font-bold text-gray-900 mb-2 mt-4">Extra images</h2>
                  )}

                  <div
                    class={`
    mt-2 space-y-2
    lg:grid lg:gap-x-6 lg:space-y-0
    ${imgCage.length === 2 ? 'lg:grid-cols-2' : ''}
    ${imgCage.length === 1 ? 'lg:grid-cols-1' : ''}
    ${imgCage.length >= 3 ? 'lg:grid-cols-3' : ''}
  `}
                  >
                    {imgCage.map((image, index) => (
                      <div class="group relative" key={index}>
                        <div class="relative h-40 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-32">
                          <img src={image} alt={`Image ${index}`} class="h-full w-full object-contain object-center mx-auto" />
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>

            <div class="flex flex-wrap lg:w-4/5 mt-0 sm:mx-auto sm:mb-2 -mx-2">
              {/* <div class="p-2 sm:w-full w-full">
                <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                  <span class="title-font font-medium">
                    <strong>ID: </strong>
                    {selectedData && selectedData._id}
                  </span>
                </div>
              </div> */}
              <div class="p-2 sm:w-1/2 w-full">
                <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                  <span class="title-font font-medium">
                    <strong>Price: </strong>
                    {selectedData && selectedData.price}
                  </span>
                </div>
              </div>
              <div class="p-2 sm:w-1/2 w-full">
                <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                  <span class="title-font font-medium">
                    <strong>Width: </strong>
                    {selectedData && selectedData.width}
                  </span>
                </div>
              </div>
              <div class="p-2 sm:w-1/2 w-full">
                <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                  <span class="title-font font-medium">
                    <strong>Length: </strong>
                    {selectedData && selectedData.length}
                  </span>
                </div>
              </div>
              <div class="p-2 sm:w-1/2 w-full">
                <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                  <span class="title-font font-medium">
                    <strong>Height: </strong>
                    {selectedData && selectedData.height}
                  </span>
                </div>
              </div>
              <div class="p-2 sm:w-1/2 w-full">
                <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                  <span class="title-font font-medium">
                    <strong>In Stock: </strong>
                    {selectedData && selectedData.inStock}
                  </span>
                </div>
              </div>
              <div class="p-2 sm:w-1/2 w-full">
                <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                  <span class="title-font font-medium">
                    <strong>Create Date: </strong>
                    {selectedData && selectedData.createDate}
                  </span>
                </div>
              </div>
              <div class="p-2 sm:w-1/2 w-full">
                <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                  <span class="title-font font-medium">
                    <strong>Status: </strong>
                    {selectedData && selectedData.status}
                  </span>
                </div>
              </div>
              <div class="p-2 sm:w-1/2 w-full">
                <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                  <span class="title-font font-medium">
                    <strong>Rating: </strong>
                    {selectedData && selectedData.rating}
                  </span>
                </div>
              </div>
              <div class="p-2 sm:w-full w-full">
                <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                  <span class="title-font font-medium">
                    <strong>Description: </strong>
                    {selectedData && selectedData.description}
                  </span>
                </div>
              </div>
            </div>
            <button class="flex mx-auto mt-8 mb-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={onClose}>Close</button>
          </div>
        </section>


      </Dialog>
    </div>
  )
}
