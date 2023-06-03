import { Fragment, useState } from "react";
import Modal from 'react-modal';
import { deleteUser } from "../../api/FetchUser";
import useToken from "../app/useToken";
import { useNavigate } from "react-router-dom";
import { clearLocalStorage, clearSessionStorage } from "../../utils/cleaner";

export default function DeleteModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const { token, payload } = useToken();

    const deleteAccount = async () => {
        await deleteUser(token, payload);
        navigate("/login");
        clearLocalStorage();
        clearSessionStorage();
    }

    const openModal = () => {
        setIsModalOpen(true);
      };

      const closeModal = () => {
        setIsModalOpen(false);
      };

    return (
    <Fragment>
      <button type="button" onClick={openModal}>Excluir conta</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2>Realmente desejas apagar a tua conta?</h2>
        <p>Todos os seus dados serão excluídos e essa ação é irreversível</p>
        <button onClick={closeModal}>Cancelar</button>
        <button onClick={deleteAccount}>Deletar mesmo assim</button>
      </Modal>
    </Fragment>
    );
  };


