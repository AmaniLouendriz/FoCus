import './HomePage.css'
import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import fcts from '../../Api'
import {DateTime} from "luxon";


export const HomePage = ()=>{

    const [user,setUser] = useState({
      email:"amani@uottawa.ca",
    })

    const navigate = useNavigate();

    const [tasks,setTasks] = useState([]);
    // not: not completed
    // in: doing it
    //completed: :)

    const [weeks,setWeeks] = useState([]);

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

    useEffect(()=>{
      const fetchTask = async()=>{
        try {
          let newTasks = await fcts.getTasksPerUserWrapper(user);
          setTasks(newTasks);
          console.log("the newTask are: ",newTasks);

        }
        catch(e) {
          console.log("an error occured in useEffect");
        }

      }

      fetchTask();
      generateWeeks(2025,2,10,7);
    },[])

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

        </div>)
}