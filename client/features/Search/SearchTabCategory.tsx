import React from 'react';

interface Props {
  active: string;
  onChangeTab(active: string): void;
}

export const SearchTabCategory: React.FC<Props> = ({ active, onChangeTab }) => {
  return (
    <>
      <div className="tab">
        <button
          type="button"
          className={`list ${active === 'men' ? 'active' : ''}`}
          onClick={() => onChangeTab('men')}
        >
          Men
        </button>
        <button
          type="button"
          className={`list ${active === 'women' ? 'active' : ''}`}
          onClick={() => onChangeTab('women')}
        >
          Women
        </button>
      </div>
      <style>
        {`

        .tab {
            display: flex;
            align-items: center;
        }

        .tab .list {
            padding: 1rem 5rem;
            text-align: center;
            font-size: 2.2rem;
            border-bottom: 2px solid transparent;
            cursor: pointer;
            background: #fff;
            border-radius: 6px;
            margin: 1rem 1rem 1rem 0;
        }

        .tab .active {
            background: var(--color-primary); 
            color: #fff;
            font-weight: 600;
        }
            
            `}
      </style>
    </>
  );
};
