import joi from 'joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const schema = joi.object({
  id: joi.string().required().messages({
    'any.required': 'id를 입력해주세요.',
  }),
  password: joi.string().required().messages({
    'any.required': 'password를 입력해주세요.',
  }),
});

const createAuthFailResponse = () => ({
  success: false,
  message: '아이디 또는 비밀번호가 일치하지 않습니다.',
  token: '',
  failCode: config.GlobalFailCode.AUTHENTICATION_FAILED,
});

const alreadyLoginResponse = () => ({
  success: false,
  message: '이미 접속 중인 계정입니다.',
  token: '',
  failCode: config.GlobalFailCode.AUTHENTICATION_FAILED,
});

const createSuccessResponse = (token) => ({
  success: true,
  message: '로그인 성공',
  token: token,
  failCode: config.GlobalFailCode.NONE,
});

export const LoginHandler = async ({ packetType, data, socket }) => {
  try {
    const { id, password } = await schema.validateAsync(data);
    console.log('login id : ', id);

    //db에 유저 검색
    const user = await findUserById(id);

    let responseData;

    if (!user) {
      responseData = createAuthFailResponse();
      console.log('유저가 존재하지 않습니다.');
    } else {
      //유저가 존재하면 password 비교
      const isPasswordValid = await bcrypt.compare(password, user.password);

      //비밀번호가 틀렸다면
      if (!isPasswordValid) {
        responseData = createAuthFailResponse();
        console.log('잘못된 비밀번호');
      } else {
        //이미 로그인 했다면
        const alreadyUser = getUserById(id);
        if (alreadyUser) {
          responseData = alreadyLoginResponse();
          console.log('이미 로그인한 계정입니다.');

          //로그인 성공 시 jwt token 생성
        } else {
          const token = jwt.sign({ id: user.id }, config.jwt.secret, {
            expiresIn: config.jwt.expiresIn,
          });

          //유저 마지막 로그인 업데이트
          await updateUserLogin(id);

          //세션에 유저 추가
          addUser(socket, id);

          responseData = createSuccessResponse(token);
          console.log('로그인 성공');
        }
      }
    }
    const loginResponse = createResponse(packetType.LOGIN_RESPONSE, responseData, socket);
    socket.write(loginResponse);
  } catch (e) {
    console.error('로그인 에러:', e);
  }
};
