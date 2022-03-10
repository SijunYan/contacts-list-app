import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { Context } from "../store/context";

const Container = styled.div`
  width: 100%;
  display: flex;
`;
const Input = styled.input`
  flex: 3;
  font-size: 20px;
  padding-left: 10px;
`;
const Button = styled.button`
  flex: 1;
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
`;

const SearchBar = () => {
  const [searchKeyWord, setSearchKeyWord] = useState();
  const { state, dispatch } = useContext(Context);
  const inputRef = useRef();

  const handleAll = () => {
    dispatch({ type: "SHOW_DATA", payload: state.allData });
  };

  const handleSearch = async () => {
    console.log(searchKeyWord);

    // ** search in the local state
    const result =
      searchKeyWord && searchKeyWord.length > 0
        ? state.allData.filter((item) =>
            item.name.toLowerCase().includes(searchKeyWord.trim().toLowerCase())
          )
        : state.allData;
    console.log(result);
    if (result.length < 1) {
      alert("this contact not exist!");
      setSearchKeyWord("");
      inputRef.current.value = "";
      return;
    }
    dispatch({ type: "SHOW_DATA", payload: result });

    // ** search request
    // try {
    //   const response = await fetch(
    //     `http://localhost:5000/search?search=${searchKeyWord}`
    //   );
    //   if (!response.ok) throw new Error("sending data fails");
    //   const searchData = await response.json();
    //   console.log(searchData);
    //   dispatch({ type: "DELETE_DATA", payload: id });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <Container>
      <Button onClick={handleAll}>
        All <span style={{ fontSize: 10 }}>({state.showData?.length})</span>
      </Button>
      <Input
        placeholder="Enter Name"
        onChange={(e) => setSearchKeyWord(e.target.value)}
        ref={inputRef}
      />
      <Button onClick={handleSearch}>SEARCH</Button>
    </Container>
  );
};

export default SearchBar;
