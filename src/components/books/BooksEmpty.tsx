import {FaSmileWink} from "react-icons/fa";
import Empty from "../common/Empty.tsx";
import {Link} from "react-router-dom";

export default function BooksEmpty() {
    return(
        <Empty
            icon={<FaSmileWink/>}
            title="검색 결과가 없습니다."
            description={<Link to="/books">전체 검색 결과로 이동</Link>}/>
    )
}
