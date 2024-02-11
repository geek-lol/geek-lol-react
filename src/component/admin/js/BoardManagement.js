import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {EnhancedTableHead, EnhancedTableToolbar, getComparator, stableSort} from "../../../utils/create-table-header";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import {formatDate} from "../../../utils/format-date";
import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {FormControl, InputLabel, NativeSelect} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import {BOARD_URL} from "../../../config/host-config";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

//테이블 헤더
const headCells = [
    {
        id: 'bnos',
        numeric: true,
        disablePadding: false,
        label: '글번호',
    },
    {
        id: 'titles',
        numeric: false,
        disablePadding: false,
        label: '제목',
    },
    {
        id: 'poster',
        numeric: false,
        disablePadding: false,
        label: '글쓴이',
    },
    {
        id: 'dates',
        numeric: true,
        disablePadding: false,
        label: '게시물 등록일자',
    },
    {
        id: 'views',
        numeric: true,
        disablePadding: false,
        label: '게시물 신고횟수',
    },
    {
        id: 'recommends',
        numeric: true,
        disablePadding: false,
        label: '좋아요',
    },
];


const BoardManagement = () => {
    const [boardList,setBoardList] = useState([{
        bulletinId: null,
        title:null,
        viewCount:null,
        posterName:null,
        localDateTime:null,
        upCount:null
    }]);

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        fetch(`${BOARD_URL}?page=${page}`, {
            method: 'GET',
            headers: {'content-type': 'application/json'},
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
            })
            .then(json => {
                if (!json) return;
                setBoardList(json.board);
            });
    }, [page]);

//모달
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // 체크박스 전체 클릭
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = boardList.map((n) => n.bulletinId);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // 테이블 데이터 갯수로 줄 계산
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 1 ? Math.max(0, (1 + page) * rowsPerPage - boardList.length) : 0;
    const visibleRows = React.useMemo(
        () =>
            stableSort(boardList, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [boardList,order, orderBy, page, rowsPerPage],
    );
    return (
        <div>
            <Box sx={{ width: '65%' , mx:'auto' , mt:10}}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length}  title={"자유게시판"}/>
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={boardList.length}
                                headCells={headCells}
                            />
                            <TableBody>
                                {boardList.map((row, index) => {
                                    const isItemSelected = isSelected(row.bulletinId);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover

                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.bulletinId}
                                            selected={isItemSelected}
                                            sx={{ cursor: 'pointer', '&:last-child td, &:last-child th': { border: 0 } }}

                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    onClick={(event) => handleClick(event, row.bulletinId)}
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>

                                            <TableCell align="left">{row.bulletinId}</TableCell>
                                            <TableCell align="left">{row.title}</TableCell>
                                            <TableCell align="left">{row.posterName}</TableCell>
                                            <TableCell align="left">{formatDate(row.localDateTime,'day')}</TableCell>
                                            <TableCell align="left">{row.viewCount}</TableCell>
                                            <TableCell align="left">{row.upCount}</TableCell>
                                            <TableCell align="left">
                                                {row.role}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                                <TableRow
                                    style={{
                                        height:20,
                                    }}
                                >
                                    <TableCell colSpan={6}>
                                        <KeyboardArrowLeftIcon fontSize={"small"}/>
                                        <KeyboardArrowRightIcon fontSize={"small"}/>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
            <React.Fragment>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"권한을 변경하시겠습니까?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <FormControl fullWidth>
                                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                    권한
                                </InputLabel>
                                <NativeSelect defaultValue={2}>
                                    <option value={1}>ADMIN</option>
                                    <option value={2}>COMMON</option>
                                </NativeSelect>
                            </FormControl>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancle</Button>
                        <Button onClick={handleClose}>Ok</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </div>
    );
};

export default BoardManagement;