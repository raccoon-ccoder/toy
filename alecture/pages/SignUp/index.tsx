import React, { useCallback, useState } from 'react';
import { Form, Input, Label, Header, Button, LinkContainer, Error, Success } from '@pages/SignUp/style';
import { Link } from 'react-router-dom';
import useInput from '@hooks/useInput';
import axios from 'axios';

function SignUp() {
  const [email, , onChangeEmail] = useInput('');
  const [nickname, , onChangeNickname] = useInput('');
  const [password, setPassword, _] = useInput('');
  const [passwordCheck, setPasswordCheck, __] = useInput('');
  const [mismatchError, setMismatchError] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const onChangePassword = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const {
        currentTarget: { value },
      } = e;
      setPassword(value);
      setMismatchError(value !== passwordCheck);
    },
    [passwordCheck],
  );

  const onChangePasswordCheck = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const {
        currentTarget: { value },
      } = e;
      setPasswordCheck(value);
      setMismatchError(value !== password);
    },
    [password],
  );

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!mismatchError) {
        console.log('서버로 회원가입');
        setSignUpSuccess(false);
        setSignUpError('');
        axios
          .post('/api/users', {
            email,
            nickname,
            password,
          })
          .then((response) => {
            console.log(response);

            setSignUpSuccess(true);
          })
          .catch((err) => {
            setSignUpError(err.response.data);
          })
          .finally(() => {});
      }
    },
    [email, password, nickname, passwordCheck, mismatchError],
  );

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {!nickname && <Error>닉네임을 입력해주세요.</Error>}
          {signUpError && <Error>{signUpError}</Error>}
          {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
      </LinkContainer>
    </div>
  );
}

export default SignUp;
