// components/ShoppingListOverview.js
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const ShoppingListOverview = ({ seznamy }) => {
  const { t } = useTranslation();
  return (
    <OverviewContainer>
      <h2>{t('ShopListOverview')}</h2>
      {seznamy.map((seznam) => (
        <ListCard key={seznam._id}>
          <h3>{seznam.name}</h3>
          <p>{t('NumberItems')} {seznam.items.length}</p>
        </ListCard>
      ))}
    </OverviewContainer>
  );
};

const OverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  width: 300px;
  text-align: center;
`;

export default ShoppingListOverview;
