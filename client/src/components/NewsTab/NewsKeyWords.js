import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { database } from '../../firebase'
import NewsKeyWord from './NewsKeyWord'

export default function NewsKeyWords() {
    const { currentUser } = useAuth()
    const [keyWordList, setKeyWordList] = useState()
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

    return (
        <div className="newsKeyWordList">
            {keyWordList ? keyWordList.map((keyWordObj, index) => <NewsKeyWord id={keyWordObj.id} keyWord={keyWordObj.keyWord} key={index}/>) : ""}
        </div>
    )
}
