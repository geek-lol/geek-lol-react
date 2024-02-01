import React from 'react';
import {Link} from "react-router-dom";
function SolutionContent(props) {
    return (
        <>
            <Link className="table-content btn-b" to="/board/detail">
                <div className="num">27687</div>
                <div className="empty"></div>
                <div className="contents">
                    <span>쇼진/기회/불경 방관 헤카림.쇼진/기회/불경 방관 헤카림.쇼진/기회/불경 방관 헤카림.쇼진/기회/불경 방관 헤카림.</span>
                    <i>[0]</i>
                </div>
                <div className="board_nickname">넌 감동이었던 케이틀린</div>
                <div className="num">1시간 전</div>
                <div className="num">23</div>
                <div className="num">0</div>
            </Link>
        </>
    );
}

export default SolutionContent;