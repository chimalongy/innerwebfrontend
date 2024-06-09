
import React, { useEffect, useState } from 'react';

import { baseUrl } from './utils/constants';
import axios from 'axios'



const DashboardHome = () => {



  return (
    <div>
        <h1>Dashboard Tab</h1>
        <button onClick={async()=>{
          let result=    await axios.post(baseUrl+"/v2",{action:"getEmailsReplies"})
         console.log(result.data)
        }}>Read Emails</button>

    </div>
  )
}

export default DashboardHome
