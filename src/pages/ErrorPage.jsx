import { NavLink, Outlet } from 'react-router-dom'
import styled from '@emotion/styled'


const StyledRoot = styled.div`
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction:column;
  min-height: 100vh;
`;

// Makes you return to the homepage with a link for page that does not exist
export default function Root() {
    return(  
    <StyledRoot> 
      <h1>ERROR: This page does not exist. <NavLink to="/">Click Here</NavLink> to return.</h1> 
      <main>
        <Outlet />
      </main>
    </StyledRoot>
  );
}