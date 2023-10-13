import React, { useEffect, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";

function Settings(){
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        }, 3000)
    }, [])

    return(
        <div className='w-100 text-center'>
            {loading?
            <ClipLoader color={'#36d7b7'} loading={loading} size={60} /> :
            <h1>Welcome in Settings</h1>
            }
        </div>
    )
}

export default Settings;

