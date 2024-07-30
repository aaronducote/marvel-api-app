import { useState, useEffect } from 'react'
import { useSearchParams, NavLink } from 'react-router-dom'
import styled from '@emotion/styled'
import CryptoJS from 'crypto-js';

// Input box styling
const StyledInput = styled.input`
    font-family: "Kode Mono", monospace;
    flex: 1;
    padding: 10px;
    font-size: 25px; 
    width: 20vw;
    background-color:#cb3032;
    color: #f9c06b;
    text-align: center;
`;

const PageStyle = styled.div`
    img {
        text-decoration: none;
        font-weight: bold;
        font-size: 40px;
        transition: color 0.3s ease-in-out;
        color: black;
        height:25vw;
  }
`;

const H3Style = styled.h3`
    font-size: 60px;
    font-family: 'Fredericka the Great', cursive;

  a {
    color: #cb3032;
    text-decoration: none; 
    
    &:hover {
      color: #f9c06b; 
    }
  }
`;

// Allows a user to search for a list of characters
export default function SearchCharacter() {
    const [hash, setHash] = useState('');
    const [timestamp, setTimestamp] = useState('');
    const [data, setData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Keys value, which is API private key and public key together
    const keysValue = '4f175da1e058b20852cc3d3f920406efdd458c1b8bc86d7d5d3e35ead39c6b0a737d1d56';

    useEffect(() => {
        // Get the current timestamp
        const currentTimestamp = Date.now().toString();
        setTimestamp(currentTimestamp);

        // Generate the MD5 hash with the timestamp and the constant value
        const newHash = CryptoJS.MD5(currentTimestamp + keysValue).toString();
        setHash(newHash);
    }, [keysValue]);

    // Fetch the API call
    useEffect(() => {
        const fetchData = async () => {
            if (hash && timestamp && searchTerm) {
                const response = await fetch(
                    `https://gateway.marvel.com:443/v1/public/characters?orderBy=name&apikey=8bc86d7d5d3e35ead39c6b0a737d1d56&hash=${hash}&ts=${timestamp}&nameStartsWith=${searchTerm}`
                );
                const result = await response.json();
                console.log(result);
                setData(result);
            }
        };

        fetchData();
    }, [hash, timestamp, searchTerm]);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Display characters data on web page with search box
    return (
        <div>
            <PageStyle>
            <h1>Search Marvel Characters</h1>
            <StyledInput
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Character"
            />
            {data && data.data && data.data.results && (
                <div>
                    <h1>Results:</h1>
                    {data.data.results.map((character, index) => (
                        <div key={index}>
                            <H3Style><NavLink to={`/characters/${character.id}`}>{character.name}</NavLink></H3Style>
                            <img
                                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                                alt={`${character.name} Image`}
                            />
                        </div>
                    ))}
                </div>
            )}
            </PageStyle>
        </div>
    );
}