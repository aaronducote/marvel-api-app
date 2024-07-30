import { NavLink, Outlet } from 'react-router-dom'
import styled from '@emotion/styled'

// Styling for whole page
const StyledRoot = styled.div`
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction:column;
  min-height: 100vh;
  color: #cb3032;
  font-family: 'Fredericka the Great', cursive;
`;

// Header
const StyledHeader = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
`;

// Styling for navigation button
const NavButton = styled.button`
  height: 200px;
  width:24vw;
  background-color:#cb3032;
  border-color:#f9c06b;
  border-width:8px;
  align-items: center;
  justify-content: center;
  a {
    text-decoration: none;
    font-family: 'Fredericka the Great', cursive;
    font-weight: bold;
    font-size: 40px;
    transition: color 0.3s ease-in-out;
    color: black;
    &:hover {
      color: #f9c06b;
    }
  }
`;

// Styling for entire navigation bar
const Navbar = styled.nav`
  align-items: center;
  justify-content: center;
  display: flex;
  min-width: 98vw;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

// Shows the navigation bar of each feature and a description of the application
export default function Root() {
    return ( 
        <StyledRoot>
            <Navbar>
                <NavButton>
                    <NavLink to="/characters">Characters</NavLink>
                </NavButton>
                <NavButton>
                    <NavLink to="/comics">Comics</NavLink>
                </NavButton>
                <NavButton>
                    <NavLink to="/events">Events</NavLink>
                </NavButton>
                <NavButton>
                    <NavLink to="/series">Series</NavLink>
                </NavButton>
            </Navbar>
            <StyledHeader>Welcome to Aaron's Marvel API Web Application.
                With this App, you can find information on comics, characters, creators, events, series, and stories. All
                information provided from this application is from the Marvel Comics API.
            </StyledHeader>
      <main>
        <Outlet />
      </main>
    </StyledRoot>
  );
}