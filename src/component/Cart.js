import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import styled from 'styled-components'
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Layout from './Layout';
import { getCart, removeItem } from './cartHelpers';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { color } from '@mui/system';
import { grey, pink } from '@mui/material/colors';

// import HUE from '@material-ui/core/colors/HUE';

// const  = red[100];


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'photo',
        numeric: false,
        disablePadding: true,
        label: '商品圖片',
    },
    {
        id: 'name',
        numeric: true,
        disablePadding: false,
        label: '商品名稱',
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: '商品價格',
    },
    {
        id: 'num',
        numeric: true,
        disablePadding: false,
        label: '購買數量',
    },
    {
        id: 'spec',
        numeric: true,
        disablePadding: false,
        label: '商品規格',
    },

];



function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        // color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                        sx={{
                            '&.Mui-checked': {
                                color: pink[100],
                            },
                            '&.MuiCheckbox-indeterminate': {
                                color: pink[100],
                            },
                            '&:hover': {
                                backgroundColor: grey[100],
                            }
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
    const { numSelected, selectedArr, cartFetch, setSelected, setTotal } = props;

    const handleDelete = () => {
        selectedArr.forEach(item => {
            removeItem(item.id)
        })
        cartFetch()
        setSelected([])
        setTotal(0)
    }
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: grey[100]
                    // (theme) =>
                    // alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),      
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} 項已選擇
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    商品
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon onClick={handleDelete} />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const Element = ({ setItemCount }) => {
    const [redirect, setRedirect] = useState(false)
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [selectedArr, setSelectedArr] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const history = useHistory();
    const [spec, setSpec] = useState({})

    const [products, setProducts] = useState([])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = products.map((n) => n.name);
            setSelected(newSelecteds);
            setSelectedArr(products);
            let num = 0
            products.forEach(item => {
                num = parseInt(num) + parseInt(item.num * item.price)
            })
            setTotal(num)
            return;
        }
        setSelected([]);
    };

    const handleClick = (row, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        let newSelectedArr = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
            newSelectedArr = newSelectedArr.concat(selectedArr, row)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
            newSelectedArr = newSelectedArr.concat(selectedArr.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
            newSelectedArr = newSelectedArr.concat(selectedArr.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
            newSelectedArr = newSelectedArr.concat(
                selectedArr.slice(0, selectedIndex),
                selectedArr.slice(selectedIndex + 1),
            )

        }
        let num = 0
        newSelectedArr.forEach(item => {
            num = parseInt(num) + parseInt(item.num * item.price)

        })
        setSelected(newSelected);
        setSelectedArr(newSelectedArr);
        setTotal(num)
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleCheckout = () => {
        if (selectedArr.length > 0) {
            history.push({
                pathname: "/checkout",
                state: {
                    selectedArr: selectedArr,
                    total: total
                }
            })
        } else {
            alert("沒有選擇商品")
        }
    }

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const cartFetch = () => {
        setProducts(getCart())
        setItemCount(getCart().length)
    }

    useEffect(() => {
        setProducts(getCart())
    }, [])

    // Avoid a layout jump when reaching the last page with empty rows.
    // const emptyRows =
    //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <ThemeProvider theme={theme}>
            <div>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"><ShoppingCartIcon />購物車</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <Box sx={{ width: '100%' }}>
                                    <Paper sx={{ width: '100%', mb: 2 }}>
                                        <EnhancedTableToolbar numSelected={selected.length} selectedArr={selectedArr} setTotal={setTotal} cartFetch={cartFetch} setSelected={setSelected} />
                                        <TableContainer sx={{ maxHeight: 300 }}>
                                            <Table
                                                sx={{ minWidth: 750 }}
                                                // aria-labelledby="tableTitle"
                                                size="medium"
                                                stickyHeader
                                                aria-label="sticky table"
                                            >
                                                <EnhancedTableHead
                                                    numSelected={selected.length}
                                                    order={order}
                                                    orderBy={orderBy}
                                                    onSelectAllClick={handleSelectAllClick}
                                                    onRequestSort={handleRequestSort}
                                                    rowCount={products.length}
                                                />
                                                <TableBody>
                                                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                                                    {stableSort(products, getComparator(order, orderBy))
                                                        .map((row, index) => {
                                                            const isItemSelected = isSelected(row.name);
                                                            const labelId = `enhanced-table-checkbox-${index}`;

                                                            return (
                                                                <TableRow
                                                                    hover
                                                                    onClick={() => handleClick(row, row.name || "")}
                                                                    role="checkbox"
                                                                    aria-checked={isItemSelected}
                                                                    tabIndex={-1}
                                                                    key={row.name}
                                                                    selected={isItemSelected}
                                                                    sx={{
                                                                        '&.Mui-selected': {
                                                                            backgroundColor: grey[100],
                                                                        },
                                                                        '&.Mui-selected:hover': {
                                                                            backgroundColor: grey[200],
                                                                        }
                                                                    }}
                                                                >
                                                                    <TableCell padding="checkbox">
                                                                        <Checkbox
                                                                            // color="primary"
                                                                            checked={isItemSelected}
                                                                            inputProps={{
                                                                                'aria-labelledby': labelId,
                                                                            }}
                                                                            sx={{
                                                                                '&.Mui-checked': {
                                                                                    color: pink[100],
                                                                                },
                                                                                '&:hover': {
                                                                                    backgroundColor: grey[50],
                                                                                }
                                                                            }}
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell
                                                                        component="th"
                                                                        id={labelId}
                                                                        scope="row"
                                                                        padding="none"
                                                                    >
                                                                        <img src={row.cover} width={90} />
                                                                    </TableCell>
                                                                    <TableCell align="right">{row.name || ""}</TableCell>
                                                                    <TableCell align="right">{row.price || ""}</TableCell>
                                                                    <TableCell align="right">{row.num}</TableCell>
                                                                    <TableCell align="right">{row.spec || ""}</TableCell>
                                                                </TableRow>
                                                            );
                                                        })}
                                                    {/* {emptyRows > 0 && (
                                                    <TableRow
                                                        style={{
                                                            height: (53) * emptyRows,
                                                        }}
                                                    >
                                                        <TableCell colSpan={6} />
                                                    </TableRow>
                                                )} */}

                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <br />
                                        <Typography variant="h6" gutterBottom component="div" marginLeft={100}>
                                            總金額 : {total} 台幣
                                        </Typography>
                                    </Paper>
                                </Box>
                                {/* <table className="table table-hover table-responsive" id="' + idCartTable + '">
                                {products && products.map(item => (
                                    <tr title="' + this.summary + '" data-id="' + this.id + '" data-price="' + this.price + '">
                                        <td>{item.name}</td>
                                        <td title="Unit Price" className="text-right">${item.price}</td>
                                        <td title="Quantity">{item.stock}</td>
                                        <td title="Total" className="text-right ' + classNameProductTotal + '">{item.price * item.stock}</td>
                                        <td title="Remove from Cart" className="text-center" style={{ width: "30px" }}><a href="" className="btn btn-danger" style={{ backgroundColor: "#dc3545", padding: ".375rem .75rem" }}>X</a></td>
                                    </tr>
                                ))}
                                <tr>
                                    <td></td>
                                    <td><strong>總金額</strong></td>
                                    <td></td>
                                    <td></td>
                                    <td className="text-right"><strong id="' + idGrandTotal + '"></strong></td>
                                    <td></td>
                                </tr>
                            </table> */}
                            </div>
                            <div className="modal-footer">
                                {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">X</button> */}
                                <button type="button" className="btn pink-btn" data-bs-dismiss="modal" onClick={handleCheckout}>結帳</button>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </ThemeProvider>
    )
}
const Cart = styled(Element)`
.pink-btn{
    background-color:#f7bacf;
    color:#ffffff;
}
`
export default Cart;