// hooks/useBookList.js
import useSWR from 'swr';
import axios from 'axios';

const fetcher = url => axios.get(url).then(res => res.data);

export function useBookList() {
  const { data, error } = useSWR('http://127.0.0.1:8000/api/BookList/', fetcher);

  return {
    bookList: data as Book[],
    isLoading: !error && !data,
    isError: error
  };
}
