import { $selectedLecture } from '@/global-store/lectureStore';
import { $userAuth } from '@/global-store/userStore';
import { notifications } from '@mantine/notifications';
import { useCallback, useEffect, useState } from 'react';

const websocketUrl = import.meta.env.VITE_BACKEND_WS;

export const getWebsocketConnectString = function getWsConnectionString() {
  const userToken = $userAuth.get()?.token;
  const selectedLectureId = $selectedLecture.get()?.id;

  if (userToken && selectedLectureId) {
    return `${websocketUrl}?access_token=${userToken}&lecture_id=${selectedLectureId}&mode=stream`;
  }

  return '';
};
export const getWebsocketTestString = function getWsConnectionString() {
  const userToken = $userAuth.get()?.token;
  const selectedLectureId = $selectedLecture.get()?.id;

  if (userToken && selectedLectureId) {
    // This was Jan Testing - Will remove in the future  🙏
    // const domain = "ON-NT"
    // return `${websocketUrl}?access_token=${userToken}&mode=demo&domain=${domain}`;
    return `${websocketUrl}?access_token=${userToken}&lecture_id=${selectedLectureId}&mode=test`;
  }

  return '';
};

export const useWebsocket = (
  url: string,
  onMessage: (data: MessageEvent<unknown>) => void,
) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);

  const start = useCallback(() => {
    if (url == null) return;
    const ws = new WebSocket(url);
    setWs(ws);
  }, [url]);

  const stop = useCallback(() => {
    ws?.close();
    // console.log("closing: ", ws?.readyState);
  }, [ws]);

  // set handlers when websocket connection changes
  useEffect(() => {
    if (ws == null) return;

    ws.onerror = () => {
      notifications.show({
        title: 'Websocket error',
        message: `Napaka v povezavi`,
        color: 'red',
        id: 'ws-error',
      });
      // console.error(ev);
    };

    ws.onopen = () => {
      setWs(ws);
      // console.log("ws open");
      setConnected(true);
    };

    ws.onclose = () => {
      // console.log("ws closed");
      setConnected(false);
    };

    // handle messages
    ws.onmessage = (data) => {
      // check error
      onMessage(data);
    };
  }, [ws, onMessage]);

  const sendWsData = useCallback(
    (data: ArrayBuffer) => {
      if (ws == null || ws.readyState != ws.OPEN) return;
      // console.log("posljam");

      ws.send(data);
    },
    [ws],
  );

  return {
    sendWsData,
    stop,
    start,
    connected,
  };
};
