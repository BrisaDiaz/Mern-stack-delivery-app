import styled from "styled-components";
import useDashboardProducts from "../../hooks/useDashboardProducts";
import ProductsSectionSkeleton from "../ProductsSectionSkeleton";
import { Fragment } from "react";
import SearchBar from "../MenuSearchBar";
import { LoaderSpinner } from "./../LoaderSpinner";
import { NotFoundMessage, ProductsSection } from "../menu/ProductsSection";
import DashboardNav from "../DashboardNav";
import FilterProductsStateOptions from "../FilterProductsStateOptions";
import FilterCategoryOptions from "../FilterCategoryOptions";
import SectionTitle from "../SectionTitle";
import Item from "../menu/MenuItem";
import { CartButton, CartIcon } from "../AddToCartButton";
import PaginationButtons from "../PaginationButtons";
import editIcon from "../../img/pencil-alt-solid.svg";
import DeleteIcon from "../../img/trash-alt-regular.svg";
import { withError } from "./../withError";

const StyledSection = styled.section`
  min-height: 100vh;
  width: 100vw;
  padding: 58px 0;
  &:before {
    display: ${(props) => (props.isLoading ? "block" : "none")};
    position: absolute;
    content: " ";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ffffff57;
    z-index: 400;
  }
  & > ${LoaderSpinner} {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 500;
    margin: -60px 0 0 -60px;
  }
`;
export const FiltersBoard = styled.div`
  margin: 30px 15px 0;
  display: flex;
  width: fit-content;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  & > select {
    margin: 0 10px 10px 0;
  }
`;
const EditButton = styled(CartButton)`
  height: 50px;
  background: #3f51b5;
  transform: scale(0.7);
`;
const DeleteOfDatabaseButton = styled(EditButton)`
  margin: 0;
  background: #e83c2e;
  margin-top: -50px;
  background: #e83c2e;
  margin-top: -50px;
  margin-left: auto;
  margin-right: 50px;
`;
const Icon = styled(CartIcon)`
  transform: scale(1.2);
`;

const StyledProductsSection = styled(ProductsSection)`
  margin: 20px auto;
`;

function DashboardProducts() {
  let {
    populatedCategories,
    isLoading,
    page,
    maxPage,
    products,
    setCategory,
    setTitle,
    handleEdit,
    handleDelete,
    setPage,
    setActiveProducts,
    isFirstRender,
    sorting,
    category,
    activeProducts,
    title,
  } = useDashboardProducts();

  return (
    <StyledSection>
      <DashboardNav />
      <SectionTitle>mis productos</SectionTitle>

      <SearchBar defaultValue={title} setSearch={setTitle} />
      <FiltersBoard>
        <FilterCategoryOptions
          defaultValue={category}
          categories={populatedCategories}
          setCategoryPreferece={setCategory}
        />

        <FilterProductsStateOptions
          defaultValue={activeProducts}
          setStatePreferece={setActiveProducts}
        />
      </FiltersBoard>

      {isLoading && <LoaderSpinner />}

      {isLoading && isFirstRender ? <ProductsSectionSkeleton /> : null}

      {!isLoading && products?.length === 0 ? (
        <NotFoundMessage>
          No se han encontrado coincidencias, intenta de nuevo!!
        </NotFoundMessage>
      ) : (
        <StyledProductsSection isLoading={isLoading}>
          {products?.map((product) => (
            <Fragment key={product._id + "abc"}>
              <Item key={product._id} item={product}>
                <Fragment>
                  <EditButton onClick={() => handleEdit(product)}>
                    <Icon src={editIcon} alt="edit" />
                  </EditButton>
                  <DeleteOfDatabaseButton
                    onClick={() => handleDelete(product._id)}
                  >
                    <Icon src={DeleteIcon} alt="delete" />
                  </DeleteOfDatabaseButton>
                </Fragment>
              </Item>
            </Fragment>
          ))}
        </StyledProductsSection>
      )}
      <PaginationButtons setPage={setPage} page={page} maxPage={maxPage} />
    </StyledSection>
  );
}

export default withError(DashboardProducts);
