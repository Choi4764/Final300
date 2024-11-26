import Joi from 'joi';
import bcrypt from 'bcrypt';

const schema = Joi.object({
  id: Joi.string().required().messages({
    'any.required': 'id를 입력해주세요.',
  }),
  password: Joi.string().required().messages({
    'any.required': 'password를 입력해주세요.',
  }),
  email: Joi.string().email().required().messages({
    'string.email': '잘못된 이메일 형식입니다.',
    'any.required': '이메일 주소를 입력해주세요.',
  }),
});

export const RegisterHandler = async ({ packetType, data, socket }) => {
  try {
    const { id, password, email } = await schema.validateAsync(data);
    console.log('data', data);

    //비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    //db에 유저가 있는지 확인
    const user = await findUserById(id);
    console.log('user', user);

    let responseData;
    if (user) {
      // id가 같은 유저가 이미 존재할때
      responseData = {
        success: false,
        messages: '이미 가입된 유저입니다.',
        failCode: config.GlobalFailCode.INVALID_REQUEST,
      };
    } else {
      // db저장
      await createUser(id, hashedPassword, email);

      //에러없이 회원가입 성공했을때
      responseData = {
        success: true,
        messages: '회원가입이 완료되었습니다.',
        failCode: config.GlobalFailCode.NONE,
      };
    }

    const registerResponse = createResponse(packetType.REGISTER_RESPONSE, responseData, socket);

    socket.write(registerResponse);
    console.log('회원가입 성공');
  } catch (e) {
    console.error(e);
    const errorResponse = {
      success: false,
      message: '회원가입 중 에러가 발생하였습니다.',
      failCode: 0,
    };
    socket.write(createResponse(packetType.REGISTER_RESPONSE, errorResponse, socket));
  }
};
