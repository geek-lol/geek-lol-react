import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

import '../../scss/MyActivityMain.scss'
import {formatDate} from "../../../../utils/format-date";
import {
    EnhancedTableHead,
    EnhancedTableToolbar
} from "../../../../utils/create-table-header";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

//테이블 헤더
const headCells = [
    {
        id: 'bnos',
        numeric: true,
        disablePadding: false,
        label: '번호',
    },
    {
        id: 'titles',
        numeric: true,
        disablePadding: false,
        label: '글제목 ',
    },
    {
        id: 'comments',
        numeric: true,
        disablePadding: false,
        label: '댓글내용 ',
    },
    {
        id: 'dates',
        numeric: true,
        disablePadding: false,
        label: '날짜 ',
    }
];


const MyActivityComment = ({rows}) => {

    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(1);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);



    // 체크박스 전체 클릭
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
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
        page > 1 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const prevPageHandler= ()=>{
        if(page === 1)
            return;
        setPage(page-1)
    }
    const nextPageHandler= ()=>{
        if(totalPage === page)
            return;

        setPage(page+1)
    }


    return (
        <div className={'my-act-wrapper'}>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} title={"내가 쓴 댓글"} />
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                rowCount={rows.length}
                                headCells={headCells}
                                onSelectAllClick={handleSelectAllClick}/>
                            <TableBody>
                                {rows.map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>

                                            <TableCell align="left" sx={{ width: '12%' }}>{row.id}</TableCell>
                                            <TableCell align="left">{row.title}</TableCell>
                                            <TableCell align="left">{row.context}</TableCell>
                                            <TableCell align="left">{formatDate(row.replyDate,"day")}</TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={4} />
                                    </TableRow>
                                )}
                                <TableRow
                                    sx={{height:20}}
                                >
                                    <TableCell colSpan={3}></TableCell>
                                    <TableCell align="right">
                                        {`${page} - ${totalPage}`}
                                    </TableCell>
                                    <TableCell >

                                        <KeyboardArrowLeftIcon color={page === 1 ? 'disabled' : 'default'}
                                                               fontSize={"small"}
                                                               onClick={prevPageHandler}
                                        />
                                        <KeyboardArrowRightIcon color={page === totalPage ? 'disabled' : 'default'} fontSize={"small"}
                                                                onClick={nextPageHandler}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </div>
    );
}

export default MyActivityComment;