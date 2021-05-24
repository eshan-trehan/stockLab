import { useState, useEffect } from 'react';

const useFetch = (url, refresh, setRefresh) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        console.log(url, refresh)
        const abortCont = new AbortController()
        fetch(url, {signal: abortCont.signal})
        .then((res) => {
            console.log('Data Fetched')
            if (!res.ok) {
                throw Error('Could not fetch Data from Resource');
            }
            return res.json();
        })
        .then((data) => {
            setData(data);
            setIsPending(false);
            setError(null);
        })
        .catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted');
            }
            else {
            setError(err.message)
            setIsPending(false);
            }
        });
        setRefresh(false)
        return () => {
            setRefresh(false)
            abortCont.abort()
        }
    }, [url, refresh, setRefresh]);

    return {data, isPending, error};
}

export default useFetch;