import React, {useContext} from 'react';
import { IisMobile,IcodeSend } from '../types/types';

export const isMobileContext = React.createContext<IisMobile>({isMobile: false});

export const codeSendContext = React.createContext<IcodeSend>({codeSend:false,setCodeSend(){}});