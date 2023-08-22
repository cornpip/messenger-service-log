import * as S from "@/components/chat/styled/Chat.styled";
import { useEffect, memo } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../atom/User";
import { jwtDecoded, responseMsgDto } from "./interface";

interface MessageProps {
    responseMsgArr: responseMsgDto[];
}

const Messege = ({ responseMsgArr }: MessageProps) => {
    console.log("Message 재실행 확인");
    const [user, setUser] = useRecoilState<jwtDecoded>(userState);

    useEffect(() => {
        console.log("Message 재렌더 확인");
    }, [])

    const ownerCheck = (msg: responseMsgDto, user: jwtDecoded): boolean => {
        if (msg.userId == user.sub && msg.userEmail === user.email && msg.userName === user.nickname) return true;
        return false;
    }

    return (
        <>
            {
                ownerCheck(responseMsgArr[0], user) ? <S.MsgOwner>
                    <S.MessageInfo>
                        <S.MessageInfoImg src={`${process.env.STATIC_SOURCE}/people.PNG`} />
                        <S.MsgOwnerInfoP>
                            {responseMsgArr[0].userName}
                        </S.MsgOwnerInfoP>
                    </S.MessageInfo>
                    <S.MsgOwnerContent>
                        {responseMsgArr.map((responesMsg, idx) => {
                            return (
                                <S.MsgOwnerContentP key={idx}>
                                    {responesMsg.text}
                                </S.MsgOwnerContentP>
                            )
                        })}
                    </S.MsgOwnerContent>
                </S.MsgOwner> : <S.Message>
                    <S.MessageInfo>
                        <S.MessageInfoImg src={`${process.env.STATIC_SOURCE}/people.PNG`} />
                        <S.MessageInfoP>
                            {responseMsgArr[0].userName}
                        </S.MessageInfoP>
                    </S.MessageInfo>
                    <S.MessageContent>
                        {responseMsgArr.map((responesMsg, idx) => {
                            return (
                                <S.MsgContentP key={idx}>
                                    {responesMsg.text}
                                </S.MsgContentP>
                            )
                        })}
                    </S.MessageContent>
                </S.Message>
            }
        </>
    )
}

export default memo(Messege);