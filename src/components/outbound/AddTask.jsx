import React, { useState, useEffect } from 'react';
import DatePicker from "react-widgets/DatePicker";
import "react-widgets/styles.css";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { baseUrl } from './utils/constants';
import axios from "axios";

function AddTask({ outbound , setoutbondlist, modalSwitch, }) {
  const [showTimeSelection, setTimeSelection] = useState(true);
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
  const [error, setError] = useState('');
  const [taskType, setTaskType] = useState('');
  const [taskSubject, setTaskSubject] = useState('');
  const [danLink, setDanLink] = useState('');
  const [godaddyLink, setGodaddyLink] = useState('');
  const [taskName, setTaskName] = useState(`${outbound.outboundName}>task>${Number(outbound.tasks) + 1}`);
  const [content, setContent] = useState('');
  const [addingTask, setAddingTask]= useState(false)
  const [loadingTaskSubjects, setLoadingTaskSubjects]=useState(false)
 

 

  useEffect(()=>{
    if (Number(outbound.tasks>0)){
      setTaskType("followup")
    }
    else{
      setTaskType("newoutbound")
    }
   
  },[])

  function getAllTaskSubjects(list) {
    let subjects = []
    for (let i = 0; i < list.length; i++) {
      subjects.push(list[i].taskSubject)
    }
    return subjects;
  }
  async function getOutboundTasks(outboundName) {
    try {
     let requestData = {
       action: "getOutboundTasks",
       outboundName: outboundName
     }
 
     let result = await axios.post(baseUrl + "/v2", requestData)
     console.log(result.data)
 
     return result.data.tasks
    } catch (error) {
     return false
    }
   }
 


  function isHyperlink(value) {
    const urlPattern = /^(https?:\/\/)?((([a-zA-Z0-9$_.+!*\(\),;:&=~-]|%[0-9a-fA-F]{2})+@)?(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}|(\d{1,3}\.){3}\d{1,3}|(\[[0-9a-fA-F:.]+\]))(:\d+)?)(\/(([a-zA-Z0-9$_.+!*\(\),;:@&=~-]|%[0-9a-fA-F]{2})*(\/)?)*|\/?(\?[a-zA-Z0-9$_.+!*\(\),;:@&=~-]|%[0-9a-fA-F]{2})*(#[a-zA-Z0-9$_.+!*\(\),;:@&=~-]|%[0-9a-fA-F]{2})?)?$/;
    return urlPattern.test(value);
  }

  const formatDate = (dateString) => {
    const dateParts = dateString.split('/');
    const day = dateParts[0];
    const month = dateParts[1];
    const year = dateParts[2];
    return `${year}-${month}-${day}`;
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const validateStepOne = () => {
    setError('');
    if (!selectedDate) {
      setError('Please select a date.');
      return false;
    }
    if (!time) {
      setError('Please choose time.');
      return false;
    }

    if (!isFutureDate(selectedDate.toLocaleDateString('en-GB'), time)) {
      setError('Please choose a future time.');
      return false;
    }

    return true;
  };

  const validateStepTwo = () => {
    setError('');
    if (!taskSubject.trim()) {
      setError('No subject.');
      return false;
    }
    if (!content.trim()) {
      setError('No Body.');
      return false;
    }
    if (!taskName.trim()) {
      setError('No task name.');
      return false;
    }
    if (!danLink.trim() && !godaddyLink.trim()) {
      setError('Add link.');
      return false;
    }

    if (danLink.trim() && !isHyperlink(danLink.trim())) {
      setError('Invalid DAN link.');
      return false;
    }
    if (godaddyLink.trim() && !isHyperlink(godaddyLink.trim())) {
      setError('Invalid GODADDY link.');
      return false;
    }
    if (danLink.trim() === godaddyLink.trim()) {
      setError('Both links are the same.');
      return false;
    }
    return true;
  };

  function isFutureDate(dateString, timeString) {
    const dateParts = dateString.split('/');
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const year = parseInt(dateParts[2], 10);

    const timeParts = timeString.split(' ');
    const time = timeParts[0].split(':');
    let hours = parseInt(time[0], 10);
    const minutes = parseInt(time[1], 10);
    const period = timeParts[1];

    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }

    const givenDate = new Date(year, month, day, hours, minutes);
    const now = new Date();

    return givenDate > now;
  }



  async function handleSubmitTask() {

    if (validateStepTwo()) {
      try {
        setAddingTask(true)
        const newDate = formatDate(selectedDate.toLocaleDateString('en-GB'));
      let requestData = {
        action: "addTask",
        outbound: outbound,
        taskName: taskName,
        timeZone: userTimeZone,
        time: time,
        date: newDate,
        subject: taskSubject,
        body: content,
        taskType: taskType
      }
      if (isFutureDate(selectedDate.toLocaleDateString('en-GB'), time)) {

        let result = await axios.post(baseUrl + "/v2", requestData)
        if (result.data==="error"){
          setAddingTask(false)
          setError("An error occured");
        }
        else if (result.data.message==="scheduled"){
            const outboundList= result.data.outbounds
            setoutbondlist(outboundList)
            modalSwitch(false);
        }
      } else {
        setAddingTask(false)
        setError("Change time.");
      }

      } catch (error) {
        setAddingTask(false)
        setError("Error submitting task. Please try again.");
        console.log(error)
      }



    }

  }


  function handleTypeSelect(e) {
    if (e.target.value === 'followup') {
      //setTaskSubject(taskSubjects[taskSubjects.length - 1]);
    } else {
      setTaskSubject("");
    }
    setTaskType(e.target.value);
  }

 

  return (
    <div>
      {showTimeSelection ? "" : (
        <div className='p-2 mb-3 bg-green-300 inline-flex rounded-xl' onClick={() => { setTimeSelection(true) }}>
          <svg className="w-6 h-6 text-green-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
          </svg>
        </div>
      )}

      <p className='text-green-700 break-words font-light'><b>Task Name: </b>{taskName}</p>

      {error && <div className='errorContainer'>
        <svg className="w-6 h-6 text-red-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clipRule="evenodd" />
        </svg>
        <p>{error}</p>
      </div>}

      {showTimeSelection ? (
        <div className="flex flex-col gap-6 mt-5">
          <div>
            <p className='text-green-700 break-words font-light'><b>Task Type: </b></p>
            <form className='flex gap-2 m-auto mt-4 bg-green-50 rounded-3xl p-3'>
              <label className='checkbox'>
                <input
                  type="radio"
                  value="newoutbound"
                  checked={taskType === 'newoutbound'}
                  onChange={handleTypeSelect}
                />
                New Outbound
              </label>
              <br />
              <label className='checkbox'>
                <input
                  type="radio"
                  value="followup"
                  checked={taskType === 'followup'}
                  onChange={handleTypeSelect}
                />
                Follow Up
              </label>
            </form>
          </div>

          <div className='flex flex-col gap-3'>
            <p className='text-green-700'><b>Select Date and Time</b></p>
            <div className='flex justify-around gap-1 sm:gap-0'>
              <DatePicker
                value={selectedDate}
                onChange={setSelectedDate}
                format="dd-MM-yyyy" // Format the date as DD-MM-YYYY
                valueEditFormat={{ dateStyle: "short" }}
                valueDisplayFormat={{ dateStyle: "medium" }}
              />
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
          </div>

          <div className='flex justify-between items-center'>
            <button className='modalButton' onClick={async () => {
              if (validateStepOne()) {

                console.log("OUTBOUND NAME: ",outbound.outboundName)
                setLoadingTaskSubjects(true)
                let result = await getOutboundTasks(outbound.outboundName)
                const subjects= getAllTaskSubjects(result)
                console.log(subjects)

                setTaskSubject(subjects[subjects.length-1])
                setLoadingTaskSubjects(false)
                setTimeSelection(false);
              }
            }}>
             { loadingTaskSubjects? (<i class="fa-solid fa-spinner fa-spin"></i>):"Next"}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col gap-0 mt-5">
            <input
              placeholder='subject'
              value={taskSubject}
              onChange={(e) => setTaskSubject(e.target.value)}
              className='textbox'
            />
            <input
              placeholder='dan link'
              value={danLink}
              onChange={(e) => setDanLink(e.target.value)}
              className='textbox'
            />
            <input
              placeholder='godaddy link'
              value={godaddyLink}
              onChange={(e) => setGodaddyLink(e.target.value)}
              className='textbox'
            />

            <div className='mb-6'>
              <CKEditor
                editor={ClassicEditor}
                data="<p>...</p>"
                onChange={handleEditorChange}
                config={{
                  toolbar: {
                    items: [
                      'heading',
                      '|',
                      'bold',
                      'italic',
                      'link',
                      'bulletedList',
                      'numberedList',
                      'blockQuote',
                      'undo',
                      'redo'
                    ],
                    shouldNotGroupWhenFull: true
                  }
                }}
              />
            </div>
          </div>

          <div className='flex justify-between items-center'>
            <button className='modalButton'>
              Cancel
            </button>
            <button className='modalButton' onClick={handleSubmitTask}>
              Proceed
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddTask;
