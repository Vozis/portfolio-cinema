import { FC } from 'react';
import { OnChangeValue } from 'react-select';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import { IOption, ISelect } from '@/ui/select/select.interface';

import formStyles from '../form-elements/form.module.scss';

import styles from './Select.module.scss';

const animatedComponents = makeAnimated();

const SelectField: FC<ISelect> = ({
  field,
  isLoading,
  isMulti,
  placeholder,
  options,
  error,
}) => {
  const onChange = (newValue: OnChangeValue<IOption, boolean> | unknown) => {
    field.onChange(
      isMulti
        ? (newValue as IOption[]).map(item => item.value)
        : (newValue as IOption).value,
    );
  };

  const getValue = () => {
    if (field.value) {
      return isMulti
        ? options.filter(option => field.value.indexOf(option.value) >= 0)
        : options.find(option => option.value === field.value);
    } else {
      return isMulti ? [] : '';
    }
  };

  return (
    <div className={styles.selectContainer}>
      <label>
        <span>{placeholder}</span>
        <Select
          classNamePrefix={'custom-select'}
          options={options}
          value={getValue()}
          isMulti={isMulti}
          onChange={onChange}
          components={animatedComponents}
          isLoading={isLoading}
        />
      </label>
      {/* @ts-ignore */}
      {error && <div className={styles.error}>{error.message}</div>}
    </div>
  );
};

export default SelectField;
