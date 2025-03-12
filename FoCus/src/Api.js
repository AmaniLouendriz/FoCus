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




export default fcts;