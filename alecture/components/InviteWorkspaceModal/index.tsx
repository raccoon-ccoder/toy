import Modal from '@components/Modal';
import useInput from '@hooks/useInput';
import { Button, Input, Label } from '@pages/SignUp/style';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { FC, useCallback } from 'react';
import { useLocation, useParams } from 'react-router';
import { toast } from 'react-toastify';
import useSWR from 'swr';

interface Props {
  show: boolean;
  onCloseModal: (e: any) => void;
  setShowInviteWorkspaceModal: (flag: boolean) => void;
}
const InviteWorkspaceModal: FC<Props> = ({ show, onCloseModal, setShowInviteWorkspaceModal }) => {
  const { data: userData } = useSWR('/api/users', fetcher);
  const { workspace } = useParams<{ workspace: string }>();
  const location = useLocation();
  const channel = decodeURI(decodeURIComponent(location.pathname.split('channel/')[1]));

  const [newMember, setNewMember, onChangeNewMember] = useInput('');
  const { mutate } = useSWR(userData ? `/api/workspaces/${workspace}/channels/${channel}/members` : null, fetcher);

  const onInviteMember = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!newMember || !newMember.trim()) {
        return;
      }
      axios
        .post(`/api/workspaces/${workspace}/members`, {
          email: newMember,
        })
        .then((res) => {
          mutate(res.data, true);
          setShowInviteWorkspaceModal(false);
          setNewMember('');
        })
        .catch((err) => {
          console.dir(err);
          toast.error(err.response?.data, { position: 'bottom-center' });
        });
    },
    [workspace, newMember, setNewMember, setShowInviteWorkspaceModal],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onInviteMember}>
        <Label id="member-label">
          <span>이메일</span>
          <Input id="member" type="email" value={newMember} onChange={onChangeNewMember} />
        </Label>
        <Button type="submit">초대하기</Button>
      </form>
    </Modal>
  );
};

export default InviteWorkspaceModal;
