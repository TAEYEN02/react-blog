import { useState, useEffect, useContext } from "react";
import { BoardContext } from "../context/BoardContext";
import { useParams, useNavigate } from "react-router-dom";
import CustomButton from "../component/CustomButton";
import api from "../api/api";
import '../css/PostDetail.css'
const PostDetail = () => {
    //넘어온 아이디를 받아야 한다.
    const { id } = useParams();
    //하나의 게시글을 담기 위한 state
    const [item, setItem] = useState({});
    const navigate = useNavigate();
    //게시글을 사용하기 위해 BoardContext 사용
    const { boardList, setBoardList } = useContext(BoardContext);
    //id를 통헤 boardList에 들어있는 게시글 한건을 꺼내서
    //화면에 출력하기
    //useEffect()사용하기

    useEffect(() => {
        //게시글 배열에서 넘어온 id와 일치하는 게시글을 ㅎㄴ 건 찾아서 변수에 담는다.
        const post = boardList.find((item) => item.id === parseInt(id));
        if (post) {
            setItem(post);
        }
    }, [id, boardList]);

    const moveToEdit = () => {
        navigate(`/edit/${id}`);
    };

      const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await api.deletePost(id);  // api-config에서 만든 삭제 호출

      setBoardList((prev) => prev.filter((post) => post.id !== parseInt(id)));
      alert("삭제되었습니다.");
      navigate("/");
    } catch (error) {
      alert("삭제에 실패했습니다: " + (error.response?.data || error.message));
    }
  };
    const moveToBoard = () => {
        navigate("/");
    }
    return (
        <div className="board-detail">
            <h2 className="board-detail-title">{item.title}</h2>
            <div className="board-detail-info">
                <h5>작성자 : {item.author}</h5>
                <p>{item.writingTime}</p>
            </div>
            <hr />
            <p className="board-detail-body">{item.content}</p>
            <hr />
            <div>
                <CustomButton label="수정" onclick={moveToEdit} />
                <CustomButton label="삭제" color="secondary" onclick={handleDelete} />
                <CustomButton label="목록으로" variant="outlined" onclick={moveToBoard} />
            </div>
        </div>
    )
}
export default PostDetail;