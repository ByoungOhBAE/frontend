// components/BookDetailComponent.js 또는 .tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Booklist from "@/components/component/book_list";

const Mypage = ({
    setSelecteCompoId,
}: {
    setSelecteCompoId: (id: string) => void;
}) => {
    const [userInfo, setUserInfo] = useState({ name: "", email: "" }); // 초기값을 빈 문자열로 설정
    const [selectedMenu, setSelectedMenu] =
        useState("bookList"); /*클릭하면 나오도록*/
    const [readBookCount, setReadBookCount] = useState(0); // 읽은 책 수
    const [quizCount, setQuizCount] = useState(0); // 푼 퀴즈 수
    const [correctRate, setCorrectRate] = useState(0); // 맞은 퀴즈 수 => 이거 알면 정답률 계산 가능
    const [bookList, setBookList] = useState([]);
    // const [incorrectRate, setIncorrectRate] = useState(0);  // 틀린 퀴즈 수 => 맞은 퀴즈 수만 알면 계산 가능
    // const [lastLearningDate, setLastLearningDate] = useState('');   // 마지막 학습 날짜

    useEffect(() => {
        // 쿠키에서 user_id 읽기
        const userId = Cookies.get("user_id");
        if (userId) {
            axios
                .get(`http://127.0.0.1:8000/api/user/${userId}`)
                .then((response) => {
                    setUserInfo(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, []);

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    useEffect(() => {
        // 컴포넌트가 마운트될 때 'bookList'로 초기화
        setSelectedMenu("bookList");
        const fetchUserStats = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/user/${userData.id}/`
                ); // 사용자 ID에 따라 수정
                const userData = response.data;

                const bookListResponse = await axios.get(
                    `http://127.0.0.1:8000/api/user/${userData.id}/booklist/`
                );
                const userBookList = bookListResponse.data;

                // 상태 업데이트
                setReadBookCount(userData.readBookCount);
                setQuizCount(userData.quizCount);
                setCorrectRate(userData.correctRate);
                setBookList(userBookList);
            } catch (error) {
                console.error("Error fetching user stats:", error);
            }
        };

        fetchUserStats();
    }, []);

    const PER_PAGE = 8;

    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                backgroundColor: "#f3f4f6",
            }}
        >
            {/* 프로필 & 메뉴 섹션 */}
            <div
                style={{
                    backgroundColor: "#ffffff",
                    padding: "20px",
                    width: "25%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {/* 프로필 영역 */}
                <div
                    className="text-center mb-10"
                    style={{ marginTop: "50px" }}
                >
                    {" "}
                    {/* 여기서 마진 탑 조정 */}
                    <div
                        className="rounded-full overflow-hidden mx-auto mb-20"
                        style={{
                            width: "200px",
                            height: "200px",
                            marginBottom: "30px",
                        }}
                    >
                        {" "}
                        {/* 동그라미 크기 고정. marginBottom: '30px'은 이름과 사진 사이의 거리 */}
                        <img
                            src="/field.jpg"
                            className="object-cover w-full h-full rounded-full snap-center"
                        />
                    </div>
                    <h2 className="text-xl font-semibold">{userInfo.name}</h2>
                    <p className="text-gray-500 mb-10">{userInfo.email}</p>
                </div>

                {/* 메뉴 영역 */}
                <ul
                    style={{
                        listStyle: "none",
                        padding: 0,
                        width: "100%",
                        display: "flex", // 플렉스박스 설정
                        flexDirection: "column", // 아이템들을 세로로 정렬
                        justifyContent: "center", // 세로축에서 중앙 정렬
                        height: "100%", // 전체 높이 설정
                        marginTop: "20px", // 여백을 줄이기 위해 추가 또는 수정
                    }}
                >
                    {["bookList", "menu1"].map((menu) => (
                        <li
                            key={menu}
                            onClick={() => handleMenuClick(menu)}
                            style={{
                                cursor: "pointer",
                                padding: "10px",
                                textAlign: "center",
                                backgroundColor:
                                    selectedMenu === menu
                                        ? "#3b82f6"
                                        : "#ffffff",
                                color:
                                    selectedMenu === menu
                                        ? "#ffffff"
                                        : "#1f2937",
                                marginBottom: "5px",
                                borderRadius: "5px",
                                transition: "background-color 0.2s ease-in-out",
                            }}
                        >
                            {menu === "bookList" ? "내 책 목록" : "메뉴"}
                        </li>
                    ))}
                </ul>
            </div>
            

            {/* 콘텐츠 섹션 */}
            <div className="flex-1 p-8 bg-gray-200">
                {/* '내 책 목록' 선택 시 표시될 내용 - 추가된 로직 */}
                {selectedMenu === "bookList" && (
                    <div className="h-full border-2 border-dashed border-gray-300 rounded">
                        <div className="flex h-full items-center justify-center">
                            {/* Booklist 컴포넌트에 북리스트 전달 */}
                            <Booklist
                                bookList={bookList}
                                setSelecteCompoId={setSelecteCompoId}
                            />
                        </div>
                    </div>
                )}

                {/* '학습현황' 선택 시 표시될 내용 - 추가된 로직 */}
                {selectedMenu === "menu1" && (
                    <div className="h-full border-2 border-dashed border-gray-300 rounded">
                        <div className="flex h-full items-center justify-center">
                            <p className="text-gray-500">
                                여기에 "학습현황" 컨텐츠가 표시됩니다.
                                <br />
                                읽은 책 수: {readBookCount}
                                <br />푼 퀴즈 수: {quizCount}
                                <br />
                                정답률: {correctRate}%
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Mypage;
