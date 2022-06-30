import axios from 'axios';

// 실질적으로 useSWR이 넘겨준 url을 받아서 직접 요청을 처리해주는 역할
const fetcher = (url: string) =>
  axios
    .get(url, {
      withCredentials: true, // 프엔, 백엔 도메인이 다르기에 쿠키 전달 불가하여 추가 설정
    })
    .then((res) => res.data);

export default fetcher;
