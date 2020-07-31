import Router, { useRouter } from 'next/router';
import React from 'react';
import { SearchFilter, SearchTabCategory, SearchProducts } from 'features/Search';
import { Meta, MobileBottomMenu, SearchBar } from 'shared';

const Search: React.FC = () => {
  const { query, pathname } = useRouter();
  let { category, sort } = query;
  category = (category as string) || '';
  sort = (sort as string) || '';

  const handleTabChange = (selected: string) => {
    Router.push({ pathname, query: { ...query, category: selected } });
  };

  const handleFilterChange = (selected: string) => {
    Router.push({ pathname, query: { ...query, sort: selected } });
  };

  const handleSearchSubmit = (searchText: string) => {
    Router.push(`/search?keyword=${searchText}`);
  };

  return (
    <>
      <Meta title="Search" />
      <div className="container">
        <div className="search-bar-container">
          <SearchBar onSubmit={handleSearchSubmit} style={{ width: '100%' }} isFocus />
        </div>
        <div className="sort-container">
          <SearchTabCategory active={category} onChangeTab={handleTabChange} />
          <SearchFilter handleChange={handleFilterChange} active={sort} />
        </div>

        <SearchProducts />
        <MobileBottomMenu />
      </div>
      <style jsx>{`
        .container {
          max-width: 120rem;
          margin: 0 auto;
        }

        .search-bar-container {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: sticky;
          top: 8rem;
          z-index: 9;
          background-color: #fff;
        }

        .sort-container {
          margin: 0 0 2rem 0;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.03);
          padding: 1rem;
          border-radius: 4px;
        }

        @media only screen and (min-width: 1024px) {
          .sort-container {
            justify-content: space-between;
          }

          .search-bar-container {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default Search;
