import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { baseUrl} from "../components/outbound/utils/constants"

function UnsubscribeFromOutbound() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');
  const outboundName = queryParams.get('outboundname');
  const [selectedReason, setSelectedReason] = useState('');
  const [error, setError]= useState("")
  const [success, setSucess]= useState("")

  const handleReasonChange = (event) => {
    setSelectedReason(event.target.value);
  };

  const handleSummaryClick = (reason) => {
    setSelectedReason(reason);
  };

  async function handleUnsubscribe() {
    console.log(email)
    console.log(selectedReason)

    setError("");
    setSucess("");

    if (!email){
      setError("No email to unsubscribe. Please try again")
    }
    else if (!outboundName){
      setError("An error occured. Please Try again.")
    }
    else if (!selectedReason){
      setError("Please pick an option")
    }


    else{
      let  requestData={
        action:"outboundunsubscribe",
        emailAddress:email,
        outboundName:outboundName,
        reason: selectedReason
       }

       axios.post(baseUrl+"/v2", requestData)
       .then((result)=>{
        if (result.data =="deleted"){
          setSucess("You are now unsubscribed.")
        }
        else if (result.data=="emaildoesnotexit"){
          setError("This email is not in our list")
        }
        else if (result.data=="error"){
          setError("An error occured. Please Try again.")
        }
       })
       .catch ((error)=>{
        setError("An error occured. Please Try again.")
       })
    }


  }

  return (
    <div className='w-[90%] sm:max-w-[600px] m-auto mt-6 p-6 sm:p-8 bg-green-100 rounded-2xl flex flex-col gap-3'>
      <h1 className='text-green-600 font-bold text-center'>We're Sorry to See You Go</h1>
      <p>Please let us know why you want to unsubscribe:</p>



      <form className='flex flex-col gap-6 mt-6' onSubmit={(e) => { e.preventDefault() }}>
        {error && <div className='errorContainer'>

          <svg className="w-6 h-6 text-red-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clipRule="evenodd" />
          </svg>
          <p>{error}</p>
        </div>}

        {success && <div className='successContainer'>
          <svg class="w-6 h-6 text-green-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>

          <p>{success}</p>
        </div>}


        <details className='border border-green-300 p-3 mt-3 rounded-3xl'
          open={selectedReason === 'distrust'}>
          <summary
            className='flex items-center cursor-pointer'

          >
            <label className='flex gap-1 text-green-900 font-bold'>
              <input
                type="radio"
                name="reason"
                value="distrust"
                checked={selectedReason === 'distrust'}
                onChange={handleReasonChange}
              />
              I don't trust this.
            </label>
          </summary>
          <p className='mt-3 pl-4 text-gray-600 font-thin text-xl'>
            This transaction will be managed by GoDaddy, who will serve as an escrow. Upon receipt of your payment, they will facilitate the transfer of the domain to you before releasing the funds to us.
          </p>
        </details>
        <details className='border border-green-300 p-3 rounded-3xl'

          open={selectedReason === 'cost'}>
          <summary
            className='flex items-center cursor-pointer'

          >
            <label className='flex gap-1 text-green-900 font-bold'>

              <input
                type="radio"
                name="reason"
                value="cost"
                checked={selectedReason === 'cost'}
                onChange={handleReasonChange}
              />
              Cost is too high.
            </label>

          </summary>
          <p className='mt-3 pl-4 text-gray-600 font-thin text-xl'>
            We are open to negotiations and welcome any reasonable offers below the asking price. Please feel free to reply with a proposal, and we will do our best to reach a mutually beneficial agreement.
          </p>
        </details>
        <details className='border border-green-300 p-3 rounded-3xl'

          open={selectedReason === 'timing'}>
          <summary
            className='flex items-center cursor-pointer'

          >

            <label className='flex gap-1 text-green-900 font-bold'>
              <input
                type="radio"
                name="reason"
                value="timing"
                checked={selectedReason === 'timing'}
                onChange={handleReasonChange}
              />
              I'm interested but not at this time.

            </label>

          </summary>
          <p className='mt-3 pl-4 text-gray-600 font-thin text-xl'>
            Thank you for considering the domain name proposal. Your time and consideration are greatly appreciated.
            If there are any changes in your needs or if you reconsider in the future, please don't hesitate to reach out. We''ll be more than happy to assist you.
          </p>
        </details>
        <details className='border border-green-300 p-3 rounded-3xl'

          open={selectedReason === 'fit'}>
          <summary
            className='flex items-center cursor-pointer'

          >
            <label className='flex gap-1 text-green-900 font-bold'>
              <input
                type="radio"
                name="reason"
                value="fit"
                checked={selectedReason === 'fit'}
                onChange={handleReasonChange}
              />
              This domain doesn't fit my business.
            </label>
          </summary>
          <p className='mt-3 pl-4 text-gray-600 font-thin text-xl'>
            We apologize sincerely for any inconvenience caused. Should you have any specific domain requirements, kindly inform us in your response, and we will gladly help you find a suitable solution.
          </p>
        </details>
        <button type="submit"
          className='mt-[20px] py-[10px] px-[20px] bg-green-500 text-white border-none cursor-pointer text-center'
          onClick={() => {
            handleUnsubscribe();
          }}

        >Unsubscribe</button>
      </form>
    </div>
  );
}


export default UnsubscribeFromOutbound;
