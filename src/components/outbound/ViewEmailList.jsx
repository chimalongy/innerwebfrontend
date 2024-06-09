import React, { useState } from 'react'

function ViewEmailList({ outbound, emailList }) {

    const [showSearchResult, setShowSearchResult] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [searchQuery, setSearchQuery] = useState("")


    function DisplayList({ listToDisplay }) {
        return (
            listToDisplay.length === 0 ? (
                <div className='w-full h-full flex items-center justify-center'>
                    <p>{"No items found"}</p>
                </div>
            ) : (
                listToDisplay.map((enduser, index) => (
                    <div className='flex gap-2 items-center mb-3' key={index}>
                        <div className='rounded-full bg-green-200 p-3 flex items-center justify-center'>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeWidth="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </div>
                        <div>
                            <h1>{enduser}</h1>
                        </div>
                    </div>
                ))
            )
        );
    }
    



    return (
        <div>
            <div className='flex gap-2'>
                <input className='textbox' 
                placeholder='find enduser'
                value={searchQuery}
                onChange={(e)=>{setSearchQuery(e.target.value)}}
                />


                {
                    showSearchResult ? (
                        <div className=' bg-green-900 w-[50px] h-[50px] flex items-center justify-center rounded-xl active:bg-green-600' onClick={() => {
                            setShowSearchResult(false);
                        }}>
                            <svg class="w-6 h-6 text-green-50 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                            </svg>


                        </div>
                    ) :

                        (<div className=' bg-green-900 w-[50px] h-[50px] flex items-center justify-center rounded-xl active:bg-green-600' onClick={() => {

                            if (!!searchQuery.trim()){
                               
                                let result = emailList.filter(email => email.includes(searchQuery));
                                setSearchResults(result)
                                setShowSearchResult(true);
                            }
                            
                        }}>
                            <svg class="w-6 h-6 text-green-50 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                            </svg>

                        </div>)
                }



            </div>
            {
                showSearchResult ? (<DisplayList listToDisplay={searchResults}/>):(<DisplayList listToDisplay={emailList}/>)
            }
        </div>
    )
}

export default ViewEmailList