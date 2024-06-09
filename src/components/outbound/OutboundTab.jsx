import React, { useState, useEffect } from 'react'
import AddOutbound from './AddOutbound';
import DataTable from 'react-data-table-component';
import Modal from './Modal';
import AddTask from './AddTask';
import axios from "axios"
import { baseUrl, emailcolumns, socketUrl } from './utils/constants';

import Replies from './Replies';
import ViewTasks from './ViewTasks';
import ViewEmailList from './ViewEmailList';
import ViewUnsubscribers from './ViewUnsubscribers';




export const OutboundTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalChild, setModalChild] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState("")
  const [allOutbounds, setAllOutbounds] = useState([])
  const [allReplies, setAllReplies] = useState([])
  const [loadingOutbounds, setLoadingOutbound] = useState(true);



  useEffect(() => {
    setLoadingOutbound(true)
    async function getAllOutbound() {
      let requestData = {
        action: "getalloutbounds",
      }
      let result = await axios.post(baseUrl + "/v2", requestData)
      setAllOutbounds(result.data.allOutbounds)
      console.log(result.data.allOutbounds)
      setLoadingOutbound(false)
    }

    getAllOutbound()
  }, [])



  // useEffect(() => {
  //   const ws = new WebSocket('ws://localhost:4001');

  //   ws.onopen = () => {
  //     console.log('WebSocket connection established');
  //   };

  //   ws.onmessage = async (event) => {
  //     const replies = JSON.parse(event.data);
  //     //console.log(replies);

  //     // Call sortReplies with the received replies
  //     try {
  //       const sortedReplies = await sortReplies(replies);
  //        if (sortedReplies){
  //         setAllReplies(sortedReplies)
  //         console.log(sortedReplies)
  //        }
  //      // console.log('Sorted Replies:', sortedReplies);
  //       // You can add more logic here to handle the sorted replies
  //     } catch (error) {
  //       console.error('Error sorting replies:', error);
  //     }
  //   };

  //   ws.onerror = (error) => {
  //     console.error('WebSocket error:', error);
  //   };

  //   ws.onclose = () => {
  //     console.log('WebSocket connection closed');
  //   };

  //   return () => {
  //     ws.close();
  //   };
  // }, []);

  useEffect(() => {
    const ws = new WebSocket(socketUrl);

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = async (event) => {
      const replies = JSON.parse(event.data);

      if (allOutbounds.length === 0) {
        console.error('allOutbounds not loaded yet.');
        return;
      }

      try {
        const sortedReplies = await sortReplies(replies);
        if (sortedReplies) {
          setAllReplies(sortedReplies);
          console.log('Sorted Replies:', sortedReplies);
        }
      } catch (error) {
        console.error('Error sorting replies:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, [allOutbounds]);


  function extractEmail(input) {
    // Regular expression to match the email address inside the angle brackets
    const emailPattern = /<([^>]+)>/;
    const match = input.match(emailPattern);
    // If there's a match, return the email address; otherwise, return null
    return match ? match[1] : null;
  }

  function getAllTaskSubjects(list) {
    let subjects = []
    for (let i = 0; i < list.length; i++) {
      subjects.push(list[i].taskSubject)
    }
    return subjects;
  }

  // async function sortReplies(replies) {

  //   let sortedReplies = []


  //   for (let i = 0; i < allOutbounds.length; i++) {

  //     let emailList = allOutbounds[i].emailList;
  //     let messageIDs = allOutbounds[i].messageIDs
  //     let outboundName = allOutbounds[i].outboundName
  //     let outboudTasks = await getOutboundTasks(outboundName)
  //     let subjects = getAllTaskSubjects(outboudTasks)
  //     let outbondReplies = [];





  //     for (let j = 0; j < replies.length; j++) {
  //       let sender = extractEmail(replies[j].sender);
  //       let inReplyTo = replies[j].inReplyTo;
  //       let references = replies[j].references;
  //       let replysubject = replies[j].subject;

  //       //console.log(replysubject)



  //       if (emailList.some(emails => emails.includes(sender)) ||
  //         subjects.some(subject => subject.includes(replysubject)) ||
  //         messageIDs.some(messageid => messageid.includes(inReplyTo)) ||
  //         messageIDs.some(messageId => references.includes(messageId))
  //       ) {
  //         outbondReplies.push(replies[j]);
  //       }



  //     }

  //     sortedReplies.push(outbondReplies)


  //   }
  //   return sortedReplies
  // }

  async function sortReplies(replies) {
    let sortedReplies = [];

    if (!allOutbounds || allOutbounds.length === 0) {
      console.error('No outbounds available to sort replies.');
      return [];
    }

    for (let i = 0; i < allOutbounds.length; i++) {
      let emailList = allOutbounds[i].emailList;
      let messageIDs = allOutbounds[i].messageIDs;
      let outboundName = allOutbounds[i].outboundName;
      let outboudTasks = await getOutboundTasks(outboundName);
      let subjects = getAllTaskSubjects(outboudTasks);
      let outbondReplies = [];

      for (let j = 0; j < replies.length; j++) {
        let sender = extractEmail(replies[j].sender);
        let inReplyTo = replies[j].inReplyTo;
        let references = replies[j].references;
        let replysubject = replies[j].subject;



        if (
          emailList.some(emails => emails.includes(sender)) ||
          subjects.some(subject => subject.includes(replysubject)) ||
          messageIDs.some(messageid => messageid.includes(inReplyTo)) ||
          messageIDs.some(messageId => references.includes(messageId))
        ) {
          outbondReplies.push(replies[j]);

        } else {

        }
      }

      sortedReplies.push(outbondReplies);
    }
    return sortedReplies;
  }


  async function getOutboundTasks(outboundName) {
    try {
      let requestData = {
        action: "getOutboundTasks",
        outboundName: outboundName
      }

      let result = await axios.post(baseUrl + "/v2", requestData)
      // console.log(result.data)

      return result.data.tasks
    } catch (error) {
      return false
    }
  }

  const ExpandedComponent = ({ data }) => {
    return (
      <div className='bg-green-100 p-2 sm:p-6'>
        <div className='outboundDetailItem'>
          <div className='flex gap-2'>
            <svg class="w-6 h-6 text-green-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 6h-2V5h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2h-.541A5.965 5.965 0 0 1 14 10v4a1 1 0 1 1-2 0v-4c0-2.206-1.794-4-4-4-.075 0-.148.012-.22.028C7.686 6.022 7.596 6 7.5 6A4.505 4.505 0 0 0 3 10.5V16a1 1 0 0 0 1 1h7v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3h5a1 1 0 0 0 1-1v-6c0-2.206-1.794-4-4-4Zm-9 8.5H7a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2Z" />
            </svg>
            <p>Replies</p>


          </div>
          <div className='flex gap-2 items-center bg-green-900 p-2 rounded-md text-white active:bg-green-600'
            onClick={() => {
              let rowIndex = allOutbounds.findIndex(item => item.outboundName === data.outboundName);
              let replies = allReplies[rowIndex]
              if (replies) {
                setModalChild(<Replies outbound={data} replies={replies} modalSwitch={setIsModalOpen} />)
              }


              setModalHeader(`${data.outboundName} Replies`)
              setIsModalOpen(true)


            }}>


            <svg class="w-6 h-6 text-green-300 text-sm dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
              <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <p>
              {(() => {
                let rowIndex = allOutbounds.findIndex(item => item.outboundName === data.outboundName);
                if (allReplies.length > 0) {
                  return allReplies[rowIndex].length
                }
                else {
                  return "-"
                }
                console.log(allReplies)
              })()}
            </p>
            <p className='text-sm'>view</p>
          </div>
        </div>

        <div className='outboundDetailItem'>
          <div className='flex gap-2'>
            <svg class="w-6 h-6 text-green-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z" clip-rule="evenodd" />
            </svg>

            <p>End Users</p>
          </div>


          <div className='flex items-center gap-2' onClick={() => {
            
        
            setModalChild(<ViewEmailList outbound={data} emailList={data.emailList} modalSwitch={setIsModalOpen} />)
            setModalHeader(`${data.outboundName} End Users`)
            setIsModalOpen(true)

          }}>
            <p>{data.emailList.length}</p>
            <div className=' p-2'>
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
              </svg>

            </div>
          </div>


        </div>



        <div className='outboundDetailItem'>
          <div className='flex gap-2'>
            <svg class="w-6 h-6 text-green-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <p>Unsubscribed End Users</p>
          </div>
          <div className='flex  items-center gap-2' onClick={() => {
            
                 setModalChild(<ViewUnsubscribers outbound={data} unsubscribers={data.unSubscriptions} modalSwitch={setIsModalOpen} />)
                 setModalHeader(`${data.outboundName} Unsubscribers`)
                 setIsModalOpen(true)
          }}>
            <p>{data.unSubscriptions.length}</p>
            <div className=' p-2'>
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
              </svg>

            </div>
          </div>
        </div>

        <div className='outboundDetailItem'>
          <div className='flex gap-2'>
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
            </svg>

            <p>Tasks</p>
          </div>
          <div onClick={async () => {
            const outboundTasks = await getOutboundTasks(data.outboundName);

            if (outboundTasks) {

              setModalChild(<ViewTasks outbound={data} outboundTasks={outboundTasks} modalSwitch={setIsModalOpen} />)
            }


            setModalHeader(`${data.outboundName} Task List`)
            setIsModalOpen(true)


          }}    >
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 19V6a1 1 0 0 1 1-1h4.032a1 1 0 0 1 .768.36l1.9 2.28a1 1 0 0 0 .768.36H16a1 1 0 0 1 1 1v1M3 19l3-8h15l-3 8H3Z" />
            </svg>

          </div>
        </div>

      </div>
    )
  };



  const columns = [
    {
      name: "Outbounds",
      selector: (row) => row.outboundName,
      sortable: true,
    },


    {
      name: "Tasks",
      selector: (row) => (
        <div onClick={async () => {

          // let outboudTasks = await getOutboundTasks(outboundName);
          // let subjects = getAllTaskSubjects(outboudTasks);


          setModalChild(<AddTask outbound={row} setoutbondlist={setAllOutbounds} modalSwitch={setIsModalOpen} />)
          setModalHeader("Add New Task")
          setIsModalOpen(true)
          console.log(row)
        }}>
          <svg class="w-6 h-6 text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 8H4m8 3.5v5M9.5 14h5M4 6v13a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-5.032a1 1 0 0 1-.768-.36l-1.9-2.28a1 1 0 0 0-.768-.36H5a1 1 0 0 0-1 1Z"
            />
          </svg>

        </div>

      ),



      sortable: false,
    }

  ];

  return (
    <div className="flex flex-col gap-6 pt-10 ">
      <div className="flex justify-center items-center border border-green-500 round-full w-10 h-10 text-green-500 rounded-3xl m-auto p-2"
        onClick={() => {
          setModalChild(<AddOutbound setIsModalOpen={setIsModalOpen} setAllOutbounds={setAllOutbounds} />)
          setModalHeader("Add New Outbound")
          setIsModalOpen(true)
        }}
      >
        <svg
          class="w-8 h-8 text-green-400 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14 17h6m-3 3v-6M4.857 4h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 9.143V4.857C4 4.384 4.384 4 4.857 4Zm10 0h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857h-4.286A.857.857 0 0 1 14 9.143V4.857c0-.473.384-.857.857-.857Zm-10 10h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H4.857A.857.857 0 0 1 4 19.143v-4.286c0-.473.384-.857.857-.857Z"
          />
        </svg>
      </div>

      {/* SEARCH BAR */}
      <div className="flex gap-4 items-center w-full m-auto sm:w-[60%]">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          className="bg-green-100 w-full p-2 font-thin outline-none border text-lg border-green-300"
        />
        <div className="w-8 h-8 border border-green-300 rounded-full p-2 flex items-center justify-center">
          <svg
            class="w-6 h-6 text-green-300 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
      </div>



      <div>
        {
          loadingOutbounds ? (
            <div>
              <i class="fa-solid fa-spinner fa-spin text-green-500"></i>
            </div>
          )

            :
            (<>
              <DataTable
                columns={columns}
                data={allOutbounds}
                direction="auto"
                fixedHeaderScrollHeight="300px"
                highlightOnHover
                pagination
                pointerOnHover
                responsive
                selectableRows

                expandableRows
                expandableRowsComponent={ExpandedComponent}
              />

            </>)
        }
      </div>

      <Modal modalSwitch={setIsModalOpen} modalstate={isModalOpen} children={modalChild} header={modalHeader} />


    </div>
  );
}
