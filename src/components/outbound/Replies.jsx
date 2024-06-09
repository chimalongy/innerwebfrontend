import React, { useState, useCallback, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { baseUrl } from './utils/constants';
import axios from 'axios';

function Replies({ outbound, replies }) {
    const [replyBody, setReplyBody] = useState("");
    const [deletingReply, setDeletingReply] = useState(false);
    const [respondingReply, setRespondingReply] = useState(false);
    const [replyToDelete, setReplyToDelete] = useState(null);
    const [replyToDeleteIndex, setReplyToDeleteIndex] = useState(-1);
    const [error, setError] = useState("");
    const [success, setSucess] = useState("")
    const [replyToReply, setReplyToReply] = useState(null);
    const [replyToReplyIndex, setReplyToReplyIndex] = useState(null);
    const [loadingDeleteAction, setLoadingDeleteAction] = useState(false);



    const [sendingReply, setSendingReply] = useState(false)


    const [componentToRender, setComponentToRender] = useState("main");

    const [confirmationquestion, setconfirmationquestion] = useState("")

    

    useEffect(() => {
        setComponentToRender("main");
    }, []);

    function extractName(str) {
        const nameRegex = /"([^"]+)"/; // This regex captures text between double quotes
        const matches = str.match(nameRegex);

        if (matches && matches.length > 1) {
            return matches[1];
        } else {
            return "No name found in the given string.";
        }
    }
    const extractEmail = (input) => {
        const emailPattern = /<([^>]+)>/;
        const match = input.match(emailPattern);
        return match ? match[1] : null;
    };

    // const handleReplyChange = useCallback((event, editor) => {
    //     const data = editor.getData();
    //     setReplyBody(data);
    // }, []);

    const handleReplyChange = (event, editor) => {
        const data = editor.getData();
        setReplyBody(data);
    };

    const sendReply = async (replyto) => {
        setError("")

        if (!replyBody.trim()) {
            setError('No Body.');
            return false;
        }


        let recieverEmail = extractEmail(replyto.sender);
        let threadID = ""

        setSendingReply(true)
        //get threadID



        for (let i = 0; i < outbound.emailList.length; i++) {
            if (outbound.emailList[i] == recieverEmail) {
                if (outbound.messageIDs.length > 0) {
                    threadID = outbound.messageIDs[0][i]
                }
            }
        }


        let requestData = {
            action: "replymessage",
            targetReply: replyto,
            recieverEmail: recieverEmail,
            body: replyBody,
            threadID: threadID,
            replyWithEmail: outbound.outboundEmail,
            outboundName: outbound.outboundName,

        };







        console.log(requestData)

        await axios.post(baseUrl + "/v2", requestData)
            .then((result) => {
                if (result.data.message == "sent") {
                    setSucess("Reply sent!")
                    setTimeout(() => {
                        setReplyToReply(null);
                        setSendingReply(false)
                        setSucess("");
                        setError("")
                        setComponentToRender("main");
                    }, 1000);
                }
            })
            .catch((error) => {
                setError("Reply not sent")
                setSendingReply(false)
                return
            })





    };

    async function handleUnsbscribeuser () {

        console.log(replyToDelete);
        // {emailAddress,reason, outboundName}
        console.log(outbound.outboundName)
        setLoadingDeleteAction(true)

        let requestData={
            action:"outboundunsubscribe",
            emailAddress: extractEmail(replyToDelete.sender),
            outboundName:outbound.outboundName,
            reason:"removed"

        }

        console.log(requestData)

         let result = await axios.post(baseUrl+"/v2",requestData)

         if (result.data="deleted"){
            setDeletingReply(false);
            setRespondingReply(false);
            setReplyToDelete(null);
            setReplyToDeleteIndex(-1);
            setLoadingDeleteAction(false)
            setconfirmationquestion("")
            setComponentToRender("main"); // Update the component to render
         }

         if (result.data="emaildoesnotexit"){
            setError("Email does not exist");
            setLoadingDeleteAction(false)
            return
         }
         if (result.data="error"){
            setError("An error occured. Please try again");
            setLoadingDeleteAction(false)
            return
         }
         
    }

    const DeleteReply = () => (
        <div>
             {error && <div className='errorContainer'>
        <svg className="w-6 h-6 text-red-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clipRule="evenodd" />
        </svg>
        <p>{error}</p>
      </div>}
            <h1>{confirmationquestion == "delete" ? "Are you sure you want to delete this Reply?" : `Are you sure you want to unsubscribe ${extractEmail(replyToDelete.sender)}email?`}</h1>
            <div className='mt-6 flex justify-between'>
                <button className='modalButton' onClick={() => {
                    setDeletingReply(false);
                    setRespondingReply(false);
                    setReplyToDelete(null);
                    setReplyToDeleteIndex(-1);
                    setComponentToRender("main"); // Update the component to render
                }}>
                    Cancel
                </button >
                <button className='modalButton' onClick={() => {
                    handleUnsbscribeuser()

                }}>{loadingDeleteAction?  <i class="fa-solid fa-spinner fa-spin"></i>:"Proceed"}</button>
            </div>
        </div>
    );

    function RespondReply() {
        const [isChecked, setIsChecked] = useState(false);
        return (
            <div>
                <p><b>Replying to:</b> {extractEmail(replyToReply.sender)}</p>
                <p><b>Name:</b> {extractName(replyToReply.sender)}</p>
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



                <div className='mb-6 mt-6'>

                    <CKEditor
                        editor={ClassicEditor}
                        data={replyBody}
                        onChange={handleReplyChange}
                    />
                </div>
                <div className='flex flex-col gap-3'>
                    <button className='flex w-[100%] items-center justify-center gap-3 bg-green-400 rounded-3xl p-2'
                        onClick={() => {
                            sendReply(replyToReply)
                        }}
                    >
                        <p>Send reply</p>
                        <svg className="w-6 h-6 text-green-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.757 6 3.24 10.95a1.05 1.05 0 0 0 0 1.549l5.611 5.088m5.73-3.214v1.615a.948.948 0 0 1-1.524.845l-5.108-4.251a1.1 1.1 0 0 1 0-1.646l5.108-4.251a.95.95 0 0 1 1.524.846v1.7c3.312 0 6 2.979 6 6.654v1.329a.7.7 0 0 1-1.345.353 5.174 5.174 0 0 0-4.652-3.191l-.003-.003Z" />
                        </svg>
                    </button>
                    <button className='flex w-[100%] items-center justify-center gap-3 bg-green-400 rounded-3xl p-2'
                        onClick={() => {
                            setRespondingReply(false);
                            setReplyToReplyIndex(-1);
                            setReplyToReply(null);
                            setComponentToRender("main"); // Update the component to render
                        }}
                    >
                        <p>Cancel</p>
                    </button>
                </div>
            </div>
        )
    }

    function MainComponent() {
        return (
            <div>
                {replies.map((reply, index) => (
                    <Accordion key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                        >
                            <Typography>
                                <div className='flex justify-between sm:min-w-[400px] min-w-[280px] items-center'>
                                    <p className='text-green-700 font-bold break-words w-[70%]'>{reply.subject}</p>
                                    <div className='flex gap-2'>

                                        <div className='shadow-md active:bg-green-600' onClick={() => {
                                            setReplyToReply(reply);
                                            setReplyToReplyIndex(index);
                                            setRespondingReply(true);
                                            setDeletingReply(false);
                                            setReplyBody(""); // Reset replyBody when starting to respond
                                            setComponentToRender("reply"); // Update the component to render
                                        }}>
                                            <svg className="w-6 h-6 text-green-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M9.484 6.743c.41-.368.443-1 .077-1.41a.99.99 0 0 0-1.405-.078L2.67 10.203l-.007.006A2.048 2.048 0 0 0 2 11.721a2.058 2.058 0 0 0 .662 1.51l5.584 5.09a.99.99 0 0 0 1.405-.07 1.003 1.003 0 0 0-.07-1.412l-5.577-5.082a.05.05 0 0 1 0-.072l5.48-4.942Zm6.543 9.199v-.42a4.168 4.168 0 0 1 2.715 2.415c.154.382.44.695.806.88a1.683 1.683 0 0 0 2.167-.571c.214-.322.312-.707.279-1.092V15.88c0-3.77-2.526-7.039-5.966-7.573V7.57a1.957 1.957 0 0 0-.994-1.838 1.931 1.931 0 0 0-2.153.184L7.8 10.164a.753.753 0 0 0-.012.011l-.011.01a2.098 2.098 0 0 0-.703 1.57 2.108 2.108 0 0 0 .726 1.59l5.08 4.25a1.933 1.933 0 0 0 2.929-.614c.167-.32.242-.68.218-1.04Z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <div>
                                    <div className='flex gap-3 items-center justify-center mb-6'>
                                        {/* <div className='shadow-md inline-block' onClick={() => {
                                            setReplyToDelete(reply);
                                            setReplyToDeleteIndex(index);
                                            setRespondingReply(false);
                                            setconfirmationquestion("delete")
                                            setDeletingReply(true);
                                            setComponentToRender("delete"); // Update the component to render
                                        }}>
                                            <svg className="w-6 h-6 text-red-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                            </svg>
                                        </div> */}

                                        <div className='shadow-md inline-block p-2 rounded-xl' onClick={() => {
                                            setReplyToDelete(reply);
                                            setReplyToDeleteIndex(index);
                                            setRespondingReply(false);
                                            setconfirmationquestion("unsubscribe")
                                            setDeletingReply(true);
                                            setComponentToRender("delete"); // Update the component to render
                                        }}>
                                            <svg class="w-6 h-6 m-auto text-red-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12h4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                            <p >UNSUBSCRIBE</p>
                                        </div>
                                    </div>
                                    <p><b>From:</b> {reply.sender}</p>
                                    <p><b>Date:</b> {reply.date}</p>
                                    <div className="mt-6 mb-4">
                                        <p><b>Body:</b></p>
                                        <div className='shadow-lg p-2'>
                                            {reply.body}
                                        </div>
                                    </div>
                                </div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        );
    }

    function renderComponents(componentToRender) {
        switch (componentToRender) {
            case "main":
                return <MainComponent />;
            case "reply":
                return <RespondReply />;
            case "delete":
                return <DeleteReply />;
            default:
                return <MainComponent />;
        }
    }

    return (
        <div>
            {renderComponents(componentToRender)}
        </div>
    );
}

export default Replies;
