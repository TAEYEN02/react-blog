import { createContext, useEffect, useState } from "react";
import api from '../api/api';
import axios from "axios";

export const BoardContext = createContext(null);

const BoardProvider = ({ children }) => {
    const [boardList, setBoardList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            try {
                const { data } = await api.getPosts();
                setBoardList(data);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const addPost = async (newPost) => {
        try {
            const response = await api.createPost(newPost);
            let savedPost = response.data;

            // savedPost가 배열이면 첫번째 요소만 사용
            if (Array.isArray(savedPost)) {
                savedPost = savedPost[0];
            }

            setBoardList(prevList => [savedPost, ...prevList]);
        } catch (error) {
            console.error("글 등록 실패:", error);
            throw error;
        }
    };

    return (
        <BoardContext.Provider value={{ boardList, setBoardList, loading, addPost}}>
            {children}
        </BoardContext.Provider>
    );

}
export default BoardProvider;