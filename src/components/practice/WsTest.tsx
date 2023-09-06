import { devInstance } from "@/api/axios";
import { stompInstance } from "@/api/stomp";
import { Client } from "@stomp/stompjs";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const WsTest = () => {
    const [client, setClient] = useState<Client | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const connectHandler = () => {
        console.log("connectHandler");
        const channelId = searchParams.get("channelId");
        if (channelId) {
            const stomp = new Client({
                // brokerURL: "ws://localhost:80/ws-stomp",
                brokerURL: "ws://localhost:8080/ws-stomp",
                connectHeaders: {
                    login: 'user',
                    passcode: 'password',
                },
                debug: function (str) {
                    console.log("!!!", str);
                },
                reconnectDelay: 5000, //자동 재 연결
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
            })

            stomp.onConnect = (frame) => {
                stomp.subscribe(`/sub/chat/room/${channelId}`, (message) => {
                    console.log("###subscribe : ", message.body);
                });
            }
            setClient(stomp);
        } else return navigate("/no-page");
    }

    useEffect(() => {
        console.log("@@@ : WsTest useEffect");
        connectHandler();
    }, []);

    useEffect(() => {
        client?.activate();
    }, [client])

    const buttonHandler = () => {
        client?.publish({
            destination: '/pub/chat/test',
            body: JSON.stringify({
                channelId : searchParams.get("channelId"),
                msg: "hi",
            }), 
        });
    }

    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "center",
            }}>
                <button
                    onClick={buttonHandler}
                    style={{

                    }}
                > submit </button>
            </div>
        </>
    )
}

export default WsTest;