import './HomePage.css'
import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import fcts from '../../Api'
import {DateTime} from "luxon";
import { useRef } from 'react';

import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";


export const HomePage = ()=>{

    const [user,setUser] = useState({
      email:"amani@uottawa.ca",
    })
    let runningMode =  "IMAGE";

    const [videoReady, setVideoReady] = useState(false);  // Track if video is ready

    const [detections, setDetections] = useState(null);




    const navigate = useNavigate();

    const [tasks,setTasks] = useState([]);
    // not: not completed
    // in: doing it
    //completed: :)

    const [weeks,setWeeks] = useState([]);

    const [onGoingTask,setOngoingTask] = useState("");

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [landmarker, setLandmarker] = useState(null);

    const generateWeeks = (year,month,day,numberOfWeeks)=>{
      let weeksArray = [];
      let startOfWeek = DateTime.local(year,month,day);
      let endOfWeek;

      for (let i = 0;i<numberOfWeeks;i++) {
        endOfWeek = startOfWeek.plus({days:6});

        weeksArray.push({
          startDate:startOfWeek.toISODate(),
          endDate:endOfWeek.toISODate()
        })

      //console.log("the endof week .day is: ",endOfWeek.day);
       startOfWeek = DateTime.local(endOfWeek.year,endOfWeek.month,endOfWeek.day+1);
      }

      weeksArray.reverse();

      setWeeks(weeksArray);
      //console.log("the tasks here are: ",tasks);

      return weeks;
    }

    const detectIfPresent = (startDate,endDate,tasks)=>{
      let res = [];
      for (let index in tasks){
        let date = DateTime.fromISO(tasks[index].date);
        //console.log("the date is is: ",date);
        if (DateTime.fromISO(tasks[index].date) >= DateTime.fromISO(startDate) && DateTime.fromISO(tasks[index].date) <= DateTime.fromISO(endDate)) {
          //return tasks[index];
          res.push(tasks[index]);
        }
      }
      return res;
    }

    const addNewTask = ()=>{
      console.log("add new task added");
      navigate("/addNewTask",{state:user.email});
    }

    const detectIfOngoingTask = (tasks)=> {
      console.log("do I come here????");
      console.log("the tasks are in detection mode: ",tasks);
      let res;
      tasks.then(
        (tasks)=>{
          console.log("the tasks are: ",tasks);
          for (let index in tasks) {
            // those are the user's personal tasks
            console.log("the index here is: ",index);


            if (tasks[index].status === "in") {
              res = tasks[index];
              setOngoingTask(tasks[index]);
              console.log("the ongoing task is: ",tasks[index]);
              break;
            }
          }
        })
      return res;
    }

    useEffect(()=>{
      const fetchTask = async()=>{
        try {
          let newTasks = await fcts.getTasksPerUserWrapper(user);
          setTasks(newTasks);
          console.log("the newTask are: ",newTasks);
          return newTasks;

        }
        catch(e) {
          console.log("an error occured in useEffect");
        }

      }

      const initializeLandmarker = async () => {
        // try {
          const filesetResolver = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
          );
          const faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
            baseOptions: {
              modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
              delegate: "GPU"
            },
            outputFaceBlendshapes: true,
            runningMode,
            numFaces: 1
          });
          setLandmarker(faceLandmarker);
          console.log("LOADED");
          detectFaces(faceLandmarker);
          //return faceLandmarker;
        // } catch(error) {
          // console.log("an error happened in initializeLandmarker()");
        // }
      }

      const detectFaces = async (facey) => {
        if (!facey || !videoRef.current) return;

        console.log("plz get here");

        const video = videoRef.current;

        // Ensure the video has valid dimensions
        if (video.videoWidth === 0 || video.videoHeight === 0) {
          console.error("Video frame has zero width/height!");
          return;
        }

          // Detect face landmarks
        const results = facey.detect(video);
        console.log("Face Landmarks Detected:", results);

        // Update state with detections
        setDetections(results.faceLandmarks);

        drawLandmarks(results.faceLandmarks[0]);  // Draw detected points

        
        // Keep processing frames
        requestAnimationFrame(processVideo);

      
        // const results = facey.detectForVideo(videoRef.current, performance.now());
        // if (results.faceLandmarks.length > 0) {
        //   drawLandmarks(results.faceLandmarks[0]);  // Draw detected points
        // }
      
        // getEAR(facey);
        //requestAnimationFrame(detectFaces);

      };
      
      const drawLandmarks = (landmarks) => {
        console.log("Bonjour la france");
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        console.log("canvas: ",canvasRef.current);
        
        ctx.fillStyle = "red";
        landmarks.forEach((point) => {
          console.log("alo");
          ctx.beginPath();
          ctx.arc(point.x * canvas.width, point.y * canvas.height, 2, 0, 2 * Math.PI);
          ctx.fill();
        });
      };

      const getEAR = (landmarks) => {
        const leftEye = [33, 160, 158, 133, 153, 144];  // Approximate left eye indices
        const rightEye = [362, 385, 387, 263, 373, 380]; // Approximate right eye indices
      
        const eyeEAR = (eye) => {
          const vertical1 = Math.hypot(
            landmarks[eye[1]].x - landmarks[eye[5]].x,
            landmarks[eye[1]].y - landmarks[eye[5]].y
          );
          const vertical2 = Math.hypot(
            landmarks[eye[2]].x - landmarks[eye[4]].x,
            landmarks[eye[2]].y - landmarks[eye[4]].y
          );
          const horizontal = Math.hypot(
            landmarks[eye[0]].x - landmarks[eye[3]].x,
            landmarks[eye[0]].y - landmarks[eye[3]].y
          );
          return (vertical1 + vertical2) / (2.0 * horizontal);
        };
      
        const leftEAR = eyeEAR(leftEye);
        const rightEAR = eyeEAR(rightEye);
        return (leftEAR + rightEAR) / 2.0;
      };
      
      // if EAR < threshold (e.g., 0.25 for 2 seconds), trigger an alert.

      const startVideo = async()=>{
        // try {
        //   // Access the user's webcam
        //   const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          
        //   // Once stream is available, set it to the video element
        //   if (videoRef.current) {
        //     videoRef.current.srcObject = stream;
        //   }
        // } catch (error) {
        //   console.error("Error accessing webcam:", error);
        // }

        // try {
        //   // Access the user's webcam
        //   const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  
        //   // Once the stream is available, set it to the video element
        //   if (videoRef.current) {
        //     videoRef.current.srcObject = stream;
            
        //     // Start playing the video once the stream is set
        //     videoRef.current.play();
        //   }
        // } catch (error) {
        //   console.error("Error accessing webcam:", error);
        // }

        try {
          // Access the user's webcam
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  
          // Once the stream is available, set it to the video element
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
  
            // Set the video element's dimensions once the stream is ready
            videoRef.current.onloadeddata = () => {
              console.log('Video loaded, width:', videoRef.current.videoWidth, 'height:', videoRef.current.videoHeight);
              if (videoRef.current.videoWidth > 0 && videoRef.current.videoHeight > 0) {
                setVideoReady(true); // Set the video as ready to be processed
              }
            };
  
            // Start playing the video
            videoRef.current.play();
            initializeLandmarker();
          }
        } catch (error) {
          console.error("Error accessing webcam:", error);
        }
      }

      const processVideo = async () => {
        if (!landmarker || !videoRef.current) return;
      
        const video = videoRef.current;
      
        // Detect face landmarks
        const results = landmarker.detect(video);
        console.log("Face Landmarks Detected:", results);
      
        // Update state with detections
        setDetections(results.faceLandmarks);
        
        // Keep processing frames
        requestAnimationFrame(processVideo);
      };
      
      

      let tasksFetched = fetchTask();
      generateWeeks(2025,2,10,7);
      let taskFound = detectIfOngoingTask(tasksFetched);

      let faceLandmarker;


      if (taskFound != "") {
        console.log("HERE HERE");
        startVideo();

        // while (!videoReady) {

        // }
        // faceLandmarker = initializeLandmarker();
        //  navigator.mediaDevices.getUserMedia({ video: true })
        //   .then((stream) => {
        //     if (videoRef.current) {
        //       videoRef.current.srcObject = stream;
        //     }
        //   })
        //   .catch((error) => console.error("Error accessing webcam:", error));
        // try {
        //   // Access the user's webcam
        //   const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          
        //   // Once stream is available, set it to the video element
        //   if (videoRef.current) {
        //     videoRef.current.srcObject = stream;
        //   }
        // } catch (error) {
        //   console.error("Error accessing webcam:", error);
        // }

        // Start processing video once the faceLandmarker is loaded
      }
      // if (landmarker) {
      //   //console.log("do we ever get here");
      //   processVideo();
      // }


    },[]);

    return (
        <div className="homeDiv">
          <h4 className='greetingUser'>Hello {user.email}</h4>
          <h5 className='titlePage'>Summary of Activities</h5>
          {/* {console.log("the weeks are:", weeks)} */}
          <div className='tasks d-flex flex-column w-50'>
            {weeks.map((week,index)=>{
              const relatedTasks = detectIfPresent(week.startDate,week.endDate,tasks);
              return (
              <div key={`headWeek${index}`}>
                <div className='fw-bold'>
                  Week of : {week.startDate}----{week.endDate}
                </div>

                {relatedTasks.length!=0 ? 
                  relatedTasks.map((task,indexTask)=>{
                    return (
                      <div className='indTask' key={`outerDiv1${indexTask}`}>
                        <div className='d-flex flex-row statusWrapper' key={`innerDiv2${indexTask}`}>
                          {task.name}
                          {task.status === "completed" ? 
                          <span className='statusGreen fw-bold'>Completed</span>
                                  
                                  
                          :task.status === "in" ? <span className='statusDoing fw-bold'></span>
                          :<span className='statusRed fw-bold'>X</span>}
                        </div>
                      </div>
                    )}) 
                : <div className="item indTask">No tasks found for this week</div>}
                
              </div>)})}
          </div>

          <button type="button" className="btn btn-light float-end adder" onClick={addNewTask}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>
          </button>

          {onGoingTask != "" ?
            <div>
              There is one ongoing task
              {/* {console.log("the videoRef: ",videoRef)}
              {console.log("the canvas ref: ",canvasRef)}
              <video ref={videoRef} autoPlay playsInline></video>
              <canvas ref={canvasRef}></canvas> */}
              
            </div>
            
            :
            
            <div>No ongoing tasks</div>
          
          
          
          
          }

        </div>)
}