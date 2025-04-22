// import React, { memo, useEffect, useRef } from "react";
// import EditorJS from "@editorjs/editorjs";

// import Table from "@editorjs/table";
// import List from "@editorjs/list";
// import Warning from "@editorjs/warning";
// import Image from "@editorjs/image";
// import Header from "@editorjs/header";
// import Quote from "@editorjs/quote";
// import Delimiter from "@editorjs/delimiter";
// import InlineCode from "@editorjs/inline-code";

// import { base } from "@/Constants/config";

// export const EDITOR_TOOLS: any = {
//   table: Table,
//   list: List,
//   warning: Warning,
//   image: {
//     class: Image,
//     config: {
//       endpoints: {
//         byFile: base?.API_URL + "/blogs/uploadi/", // Backend file uploader endpoint
//         byUrl: base?.API_URL + "/blogs/uploadi/", // Endpoint for uploading by URL
//       },
//     },
//   },
//   header: {
//     class: Header,
//     config: {
//       placeholder: "Enter a header",
//       levels: [2, 3, 4],
//       defaultLevel: 3,
//     },
//   },
//   quote: Quote,
//   delimiter: Delimiter,
//   inlineCode: InlineCode,
// };

// type Props = {
//   data?: any;
//   onChange(val: any): void;
//   holder: string;
// };

// const EditorBlock = ({ data, onChange, holder }: Props) => {
//   const ref = useRef<any>("");

//   useEffect(() => {
//     if (!ref.current) {
//       const editor = new EditorJS({
//         holder: holder,
//         tools: EDITOR_TOOLS,
//         data,
//         async onChange(api: any) {
//           const savedData = await api.saver.save();
//           onChange(savedData);
//         },
//       });
//       ref.current = editor;
//     }

//     return () => {
//       if (ref.current && ref.current.destroy) {
//         ref.current.destroy();
//       }
//     };
//   }, [data, holder, onChange]);

//   return (
//     <div className="h-[70vh] w-full bg-white border rounded-lg shadow-lg">
//       <div id={holder} className="editor-container w-full h-full p-4"></div>
//     </div>
//   );
// };

// export default memo(EditorBlock);
import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { base } from "@/Constants/config"; // if you need your API URL

const TinyMCEEditor = () => {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [editorContent, setEditorContent] = useState("<p>Start typing...</p>");

  // Ensure TinyMCE loads only on the client side
  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const handleEditorChange = (content: any) => {
    setEditorContent(content);
  };

  return (
    <div className="container mx-auto my-8 p-4">
      <h1 className="text-xl font-semibold mb-4">TinyMCE Editor in Next.js</h1>
      {editorLoaded && (
        <Editor
          apiKey="skjlss8of1zrpt2o702ln5ox7enl6vn5tvat5vyqh24frr5r" // Optional: you can get a free API key from TinyMCE
          value={editorContent}
          init={{
            height: 500,
            menubar: true,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
          }}
          onEditorChange={(newValue) => handleEditorChange(newValue)}
        />
      )}
      <div className="mt-4">
        <h2 className="text-lg">Editor Output:</h2>
        <div
          className="border p-4 mt-2"
          dangerouslySetInnerHTML={{ __html: editorContent }} // Display the content
        />
      </div>
    </div>
  );
};

export default TinyMCEEditor;
