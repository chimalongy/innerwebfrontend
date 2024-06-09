import React, {useState} from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { baseUrl } from './utils/constants';
import axios from 'axios';




function ViewTasks({outbound,outboundTasks,modalSwitch}) {
    const [tasksList, setTaskList]=useState(outboundTasks)
  return (
    <div>
    {tasksList.map((task, index) => (
        <Accordion key={index}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
            >
                <Typography>
                    <div className='flex justify-between sm:min-w-[400px] min-w-[280px] items-center'>
                        <p className='text-green-700 font-bold break-words w-[70%]'>{task.taskName        }</p>
                        <div className='flex gap-2'>
                           
                            
                        </div>
                    </div>
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    <div>

                    <div className='shadow-md mb-6 inline-block p-3' onClick={async () => {
                               let requestData={
                                    action:"deletetask",
                                    outboundName: outbound.outboundName,
                                    taskName:task.taskName,
                                    index: index
                               }
                               const result = await axios.post(baseUrl+"/v2", requestData)
                               console.log(result.data)
                               if (result.data.message ==="deleted"){
                                //SET ACTION HERE

                                setTaskList((previousList) => {
                                    const newList = previousList.filter((_, i) => i !== index);
                                    return newList;
                                });                               
                               }
                            }}>
                                <svg className="w-6 h-6 text-red-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                </svg>
                            </div>
                        
                        <p><b>Task Type:</b> {task.taskType}</p>
                        <p><b>Date:</b> {task.taskDate}</p>
                        <p><b>Time:</b> {task.taskTime}</p>
                        <p><b>Status:</b> {task.status}</p>
                        <p><b>Subject:</b> {task.taskSubject}</p>
                       
                        <div className="mt-6 mb-4">
                            <p><b>Body:</b></p>
                            <div className='shadow-lg p-2 break-words'  dangerouslySetInnerHTML={{ __html: task.taskBody }}>
                                
                            </div>
                        </div>
                    </div>
                </Typography>
            </AccordionDetails>
        </Accordion>
    ))}
</div>
    
  )
}

export default ViewTasks