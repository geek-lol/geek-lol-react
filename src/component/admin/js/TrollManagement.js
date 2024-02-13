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
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {SHORT_URL} from "../../../config/host-config";
import {getCurrentLoginUser} from "../../../utils/login-util";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

//테이블 헤더
const headCells = [
    {
        id: 'bnos',
        label: '글번호',
    },
    {
        id: 'titles',
        label: '글제목',
    },
    {
        id: 'posters',
        label: '글쓴이',
    },
    {
        id: 'dates',
        label: '작성일자',
    },
    {
        id: 'views',
        label: '조회수',
    }
];


const TrollManagement = () => {
    const [applyList,setApplyList] = useState([]);

    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(1);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [open, setOpen] = React.useState(false);

    //요청 URL
    const API_URL = "http://localhost:8686";
    //토큰
    const token= getCurrentLoginUser().token;
    // 요청 헤더 객체
    const requestHeader = {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
    };
    // 패치
    const getMainFetch = async () =>{
        const res = await fetch(API_URL+"/admin/ruling?page="+page,{
            method : "POST",
            headers: {"Authorization" : `Bearer ${token}`},
        })
        const json = await res.json()
        if (json.ruling !== null){
            setApplyList(json.ruling)
            setTotalPage(json.totalPages)
        }
        if (json.totalPages === 0) {
            setTotalPage(1)
        }
    }
    const deleteBoardFetch = async () =>{
        const payload = {
            ids : selected
        }
        const res = await fetch(API_URL+"/admin/ruling?page="+page,{
            method : "DELETE",
            headers: requestHeader,
            body: JSON.stringify(payload)
        })
        const json = await res.json()
        if (res.status ===200) {
            if (json.ruling !== null) {
                setApplyList(json.ruling)
                setTotalPage(json.totalPages)
                setSelected([])
            }
            if (json.totalPages === 0) {
                setTotalPage(1)
            }
        }
    }

    const onClickDelete = () =>{
        deleteBoardFetch();
    }
//모달
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    // 체크박스 전체 클릭
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = applyList.map((n) => n.rulingId);
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
        getMainFetch();
        emptyRows = page > 1 ? Math.max(0, (1 + page) * rowsPerPage - applyList.length) : 0;

    }, [page]);
    return (
        <div>
            <Box sx={{ width: '65%' , mx:'auto' , mt:10}}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length}  title={"트롤재판소"} onClickHandler={onClickDelete}/>
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                onSelectAllClick={handleSelectAllClick}
                                rowCount={applyList.length}
                                headCells={headCells}
                            />
                            <TableBody>
                                {applyList.map((row, index) => {
                                    const isItemSelected = isSelected(row.rulingId);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.rulingId}
                                            selected={isItemSelected}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    onClick={(event) => handleClick(event, row.rulingId)}
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>

                                            <TableCell align="left">{row.rulingId}</TableCell>
                                            <TableCell align="left">{row.title}</TableCell>
                                            <TableCell align="left">{row.applyPosterName}</TableCell>
                                            <TableCell align="left">{formatDate(row.rulingDate,'day')}</TableCell>
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

export default TrollManagement;