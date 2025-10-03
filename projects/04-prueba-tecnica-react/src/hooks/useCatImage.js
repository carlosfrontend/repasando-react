import { useState, useEffect } from 'react'

export const useCatImage = ({ fact }) => {
    const [imgUrl, setImgUrl] = useState()
    useEffect(() => {
        if (!fact) return
        const threeFirstWord = fact.split(' ', 3).join(' ').trim()

        fetch(
            `https://cataas.com/cat/says/${threeFirstWord}?fontSize=50&fontColor=red&json=true`
        )
            .then((res) => res.json())
            .then((data) => {
                const { url } = data
                setImgUrl(url)
            })
    }, [fact])

    return { imgUrl }
}
