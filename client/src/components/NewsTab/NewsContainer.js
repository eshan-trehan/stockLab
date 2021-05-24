import React from 'react'
import useFetch from '../useFetch'
import NewsList from './NewsList'

function NewsContainer({ url, refresh, setRefresh }) {
    const {data, isPending, error} = useFetch(url, refresh, setRefresh);
    console.log(data)
    return (
        <div className="newsContainer">
            {error && "Can't Fetch Data"}
            {isPending && "Loading..."}
            {(data !== null) && <NewsList data={data.articles}/>}
        </div>
    )
}

export default NewsContainer
