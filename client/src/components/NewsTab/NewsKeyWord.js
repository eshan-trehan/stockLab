import React from 'react'
import { FaTimes} from 'react-icons/fa'
import { database } from '../../firebase'
import { useAuth } from '../../context/authContext'

export default function NewKeyWord({id, keyWord}) {
    const { currentUser } = useAuth()
    const url = 'users/' + currentUser.uid + '/keyWords'

    const deleteKeyWord = () => {
        const keyWordRef = database.ref(url).child(id)
        keyWordRef.remove()
    }
    return (
        <div className="newsKeyWord">
            <h4 className="newsKeyWordHeading">{keyWord}</h4>
            <FaTimes style = {{color:'white', cursor:'pointer', height:"20px"}} onClick={deleteKeyWord}/>
        </div>
    )
}
