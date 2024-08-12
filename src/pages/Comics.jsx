import { useState, useEffect } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'
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
        padding-bottom: 30px;
  }
`;

const H3Style = styled.h3`
    font-size: 60px;
    font-family: 'Fredericka the Great', cursive;

  a {
    color: #cb3032;
    text-decoration: none; 
    
    &:hover {
      color: #4464ff;
    }
  }
`;

const ComicContainer = styled.div`
    background-color: #44ff46;
    border-radius: 50px;
    border: 6px solid #4464ff;
    bottom-padding: 10px;
`

// Allows a user to search for a list of comics
export default function SearchComic() {
    const [hash, setHash] = useState('');
    const [timestamp, setTimestamp] = useState('');
    const [data, setData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const keysValue = '4f175da1e058b20852cc3d3f920406efdd458c1b8bc86d7d5d3e35ead39c6b0a737d1d56';

    useEffect(() => {
        // Get the current timestamp
        const currentTimestamp = Date.now().toString();
        setTimestamp(currentTimestamp);

        // Generate the MD5 hash with the timestamp and the constant value
        const newHash = CryptoJS.MD5(currentTimestamp + keysValue).toString();
        setHash(newHash);
    }, [keysValue]);

    useEffect(() => {
        const fetchData = async () => {
            if (hash && timestamp && searchTerm) {
                const response = await fetch(
                    `https://gateway.marvel.com:443/v1/public/comics?orderBy=title&apikey=8bc86d7d5d3e35ead39c6b0a737d1d56&hash=${hash}&ts=${timestamp}&titleStartsWith=${searchTerm}`
                );
                const result = await response.json();
                setData(result);
            }
        };

        fetchData();
    }, [hash, timestamp, searchTerm]);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Display comics data on web page with search box
    return (
        <div>
            <PageStyle>
            <h1>Search Marvel Comics</h1>
            <StyledInput
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Comic"
            />
            {data && data.data && data.data.results && (
                <div>
                    <h1>Results:</h1>
                    {data.data.results.map((comic, index) => (
                        <div key={index}>
                            <ComicContainer>
                            <H3Style><NavLink to={`/comics/${comic.id}`}>{comic.title}</NavLink></H3Style>
                            <img
                                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                alt={`${comic.title} Image`}
                            />
                            </ComicContainer>
                        </div>
                    ))}
                </div>
            )}
            </PageStyle>
        </div>
    );
}