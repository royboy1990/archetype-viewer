import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import SurveyQuestionInput from './SurveyQuestionInput';

interface SurveyViewerProps {
    questions: Question[];
}

const SurveyViewer: React.FC<SurveyViewerProps> = ({ questions }) => {
    const [responses, setResponses] = useState<{ [key: number]: any }>({});
    const [errors, setErrors] = useState<{ [key: number]: string }>({});
    const [touched, setTouched] = useState<{ [key: number]: boolean }>({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        validateForm();
    }, [responses, questions]);

    const handleInputChange = (questionId: number, value: any) => {
        setResponses({
            ...responses,
            [questionId]: value,
        });

        if (errors[questionId]) {
            setErrors((prev) => {
                const updatedErrors = { ...prev };
                delete updatedErrors[questionId];
                return updatedErrors;
            });
        }
    };

    const handleBlur = (questionId: number) => {
        setTouched((prev) => ({ ...prev, [questionId]: true }));
    };

    const validateForm = () => {
        const newErrors: { [key: number]: string } = {};
        questions.forEach((q) => {
            if (q.required && (!responses[q.id] || responses[q.id].length === 0)) {
                newErrors[q.id] = 'This field is required.';
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            // Create a new object that maps question text to user responses
            const formattedResponses = questions.reduce((acc, question) => {
                acc[question.questionText] = responses[question.id] || ''; // map question text to response
                return acc;
            }, {} as { [key: string]: any });

            // Log the formatted responses
            console.log('Survey Responses:', formattedResponses);
            setSubmitted(true);
        }
    };

    const isFormValid = Object.keys(errors).length === 0;

    return (
        <div className="w-full max-w-3xl bg-white p-6 rounded shadow-lg">
            <h1 className="text-2xl font-bold mb-6">Survey Viewer</h1>

            {submitted ? (
                <div className="bg-green-100 text-green-800 p-4 rounded text-center">
                    <p className="font-semibold">Thank you for submitting the survey!</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    {questions.length === 0 ? (
                        <p className="text-gray-500 text-center">No questions to display.</p>
                    ) : (
                        <div className="space-y-6">
                            {questions.map((q) => (
                                <div
                                    key={q.id}
                                    className="relative bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-300"
                                >
                                    <p className="text-lg font-medium mb-2">
                                        {q.questionText}
                                        {q.required && <span className="text-red-500 ml-1">*</span>}
                                    </p>

                                    <SurveyQuestionInput
                                        questionId={q.id}
                                        value={responses[q.id]}
                                        options={q.options}
                                        type={q.type}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        error={touched[q.id] ? errors[q.id] : undefined}  // Ensure error is passed to trigger shake
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                    {questions.length > 0 && (
                        <button
                            type="submit"
                            className={`mt-4 px-4 py-2 rounded w-full transition-all duration-300 ${!isFormValid ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'}`}
                            disabled={!isFormValid}
                        >
                            Submit Survey
                        </button>
                    )}
                </form>
            )}
        </div>
    );
};

export default SurveyViewer;
