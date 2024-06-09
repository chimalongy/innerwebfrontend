import React, { useState } from 'react'
import { baseUrl } from './utils/constants';
import axios from "axios"


function AddEmail({setAllEmails,setIsModalOpen}) {

    const [emailAddress, setEmailAddress] = useState("");
    const [password, setpassoword] = useState("");
    const [host, sethost] = useState("");
    const [sendingport, setsendingport] = useState("");
    const [emailSignature, setEmailSignature] = useState("");
    const [senderName, setSenderName] = useState("");
    const [error, seterror] = useState("")

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateInputs() {
        seterror("")
        if (!emailAddress.trim() || !isValidEmail(emailAddress.trim())) {
            seterror("Invalid email address")
            return false
        }

        if (!senderName.trim()) {
            seterror("Add a sender name")
            return false
        }

        if (!password.trim()) {
            seterror("Invalid password")
            return false
        }
        if (!host.trim()) {
            seterror("Invalid host")
            return false
        }
        if (!sendingport.trim()) {
            seterror("Invalid port")
            return false
        }

        if (!emailSignature.trim()) {
            seterror("Invalid email signature")
            return false
        }

        return true
    }

    async function handleSubmit() {
        if (validateInputs()) {
            console.log(baseUrl);
    
            const requestData = {
                action: "addemail",
                emailAddress: emailAddress,
                senderName: senderName,
                password: password,
                host: host,
                sendingport: sendingport,
                signature: emailSignature,
            };
    
            try {
                let result = await axios.post(baseUrl+"/v2", requestData);
                if( result.data.message==="emailadded"){
                    setAllEmails(result.data.allEmails)
                    resetform();
                    setIsModalOpen(false)
                }
                else{
                    seterror(result.data.message)
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                
            }
        }
    }

    function resetform(){
        setEmailAddress("");
        setpassoword("")
        sethost("")
        setsendingport("")
        setEmailSignature("")
        setSenderName("")
        seterror("")
    }
    
    return (
        <div >
            {(error) && <div className='errorContainer'>
                <svg class="w-6 h-6 text-red-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clip-rule="evenodd" />
                </svg>

                <p>{error}</p>

            </div>}


            <div className='mt-6'>
                <input
                    type='text'
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    placeholder='email address'
                    className='textbox'
                />
                <input
                    type='text'
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder='sender name'
                    className='textbox'
                />
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setpassoword(e.target.value)}
                    placeholder='password'
                    className='textbox'
                />
                <input
                    type='text'
                    value={host}
                    onChange={(e) => sethost(e.target.value)}
                    placeholder='host'
                    className='textbox'
                />
                <input
                    type='text'
                    value={sendingport}
                    onChange={(e) => setsendingport(e.target.value)}
                    placeholder='port'
                    className='textbox'
                />
                <textarea
                    type='text'
                    value={emailSignature}
                    onChange={(e) => setEmailSignature(e.target.value)}
                    placeholder='signature'
                    className='textbox'
                    rows={4}
                />
            </div>

            <div className='flex justify-between items-center mt-10'>
                <button className='modalButton'>
                    Cancel
                </button>
                <button className='modalButton' onClick={() => { handleSubmit() }}>
                    Proceed
                </button>
            </div>


        </div>
    )
}

export default AddEmail