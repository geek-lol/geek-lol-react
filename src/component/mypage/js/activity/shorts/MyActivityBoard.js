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
    MyEnhancedTableToolbar, MyShortsEnhancedTableHead
} from "../../../../../utils/create-table-header";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {ADMIN_URL, SHORT_URL} from "../../../../../config/host-config";
import {getCurrentLoginUser} from "../../../../../utils/login-util";
import {useEffect, useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {FormControl} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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
    {
        id: 'recommends',
        numeric: true,
        disablePadding: false,
        label: '추천 ',
    },
];

const MyActivityBoard = () => {
    const FORWARD_URL = "http://localhost:3000/board/shorts";
    // 토큰 가져오기
    const userId = getCurrentLoginUser().token;

    const [rows,setRows] = useState([]);
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(1);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [deleteOpen, setDeleteOpen] = React.useState(false);

    //토큰
    const token= getCurrentLoginUser().token;
    // 요청 헤더 객체
    const requestHeader = {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
    };
    //내가 쓴 쇼츠 조회
    const shortsFetch = async () =>{
        const res = await fetch(SHORT_URL+"/my?page="+page,{
            method : "GET",
            headers: {"Authorization" : `Bearer ${token}`},
        })
        const json = await res.json()
        if (json.myshorts !== null){
            setRows(json.myshorts)
            setTotalPage(json.totalPages)
        }
        if (json.totalPages === 0){
            setTotalPage(1);
        }
    }
    const deleteBoardFetch = async () =>{
        const payload = {
            ids : selected
        }
        const res = await fetch(SHORT_URL,{
            method : "DELETE",
            headers: requestHeader,
            body: JSON.stringify(payload)
        })
        const json = await res.json()
        if (res.status ===200) {
            if (json.myshorts !== null) {
                setRows(json.myshorts)
                setTotalPage(json.totalPages)

            }else{
                setRows([])
            }
            if (json.totalPages === 0){
                setTotalPage(1);
            }
            setSelected([])
        }
    }

    const handleDelete = () =>{
        setDeleteOpen(true)
    }
//모달
    const deletehandleClose = () => {
        setDeleteOpen(false);
    };
    const deletehandleOk = () => {
        deleteBoardFetch();
        setDeleteOpen(false);
    };

    // 체크박스 전체 클릭
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.shortsId);
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
    const isSelected = (id) => selected.indexOf(id) !== -1;
    let emptyRows = 0;
    useEffect(() => {
        shortsFetch();
        emptyRows = page > 1 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    }, [page]);

    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar  title={"내가 쓴 글"} onClickHandler={handleDelete}  numSelected={selected.length}/>
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                onSelectAllClick={handleSelectAllClick}
                                rowCount={rows.length}
                                headCells={headCells}
                            />
                            <TableBody>
                                {rows.map((row, index) => {
                                    const isItemSelected = isSelected(row.shortsId);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.shortsId}
                                            selected={isItemSelected}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    onClick={(event) => handleClick(event, row.shortsId)}
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="left">{row.shortsId}</TableCell>
                                            <TableCell align="left">{row.title}</TableCell>
                                            <TableCell align="left">{formatDate(row.localDateTime,'day')}</TableCell>
                                            <TableCell align="left">{row.viewCount}</TableCell>
                                            <TableCell align="left">{row.upCount}</TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={5} />
                                    </TableRow>
                                )}
                                <TableRow
                                    sx={{height:20}}
                                >
                                    <TableCell colSpan={4}></TableCell>
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
            <React.Fragment>
                <Dialog
                    open={deleteOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={deletehandleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"정말 삭제하시겠습니까?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <FormControl fullWidth>
                                삭제하면 되돌릴 수 없습니다.
                            </FormControl>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={deletehandleClose}>Cancle</Button>
                        <Button onClick={deletehandleOk}>Ok</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </div>
    );
}

export default MyActivityBoard;