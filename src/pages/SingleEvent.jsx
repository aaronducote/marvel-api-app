import { useState, useEffect } from 'react'
import { useParams, useSearchParams, NavLink } from 'react-router-dom'
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

const H2Style = styled.h2`
    font-size: 40px;
    font-family: 'Fredericka the Great', cursive;

  a {
    color: #cb3032;
    text-decoration: none; 
    
    &:hover {
      color: #f9c06b; 
    }
  }
`;

// Allows a user to view for a single event
export default function SingleEvent() {
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
                    `https://gateway.marvel.com:443/v1/public/events/${id}?apikey=8bc86d7d5d3e35ead39c6b0a737d1d56&hash=${hash}&ts=${timestamp}`
                );
                const result = await response.json();
                console.log(result);
                setData(result);
            }
        };

        fetchData();
    }, [hash, timestamp, id]);

    // Display an event's data
    return (
        <div>
            <PageStyle>
            {data && data.data && data.data.results && (
                <div>
                    {data.data.results.map((event, index) => (
                        <div key={index}>
                            <H3Style><NavLink to={`/events/${event.id}`}>{event.title}</NavLink></H3Style>
                            <img
                                src={`${event.thumbnail.path}.${event.thumbnail.extension}`}
                                alt={`${event.title} Image`}
                            />
                            <H2Style>{event.description}</H2Style>
                        </div>
                    ))}
                </div>
            )}
            </PageStyle>
        </div>
    );
}