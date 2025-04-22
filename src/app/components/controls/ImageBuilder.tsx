import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { AppAssets } from "@/Constants/assets";

export default function ImageBuilder({
  handleChange,
  acceptedFileType,
  designLayout,
  maxSize,
  width,
  height,
}: any) {
  const [files, setFiles] = useState<any>(null);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Do something with the files
      setFiles(acceptedFiles[0]);
      handleChange(acceptedFiles[0]);
    },

    [files, setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileType,
    multiple: false,
    maxSize: maxSize,
  });

  return (
    <div>
      {" "}
      {files ? (
        <div className="relative" {...getRootProps()}>
          <div
            {...getRootProps()}
            className="relative flex justify-center items-center m-2   bg-white rounded-[10px] border border-zinc-300 border-primary border-dotted px-4 py-5"
          >
            {files?.type.startsWith("image/") ? (
              <div
                className={` m-2 h-full relative ${
                  height ? `h-[${height}]` : "h-[50vh]"
                }  ${width ? `w-[${width}]` : "w-[30vh]"} `}
              >
                <Image
                  src={URL.createObjectURL(files)}
                  alt="image"
                  height={300}
                  width={300}
                  className="bg-contain"
                  // fill={true}
                />
              </div>
            ) : files?.type.startsWith("video/mp4") ? (
              <>
                <video controls>
                  <source src={URL.createObjectURL(files)} type={files.type} />
                  Your browser does not support the video tag.
                </video>
              </>
            ) : files.type.startsWith("audio/") ? (
              <>
                <audio controls>
                  <source src={URL.createObjectURL(files)} type={files.type} />
                  Your browser does not support the audio tag.
                </audio>
              </>
            ) : files?.type.startsWith("application/pdf") ? (
              <>
                <iframe
                  src={URL.createObjectURL(files)}
                  width="100%"
                  height="450"
                  loading="lazy"
                ></iframe>
              </>
            ) : files.type ===
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
              files.type === "application/msword" ? (
              <>
                <div className="flex flex-col justify-center py-4 items-center">
                  <div className="flex justify-center items-center gap-0">
                    <Image src={AppAssets.logo} alt="image" className="w-16" />
                  </div>
                  <p className="text-paragraph text-base font-semibold mt-2">
                    {files.name}
                  </p>
                </div>
              </>
            ) : files.type === "application/vnd.ms-excel" ||
              files.type ===
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? (
              <>
                <div className="px-3">
                  <div className="flex flex-col justify-center py-4 items-center">
                    <div className="flex justify-center items-center gap-0">
                      <Image
                        src={AppAssets.logo}
                        alt="image"
                        className="w-16"
                      />
                    </div>
                    <p className="text-paragraph text-base font-semibold mt-2">
                      {files.name}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div
                {...getRootProps()}
                className=" flex flex-col justify-center items-center"
              >
                <input {...getInputProps()} />
                <div className="flex justify-center items-center gap-0">
                  <Image src={AppAssets.logo} alt="image" className="w-16" />
                </div>
                <p className="text-paragraph  text-lg font-semibold mt-2">
                  {files?.path} {files.name}
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className=" flex flex-col justify-center items-center"
        >
          <input {...getInputProps()} />
          {designLayout}
        </div>
      )}
    </div>
  );
}
