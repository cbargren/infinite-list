import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
`;

const Cell = styled.span`
  flex: 0 0 ${({ width = '30px' }) => width};
  display: flex;
  padding: 5px;
`;

const HeaderRow = styled(Row)`
  background-color: rgba(30, 46, 116, 1);
  color: #fbfbfb;
`;

const HeaderCell = styled(Cell)``;

const Table = styled.div`
  max-height: 350px;
  overflow: scroll;
  border: 2px solid rgba(30, 66, 96, 0.8);

  ${Row}:nth-child(even) {
    background-color: rgba(150, 198, 255, 0.5);
  }
`;

const TypeCell = styled.span`
  flex-shrink: 1;
  ::before {
    content: '/';
  }
  &:first-child {
    ::before {
      content: '';
    }
  }
`;

export default class extends Component {
  componentDidMount() {
    this.props.onInit();
  }

  render() {
    const { pokemon } = this.props;
    return (
      <Table>
        <HeaderRow>
          <HeaderCell>ID</HeaderCell>
          <HeaderCell width={'120px'}>Name</HeaderCell>
          <HeaderCell width={'120px'}>Type</HeaderCell>
        </HeaderRow>
        {pokemon.map(p => (
          <Row>
            {p === 'LOADING' ? (
              '...'
            ) : (
              <Fragment>
                <Cell>{p.national_id}</Cell>
                <Cell width={'120px'}>{p.name}</Cell>
                <Cell width={'120px'}>
                  {p.types.map(t => <TypeCell>{t.name}</TypeCell>)}
                </Cell>
              </Fragment>
            )}
          </Row>
        ))}
      </Table>
    );
  }
}
