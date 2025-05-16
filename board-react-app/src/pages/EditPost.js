import { useContext, useEffect, useState } from "react";
import { BoardContext } from "../context/BoardContext";
import { useNavigate, useParams } from "react-router-dom";
import CustomInput from "../component/CustomInput";
import CustomButton from "../component/CustomButton";
import api from "../api/api";
import '../css/EditPost.css'

const EditPost = () => {

    //1. 개시글을 가져와서 출력하기
    //2. 수정한 게시글을 게시글 목록에 반영하기
    //3. 게시판 목록으로 가기
    const { boardList, setBoardList } = useContext(BoardContext);
    const naviget = useNavigate();
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const post = boardList.find(item => item.id === Number(id));
        if (post) {
            setTitle(post.title);
            setAuthor(post.author);
            setContent(post.content);
        }
    }, [boardList, id]);



    const updatePost = async (e) => {
        e.preventDefault();

        const updatedPost = { id: Number(id), title, author, content };

        try {
            const { data } = await api.updatePost(updatedPost); // ← 서버로 PUT 요청
            setBoardList(data);        // 서버가 전체 글 리스트를 돌려줌
            alert("수정되었습니다!");
            naviget(`/post/${id}`);
        } catch (err) {
            console.error(err);
            alert("수정 실패: " + (err.response?.data || err.message));
        }
    };

    const backToBoard = () => {
        alert("취소되었습니다.");
        naviget(`/post/${id}`);
    }

    return (
        <div className="board-detail">
            <h1>{id}번 글 수정하기</h1>
            <form>
                <CustomInput label="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
                <CustomInput label="작성자" value={author} onChange={(e) => setAuthor(e.target.value)} />
                <CustomInput
                    label="내용"
                    multiline
                    rows={6}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <p style={{ textAlign: "right", fontSize: "12px", color: content.length > 10000 ? 'red' : 'gray' }}>
                    {content.length} / 200 자
                </p>
                <div>
                    <CustomButton label="수정 완료" onclick={updatePost} />
                    <CustomButton label="취소" variant='outlined' color="secondary" onclick={backToBoard} />
                </div>
            </form>
        </div>
    )
}
export default EditPost;