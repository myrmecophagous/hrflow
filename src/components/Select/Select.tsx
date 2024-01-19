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
  props: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>
) {
  return (
    <div className={styles.input_container}>
      <label>
        <div>{props.label}</div>
        <select ref={ref} onChange={props.onChange} className={styles.select} value={props.selected} disabled={props.disabled}>
          <option className={clsx(props.placeholder || styles.hidden)} aria-hidden="true">{props.placeholder}</option>
          {
            props.options.map((option) => {
              return (<option key={option.value} value={option.value}>{option.label}</option>);
            })
          }
        </select>
      </label>
    </div>
  );
});

export default Select;
