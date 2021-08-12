import styled from "styled-components";

const Table = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 20px auto 0;
  background: gray;
  box-shadow: 1px 1px 5px #00000057;
  background: #f3f3f3;
`;
const TableHeader = styled.div`
  width: 100%;
  height: 60px;
  background: #ccc;
  box-shadow: 1px 1px 5px #00000057;
  border-bottom: 1px solid #ccc;
`;
const TableCells = styled.div`
with:100%;
height:50px;
background:white;
margin: 1px 0;
background:#fff;
border-bottom:1px solid #ccc;
box-shadow: 0 1px 3px #ccc;


}
`;

export default function OrdersTableSkeleton() {
  return (
    <Table>
      <TableHeader />
      <TableCells />
      <TableCells />
      <TableCells />
      <TableCells />
      <TableCells />
    </Table>
  );
}
