import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container, Header, DragOver } from '@pages/DirectMessage/styles';
import gravatar from 'gravatar';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const DirectMessage = () => {
  const { data: userData, error } = useSWR('http://localhost:3095/api/users', fetcher);
  return (
    <Container>
      <Header>
        <img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })} alt={userData.nickname} />
        <span>{userData.nickname}</span>
        <span>디엠</span>
      </Header>
    </Container>
  );
};

export default DirectMessage;
