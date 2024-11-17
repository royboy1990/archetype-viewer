import React, { useState } from 'react';
import { Question } from '../types';

interface SurveyBuilderProps {
    setQuestions: (q: Question[]) => void;
    questions: Question[];
}

const SurveyBuilder: React.FC<SurveyBuilderProps> = ({
                                                         setQuestions,
                                                         questions,
                                                     }) => {
    const [questionText, setQuestionText] = useState('');
    const [questionType, setQuestionType] = useState<
        'text' | 'multiple-choice' | 'rating' | 'checkboxes' | 'date'
    >('text');
    const [options, setOptions] = useState<string[]>([]);
    const [required, setRequired] = useState(false);
    const [touched, setTouched] = useState(false); // Tracks if question has been touched for validation

    const isAddQuestionDisabled =
        !questionText.trim() ||
        (['multiple-choice', 'checkboxes'].includes(questionType) &&
            (options.length === 0 || options.some((opt) => !opt.trim())));

    const handleBlur = () => {
        setTouched(true);
    };

    const addQuestion = () => {
        if (isAddQuestionDisabled) return;

        const newQuestion: Question = {
            id: Date.now(),
            questionText: questionText.trim(),
            type: questionType,
            options: ['multiple-choice', 'checkboxes'].includes(questionType)
                ? options.map((opt) => opt.trim())
                : undefined,
            required,
        };

        setQuestions([...questions, newQuestion]);
        setTouched(false); // Reset touched state when adding a new question
        setQuestionText('');
        setOptions([]);
        setRequired(false);
    };

    const addOption = () => {
        setOptions([...options, '']);
    };

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const removeQuestion = (id: number) => {
        setQuestions(questions.filter((q) => q.id !== id));
    };

    return (
        <div className="w-full max-w-3xl bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-bold mb-6">Survey Builder</h1>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium">Question Text</label>
                <input
                    type="text"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    onBlur={handleBlur} // Track if the field was interacted with
                    className={`mt-2 p-2 border rounded w-full ${
                        touched && !questionText.trim() ? 'border-red-500 animate-shake' : 'border-gray-300'
                    }`}
                    placeholder="Enter your question..."
                />
                {touched && !questionText.trim() && (
                    <p className="text-red-500 text-sm mt-1">Question text cannot be empty.</p>
                )}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium">Question Type</label>
                <select
                    value={questionType}
                    onChange={(e) =>
                        setQuestionType(
                            e.target.value as 'text' | 'multiple-choice' | 'rating' | 'checkboxes' | 'date'
                        )
                    }
                    className="mt-2 p-2 border border-gray-300 rounded w-full"
                >
                    <option value="text">Text</option>
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="checkboxes">Checkboxes</option>
                    <option value="rating">Rating Scale (1-5)</option>
                    <option value="date">Date Picker</option>
                </select>
            </div>

            {(questionType === 'multiple-choice' || questionType === 'checkboxes') && (
                <div className="mb-4">
                    <h3 className="text-gray-700 font-medium">Options</h3>
                    {options.map((option, index) => (
                        <input
                            key={index}
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            className="mt-2 p-2 border border-gray-300 rounded w-full"
                            placeholder={`Option ${index + 1}`}
                        />
                    ))}
                    {options.some((opt) => !opt.trim()) && (
                        <p className="text-red-500 text-sm mt-1">All options must be filled out.</p>
                    )}
                    <button
                        onClick={addOption}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Add Option
                    </button>
                </div>
            )}

            <div className="mb-4">
                <label className="block text-gray-700 font-medium">Required field?</label>
                <input
                    type="checkbox"
                    checked={required}
                    onChange={(e) => setRequired(e.target.checked)}
                    className="mt-2"
                />
            </div>

            <button
                onClick={addQuestion}
                disabled={isAddQuestionDisabled}
                className={`mt-4 px-4 py-2 rounded ${
                    isAddQuestionDisabled
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-500 text-white hover:bg-green-600'
                }`}
            >
                Add Question
            </button>

            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Survey Preview</h2>
                {questions.length === 0 ? (
                    <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                        <p className="text-gray-500 text-lg">No questions added yet! Start building your survey.</p>
                    </div>
                ) : (
                    questions.map((q) => (
                        <div
                            key={q.id}
                            className="relative bg-gray-100 p-4 rounded-lg shadow-sm mb-4"
                        >
                            <div className="absolute top-2 right-2">
                                <button
                                    onClick={() => removeQuestion(q.id)}
                                    className="w-4 h-4 bg-transparent"
                                    title="Remove Question"
                                >
                                    <span className="material-icons">close</span>
                                </button>
                            </div>
                            <div className="flex">
                                <p className="text-lg font-medium mr-1">{q.questionText} -</p>
                                <p className="text-lg font-medium"> {q.type}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
};

export default SurveyBuilder;
