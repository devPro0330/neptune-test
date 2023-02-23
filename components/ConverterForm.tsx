import React, { useState } from 'react'
import styles from '../styles/ConverterForm.module.css'
import DetailsModal from './DetailsModal';
import FormInput from './FormInput'
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";

function ConverterForm() {
  const [firstValue, setFirstValue] = useState('0');
  const [secondValue, setSecondValue] = useState('0');
  
  const handleFirstValueChange = (e: any) => {
    let { value } = e.target;
    value = parseFloat(value);
    if (value) {
      setFirstValue(value);
      setSecondValue((value * 3).toFixed(2));
    } else {
      setFirstValue('');
      setSecondValue('0');
      console.log('wrong input')
    }

  }
  
  const handleSecondValueChange = (e: any) => {
    let { value } = e.target;
    value = parseFloat(value);
    if (value) {
      setSecondValue(value);
      setFirstValue((value / 3).toFixed(2));
    } else {
      setSecondValue('');
      setFirstValue('0');
      console.log('wrong input')
    }

  }
  
  const handleRefresh = () => {
    setFirstValue('0');
    setSecondValue('0');
  }
  
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Crypto converter</h2>
      <FormInput label='NEP' value={firstValue} onChange={handleFirstValueChange} />
      <Button
        style={{ margin: 'auto' }}
        onClick={handleRefresh}
        color="lightBlue"
        buttonType="outline"
        size="regular"
        rounded={true}
        block={false}
        iconOnly={true}
        ripple="dark"
      >
        <Icon name="loop" size="sm" />
      </Button>
      <FormInput label='BUSD' value={secondValue} onChange={handleSecondValueChange} />
      <DetailsModal />
    </div>
  )
}

export default ConverterForm