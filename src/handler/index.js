import { loginHandler } from './user/loginHandler.js'
import { registerHandler } from './user/registerHandler.js'

const handlers = {
    [PACKET_TYPE.REGISTER_REQUEST]: { handler: registerHandler },
    [PACKET_TYPE.LOGIN_REQUEST]: { handler: loginHandler }

}