import React, { useState, useEffect } from 'react';

interface SurveyQuestionInputProps {
    questionId: number;
    value: any;
    options?: string[];
    type: 'text' | 'multiple-choice' | 'checkboxes' | 'rating' | 'date';
    onChange: (questionId: number, value: any) => void;
    onBlur: (questionId: number) => void;
    error?: string;
}

const SurveyQuestionInput: React.FC<SurveyQuestionInputProps> = ({
                                                                     questionId,
                                                                     value,
                                                                     options,
                                                                     type,
                                                                     onChange,
                                                                     onBlur,
                                                                     error,
                                                                 }) => {
    const [dateFormat, setDateFormat] = useState<string>('');

    useEffect(() => {
        if (type === 'date') {
            const now = new Date();
            const localeDateString = now.toLocaleDateString(); // Automatically formats based on user's locale
            setDateFormat(localeDateString); // Set the date format
        }
    }, [type]);

    const renderInput = () => {
        switch (type) {
            case 'text':
                return (
                    <input
                        type="text"
                        value={value || ''}
                        onChange={(e) => onChange(questionId, e.target.value)}
                        onBlur={() => onBlur(questionId)}
                        className={`mt-2 p-2 border rounded w-full ${error ? 'border-red-500 animate-shake' : 'border-gray-300'}`}
                        placeholder="Enter your response"
                    />
                );
            case 'multiple-choice':
                return options?.map((option, index) => (
                    <label key={index} className="block text-gray-800">
                        <input
                            type="radio"
                            name={`question-${questionId}`}
                            value={option}
                            checked={value === option}
                            onChange={(e) => onChange(questionId, e.target.value)}
                            onBlur={() => onBlur(questionId)}
                            className="mr-2"
                        />
                        {option}
                    </label>
                ));
            case 'checkboxes':
                return options?.map((option, index) => (
                    <label key={index} className="block text-gray-800">
                        <input
                            type="checkbox"
                            value={option}
                            checked={Array.isArray(value) && value.includes(option)}
                            onChange={() => {
                                const updatedValue = Array.isArray(value)
                                    ? value.includes(option)
                                        ? value.filter((item) => item !== option)
                                        : [...value, option]
                                    : [option];
                                onChange(questionId, updatedValue);
                            }}
                            onBlur={() => onBlur(questionId)}
                            className="mr-2"
                        />
                        {option}
                    </label>
                ));
            case 'rating':
                return [1, 2, 3, 4, 5].map((num) => (
                    <label key={num} className="mr-4 text-gray-800">
                        <input
                            type="radio"
                            name={`rating-${questionId}`}
                            value={num}
                            checked={value === String(num)}
                            onChange={(e) => onChange(questionId, e.target.value)}
                            onBlur={() => onBlur(questionId)}
                            className="mr-1"
                        />
                        {num}
                    </label>
                ));
            case 'date':
                return (
                    <div className="w-full">
                        <label htmlFor={`date-${questionId}`} className="block text-gray-700">
                            Enter your date
                        </label>
                        <input
                            type="date" // Native date picker (respects locale)
                            id={`date-${questionId}`}
                            value={value || ''}
                            onChange={(e) => onChange(questionId, e.target.value)}
                            onBlur={() => onBlur(questionId)}
                            className={`mt-2 p-2 border rounded w-full ${error ? 'border-red-500 animate-shake' : 'border-gray-300'}`}
                            placeholder={dateFormat || 'dd/mm/yyyy'} // Show format based on user's locale
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            {renderInput()}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default SurveyQuestionInput;
