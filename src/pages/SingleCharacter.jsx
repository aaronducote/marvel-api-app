import { useState, useEffect } from 'react'
import { useParams, useSearchParams, NavLink } from 'react-router-dom'
import styled from '@emotion/styled'
import CryptoJS from 'crypto-js';


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
      color: #975ebd;
    }
  }
`;

const H2Style = styled.h2`
    font-size: 40px;
    font-family: 'Fredericka the Great', cursive;

  a {
    color: #cb3032;
    text-decoration: none; 
    
    &:hover {
      color: #975ebd;
    }
  }
`;

const CharContainer = styled.div`
    background-color: #78d9fb;
    border-radius: 50px;
    border: 6px solid #975ebd;
    bottom-padding: 10px;
    display: flex;
    flex-direction: row;
`

const ImgContainer = styled.div`
    text-align: center;
    padding-left: 2vw;
    width: 40vw;
    padding-right: 10vw;
    
    img {
        width: 25vw;
    }
    border-radius: 50px;
`
const DescContainer = styled.div`
    text-align: center;
    width: 40vw;
    padding-right: 5vw;
    border-radius: 50px;
    height: 50vh;
    padding-top: 5vw;
    padding-bottom: 200px;
`

const ComicsContainer = styled.div`
    width: 100vw;
`

const H4Style = styled.h4`
    font-size: 100px;
    color: #975ebd;
    font-weight: bold;
    font-family: 'Courier New', monospace;
`


// Allows a user to view a single character
export default function SingleCharacter() {
    const { id } = useParams();
    const [hash, setHash] = useState('');
    const [timestamp, setTimestamp] = useState('');
    const [data, setData] = useState(null);

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
            if (hash && timestamp && id) {
                const response = await fetch(
                    `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=8bc86d7d5d3e35ead39c6b0a737d1d56&hash=${hash}&ts=${timestamp}`
                );
                const result = await response.json();
                console.log(result);
                setData(result);
            }
        };

        fetchData();
    }, [hash, timestamp, id]);

    // Display characters data on web page with search box
    return (
        <div>
            <PageStyle>
            {data && data.data && data.data.results && (
                <div>
                    {data.data.results.map((character, index) => (
                        <div key={index}>
                            <CharContainer>
                                <ImgContainer>
                            <H3Style><NavLink to={`/characters/${character.id}`}>{character.name}</NavLink></H3Style>
                            <img
                                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                                alt={`${character.name} Image`}
                                />
                                </ImgContainer>
                                <DescContainer><H2Style>{character.description}</H2Style></DescContainer>
                            </CharContainer>
                            <CharContainer>
                                <ComicsContainer>
                                    <H4Style>Comics</H4Style>
                                    {character.comics.items.map((item, index) => (
                                        <H3Style key={index}>
                                            <NavLink to={`${item.resourceURI.slice(28).replace('/public', '')}`}>
                                                {item.name}
                                            </NavLink>
                                        </H3Style>
                                    ))}
                                </ComicsContainer>
                            </CharContainer>
                        </div>
                    ))}
                </div>
            )}
            </PageStyle>
        </div>
    );
}