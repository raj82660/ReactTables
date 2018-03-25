import PropTypes from 'prop-types';
import React from 'react';
import { tableHeader, icon, thStyle, tdStyle, tableRow, ascend } from '../styles/filterableTable.scss';

class TableComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], coloumn: [], sort: { sortColoumn: '', sortType: '' } };
    }

    componentWillReceiveProps(nextProps) {
        const { data, coloumn} = nextProps;
        let sortColoumn;
        let sortType;
        coloumn.map((d) => {
            if ('sort' in d) {
                sortType = d.sort;
                sortColoumn = d.mapper;
            }
        });
        this.setState({data, coloumn, sort: { sortColoumn, sortType } });
    }

    renderRows = (data) => {
        const { coloumn } = this.state;
        return data.map((d, i) => {
            return (
              <tr key={i} className={tableRow}>
                  { coloumn.map((col, index) => {
                      return (
                          <td key={index} className={tdStyle}>{d[col.mapper]}</td>
                      );
                  })}
              </tr>
            );
        });
    }

    sort = (sortType, onColoumn) => {
        const { data } = this.state;
        const dataCopy = Object.assign([], data);
        dataCopy.sort(function(a, b) {
            const x = a[onColoumn];
            const y = b[onColoumn];
            if (sortType === 'desc') {
                if (x > y) {return -1;}
                if (x < y) {return 1;}
            } else {
                if (x < y) {return -1;}
                if (x > y) {return 1;}
            }
            return 0;
        });
        return dataCopy;
    }

    handleSort = (mapper) => {
        const { sort } = this.state;
        let sortColoumn = sort.sortColoumn;
        let sortType = sort.sortType;
        if (sort.sortColoumn === mapper) {
            sortType = sortType === 'asc' ? 'desc' : 'asc';
        } else {
            sortColoumn = mapper;
            sortType = 'asc';
        }
        this.setState({ data: this.sort(sortType, mapper), sort: { sortType, sortColoumn } });
    }

    renderTableHeader = () => {
        const { coloumn, sort } = this.state;
        return (
          <tr className={tableHeader}>
            {
              coloumn.map((d, i) => {
                  return (
                    <th key={i} className={thStyle} onClick={() => this.handleSort(d.mapper) }>
                      {d.title}
                      { (sort.sortColoumn && sort.sortColoumn === d.mapper) &&
                        <svg  className={`${icon} ${sort.sortType === 'asc' ? ascend : ''}`}focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path>
                        </svg>
                      }
                    </th>
                  );
              })
            }
          </tr>
        );
    }

    render() {
        const { data } = this.state;
        return (
          <div>
              <table>
                <thead>
                  {this.renderTableHeader()}
                </thead>
                <tbody>
                  {this.renderRows(data)}
                </tbody>
              </table>
          </div>
        );
    }
}

TableComponent.propTypes = {
    data: PropTypes.array
};

export default TableComponent;
