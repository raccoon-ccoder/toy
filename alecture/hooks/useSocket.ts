import axios from 'axios';
import { useCallback } from 'react';
import io from 'socket.io-client';

const backUrl = 'http://localhost:3095';

const sockets: { [key: string]: SocketIOClient.Socket } = {};
const useSocket = (workspace?: string): [SocketIOClient.Socket | undefined, () => void] => {
  console.log('rendered', workspace);
  const disconnect = useCallback(() => {
    if (workspace) {
      // 소켓 연결 해제
      sockets[workspace].disconnect();
      // 끊어진 소켓 객체 삭제
      delete sockets[workspace];
    }
  }, []);
  if (!workspace) return [undefined, disconnect];

  // 기존에 존재하는 워크스페이스 소켓이라면 굳이 만들지 않고 리턴
  // 새로운 워크스페이스 소켓이라면 연결
  if (!sockets[workspace]) {
    sockets[workspace] = io(`${backUrl}/ws-${workspace}`, {
      transports: ['websocket'], // 웹소켓 지원하는 브라우저의 경우 굳이 http 쓰지 않고 바로 웹소켓 사용하게끔 설정
    });
  }

  return [sockets[workspace], disconnect];
};

export default useSocket;
