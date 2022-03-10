import React, { useContext } from "react";
import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import { Context } from "../store/context";

const Li = styled.li`
  width: 80%;

  line-height: 30px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 5px 5px 15px 5px #ababab;
`;
const NameRow = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
const Icon = styled.div`
  cursor: pointer;
`;
const DetailRow = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const Info = styled.div`
  font-size: 16px;
`;

const ContactList = ({ item }) => {
  const { state, dispatch } = useContext(Context);
  const handleDelete = async (id) => {
    console.log(id);

    // ** delete request
    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("sending data fails");
      const message = await response.json();
      console.log(message);
      const newDataCollection = state.allData.filter((item) => item.id !== id);
      dispatch({ type: "DELETE_DATA", payload: newDataCollection });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Li>
      <NameRow>
        <Name>{item.name}</Name>
        <Icon onClick={() => handleDelete(item.id)}>
          <CgClose />
        </Icon>
      </NameRow>

      <DetailRow>
        <Info>
          Mobile: <i>{item.mobile}</i>
        </Info>
        <Info>
          Email: <i>{item.email}</i>
        </Info>
      </DetailRow>
    </Li>
  );
};

export default ContactList;
