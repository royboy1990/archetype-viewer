
export interface Question {
    id: number;
    questionText: string;
    type: 'text' | 'multiple-choice' | 'rating' | 'checkboxes' | 'date';
    options?: string[]; // Used for multiple-choice and checkboxes
    required?: boolean // Whether the question is required
}
