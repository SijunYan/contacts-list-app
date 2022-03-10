import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import ContactList from "../components/ContactList";
import { Context } from "../store/context";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Top = styled.div``;
const Middle = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Bottom = styled.div``;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
`;

const ListPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(Context);
  const [sortedData, setSortedData] = useState();

  // **  get data request
  useEffect(() => {
    const getContactlist = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/");
        if (!response.ok) throw new Error("fetching data fails");
        const data = await response.json();
        dispatch({ type: "INIT_DATA", payload: data });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getContactlist();
  }, []);

  // ** sort data
  useEffect(() => {
    const sortAlphaNum = (a, b) =>
      a.name.localeCompare(b.name, "en", { numeric: true });
    setSortedData(state.showData.sort(sortAlphaNum));
  }, [state.showData]);

  return (
    <Container>
      <Top>
        <SearchBar />
      </Top>
      <Middle>
        {isLoading
          ? "Loading..."
          : sortedData &&
            sortedData?.map((item) => (
              <ContactList item={item} key={item.id}></ContactList>
            ))}
      </Middle>
      <Bottom>
        <Button onClick={() => navigate("/add")}>ADD NEW CONTACT</Button>
      </Bottom>
    </Container>
  );
};

export default ListPage;
