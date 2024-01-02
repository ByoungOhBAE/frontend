// hooks/useBookHistory.js
import useSWR from 'swr';
import axios from 'axios';
import Cookies from "js-cookie";

const fetcher = url => axios.get(url).then(res => res.data);
const userId = Cookies.get("user_id");

export function useBookHistory() {
  const { data, error } = useSWR(`http://localhost:8000/api/user/${userId}/readingstatus`, fetcher);

  const bookList = data ? data.readbook : [];

  return {
    bookList,
    isLoading: !error && !data,
    isError: error
  };
}
