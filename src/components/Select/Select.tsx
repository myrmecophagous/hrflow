import clsx from 'clsx';
import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, ForwardedRef } from 'react';

import styles from './Select.module.scss';


export interface SelectOption {
  label: string;
  value: string | number;
};

interface SelectProps extends ComponentPropsWithoutRef<'select'> {
  /**
   * Label for the select field
   */
  label: string;
  /**
   * onChange handler
   */
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  /**
   * List of options
   */
  options: SelectOption[];
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Selected value
   */
  selected: string | number;
};


const Select = forwardRef(function Select(
  {
    disabled,
    label,
    onChange,
    options,
    placeholder,
    selected,
  }: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>
) {
  return (
    <div className={styles.input_container}>
      <label>
        <div>{label}</div>
        <select ref={ref} onChange={onChange} className={styles.select} value={selected} disabled={disabled} aria-label={label || placeholder}>
          <option className={clsx(placeholder || styles.hidden)} aria-hidden="true">{placeholder}</option>
          {
            options.map((option) => {
              return (<option key={option.value} value={option.value}>{option.label}</option>);
            })
          }
        </select>
      </label>
    </div>
  );
});

export default Select;
