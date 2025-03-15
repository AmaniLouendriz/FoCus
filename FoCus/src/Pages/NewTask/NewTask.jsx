import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import './NewTask.css'
import fcts from '../../Api'

export const NewTask = ()=>{

    const [responses,setResponses] = useState({
        // id:"",
        date:"",
        estimated_duration:"",
        actual_duration:"",
        status:"in",
        user_email:"",
        name:"",
        type:"",
        reminder:"",
    })

    const {state} = useLocation();

    const navigate = useNavigate();

    const handleInputChange = (event)=>{
        const target = event.target;
        const value = target.value;
        const name = target.name;

        // console.log("the name is: ",name);
        // console.log("the value is: ",value);
        setResponses({...responses,[name]:value});
        //console.log("the responses are: ",responses);
    }

    const AddTask = async (event)=>{
       
        console.log("the state is: ",state);
        responses.user_email = state;

        //const uuid = crypto.randomUUID();
        //responses.id = uuid;

        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        responses.date = formattedDate;
        console.log("the responses are: ",responses);

        let res = await fcts.sendData(responses);
        console.log("the res is: ",res);
        if (res == true) {
            navigate('/',{state:responses.user_email})
        }

    }

    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach(tooltip => new bootstrap.Tooltip(tooltip));
    }, []); // Runs once after mount


    return (
        <div className="newTaskDiv">

            <h2 className='text-center p-4'>Schedule a new activity</h2>
            <div className='d-flex gap-3 m-2 p-2 container-Total flew-wrap'>
                <div className=''>
                    <div className='p-2 m-1 fw-bold'>Name of Task: </div>
                    <input type='text' className='form-control p-2' placeholder='Task Name' aria-label='task' name="name" value={responses.name} onChange={handleInputChange} maxLength="30"/>
                </div>

                <div className=''>
                    <label className='p-2 m-1 fw-bold'>Type of Task:</label>
                    <select className='form-select' name='type' onChange={handleInputChange}>
                        <option value={'WORK'}>Work</option>
                        <option value={'BREAK'}>Break</option>
                    </select>
                </div>

                <div className=''>
                    <label className='p-2 m-1 fw-bold'>Approximate Duration:</label>
                    <span data-bs-toggle="tooltip" data-bs-placement="top" title="Duration is in hours">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/>
                        </svg>
                    </span>
                    <select className='form-select' name='estimated_duration' onChange={handleInputChange}>
                        <option value={'1'}>1</option>
                        <option value={'2'}>2</option>
                        <option value={'3'}>3</option>
                        <option value={'4'}>4</option>
                        <option value={'5'}>5</option>
                    </select>
                </div>

                <div className=''>
                    <label className='p-2 m-1 fw-bold'>Reminder before: </label>
                    <span data-bs-toggle="tooltip" data-bs-placement="top" title="reminder is in minutes">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/>
                        </svg>
                    </span>
                    <select className='form-select' name='reminder' onChange={handleInputChange}>
                        <option value={'5'}>5</option>
                        <option value={'10'}>10</option>
                        <option value={'15'}>15</option>
                        <option value={'20'}>20</option>
                        <option value={'30'}>30</option>
                    </select>
                </div>
            </div>

            <div className='d-flex justify-content-center'>
                <button type='submit' className='btn btn-secondary' onClick={AddTask}>
                        START TASK
                </button>
            </div>
        </div>
    )
}