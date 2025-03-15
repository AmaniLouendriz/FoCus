import axios from "axios";



const fcts = {};


const getTasksPerUser = async (user)=>{
    //console.log("the user is: ",user);
    let response;

    try {
        response = await axios.get("http://localhost:3000/tasks");
        if (response.status == 200) {
            console.log("fetching completed successfully");
        } else {
            console.log("sorry, an error occured",response.status);
        }

    } catch(e){
        console.log("an exception occured",e);
    }
    return response.data;
}

const sendDataToJson = async(data)=>{
    let response;
    try {
        response = await axios.post("http://localhost:3000/tasks",data);
    } catch(e) {
        console.log("a poblem happened while creating the resource");
    }
    //console.log("in api.js, the response is: ",response);
    if (response.status == 201) {
        return true;
    }

    return false;
}


fcts.getTasksPerUserWrapper = async(user)=>{
    const data = await getTasksPerUser(user);
    console.log("the data is: ",data);
    const userTasks = [];
    for (let index in data) {
        //console.log("the task is: ",task);
        // console.log("item: ",data[index]);
        // console.log("the user is: ",user.email);

        if (data[index].user_email === user.email) {
            userTasks.push(data[index]);
        }
    }
   // console.log("user tasks are: ",userTasks);
    return userTasks;
}

fcts.sendData= async(responses)=>{
    // schema
    // "id":"1",
    // "date":"2025-03-12",
    // "estimated_duration":"4",
    // "actual_duration":"2",
    // "status":"not",
    // "user_email":"amani@uottawa.ca",
    // "name":"make prototype front end"
    const status = await sendDataToJson(responses);
    return status;
}




export default fcts;