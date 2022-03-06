import styled from "styled-components";
import { withError } from "./../withError";
import { Page } from "./DashboardOrders";
import useDashboardCategories from "../../hooks/useDashboardCategories";
import SectionTitle from "../SectionTitle";
import DashboardNav from "../DashboardNav";
import {
  TextInput,
  LoadButton,
  OptionList,
  Option,
} from "./CreateNewProductForm";
import { LoaderSpinner } from "./../LoaderSpinner";

const CategoriesPage = styled(Page)`
  background: ${(props) => props.theme.lightYellow};
  padding: 58px 5px;
  max-height: max-content;
  min-width: 100%;
`;

const Input = styled(TextInput)`
background: rgb(0 0 0 / 7%);
      box-shadow: :${(props) => props.theme.inputBoxShadow};
`;
const Wrapper = styled.section`
width:100%:
max-width:1250px;
margin:30px auto;
display:flex;
flex-wrap:wrap;
justify-content:center;
gap:10px;
&> article{
  flex: 1 1 400px;
  width: 100%;
}


`;

const FormCard = styled.article`
  padding: 20px 15px;
  margin-bottom: 20px;
  border-radius: 10px;
  max-width: 400px;
  padding: 20px 15px 40px;
  height: max-content;
  background: #fff;
  box-shadow: ${(props) => props.theme.lightBoxShadow};
  & > h4 {
    margin: 10px 0 24px;
    font-size: 25px;
  }
  & > form h4 {
    margin: 10px 0 24px;
    font-size: 25px;
  }

  & > form select {
    min-width: 95%;
  }
  & > form small {
    position: absolute;
    margin-top: -18px;
    margin-left: 10px;
  }

  & > form buttons {
    transfor: scale(0.8);
    position: absolute;
    margin-top: -18px;
    margin-left: 10px;
  }
  @media screen and (max-width: 450px) {
    & > h4 {
      line-height: 24px;
      font-size: 20px;
    }
    & > form h4 {
      line-height: 24px;
      font-size: 20px;
    }
  }
`;
const DeleteButton = styled.button`
  padding: 11px 25px 12px;
  transition: all 0.5s;
  margin-bottom: 20px;
  cursor: pointer;
  text-transform: uppercase;
  background: ${(props) => props.theme.black};
  border: none;
  box-shadow: ${(props) => props.theme.lightBoxShadow};
  color: white;
  letter-spacing: 1px;
  font-size: 15px;
  font-family: "Oswald", sans-serif;
  border-radius: 4px;
  &:hover {
    background: ${(props) => props.theme.orange};
  }
`;
function DashboardCategories() {
  const {
    handleRenameSubmit,
    handleCreateSubmit,
    handleDelete,
    handleCategorySelect,
    isDeleteFormLoading,
    isRenameFormLoading,
    isCreateFormLoading,
    categories,
  } = useDashboardCategories();

  return (
    <CategoriesPage>
      <DashboardNav />
      <SectionTitle light>Categorías</SectionTitle>

      <Wrapper>
        <FormCard>
          <h4>Elimeinar categoría</h4>

          <form name="editCategory" onSubmit={handleRenameSubmit}>
            <OptionList
              name="category"
              onChange={(e) => handleCategorySelect(e)}
            >
              {categories?.map((cat) => (
                <Option key={cat?._id} value={cat._id}>
                  {cat?.name}
                </Option>
              ))}
            </OptionList>

            <DeleteButton onClick={handleDelete}>Eliminar</DeleteButton>
            {isDeleteFormLoading && <LoaderSpinner small />}
            <hr></hr>

            <h4>Remombrar categoría</h4>

            <Input placeholder={"Renombrar Categoría"} name="categoryNewName" />
            {isRenameFormLoading && <LoaderSpinner small />}
            <LoadButton as="input" type="submit" value="Editar" />
          </form>
        </FormCard>

        <FormCard>
          <h4>Crear una nueva categoría</h4>

          <form name="createCategory" onSubmit={handleCreateSubmit}>
            <Input placeholder="Nueva categoría..." name="newCategory" />

            {isCreateFormLoading && <LoaderSpinner small />}

            <LoadButton as="input" type="submit" value="Cargar" />
          </form>
        </FormCard>
      </Wrapper>
    </CategoriesPage>
  );
}
export default withError(DashboardCategories);
