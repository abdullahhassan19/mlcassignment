import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import { Client } from "@microsoft/microsoft-graph-client";
function App() {
  const [data, setdata] = useState({});
  const [text, setText] = useState("");
  //  const [fileLink, setFileLink] = useState("");
  const key= "01918447-8f07-4670-85e3-83c2eb13b5c7"
  const graphClient = Client.init({
    authProvider: (done) => {
      done(null, "~2x8Q~gGJQgof3jIKedd2fcWi1DouGLntGwdob14");
    },
  });

  async function uploadFile (file) {

    const accessToken = "01918447-8f07-4670-85e3-83c2eb13b5c7";
    const endpoint = `https://graph.microsoft.com/v1.0/me/drive/root/children/${file.name}/content`;
    const options = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': file.type,
      },
      body: file,
      onUploadProgress: (progress) => {
        setUploadProgress(Math.round((progress.loaded / progress.total) * 100));
      },
    };

    try {
      const response = await fetch(endpoint, options);
      if (!response.ok) throw new Error(response.statusText);
      console.log('File uploaded successfully');
    } catch (error) {
      console.error(error);
    }
  }

 

  const handlesubmit = () => {
    // console.log(data);
    uploadFile(data).then((response) => {
      console.log(response);
    });
  };
  const handlefile = (e) => {
    setdata(e.target.files[0]);
    // console.log(e.target.files[0])
  }; const handleCancel = () => console.log("CANCELLED");

  const handleSuccess = (files) => {
    console.log("SUCCESS: ", files);

  }

  const handleError = (err) => console.log("ERROR: ", err);
  
  var handleopenpicker = function (
    oneDriveApplicationId,
    action,
    multiSelect,
    advancedOptions
  ) {
    return new Promise(function (resolve, reject) {
      var odOptions = {
        clientId: oneDriveApplicationId,
        action: action || "share",
        multiSelect: multiSelect || true,
        openInNewWindow: true,
        advanced: advancedOptions || {},
        success: function (files) {
          handleSuccess(files);
        },
        cancel: function () {
          handleCancel();
        },
        error: function (e) {
          handleError(e);
        },
      };
      OneDrive.open(odOptions);
    });
  };
  return (
    <div className="App">
      <div className="navbar">
        <h1>WLC Assignment</h1>
      </div>
      <div className="uploaddiv">
        <h1 className="text">Upload file</h1>
        <input type="file" onChange={(e) => handlefile(e)} />
        <div>
          <button className="button" onClick={handlesubmit}>
            Submit
          </button>
        </div>
      </div>
      <hr></hr>
      <div className="geturldiv">
        <h1 className="text">Get file</h1>
        <button onClick={(e)=>handleopenpicker(key,"share")} className="button">
          Open Picker
        </button>
        <a href={text}> {text} </a>
      </div>
    </div>
  );
}

export default App;
