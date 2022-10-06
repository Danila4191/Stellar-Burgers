import React, {useContext} from 'react';

export const isMobileContext = React.createContext<IisMobile>({isMobile: false});
interface IisMobile {
    isMobile: any
}
interface IcodeSend {
    codeSend: boolean
    setCodeSend:(any:any) => void
 
}
export const codeSendContext = React.createContext<IcodeSend>({codeSend:false,setCodeSend(){}});