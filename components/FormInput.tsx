import React from 'react'
import Input from "@material-tailwind/react/Input";
import styles from '../styles/FormInput.module.css'

export interface Props {
  label?: string;
  value: string;
  onChange: (e: any) => void;
}

function FormInput(props: Props) {
  return (
    <div className={styles.container}>
      <Input
        {...props}
        type="text"
        color="lightBlue"
        size="regular"
        outline={true}
        placeholder={props.label}
      />
    </div>
  )
}

export default FormInput