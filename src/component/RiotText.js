import React, { useState, useEffect } from 'react';

const RiotText = () => {
    const [text, setText] = useState('');

    useEffect(() => {
        const fetchText = async () => {
            try {
                const response = await fetch('/riot.txt');
                const data = await response.text();
                setText(data);
            } catch (error) {
                console.error('Error fetching riot.txt:', error);
            }
        };

        fetchText();
    }, []);

    return (
        <div>
            <pre>{text}</pre>
        </div>
    );
};

export default RiotText;