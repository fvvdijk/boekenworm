import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Questionnaire = () => {
    const initialAnswers = {
        personality: "",
        interest: "",
    };

    const [answers, setAnswers] = useState(initialAnswers);
    const [currentQuestion, setCurrentQuestion] = useState("personality");
    const [apiResult, setApiResult] = useState(null);
    const [apiCalled, setApiCalled] = useState(false);
    const navigate = useNavigate();

    const handleAnswer = (question, answer) => {
        setAnswers({ ...answers, [question]: answer });

        if (question === "personality") {
            setCurrentQuestion("interest");
        } else if (question === "interest") {
            setCurrentQuestion("result");
        }
    };

    const searchApi = async (category) => {
        try {

            const response = await fetch(
                `https://openlibrary.org/subjects/${category}.json?&limit=5`
            );

            const data = await response.json();
            setApiResult(data);
            setApiCalled(true);
        } catch (error) {
            console.error("Error fetching API:", error);
        }
    };

    const getResult = () => {
        const { personality, interest } = answers;

        if (personality === "introvert" && interest === "deep") {
            if (!apiCalled) {
                searchApi("art");
            }
            return "Je houdt van kunst!";
        } else if (personality === "introvert" && interest === "superficial") {
            if (!apiCalled) {
                searchApi("fiction");
            }
            return "Je houdt van fictie!";
        } else if (personality === "extravert" && interest === "deep") {
            if (!apiCalled) {
                searchApi("history");
            }
            return "Je houdt van geschiedenis!";
        } else if (personality === "extravert" && interest === "superficial") {
            if (!apiCalled) {
                searchApi("health");
            }
            return "Je houdt van gezondheid!";
        }

        return "No result";
    };

    useEffect(() => {
        console.log("API Result:", apiResult);
        if (currentQuestion === "result" && apiResult && apiResult.works) {
            // Add a delay of 3 seconds before navigating
            const timeoutId = setTimeout(() => {
                navigate("/FiveBooksPage", { state: { works: apiResult.works } });
            }, 3000);

            return () => clearTimeout(timeoutId); // Cleanup function to clear timeout if component unmounts
        }
    }, [apiResult, currentQuestion, navigate]);

    const restartTest = () => {
        setAnswers(initialAnswers);
        setCurrentQuestion("personality");
        setApiResult(null);
        setApiCalled(false);
    };

    return (
        <div>
            <h2>Boekentest 1</h2>
            <h3>Bij deze test krijg je 5 boeken die passen bij jouw persoonlijkheid en interesse</h3>
            {currentQuestion === "personality" && (
                <div>
                    <p>Question 1: Ben je een introvert of een extravert?</p>
                    <button onClick={() => handleAnswer("personality", "introvert")}>
                        Introvert
                    </button>
                    <button onClick={() => handleAnswer("personality", "extravert")}>
                        Extravert
                    </button>
                </div>
            )}
            {currentQuestion === "interest" && (
                <div>
                    <p>
                        Question 2: Hou je van diepgaande of oppervlakkige onderwerpen?
                    </p>
                    <button onClick={() => handleAnswer("interest", "deep")}>Diep</button>
                    <button onClick={() => handleAnswer("interest", "superficial")}>
                        Oppervlakkig
                    </button>
                </div>
            )}
            {currentQuestion === "result" && (
                <div>
                    <h3>Resultaat: {getResult()}</h3>
                    <button onClick={restartTest}>Restart Test</button>
                </div>
            )}
        </div>
    );
};

export default Questionnaire;