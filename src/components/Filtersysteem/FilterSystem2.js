import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const QuestionnaireTwo = () => {
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
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [question]: answer,
        }));

        setCurrentQuestion((prevQuestion) =>
            prevQuestion === "personality" ? "interest" : "result"
        );
    };

    const searchApi = async (category) => {
        try {
            const randomOffset = Math.floor(Math.random() * 100);

            const response = await fetch(
                `https://openlibrary.org/subjects/${category}.json?&limit=1&offset=${randomOffset}`
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
        const conditions = [
            { personality: "introvert", interest: "deep", category: "art" },
            { personality: "introvert", interest: "superficial", category: "fiction" },
            { personality: "extravert", interest: "deep", category: "history" },
            { personality: "extravert", interest: "superficial", category: "health" },
        ];

        const condition = conditions.find(
            (cond) => cond.personality === personality && cond.interest === interest
        );

        if (condition && !apiCalled) {
            searchApi(condition.category);
        }

        return condition ? `Je houdt van ${condition.category}!` : "No result";
    };

    useEffect(() => {
        if (currentQuestion === "result" && apiResult && apiResult.works) {
            const timeoutId = setTimeout(() => {
                navigate("/RandomBookPage", { state: { works: apiResult.works } });
            }, 3000);

            return () => clearTimeout(timeoutId);
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
            <h2>Boekentest 2</h2>
            <h3>Bij deze test krijg je een random boek dat past bij jouw persoonlijkheid en interesse</h3>
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

export default QuestionnaireTwo;