import React from 'react'
import styles from '../styles/DetailsTable.module.css'

export interface Props {
  account: string | null | undefined;
  chainId: number | undefined;
  balance: string;
}

function DetailsTable(props: Props) {
  const { account, chainId, balance } = props;
  return (
    <div className={styles.container} >
      <div className={styles.header} >
        <span>Key</span>
        <span>Value</span>
      </div>
      <div className={styles.body} >
        <span>Account</span>
        <span>{account}</span>
      </div>
      <div className={styles.body} >
        <span>ChainID</span>
        <span>{chainId}</span>
      </div>
      <div className={styles.body} >
        <span>Balance</span>
        <span>{balance}</span>
      </div>
    </div>
  )
}

export default DetailsTable