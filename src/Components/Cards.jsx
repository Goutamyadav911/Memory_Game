import { useState } from 'react';
import Card from './Card';

function Cards() {
    // Function to generate a new shuffled array of items
    const generateNewItems = () => [
        { id: 1, img: "/src/images/html.png", stat: "" },
        { id: 1, img: "/src/images/html.png", stat: "" },
        { id: 2, img: "/src/images/css.png", stat: "" },
        { id: 2, img: "/src/images/css.png", stat: "" },
        { id: 3, img: "/src/images/js.png", stat: "" },
        { id: 3, img: "/src/images/js.png", stat: "" },
        { id: 4, img: "/src/images/scss.png", stat: "" },
        { id: 4, img: "/src/images/scss.png", stat: "" },
        { id: 5, img: "/src/images/react.png", stat: "" },
        { id: 5, img: "/src/images/react.png", stat: "" },
        { id: 6, img: "/src/images/vue.png", stat: "" },
        { id: 6, img: "/src/images/vue.png", stat: "" },
        { id: 7, img: "/src/images/angular.png", stat: "" },
        { id: 7, img: "/src/images/angular.png", stat: "" },
        { id: 8, img: "/src/images/nodejs.png", stat: "" },
        { id: 8, img: "/src/images/nodejs.png", stat: "" },
    ].sort(() => Math.random() - 0.5);

    // Initial state setup
    const [items, setItems] = useState(generateNewItems());
    const [prev, setPrev] = useState(-1);
    const [score, setScore] = useState({ correct: 0, wrong: 0 });
    const [hasWon, setHasWon] = useState(false);

    // Function to reset the game state
    const resetGame = () => {
        setItems(generateNewItems());
        setPrev(-1);
        setScore({ correct: 0, wrong: 0 });
        setHasWon(false);
    };

    function check(current) {
        const newItems = [...items]; // create a copy of the item array
        if (newItems[current].id === newItems[prev].id) {
            // Match found
            newItems[current].stat = "correct";
            newItems[prev].stat = "correct";
            setScore(prevScore => {
                const newScore = { ...prevScore, correct: prevScore.correct + 1 };
                if (newScore.correct === items.length / 2) {
                    setHasWon(true); // All matches found, player wins
                }
                return newScore;
            });
        } else {
            // No match
            newItems[current].stat = "wrong";
            newItems[prev].stat = "wrong";
            setScore(prevScore => ({ ...prevScore, wrong: prevScore.wrong + 1 }));
            setTimeout(() => {
                newItems[current].stat = "";
                newItems[prev].stat = "";
                setItems(newItems); // Update the items with the modified array
            }, 1000);
            setPrev(-1);
            return; // Exit early to avoid setting prev incorrectly
        }
        setItems(newItems); // Update the items with the modified array
        setPrev(-1);
    }

    function handleClick(index) {
        if (prev === -1) {
            if (items[index].stat !== "correct" && items[index].stat !== "wrong") {
                const newItems = [...items];
                newItems[index].stat = "active";
                setItems(newItems);
                setPrev(index);
            }
        } else {
            if (index !== prev && items[index].stat !== "correct" && items[index].stat !== "wrong") {
                check(index);
            }
        }
    }

    return (
        <div className="whole">
            <div className="container">
                {items.map((item, index) => (
                    <Card key={index} item={item} id={index} handleClick={handleClick} />
                ))}
            </div>
            <div className="scoreboard">
                <h4>Correct Matches: {score.correct}</h4>
                <h4>Wrong Matches: {score.wrong}</h4>
                <button className="reset-button" onClick={resetGame}>Restart Game</button>
            </div>
            {hasWon && <div className="winning-message">Congratulations! You have found all the matches!</div>}
        </div>
    );
}

export default Cards;
