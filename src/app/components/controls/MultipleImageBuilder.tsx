/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { FcAddImage } from "react-icons/fc";
import { AppAssets } from "@/Constants/assets";

export default function MultipleImageBuilder({
  language,
  setreset,
  handleChange,
  acceptedFileType,
  designLayout,
  reset,
  handleAddImage,
}: any) {
  const [files, setFiles] = useState<any>([]);
  const [errorFiles, setErrorFiles] = useState<any>(false);

  const deleteFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  useEffect(() => {
    if (reset) {
      setFiles([]);
      setreset(false);
    }
  }, [reset]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Check if any file's size exceeds 20 MB
    const largeFiles = acceptedFiles.some((item: any) => item?.size > 20971520);
    console.log(largeFiles);
    if (largeFiles) {
      setErrorFiles(true);
    }
    const isAnyFileExceedingLimit = acceptedFiles.filter(
      (file: any) => file.size <= 20971520 // 20 MB in bytes
    );
    // console.log(isAnyFileExceedingLimit);

    // if (isAnyFileExceedingLimit) {
    //   alert(
    //     "File size should not exceed 20 MB. None of the files will be stored."
    //   );
    // } else {
    setFiles((prevFiles: any) => [...prevFiles, ...isAnyFileExceedingLimit]);
    // }
  }, []);
  console.log(files, "files");

  useEffect(() => {
    handleChange(files);
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileType,
    multiple: true, // Allow multiple files to be selected
  });

  const allFilesAreImages = files.every((file: File) =>
    file.type.startsWith("image/")
  );

  const allFilesAreVideos = files.every((file: File) =>
    file.type.startsWith("video/")
  );

  const allFilesAreAudios = files.every((file: File) =>
    file.type.startsWith("audio/")
  );

  const allFilesArePDF = files.every((file: File) =>
    file.type.startsWith("application/pdf")
  );

  const allFilesAreDoc = files.every(
    (file: File) =>
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type === "application/msword"
  );

  const allFilesAreSheets = files.every(
    (file: File) =>
      file.type === "application/vnd.ms-excel" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  return (
    <div className="h-[100%] w-[90%] mx-auto overflow-hidden bg-gray-200">
      {/* {errorFiles == true && (
        <div className="text-secondary">
          {translation?.find((item: { id: number }) => item?.id === 549)?.value}
        </div>
      )} */}
      <h1 className="h-[15%] py-5 px-3  font-bold   rounded-sm capitalize  text-lg  flex items-center   gap-2  ">
        upload Photos <FcAddImage />
      </h1>

      {files.length > 0 ? (
        <div
          {...getRootProps()}
          className="  h-[65%]  overflow-scroll overflow-x-hidden flex flex-wrap justify-center items-center rounded-xl border  px-2 mx-2 py-5"
        >
          {files.map((file: any, index: number) => (
            <div
              key={index}
              className={`  ${
                allFilesAreImages
                  ? " w-[200px] "
                  : allFilesAreVideos
                  ? "w-[200px]"
                  : allFilesAreAudios
                  ? "w-[200px]"
                  : file.type.startsWith("application/pdf")
                  ? "w-[200px]"
                  : "w-[200px]"
              } mb-5 relative`}
            >
              <div className="z-50 absolute right-3 mt-2">
                <div
                  onClick={(e: any) => {
                    deleteFile(index);
                    e.stopPropagation();
                  }}
                  className="  bg-red-200 hover:bg-secondary cursor-pointer rounded-full h-5 w-5 flex justify-center items-center p-1 "
                >
                  <RxCross2 className="text-white h-4 w-4" />
                </div>
              </div>
              {allFilesAreImages ? (
                <div className="px-3">
                  <div className="h-[24%] px-4 flex flex-col justify-center items-center bg-gray-100 py-4 rounded-md">
                    <div className="flex justify-center items-center gap-0">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="image"
                        className="w-full"
                        width="100%"
                      />
                    </div>
                  </div>
                </div>
              ) : allFilesAreVideos ? (
                <>
                  <div className="px-2">
                    <video controls>
                      <source
                        src={URL.createObjectURL(file)}
                        type={file.type}
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </>
              ) : allFilesArePDF ? (
                <>
                  <div className="px-2">
                    <iframe
                      src={URL.createObjectURL(file)}
                      width="100%"
                      height="250"
                      loading="lazy"
                    ></iframe>
                  </div>
                </>
              ) : allFilesAreDoc ? (
                <>
                  <div className="px-3">
                    <div className="h-[24%] px-4 flex flex-col justify-center items-center bg-gray-100 py-4 rounded-md">
                      <div className="flex justify-center items-center gap-0">
                        <Image
                          src={AppAssets.logo}
                          alt="image"
                          className="w-16"
                        />
                      </div>
                      <p className="text-paragraph text-center text-sm font-semibold mt-2 line-clamp-1 ">
                        {file.name}
                      </p>
                    </div>
                  </div>
                </>
              ) : allFilesAreSheets ? (
                <>
                  <div className="px-3">
                    <div className="h-[24%] px-4 flex flex-col justify-center items-center bg-gray-100 py-4 rounded-md">
                      <div className="flex justify-center items-center gap-0">
                        <Image
                          src={AppAssets.logo}
                          alt="image"
                          className="w-16"
                        />
                      </div>
                      <p className="text-paragraph text-center text-sm font-semibold mt-2 line-clamp-1 ">
                        {file.name}
                      </p>
                    </div>
                  </div>
                </>
              ) : allFilesAreAudios ? (
                <div className="px-3">
                  <audio controls>
                    <source src={URL.createObjectURL(file)} type={file.type} />
                    Your browser does not support the audio tag.
                  </audio>
                </div>
              ) : (
                <div className="px-2 w-full">
                  <div className="h-[24%] px-4 flex flex-col justify-center items-center bg-gray-100 py-4 rounded-md">
                    <div className="flex justify-center items-center gap-0">
                      {file.type.startsWith("image/") ? (
                        <Image
                          src={AppAssets.logo}
                          alt="image"
                          className="w-[70%]"
                        />
                      ) : file.type.startsWith("video/") ? (
                        <Image
                          src={AppAssets.logo}
                          alt="image"
                          className="w-[80%]"
                        />
                      ) : file.type.startsWith("audio/") ? (
                        <Image
                          src={AppAssets.logo}
                          alt="image"
                          className="w-[70%]"
                        />
                      ) : file.type.startsWith("application/pdf") ? (
                        <Image
                          src={AppAssets.logo}
                          alt="image"
                          className="w-[60%]"
                        />
                      ) : file.type ===
                          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                        file.type === "application/msword" ? (
                        <Image
                          src={AppAssets.logo}
                          alt="image"
                          className="w-[60%]"
                        />
                      ) : file.type === "application/vnd.ms-excel" ||
                        file.type ===
                          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? (
                        <Image
                          src={AppAssets.logo}
                          alt="image"
                          className="w-[70%]"
                        />
                      ) : (
                        <Image
                          src={AppAssets.logo}
                          alt="image"
                          className="w-[70%]"
                        />
                      )}
                    </div>
                    <p className="text-paragraph text-center text-sm font-semibold mt-2 line-clamp-1 ">
                      {file.name}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="  h-[65vh] w-[80vw] bg-white overflow-scroll overflow-x-hidden flex flex-wrap justify-center items-center   border   py-5"
        >
          <input {...getInputProps()} className=" h-[65vh] w-[80vh]" />
          <label className="text-lg  flex flex-col justify-center items-center text-gray-400">
            <FcAddImage className="w-32 h-32 text-gray-400" /> Select Photos
          </label>
        </div>
      )}

      <div
        className={` mt-2 mx-4 flex flex-wrap   justify-end m-2 gap-2   items-end h-[10%]`}
      >
        <button
          onClick={() => {
            handleAddImage();
          }}
          type="button"
          className="hover:cursor-pointer  w-28 capitalize rounded-md bg-blue-400 p-1  text-white hover:bg-blue-200 flex items-center justify-center  "
        >
          upload now
        </button>
        <button
          onClick={() => setFiles([])}
          className="hover:cursor-pointer w-28 capitalize  rounded-md bg-blue-400 p-1  text-white hover:bg-blue-200 flex items-center justify-center  "
        >
          {" "}
          clear
          {/* {
                translation?.find((item: { id: number }) => item?.id === 377)
                  ?.value
              } */}
        </button>
        {/* <button
              {...getRootProps()}
              className={`${
                language?.is_right_to_left == true && "rightToLeftLanguage"
              } font-bold  duration-1000 text-white w-fit rounded-md py-3 px-5 cursor-pointer flex justify-center items-center  bg-primary  pb-2 text-[12px] md:text-sm`}
            > 
              {
                translation?.find((item: { id: number }) => item?.id === 185)
                  ?.value
              }
            </button> */}
      </div>
    </div>
  );
}
