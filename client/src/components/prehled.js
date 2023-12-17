// components/List.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ShoppingListOverview from './ShoppingListOverview';

const List = ({ selectedName, darkMode }) => {
  const [seznamy, setSeznamy] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/lists');
        if (!response.ok) {
          throw new Error('Chyba při načítání seznamů');
        }

        const data = await response.json();
        setSeznamy(data.lists);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedName]);

  return (
    <Wrapper>
      {error && <p>{error}</p>}
      {loading && <p>Načítám seznamy...</p>}
      {!loading && (
        <>
          <ShoppingListOverview seznamy={seznamy} />
          {/* Zde můžete přidat další části komponenty nebo logiku */}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* Styly podle vašich potřeb */
`;

export default List;
