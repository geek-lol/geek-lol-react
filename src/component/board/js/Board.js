import React from 'react';
import Header from "../../header/js/Header";
import "../scss/board.scss";
const Board = () => {
    return (
        <>
            <Header/>
            <div id="board_wrap">
                <div id="board_header"></div>
                <section id="board_main">
                    <div className="board_nav_bar">
                        <a className="WritePost">게시글 작성</a>
                        <ul className="nav_bar_listBox">
                            <li>자유게시판</li>
                            <li>LCK 게시판</li>
                            <li>공략게시판</li>
                            <li>하이라이트</li>
                        </ul>
                    </div>
                    <div className="board_list_box">
                        <div className="board_search_box"></div>
                        <div className="board_table_box">
                            <table>
                                <tr>
                                    <th>번호</th>
                                    <th>제목</th>
                                    <th>작성자</th>
                                    <th>날짜</th>
                                    <th>조회</th>
                                    <th>추천</th>
                                </tr>
                                <tr>
                                    <td>번호</td>
                                    <td>제목</td>
                                    <td>작성자</td>
                                    <td>날짜</td>
                                    <td>조회</td>
                                    <td>추천</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>애도라 코딩하잔...</td>
                                    <td>코딩벌레레</td>
                                    <td>3시간전</td>
                                    <td>5</td>
                                    <td>0</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </>

    );
};

export default Board;