// useGetTranslation.js

import { useState } from 'react';

interface TranslationResponse {
    content: string;
}
const useGetTranslation = () => {
    const [translation, setTranslation] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const getTranslation = async (organizationID: string, apiKey: string, sentenceToBeTranslated: string) => {
        const apiUrl = 'http://www.localhost.com/443'; // Update with your API endpoint

        const requestBody = {
            organizationID,
            apiKey,
            sentenceToBeTranslated,
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        };

        try {
            const response = await fetch(apiUrl, requestOptions);

            if (!response.ok) {
                throw new Error('Failed to fetch translation');
            }

            const data: TranslationResponse = await response.json();

            // Ensure 'content' property exists on the response
            if ('content' in data) {
                // Assuming the response content is a JSON string, parse it to an object
                const parsedContent = JSON.parse(data.content);

                // Extract the translated text from the parsed content
                const translatedText = parsedContent.sentence_meaning;

                setTranslation(translatedText);
                setError(null);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (err: any) {
            setTranslation(null);
            setError('Error fetching translation: ' + err.message);
        }
    };

    return { translation, error, getTranslation };
};

export default useGetTranslation;