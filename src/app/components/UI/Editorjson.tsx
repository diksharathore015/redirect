import Image from "next/image";
import {
  BsExclamationCircle,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { CiBookmarkCheck, CiBookmarkRemove } from "react-icons/ci";
import { FaQuoteLeft } from "react-icons/fa6";
const EditorJsonComponent = ({
  jsonData,
  style = "font-[200]  text-gray-400 text-xs",
}: any) => {
  return (
    <div>
      {jsonData?.blocks?.map((block: any, index: number) => {
        switch (block.type) {
          case "paragraph":
            return (
              <div
                className={`pb-3 mt-3  px-2   `}
                dangerouslySetInnerHTML={{
                  __html: `${block.data.text}`,
                }}
              ></div>
            );
          case "Header":
            let fontSize = 28;
            let color = "#000";
            switch (block.data.level) {
              case 1:
                fontSize = 32;
                color = "#282727";
                break;
              case 2:
                fontSize = 26;
                color = "#333333";
                break;
              case 3:
                fontSize = 24;
                color = "#3F3434";
                break;
              case 4:
                fontSize = 20;
                color = "#786F6F";
                break;
              case 5:
                fontSize = 18;
                color = "#786F6F";
                break;
              default:
                fontSize = 20;
                color = "#786F6F";
                break;
            }
            return (
              <p
                key={index}
                style={{ fontSize: fontSize, color: color }}
                className=" mt-4 mb-8 text-xs pl-4"
              >
                {block.data.text}
              </p>
            );
          case "Image":
            return (
              <>
                {block?.data?.file?.url && (
                  <div key={index} className="mb-4 mt-2">
                    <Image
                      alt="ok"
                      src={block.data.file.url}
                      className={`w-full  mt-4 rounded-md shadow-md ${
                        !block.data.withBorder && "border-2 border-black p-2"
                      }`}
                      height={50}
                      width={600}
                    />
                    {block.data.caption && (
                      <p className="italic text-center text-slate-400 text-lg mb-5 mt-1">
                        {block.data.caption}
                      </p>
                    )}
                  </div>
                )}
              </>
            );
          case "List":
            return (
              <div key={index} className="px-10 mt-5 mb-5">
                {block.data.style == "unordered" ? (
                  <ul
                    key={index}
                    className={`w-full text-sm   mt-2   list-disc`}
                  >
                    {block.data.items.map((item: any, itemIndex: number) => (
                      <li key={itemIndex} className="w-full  ">
                        <p className="text-base font-[400] text-dark pb-3 ">
                          {item}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : block.data.style == "ordered" ? (
                  <ol
                    key={index}
                    className={`w-full text-sm   mt-2   list-decimal`}
                  >
                    {block.data.items.map((item: any, itemIndex: number) => (
                      <li key={itemIndex} className="w-full     ">
                        <p className="text-base font-[400] text-dark pb-3 ">
                          {item}
                        </p>
                      </li>
                    ))}
                  </ol>
                ) : null}
              </div>
            );
          case "Checklist":
            return (
              <div key={index} className="px-3  mt-5 mb-5">
                <div className="bg-gray-100 px-2 rounded-md py-4 w-full">
                  {block.data.items.map((item: any, itemIndex: number) => (
                    <div
                      key={itemIndex}
                      className="w-full  px-3 flex flex-wrap gap-2 justify-start mb-5"
                    >
                      {item.checked ? (
                        <CiBookmarkCheck className="h-5 w-5" />
                      ) : (
                        <CiBookmarkRemove className="h-5 w-5" />
                      )}

                      <div
                        className={`w-[90%]   text-sm`}
                        dangerouslySetInnerHTML={{
                          __html: `${item.text}`,
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            );
          case "Quote":
            return (
              <div key={index} className="px-3  mt-5 ">
                <div className="bg-gray-100 px-5 rounded-md py-4">
                  <FaQuoteLeft className="h-10 w-10 text-six " />

                  <p className="pb-3  pt-2 text-sm font-[400] text-dark ">
                    &quot;{block.data.text}&quot;
                  </p>
                  <p className="  text-center  text-lg font-semibold text-dark  ">
                    {block.data.caption}
                  </p>
                </div>
              </div>
            );
          case "Warning":
            return (
              <div key={index} className="    px-4 py-3   ">
                <div className=" bg-[#ffc22d]    px-4 py-3 rounded-lg shadow">
                  <div className="  flex flex-row justify-between mb-4">
                    <p className="text-xl font-[400] text-dark    w-[95%]">
                      {block.data.title}
                    </p>
                    <BsExclamationCircle className="h-6 w-6 text-colorOne" />
                  </div>
                  <p className="text-sm font-[400] text-dark  ">
                    {block.data.message}
                  </p>
                </div>
              </div>
            );
          case "Delimiter":
            return (
              <div
                key={index}
                className="  border-b-2 border-dark  hover:border-colorTwo py-5"
              ></div>
            );
          case "Link":
            return (
              <div className=" pt-5 px-4   flex justify-start items-start">
                <a
                  className="text-sm text-wrap-design  text-four font-semibold underline pl-1  "
                  target="_blank"
                  href={block.data.link}
                >
                  {block.data.link}
                </a>
              </div>
            );
          case "Table":
            return (
              <div key={index} className=" px-3  w-full">
                <div key={block.data.content[0][0]} className="px-3 w-full">
                  <div className="overflow-x-auto w-full h-auto border-six border-t-0 border-[1px] rounded-lg">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                      <thead className="bg-eight">
                        <tr>
                          {block.data.content[0].map(
                            (item: any, index: any) => (
                              <th
                                key={index}
                                className="py-4 md:px-6 px-2 text-gray-500 text-[14px] text-left"
                              >
                                {item}
                              </th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {block.data.content
                          .slice(1)
                          .map((row: any, rowIndex: any) => (
                            <tr
                              key={rowIndex}
                              className={`${
                                rowIndex % 2 === 0 ? "bg-gray-200" : "bg-white"
                              }`}
                            >
                              {row.map((cell: any, cellIndex: any) => (
                                <td
                                  key={cellIndex}
                                  className="py-4 md:px-6 px-2 text-eight text-[12px] text-left"
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          case "Raw":
            return (
              <div key={index} className="px-3  mt-5">
                <div className="bg-white  px-5 rounded-md py-4">
                  <p className="text-base font-[400] text-dark">
                    {block.data.html}
                  </p>
                </div>
              </div>
            );
          case "Attaches":
            return (
              <div key={index}>
                {block.data.file && (
                  <>
                    {block.data.file.extension == "jpeg" &&
                    "png" &&
                    "jpg" &&
                    "gif" ? (
                      <div className="mb-5 mt-5 bg-red-500 h-10">
                        <Image
                          alt="ok"
                          src={block.data.file.url}
                          className={`w-[100%] lg:w-[50%]  mt-4 rounded-md shadow-md ${
                            !block.data.withBorder &&
                            "border-2 border-black p-2"
                          }`}
                          height={50}
                          width={400}
                        />
                      </div>
                    ) : (
                      <>
                        <div className="py-4 px-4   flex justify-start items-start">
                          <a
                            className="text-sm   text-four font-semibold underline pl-1  "
                            target="_blank"
                            href={block.data.file.url}
                          >
                            {block.data.file.name}
                          </a>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};
export default EditorJsonComponent;
