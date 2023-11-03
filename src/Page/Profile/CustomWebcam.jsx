import Webcam from "react-webcam";
import { useRef,useState,useCallback} from "react"; 
import { Button } from "@chakra-ui/react";
const CustomWebcam = ({ sendDataToParent }) => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
            setImgSrc(imageSrc);
       
      }, [webcamRef]);
      const retake = () => {
        setImgSrc(null);
      };
      const done=()=>{
        sendDataToParent(imgSrc);
      }
  return (
<div className="container">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam height={600} width={600} ref={webcamRef} />
      )}
      <div className="btn-container">
        {imgSrc ? (
            <div style={{display:"flex",justifyContent:"space-between"}}>
          <Button mt={'1em'}  color={'white'} backgroundColor={'black'} onClick={retake}>Retake photo</Button>
          <Button mt={'1em'}  color={'white'} backgroundColor={'black'} onClick={done}>Done</Button>
          </div>   
        ) : (
            <div style={{display:"flex",justifyContent:"center"}}>
          <Button  mt={'1em'}  color={'white'} backgroundColor={'black'} onClick={capture}>Capture photo</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomWebcam;
