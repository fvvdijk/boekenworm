import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Button from "../shared/button/Button";
import {DNA} from "react-loader-spinner";

const Questionnaire = (props) => {
    const initialAnswers = {
        personality: "",
        interest: "",
    };

    const [answers, setAnswers] = useState(initialAnswers);
    const [currentQuestion, setCurrentQuestion] = useState("personality");
    const [apiResult, setApiResult] = useState(null);
    const [apiCalled, setApiCalled] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // New state variable for tracking loading state
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

    const searchApi = async (category, props) => {
        setIsLoading(true);
        try {
            let url = `https://openlibrary.org/subjects/${category}.json?&limit=${props?.limit}`;
            if (props?.randomOffset){
                url += `&offset=${props?.randomOffset}`;
            }
            const response = await axios.get(url);
            setApiResult(response.data);
            setApiCalled(true);
        } catch (error) {
            if (window.confirm("Iets ging er mis, klik op OK om de pagina te vernieuwen")) {
                window.location.reload();
            }
        } finally {
            setIsLoading(false);
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
            searchApi(condition.category, props);
        }

        return condition ? `Je houdt van ${condition.category}!` : "No result";
    };

    useEffect(() => {
        if (currentQuestion === "result" && apiResult && apiResult.works) {
            const timeoutId = setTimeout(() => {
                navigate("/QuizResultsPage", { state: { works: apiResult.works } });
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
        <section>
            {isLoading ? <DNA DNA type="Puff" color="#00BFFF" height={100} width={100}  /> : (
                <>
                    {props?.randomOffset ?
                        <>
                            <h2>Boekentest 2</h2>
                            <h3>Bij deze test krijg je een random boek dat past bij jouw persoonlijkheid en interesse</h3>
                        </> :
                        <>
                            <h2>Boekentest 1</h2>
                            <h3>Bij deze test krijg je 5 boeken die passen bij jouw persoonlijkheid en interesse</h3>
                        </>
                    }
                    {currentQuestion === "personality" && (
                        <div>
                            <p>Question 1: Ben je een introvert of een extravert?</p>
                            <Button onClick={() => handleAnswer("personality", "introvert")}>
                                Introvert
                            </Button>
                            <Button onClick={() => handleAnswer("personality", "extravert")}>
                                Extravert
                            </Button>
                        </div>
                    )}
                    {currentQuestion === "interest" && (
                        <div>
                            <p>
                                Question 2: Hou je van diepgaande of oppervlakkige onderwerpen?
                            </p>
                            <Button onClick={() => handleAnswer("interest", "deep")}>
                                Diep
                            </Button>
                            <Button onClick={() => handleAnswer("interest", "superficial")}>
                                Oppervlakkig
                            </Button>
                        </div>
                    )}
                    {currentQuestion === "result" && (
                        <div>
                            <h3>Resultaat: {getResult()}</h3>
                            <Button type="button" onClick={restartTest}>
                                Restart Test
                            </Button>
                        </div>
                    )}
                </>
            )}
        </section>
    );
};

export default Questionnaire;