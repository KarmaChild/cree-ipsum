'use client'
import React, { useState } from 'react';

const loremIpsum = `
  ᑭᐦᑎᐦᑖᓐ ᓂᓄᑕᒡ ᓂᓄᑕᒥᐢᑲᐦᐋᑭᐏᐣ ᓇᑲᐢᑕᐣ ᐋᐦᑕ ᑭᐢᑭᓂᐊᑌᐣ ᐅᑲᒥᓇᐏᐣ ᓂᑲᐢᑕᐣ ᑭᐢᑭᓂᐊᐧᐃᐣ ᐋᒋᐦᑕ ᑭᐢᑭᓂᐊᑌᐣ ᐃᑳᒥᐢᐸᐣ ᐋᒋᐦᑕ ᓂᓄᑕᒡ ᐅᑲᒥᓇᐏᐣ ᐊᐢᑯᔭᐃᐧᐣ
`;



const LoremIpsumGenerator = () => {
    const [paragraphs, setParagraphs] = useState(1);
    const [paragraphsList, setParagraphsList] = useState([]);
    const [generatedText, setGeneratedText] = useState('');

    const shuffleWords = () => {
        let words = loremIpsum.split(" ");
        words = words.sort(() => Math.random() - 0.5);
        return words.join(" ");
    };

    const generateLoremIpsum = () => {
        const loremIpsumText = loremIpsum.trim().split('\n\n');
        const regularLorem = loremIpsumText[0]; // Regular Lorem Ipsum

        let shuffledLorem = loremIpsumText.slice(1).map((para) => shuffleWords()); // Shuffle remaining paragraphs

        // Ensure we have exactly 4 shuffled paragraphs
        if (shuffledLorem.length < 4) {
            const additionalParagraphs = 4 - shuffledLorem.length;
            for (let i = 0; i < additionalParagraphs; i++) {
                shuffledLorem.push(shuffleWords());
            }
        } else if (shuffledLorem.length > 4) {
            shuffledLorem = shuffledLorem.slice(0, 4); // Limit to 4 paragraphs
        }

        const paragraphsList = [regularLorem, ...shuffledLorem];
        setParagraphsList(paragraphsList);

        if (paragraphs === 1) {
            return regularLorem;
        } else {
            return paragraphsList.slice(0, paragraphs).join('\n\n');
        }
    };

    const handleGenerateClick = () => {
        const generatedLoremIpsum = generateLoremIpsum();
        setGeneratedText(generatedLoremIpsum);
    };

    // Function to limit each paragraph to 7 lines
    const limitLines = (text) => {
        const lines = text.split('\n');
        let result = [];
        let currentLine = '';
        for (let line of lines) {
            if ((currentLine + line).length > 7) {
                result.push(currentLine.trim());
                currentLine = '';
            }
            currentLine += line + ' ';
        }
        if (currentLine.trim().length > 0) {
            result.push(currentLine.trim());
        }
        return result.join('\n');
    };

    return (
        <div className="max-w-4xl mx-auto p-4 bg-gray-100 shadow-lg rounded-lg">
            <label htmlFor="paragraphs" className="block font-bold mb-2 text-black">Number of Paragraphs:</label>
            <input
                type="number"
                id="paragraphs"
                className="w-full p-2 border border-gray-300 rounded-md text-black"
                min="1"
                max="5"
                value={paragraphs}
                onChange={(e) => setParagraphs(parseInt(e.target.value))}
            />
            <br />
            <button
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleGenerateClick}
            >
                Generate Lorem Ipsum
            </button>
            <br />
            <textarea
                rows="30"
                cols="50"
                className="mt-4 p-2 w-full border border-gray-300 rounded-md text-black"
                value={limitLines(generatedText)} // Limit each paragraph to 7 lines
                readOnly
            />
        </div>
    );
};

export default LoremIpsumGenerator;
