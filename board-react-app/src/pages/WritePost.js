import { useState, useContext } from 'react'
import { BoardContext } from '../context/BoardContext'
import CustomButton from '../component/CustomButton'
import CustomInput from '../component/CustomInput'
import { useNavigate } from 'react-router-dom'
import '../css/WritePost.css'

const WritePost = () => {
    const { addPost } = useContext(BoardContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");

    const savePost = async () => {
        if (!title || !author || !content) {
            alert("모든 항목을 입력해주세요.");
            return;
        }

        const newPost = { title, author, content };

        try {
            await addPost(newPost); // BoardContext 내 API 호출 함수
            alert("게시물이 등록되었습니다.");
            navigate("/");
        } catch (err) {
            console.error("저장 실패:", err);
            alert("저장 실패 > 서버 에러가 발생했습니다.");
        }
    };

    const backToBoard = () => {
        if (!window.confirm("지금까지의 작성을 끝내겠습니까?")) return;
        navigate("/");
    }

    return (
        <div className="writePage">
            <h1>글쓰기 페이지</h1>
            <form>
                <CustomInput
                    label="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <CustomInput
                    label="작성자"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
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
                    <CustomButton label="저장" onclick={savePost} />
                    <CustomButton label="취소" variant='outlined' color="secondary" onclick={backToBoard} />
                </div>
            </form>
        </div>
    )
}

export default WritePost;
