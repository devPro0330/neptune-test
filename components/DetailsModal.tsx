import React, { useState, useEffect } from "react";
import Modal from '@material-tailwind/react/Modal';
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import LeadText from "@material-tailwind/react/LeadText";
import { useWeb3React } from "@web3-react/core";
import useSWR from 'swr'

import useAuth from "../hooks/useAuth";
import { wallets } from "../config/wallets";
import { networkId } from "../config/environment";
import { useNotifier } from "../hooks/useNotifier";
import DetailsTable from "./DetailsTable";

function DetailsModal() {
  const [showModal, setShowModal] = useState(false);
  const { active, account, chainId, library } = useWeb3React();
  const { notifier } = useNotifier();

  const accountSubString = `${account?.substring(0, 4)}...${account?.substring(account.length - 4)}`

  const fetcher = (_library: any) => (...args: any[]) => {
    const [method, ...params] = args;
    return _library[method](...params);
  }

  const { data: balance } = useSWR(['getBalance', account, 'latest'], {
    fetcher: fetcher(library),
  })
  const { login, logout } = useAuth(networkId, notifier);

  const onConnect = (id: string) => {
    const wallet = wallets.find((x) => x.id === id);
    const connectorName = wallet?.connectorName;
    login(connectorName);
  };

  return (
    <>
      <Button
        style={{ margin: 'auto' }}
        color="lightBlue"
        type="button"
        onClick={() => setShowModal(true)}
        ripple="light"
      >
        Check Wallet Details
      </Button>
      <Modal size="sm" active={showModal} toggler={() => setShowModal(false)}>
        <ModalHeader toggler={() => setShowModal(false)}>
          Wallet Details
        </ModalHeader>
        <ModalBody>
          {!active ?
            <LeadText color="deepOrange">
              Wallet not connected. Please click the "Connect" button below.
            </LeadText> :
            <DetailsTable account={accountSubString} chainId={chainId} balance={balance?.toString()} />
          }
        </ModalBody>
        <ModalFooter>
          {active ?
            <Button
              color="red"
              onClick={logout}
              ripple="dark"
              block={true}
            >
              Disconnect
            </Button> :
            <>
              <Button
                color="blue"
                onClick={() => onConnect("1")}
                ripple="light"
                block={true}
              >
                Connect
              </Button>
              <Button
                color="gray"
                onClick={() => setShowModal(false)}
                ripple="dark"
                block={true}
              >
                Cancel
              </Button>
            </>
          }
        </ModalFooter>
      </Modal>
    </>

  )
}

export default DetailsModal