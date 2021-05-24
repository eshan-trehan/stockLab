import React, { useEffect, useState } from 'react'
import useFetch from '../useFetch'
import NewsList from './NewsList'
import { database } from '../../firebase'
import { useAuth } from '../../context/authContext'

function NewsCustom() {
    const { currentUser } = useAuth()
    const [keyWordList, setKeyWordList] = useState()
    const [refresh, setRefresh] = useState(false)
    const url = 'users/' + currentUser.uid + '/keyWords'

    useEffect(() => {
        const keyWordDatabaseRef = database.ref(url)
        keyWordDatabaseRef.on('value', (snapshot) => {
            const keyWords = snapshot.val()
            const keyWordList = [];
            for (let id in keyWords) {
                keyWordList.push({id, ...keyWords[id]})
            }
            setKeyWordList(keyWordList)
        })
    }, [url])


    //const {data, isPending, error} = useFetch(url, refresh, setRefresh);

    return (
        <div className="newsContainer">
            
        </div>
    )
}

export default NewsCustom
