import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ListPage from "./pages/ListPage";
import AddPage from "./pages/AddPage";
import styled from "styled-components";
import { ContextProvider } from "./store/context";

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 50%;
  height: 60%;
  background-color: #f4f4f4;
  padding: 10px;
  @media screen and (max-width: 800px) {
    width: 100%;
    height: 100%;
  }
`;
function App() {
  return (
    <Wrap>
      <Container>
        <ContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ListPage />} />
              <Route path="/add" element={<AddPage />} />
            </Routes>
          </BrowserRouter>
        </ContextProvider>
      </Container>
    </Wrap>
  );
}

export default App;
