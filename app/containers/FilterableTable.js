import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../actions';
import ProductTable from '../components/ProductTable';
import { filterableTable } from '../styles/filterableTable.scss';

class Table extends React.Component {

    componentWillMount() {
        const { fetchTableData } = this.props;
        fetchTableData();
    }

    render() {
        const { data } = this.props;
        /*
          coloumn mapper to make table header generic
        */
        const coloumnMapper = [
          { title: 'User Id', mapper: 'userId', sort: 'asc' },
          { title: 'Title', mapper: 'title' },
          { title: 'Description', mapper: 'body' },
        ];
        return (
            <div className={filterableTable}>
                <ProductTable data={data} coloumn={coloumnMapper} />
            </div>
        );
    }
}

Table.propTypes = {
    data: PropTypes.array,
    fetchTableData: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        data: state.data.tableInfo
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTableData: () => dispatch(fetchData())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Table);
