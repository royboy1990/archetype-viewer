import React, { useState, useEffect } from 'react';
import SurveyBuilder from './components/SurveyBuilder';
import SurveyViewer from './components/SurveyViewer';
import Header from './components/Header';
import { Question } from './types';

const App: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [preview, setPreview] = useState(false);
    const [loading, setLoading] = useState(false); // Add loading state

    useEffect(() => {
        const savedQuestions = localStorage.getItem('survey-questions');
        if (savedQuestions) {
            setQuestions(JSON.parse(savedQuestions));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('survey-questions', JSON.stringify(questions));
    }, [questions]);

    const toggleView = () => {
        setLoading(true);
        setTimeout(() => {
            setPreview(!preview);
            setLoading(false);
        }, 300);
    };

    const exportSurvey = () => {
        const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(questions, null, 2)
        )}`;
        const downloadAnchor = document.createElement('a');
        downloadAnchor.href = dataStr;
        downloadAnchor.download = 'survey.json';
        downloadAnchor.click();
    };

    const importSurvey = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result;
            if (content) {
                try {
                    const importedQuestions = JSON.parse(content as string);
                    if (
                        !Array.isArray(importedQuestions) ||
                        !importedQuestions.every((q) => q.questionText && q.type)
                    ) {
                        alert('Invalid survey format!');
                        return;
                    }
                    setQuestions(importedQuestions);
                    alert('Survey imported successfully!');
                } catch (error) {
                    alert('Failed to import survey. Please check the file.');
                }
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <Header
                toggleView={toggleView}
                preview={preview}
                exportSurvey={exportSurvey}
                importSurvey={importSurvey}
            />

            <main className="container mx-auto py-8 px-6 flex justify-center">
                {loading ? (
                    <div className="flex flex-col items-center justify-center w-screen  h-[calc(100vh-138px)]">
                        <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
                        <p className="mt-2 text-blue-500">Loading...</p>
                    </div>
                ) : !preview ? (
                    <SurveyBuilder setQuestions={setQuestions} questions={questions} />
                ) : (
                    <SurveyViewer questions={questions} />
                )}
            </main>
        </div>
    );
};

export default App;
