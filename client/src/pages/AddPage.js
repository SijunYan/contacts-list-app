import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Context } from "../store/context";

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const InputWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const InputElem = styled.div`
  width: 100%;
  margin-bottom: 30px;
  display: flex;
`;
const Input = styled.input`
  flex: 4;
  width: 100%;
  font-size: 20px;
  padding-left: 10px;
`;
const Label = styled.label`
  flex: 1;
  font-size: 20px;
  margin-right: 10px;
`;
const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  margin-top: 20px;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
`;

const AddPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [mobile, setMobile] = useState();
  const [email, setEmail] = useState();
  const { state, dispatch } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validate

    // add request
    try {
      const data = { name, mobile, email };
      const response = await fetch("http://localhost:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("sending data fails");
      const newdata = await response.json();
      dispatch({ type: "ADD_NEW_DATA", payload: newdata });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <InputWrap>
          <InputElem>
            <Label>NAME:</Label>
            <Input onChange={(e) => setName(e.target.value)} />
          </InputElem>
          <InputElem>
            <Label>Mobile:</Label>
            <Input onChange={(e) => setMobile(e.target.value)} />
          </InputElem>
          <InputElem>
            <Label>Email:</Label>
            <Input onChange={(e) => setEmail(e.target.value)} />
          </InputElem>
        </InputWrap>

        <ButtonWrap>
          <Button type="submit">ADD</Button>
          <Button onClick={() => navigate("/")}>CANCEL</Button>
        </ButtonWrap>
      </Form>
    </Container>
  );
};

export default AddPage;
