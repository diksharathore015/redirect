 
import React, { useState } from "react";
import Input from "../comman/Input";
import Button from "../comman/Button";

function NewsLetter() {
 
  return (
    <div className="flex flex-col justify-center px-5 w-full items-center gap-2 border-b md:border-r md:border-b-0 py-12 ">
      <p className="text-description">HANDCRAFT WITH INTEGRITY</p>
      <p className="text-3xl md:text-4xl text-heading">Join Our NewsLetter</p>
      <p className="text-sm text-description text-center">
      Be in the Know. Subscribe to Our Newsletter
      </p>
      <div className="flex  items-start  justify-center gap-2 w-full md:w-[75%] mt-1 ">
        <div className="flex flex-col ">
          <Input
            // onChange={(e: any) => setValue(e.target.value)}
            placeholder="Your Email Address"
          />
          {/* {msg && (
            <span
              className={`${
                msg == "newsletter subscribed successfully"
                  ? "text-green-600 "
                  : "text-red-600 "
              } text-xs`}
            >
         {msg} 
              Thank You
            </span>
          )} */}
        </div>

        <Button
          buttonText={"Sign Up"}
        //   handleClick={() => handleSubmit()}
          className={"w-full py-2.5 md:w-fit"}
        />
      </div>
    </div>
  );
}

export default NewsLetter;
