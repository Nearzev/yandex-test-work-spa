import { Link } from 'react-router-dom';

import { IForm } from '../../Types/AuthTypes';
import Input from '../Input/Input';
import styles from './Form.module.css';

const Form: React.FC<IForm> = ({
    InputProps,
    InputValues,
    setInputValues,
    buttonText,
    linkTo,
    pText,
    onSubmit,
}) => {
    const onUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValues({ ...InputValues, [event.target.name]: event.target.value });
        localStorage.setItem(event.target.name, event.target.value);
    };

    return (
        <div className={styles.container}>
            <form onSubmit={onSubmit} className={styles.form}>
                {InputProps.map((input) => (
                    <Input
                        key={input.id}
                        {...input}
                        value={InputValues[input.name]}
                        onChange={onUserChange}
                    />
                ))}
                <button className={styles.button}>{buttonText}</button>
                <p>
                    <Link to={linkTo}>{pText}</Link>
                </p>
            </form>
        </div>
    );
};

export default Form;
