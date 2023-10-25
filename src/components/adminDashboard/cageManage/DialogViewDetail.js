import { Dialog } from '@mui/material'
import React from 'react'

export default function DialogViewDetail({ open, onClose, selectedData }) {
  return (
    <div>
      <Dialog width={1000} open={open} onClose={onClose}>
        <section class="text-gray-600 body-font">
          <div class="container px-2 py-12 mx-auto">
            <div class="text-center mb-10">
              <h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">{selectedData && selectedData.name}</h1>
              <img alt="content"
                class="object-cover object-center xl:w-1/3 lg:w-2/4 mx-auto"
                src={selectedData && selectedData.imagePath} />
            </div>
            <div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
              {/* <div class="p-2 sm:w-1/2 w-full">
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
