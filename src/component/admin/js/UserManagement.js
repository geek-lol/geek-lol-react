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
import {getCurrentLoginUser} from "../../../utils/login-util";
import {ADMIN_URL} from "../../../config/host-config";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

//테이블 헤더
const headCells = [
    {
        id: 'userIds',
        label: '계정명',
    },
    {
        id: 'titles',
        label: '닉네임',
    },
    {
        id: 'dates',
        label: '계정 생성일자',
    },
    {
        id: 'roles',
        label: '권한',
    },
];


const UserManagement = () => {
    const [userList,setUserList] = useState([]);

    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(1);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [changeId, setChangeId] = useState('');
    const [selectedValue, setSelectedValue] = useState('');

    const [open, setOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    //요청 URL
    const API_URL = "http://localhost:8686";
    //토큰
    const token= getCurrentLoginUser().token;
    const me = getCurrentLoginUser().userId;
    // 요청 헤더 객체
    const requestHeader = {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
    };
    // 패치
    const getUserFetch = async () =>{
        const res = await fetch(ADMIN_URL+"/user?page="+page,{
            method : "POST",
            headers: {"Authorization" : `Bearer ${token}`},
        })
        const json = await res.json()
        if (json.user !== null){
            setUserList(json.user)
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
        const res = await fetch(ADMIN_URL+"/user?page="+page,{
            method : "DELETE",
            headers: requestHeader,
            body: JSON.stringify(payload)
        })
        const json = await res.json()
        if (res.status ===200) {
            if (json.user !== null) {
                setUserList(json.user)
                setTotalPage(json.totalPages)
                setSelected([])
            }
            if (json.totalPages === 0) {
                setTotalPage(1)
            }
        }
    }
    const modifyAuth=async (id,newAuth)=>{
        const res = await fetch(ADMIN_URL+`/change?id=${id}&newAuth=${newAuth}&page=${page}`,{
            method : "POST",
            headers: requestHeader
        })
        const json = await res.json()
        if (res.status ===200) {
            if (json.user !== null) {
                setUserList(json.user)
            }
        }
    }

    const onClickDelete = () =>{
        setDeleteOpen(true);
    }
//모달
    const handleClickOpen = (id) => {
        setChangeId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleOk = () => {
        modifyAuth(changeId,selectedValue)
        setOpen(false);
    };
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
            const newSelected = userList.map((n) => n.id);
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
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const isSelected = (id) => selected.indexOf(id) !== -1;

    let emptyRows = 0;

    useEffect(() => {
        getUserFetch();
        // 테이블 데이터 갯수로 줄 계산
        emptyRows = page > 1 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

    }, [page]);
    return (
        <div>
            <Box sx={{ width: '65%' , mx:'auto' , mt:10}}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length}  title={"회원 관리"} onClickHandler={onClickDelete}/>
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                onSelectAllClick={handleSelectAllClick}
                                rowCount={userList.length}
                                headCells={headCells}
                            />
                            <TableBody>
                                {userList.map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover

                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            {me !== row.id ?
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        onClick={(event) => handleClick(event, row.id)}
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                :
                                                <TableCell padding="checkbox">
                                                </TableCell>
                                            }

                                            <TableCell align="left">{row.id}</TableCell>
                                            <TableCell align="left">{row.userName}</TableCell>
                                            <TableCell align="left">{row.joinDate}</TableCell>
                                            <TableCell align="left">
                                                {row.role}
                                                {me !== row.id && <Button sx={{
                                                    backgroundColor: "rgba(216, 216, 216, 0.61)",
                                                    color: "black",
                                                    ml: 1
                                                }}
                                                         onClick={() => handleClickOpen(row.id)}
                                                >권한변경</Button>}
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
                                <NativeSelect
                                    onChange={handleChange}
                                    defaultValue={selectedValue}
                                >
                                    <option value={`ADMIN`}>ADMIN</option>
                                    <option value={`COMMON`}>COMMON</option>
                                </NativeSelect>
                            </FormControl>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancle</Button>
                        <Button onClick={handleOk}>Ok</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
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
};

export default UserManagement;