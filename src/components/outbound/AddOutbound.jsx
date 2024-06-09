import React, { useState, useEffect } from 'react'
import axios from "axios"
import { baseUrl } from './utils/constants';

function AddOutbound({setIsModalOpen,setAllOutbounds}) {

  const [outboundName, setOutboundNamame] = useState("");
  const [outboundEmailList, setOutboundEmailList] = useState("");

  const [allEmails, setAllEmails] = useState([])
  const [selectedEmail, setSelectedEmail] = useState('');

  const [error, seterror] = useState("")

  const [invalidEmails, setInvalidEmails] = useState([]);
  const [savingOutbound, setSavingOutbound]= useState(false)


  useEffect(() => {
   
    async function getAllEmails() {
      let requestData = {
        action: "getallemails",
      }
      let result = await axios.post(baseUrl + "/v2", requestData)
      setAllEmails(result.data.allEmails);
      
    }

    getAllEmails()
  }, [])

  const handleChange = (event) => {
    setSelectedEmail(event.target.value);
  };


  function validateInputs() {
    seterror("")
    const emailList = outboundEmailList.split(/[\n, ]+/);

    if (!outboundName.trim()) {
      seterror("Add outbound name.")
      return false
    }
    if (!outboundEmailList.trim()) {
      seterror("Add EmailList.")
      return false
    }

    if (!validateEmails(emailList)) {
        seterror("Some emails are invalid");
        return false
    }

    if (!selectedEmail){
      seterror("Please select and email.")
    }

    return true;

  }


  const validateEmails = (emailList) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const invalidEmailsList = [];
    emailList.forEach(email => {
      if (!emailPattern.test(email)) {
        invalidEmailsList.push(email);
      }
    });
    setInvalidEmails(invalidEmailsList);


    if (invalidEmailsList.length > 0) {
      return false
    }
    else { return true }
  };

  const deleteInvalidEmails = () => {
    const emailList = outboundEmailList.split(/[\n, ]+/);
    const validEmailsList = emailList.filter(email => !invalidEmails.includes(email));
    setOutboundEmailList(validEmailsList.join('\n'));
    setInvalidEmails([]);
};

  async function handleSubmit(){
    
    if (validateInputs()){
      console.log("Send Emails")
      setSavingOutbound(true);

      const requestData={
        action:"addoutbound",
        email:selectedEmail,
        outboundname:outboundName,
        emailList:outboundEmailList.split(/[\n, ]+/)
      }

    let  result = await axios.post(baseUrl+"/v2", requestData)
      if( result.data.message =="outboundadded"){
        setAllOutbounds(result.data.alloutbounds)
        setOutboundNamame("")
        setSelectedEmail(false)
        setIsModalOpen(false)
        setSelectedEmail(false)
      }
      else if( result.data.message =="outboundnotadded"){
        setSelectedEmail(false)
      seterror("An error occured. Please try again.")}
      else if( result.data.message =="outboundexist"){
        setSelectedEmail(false)
      seterror("An outbound with this name already exist.")}

    }
  }

  function InvalidEmailListContainer() {
    return (
    
    <div className='boder-green-50 shadow-lg p-3 flex flex-col gap-2 mt-2 '>
      {
        invalidEmails.map((item, index) => (
          <label  key={index} className='break-words'>{item}</label>
        ))
      }

      <div className=' flex justify-center items-center bg-red-300 rounded-3xl' onClick={()=>{deleteInvalidEmails()}}>
        <svg class="w-6 h-6 text-red-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
        </svg>

      </div>
    </div>)
  }

  return (
    <div>

      {(error) && <div className='errorContainer'>
        <svg class="w-6 h-6 text-red-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clip-rule="evenodd" />
        </svg>

        <p className='break-words'>{error}</p>

      </div>}

      {
       invalidEmails.length > 0 && <InvalidEmailListContainer/>
      }

      <div className='mt-6' >

        <input
          type='text'
          value={outboundName}
          onChange={(e) => setOutboundNamame(e.target.value)}
          placeholder='outboundName'
          className='textbox'
        />
        <textarea

          value={outboundEmailList}
          onChange={(e) => setOutboundEmailList(e.target.value)}
          placeholder='email list'
          rows={6}
          className='textbox'
        />

        <select id="emailSelect" value={selectedEmail} onChange={handleChange} className='textbox'>
          <option value="">--Please choose an email--</option>
         
          
            
              {allEmails.map((email, index) => (
              <option key={index} value={email.emailAddress}>
                {email.emailAddress}
              </option>
            ))}
           
          
        
        </select>


        <div className='flex justify-between items-center mt-10'>
          <button className='modalButton' onClick={()=>{
             setOutboundNamame("")
             setOutboundEmailList("")
            setIsModalOpen(false);
           
          }}>
            Cancel
          </button>
          <button className='modalButton' onClick={()=>{
            if (!savingOutbound){handleSubmit()}
          }}>
           {savingOutbound?  (<i class="fa-solid fa-spinner fa-spin"></i>): "Proceed"}
          </button>
        </div>


      </div>
    </div>
  )
}

export default AddOutbound