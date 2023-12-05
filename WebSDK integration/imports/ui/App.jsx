import React from "react";
import LoadingSpinner from "./LoadingSpinner";
// ANDROID PERMISSION STATUSES https://www.npmjs.com/package/cordova.plugins.diagnostic#permissionstatus-constants
export default function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [permissionStatus, setPermissionStatus] = React.useState();

  React.useEffect(() => {
    if (Meteor.isCordova) {
      document.addEventListener("deviceready", onDeviceReady, false);
    }
  }, []);
  function onDeviceReady() {
    console.log("Device is ready");
    console.log(window?.cordova?.platformId);
    checkCameraPermissionState();
  }
  function handleError(error) {
    console.log("An error occurred: " + error);
  }
  function checkCameraPermissionState() {
    if (Meteor.isCordova) {
      cordova.plugins.diagnostic.getCameraAuthorizationStatus(function (
        status
      ) {
        console.log("Camera permission is: " + status);
        setPermissionStatus(status);
        if (status === "GRANTED" || status == "authorized") {
          console.log("Permission granted loading IDWise");
          loadIDWise();
        }
      },
      handleError);
    }
  }

  function requestCameraPermissions() {
    if (Meteor.isCordova) {
      cordova.plugins.diagnostic.requestCameraAuthorization({
        successCallback: function (status) {
          console.log(`${status}`);
          console.log("Successfully requested camera authorization: " + status);
          setPermissionStatus(status);
          if (status === "GRANTED" || status === "authorized") {
            console.log("Permission granted loading IDWise");
            loadIDWise();
            return;
          } else {
            console.log("Permission not granted", status);
          }
        },
        errorCallback: handleError,
        externalStorage: true,
      });
    } else {
      console.log("Loading IDWise web");
      loadIDWise();
    }
  }

  function loadIDWise() {
    console.log("Loading IDWise", permissionStatus);
    try {
      setIsLoading(true);
      IDWise.initialize({
        clientKey:
          "QmFzaWMgT0RBME5EaGxOall0WmpVeFpDMDBNVE5oTFdGa1pEWXRNRE01TWpGaE5UaGpZbU5pT21WNVNtaGlSMk5wVDJsS1NWVjZTVEZPYVVselNXNVNOV05EU1RaSmEzQllWa05LT1M1bGVVcHFaRmhPTUdJeU1XeGpiRGx3V2tOSk5rbHFaM2RPUkZFMFdsUlpNa3hYV1RGTlYxRjBUa1JGZWxsVE1XaGFSMUV5VEZSQmVrOVVTWGhaVkZVMFdUSkthbGxwU1hOSmJWWTBZME5KTmsxVVkzZE5ha0V4VGxSUmVrNXVNQzVNUkRKclprTjFVRE5UZFZCNExVNUplREU0VEhSQmNrMTZVSEZ6VXpCS09FZEpWMUZDTmtGak0zbEI=", //replace xxxx with client key that you got from IDWise
        locale: "ur-PK",
      })
        .then(idwise => {
          setIsLoading(false);
          idwise.startJourney({
            mount: "#idwise-mount",
            journeyDefinitionId: "80448e66-f51d-413a-add6-03921a58cbcb", // replace xxx with your jounrey definition id
            referenceNo: "test", // is optional, pass your reference id if it is needed.
            eventHandlers: {
              onJourneyStarted: function (details) {
                alert("Journey started, journey id =" + details.journeyId);
              },
              onJourneyFinished: function (details) {
                alert("Journey finished, journey id =" + details.journeyId);
              },
              onJourneyCancelled: function (details) {
                alert("Journey cancelled, journey id =" + details.journeyId);
              },
            },
          });
        })
        .catch(error => {
          alert(error);
          setIsLoading(false);
        });
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {isLoading ? <LoadingSpinner /> : null}
      <h3>Meteor-Cordova Example !</h3>
      {Meteor.isCordova ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <p>
            <strong>Camera Permission Status:</strong> {permissionStatus}
          </p>
          <button
            onClick={requestCameraPermissions}
            style={{ height: "30px" }}
            disabled={isLoading}
          >
            Load IDWise
          </button>
        </div>
      ) : null}
      <div id="idwise-mount"></div>
    </div>
  );
}
