import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
`;

const Cell = styled.span`
  flex: 0 0 ${({ width = '30px' }) => width};
  display: flex;
  padding: 10px;
`;

const HeaderRow = styled(Row)`
  background-color: rgba(30, 46, 116, 1);
  color: #fbfbfb;
`;

const HeaderCell = styled(Cell)``;

const Table = styled.div`
  border: 2px solid rgba(30, 66, 96, 0.8);

  ${Row}:nth-child(even) {
    background-color: rgba(150, 198, 255, 0.5);
  }
`;

const TableBody = styled.div`
  max-height: 350px;
  overflow: scroll;
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

const Placeholder = styled.div`
  width: 100px;
  background-color: rgba(200, 200, 200, 1);
  display: inline-block;
  ::before {
    content: '\00a0';
  }
`;

export default class extends Component {
  constructor() {
    super();
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
    this.props.onInit();
  }

  handleScroll(e) {
    const { isFetching, fetchMore } = this.props;
    const scrollBottom = e.target.scrollTop + e.target.offsetHeight;
    const scrollBottomOffset = e.target.scrollHeight - scrollBottom;
    if (scrollBottomOffset <= 25 && !isFetching) {
      fetchMore();
    }
  }

  render() {
    const { pokemon } = this.props;
    return (
      <Table onScroll={this.handleScroll}>
        <HeaderRow>
          <HeaderCell>ID</HeaderCell>
          <HeaderCell width={'120px'}>Name</HeaderCell>
          <HeaderCell width={'120px'}>Type</HeaderCell>
          <HeaderCell width={'80px'}>Height</HeaderCell>
          <HeaderCell width={'80px'}>Weight</HeaderCell>
        </HeaderRow>
        <TableBody>
          {pokemon.map(p => (
            <Row>
              {p === 'LOADING' ? (
                <Cell>
                  <Placeholder />
                </Cell>
              ) : (
                <Fragment>
                  <Cell>{p.national_id}</Cell>
                  <Cell width={'120px'}>{p.name}</Cell>
                  <Cell width={'120px'}>
                    {p.types.map(t => <TypeCell>{t.name}</TypeCell>)}
                  </Cell>
                  <Cell width={'80px'}>{p.height / 10}m</Cell>
                  <Cell width={'80px'}>{p.weight / 10}kg</Cell>
                </Fragment>
              )}
            </Row>
          ))}
        </TableBody>
      </Table>
    );
  }
}
