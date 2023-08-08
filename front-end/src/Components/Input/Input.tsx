import { useState } from 'react';

import { IInput } from '../../Types/AuthTypes';
import styles from './Input.module.css';

const Input: React.FC<IInput> = ({ label, errorMessage, onChange, ...inputProps }) => {
    const [focused, setFocused] = useState(false);

    const onInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        setFocused(true);
    };

    return (
        <div className={styles.inputWrapper}>
            <label className={styles.label}>
                {label}
                <input
                    className={styles.input}
                    {...inputProps}
                    onChange={onChange}
                    onBlur={onInputFocus}
                    onFocus={() =>
                        inputProps.name === 'confirmPassword' && setFocused(true)
                    }
                    focused={focused.toString()}
                />
                <p className={styles.error}>{errorMessage}</p>
            </label>
        </div>
    );
};

export default Input;
