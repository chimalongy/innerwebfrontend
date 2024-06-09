import React from 'react'

function ViewUnsubscribers({ unsubscribers }) {
    return (
        <div>
            {
                unsubscribers.map((enduser, index) =>
                (
                    <div className='flex gap-2 items-center  mb-3'>
                        <div className='rounded-full bg-green-200 p-3 flex items-center justify-center'>
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12h4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>

                        </div>
                        <div>
                            <h1 className='font-bold'>{enduser.email}</h1>
                            <p className='text-sm'><b>Reason:</b> {enduser.reason}</p>


                        </div>
                    </div>
                )
                )
            }
        </div>
    )
}

export default ViewUnsubscribers 