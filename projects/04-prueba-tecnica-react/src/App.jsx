import './App.css'
import { useCatImage } from './hooks/useCatImage'
import { useCatFact } from './hooks/useCatFact'

const App = () => {
    const { fact, refreshFact } = useCatFact()
    const { imgUrl } = useCatImage({ fact })

    const handleClick = async () => {
        refreshFact()
    }

    return (
        <main>
            <h1>App de gatitos</h1>
            <button onClick={handleClick}>Get new fact</button>
            <section>
                {fact && <p>{fact}</p>}
                <img
                    src={imgUrl}
                    alt={`Image extracted using the three first words of fact`}
                />
            </section>
        </main>
    )
}

export default App
