import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from '../../store/session';
import './SignupForm.css';

const SignupFormModal = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const closeModal = useModal();


    const handleSubmit = e => {
        e.preventDefault();

        if (password === confirmPassword) {
            setErrors({});
            return dispatch(
                sessionActions.signUpUser({
                    username,
                    email,
                    firstName,
                    lastName,
                    password
                })
            )
                .then(closeModal)
                .catch(async res => {
                    const data = await res.json();
                    if (data && data?.errors) setErrors(data.errors);
                });
        }
        return setErrors({
            ...errors,
            confirmPassword: 'Confirm Password field must match the Password field'
        });
    };

    const disableSignup = {}
    if (!firstName ||
        !lastName ||
        !email ||
        !username ||
        username.length < 4 ||
        !password ||
        password.length < 6 ||
        !confirmPassword ||
        password !== confirmPassword) {
        disableSignup.disabled = true;
    } else {
        disableSignup.disabled = false;
    }

    return (
        <div className="signup-form">
            <h1>Sign Up</h1>
            {errors.firstName && <p className="signup-error">{errors.firstName}</p>}
            {errors.lastName && <p className="signup-error">{errors.lastName}</p>}
            {errors.email && <p className="signup-error">{errors.email}</p>}
            {errors.username && <p className="signup-error">{errors.username}</p>}
            {errors.password && <p className="signup-error">{errors.password}</p>}
            {errors.confirmPassword && <p className="signup-error">{errors.confirmPassword}</p>}
            <form onSubmit={handleSubmit}>
                <span>
                    <input
                        type="text"
                        value={firstName}
                        placeholder="First Name"
                        onChange={e => setFirstName(e.target.value)}
                        required
                    />
                </span>
                <span>
                    <input
                        type="text"
                        value={lastName}
                        placeholder="Last Name"
                        onChange={e => setLastName(e.target.value)}
                        required
                    />
                </span>
                <span>
                    <input
                        type="text"
                        value={email}
                        placeholder="Email"
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </span>
                <span>
                    <input
                        type="text"
                        value={username}
                        placeholder="Username"
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </span>
                <span>
                    <input
                        type="text"
                        value={password}
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </span>
                <span>
                    <input
                        type="text"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                    />
                </span>
                <span>
                    <button
                        type="submit"
                        {...disableSignup}
                    >
                        Sign Up
                    </button>
                </span>
            </form>
        </div>
    )
}

export default SignupFormModal;