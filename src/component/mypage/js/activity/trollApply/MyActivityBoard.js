import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import '../../../scss/MyActivityMain.scss'
import {formatDate} from "../../../../../utils/format-date";
import {
    EnhancedTableHead,
    EnhancedTableToolbar,
    MyEnhancedTableHead,
    MyEnhancedTableToolbar
} from "../../../../../utils/create-table-header";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Button from "@mui/material/Button";
import {
    BOARD_URL,
    LOCATION_URL,
    TROLL_APPLY_DETAIL_URL,
    TROLL_RULING_DETAIL_URL
} from "../../../../../config/host-config";
import {getCurrentLoginUser} from "../../../../../utils/login-util";
import {useEffect, useState} from "react";

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
        numeric: false,
        disablePadding: false,
        label: '제목 ',
    },
    {
        id: 'dates',
        numeric: true,
        disablePadding: false,
        label: '날짜 ',
    },
    {
        id: 'views',
        numeric: true,
        disablePadding: false,
        label: '조회 ',
    },
];

const MyActivityBoard = () => {
    const FORWARD_URL = TROLL_APPLY_DETAIL_URL;

    // 토큰 가져오기
    const token= getCurrentLoginUser().token;
    const userId = getCurrentLoginUser().token;

    //요청 URL
    const API_URL = "http://localhost:8686";

    const [page, setPage] = React.useState(1);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [emptyRows, setEmptyRows] = useState(0);
    const [rows,setRows] = useState([]);
    const [totalPage,setTotalPage] = useState(1);

// 내가 쓴 트롤 사형 지원 게시판 조회
    const applyFetch = async () =>{
        const res = await fetch(API_URL+"/troll/apply/my",{
            method : "GET",
            headers: {"Authorization" : `Bearer ${token}`},
        })
        const json = await res.json()

        if (json.boardApply !== null){
            const updatedRows = json.boardApply.map((row,index) => ({
                ...row,
                id: index+1
            }));
            setRows(updatedRows)
            setTotalPage(json.totalPages)
        }
        if (json.totalPages === 0){
            setTotalPage(1);
        }
    }
    useEffect(()=>{
        applyFetch()
    },[page])


    useEffect(() => {
        // 테이블 데이터 갯수로 줄 계산
        setEmptyRows(page > 1 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0);

    }, [totalPage]);
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
    const handleTitleClick = (e) => {
        const boardId = e.currentTarget.dataset.boardid
        window.location.href = FORWARD_URL+"/"+boardId;
    }

    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <MyEnhancedTableToolbar  title={"내가 쓴 글"} />
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >
                            <MyEnhancedTableHead
                                headCells={headCells}
                            />
                            <TableBody>
                                {rows.map((row, index) => {
                                    return (
                                        <TableRow hover>
                                            <TableCell align="left">{row.id}</TableCell>
                                            <TableCell data-boardId={row.applyId} onClick={handleTitleClick}
                                                       style={{ cursor: 'pointer'}}
                                            >{row.title}</TableCell>
                                            <TableCell align="left">{formatDate(row.localDateTime,'day')}</TableCell>
                                            <TableCell align="left">{row.viewCount}</TableCell>
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
                                    <TableCell colSpan={2}></TableCell>
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

export default MyActivityBoard;