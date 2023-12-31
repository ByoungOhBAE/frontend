// TextEditor.tsx
import React from 'react';
import { useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Cookies from "js-cookie";

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false, // 서버 사이드 렌더링 비활성화
    // loading: () => <p>Loading...</p>, // 로딩 중 표시할 컴포넌트
});


const TextEditor = ({ content, setContent }) => {
    const editorRef = useRef(null);

    const insertImage = (url) => {
        const range = editorRef.current.getEditor().getSelection();
        if (range) {
            // 현재 선택된 위치에 이미지 URL 삽입
            editorRef.current.getEditor().insertEmbed(range.index, 'image', url);
        }
    };
    
    const handleImageUpload = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
    
        input.onchange = async () => {
            const file = input.files[0];
            // FormData를 사용하여 파일을 서버로 전송
            const formData = new FormData();
            formData.append('image', file);
            formData.append('Post', "1");
    
            // 이미지를 서버에 업로드하고 URL을 받아야 합니다.
            // 예: axios를 사용하여 API 요청
            const token = Cookies.get('token');
            axios.post('http://127.0.0.1:8000/api/posts/media/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                // 서버에서 반환된 이미지 URL을 받습니다.
                const imageUrl = response.data.url;
                insertImage(imageUrl);
            }).catch(error => {
                console.error('Error uploading image:', error);
            });
        };
    };

    const modules = {
        toolbar: {
            container: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image'], // 'image' 버튼 추가
                ['clean']
            ],
            // handlers: {
            //     'image': handleImageUpload, // 함수 참조를 전달
            // },
        },
    };

    return (
        <ReactQuill 
            ref={editorRef}
            value={content}
            onChange={setContent}
            theme="snow"
            modules={modules}
        />
    );
};

export default TextEditor;