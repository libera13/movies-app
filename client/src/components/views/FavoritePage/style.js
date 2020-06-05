import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledTable = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
`;

export const StyledTd = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

export const StyledTh = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

export const StyledA = styled.a`
  color: rgb(92, 92, 92);
  text-decoration: none; /* no underline */
`;
//
// const StyledTr = styled.tr:nth-child(even)`
//     background-color: #dddddd;
// `
