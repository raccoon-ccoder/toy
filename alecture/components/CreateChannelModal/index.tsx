import Modal from '@components/Modal';
import useInput from '@hooks/useInput';
import { Button, Input, Label } from '@pages/SignUp/style';
import { IChannel, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { FC, useCallback } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import useSWR from 'swr';

interface Props {
  show: boolean;
  onCloseModal: (e: any) => void;
  setShowCreateChannelModal: (flag: boolean) => void;
}
const CreateChannelModal = ({ show, onCloseModal, setShowCreateChannelModal }: Props) => {
  const [newChannel, setNewChannel, onChangeNewChannel] = useInput('');
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();

  const {
    data: userData,
    error,
    mutate,
  } = useSWR<IUser | false>('/api/users', fetcher, {
    dedupingInterval: 1000 * 60 * 30,
  });

  const { data: channelData, mutate: channelMutate } = useSWR<IChannel[]>(
    `/api/workspaces/${workspace}/channels`,
    fetcher,
  );

  const onCreateChannel = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!newChannel || !newChannel.trim()) return;
      axios
        .post(
          `/api/workspaces/${workspace}/channels`,
          {
            name: newChannel,
          },
          {
            withCredentials: true,
          },
        )
        .then((res) => {
          if (channelData !== undefined) channelMutate([...channelData, res.data], true);
          else channelMutate([res.data], true);
          setShowCreateChannelModal(false);
          setNewChannel('');
        })
        .catch((err) => {
          console.dir(err);
          toast.error(err.response.data, { position: 'bottom-center' });
        });
    },
    [newChannel],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onCreateChannel}>
        <Label id="channel-label">
          <span>채널</span>
          <Input id="channel" value={newChannel} onChange={onChangeNewChannel} />
        </Label>
        <Button type="submit">생성하기</Button>
      </form>
    </Modal>
  );
};

export default CreateChannelModal;
