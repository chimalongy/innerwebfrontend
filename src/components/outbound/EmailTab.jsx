import React, { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import Modal from "./Modal";
import AddEmail from "./AddEmail";
import axios from "axios"
import { baseUrl, emailcolumns } from './utils/constants';



const EmailTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalChild, setModalChild]= useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState("");
  const [loadingEmails, setLoadingEmails]= useState(true)

  const [allEmails, setAllEmails]= useState([])

  useEffect(()=>{
    setLoadingEmails(true)
    async function getAllEmails(){
      let requestData = {
        action:"getallemails",
      }
      let result = await axios.post(baseUrl +"/v2", requestData)
      setAllEmails(result.data.allEmails)
      setLoadingEmails(false)
    }

   getAllEmails()
  },[])

  const ExpandedComponent = ({ data }) =>{
    return(
      <div>
        <h1>Hello</h1>
      </div>
    )
  };

  
 

 


  return (
    <div className="flex flex-col gap-6 pt-10 ">
      <div className="flex justify-center items-center border border-green-500 round-full w-10 h-10 text-green-500 rounded-3xl m-auto p-2"
      onClick={()=>{
        setModalChild(<AddEmail setAllEmails={setAllEmails} setIsModalOpen= {setIsModalOpen} />)
        setModalHeader("Add New Email")
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
        loadingEmails?(
          <div>
            <i class="fa-solid fa-spinner fa-spin text-green-500"></i>
          </div>
        )

        :
        (<>
          <DataTable
        columns={emailcolumns}
        data={allEmails}
        direction="auto"
        fixedHeaderScrollHeight="300px"
        highlightOnHover
        pagination
        pointerOnHover
        responsive
        selectableRows
        
        // expandableRows
        // expandableRowsComponent={ExpandedComponent}
      />
        </>)
      }
    </div>

<Modal modalSwitch={setIsModalOpen} modalstate={isModalOpen} children= {modalChild} header={modalHeader}/>
     
     
    </div>
  );
};

export default EmailTab;
