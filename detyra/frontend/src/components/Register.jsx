import { useState } from "react";
import { FaUser } from 'react-icons/fa';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setUser } from '../store/slices/userSlice';
import { useRegisterMutation } from '../store/apis/userApi';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', password2: '' });
    const { name, email, password, password2 } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [register, { isLoading }] = useRegisterMutation();

    const onChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            toast.error('Passwords are different');
        } else {
            const response = await register(formData);
            if (response.error) {
                toast.error(response.error.data?.message || response.error.error || 'Registration failed');
            } else {
                dispatch(setUser(response.data));
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/');
                toast.success('Registration successful!');
            }
        }
    };

    return (
        <div className='h-full bg-cover bg-center' style={{ backgroundImage: "linear-gradient(to right, #FFF9C4, #FFECB3)" }}>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                                Your Name
                            </label>
                            <div className="mt-2">
                                <input
                                    required
                                    type='text'
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    id='name'
                                    name='name'
                                    value={name}
                                    placeholder='Enter your name'
                                    onChange={onChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    required
                                    type='email'
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    id='email'
                                    name='email'
                                    value={email}
                                    placeholder='Enter your email'
                                    onChange={onChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    required
                                    type='password'
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    id='password'
                                    name='password'
                                    value={password}
                                    placeholder='Enter password'
                                    onChange={onChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password2" className="block text-sm/6 font-medium text-gray-900">
                                Confirm Password
                            </label>
                            <div className="mt-2">
                                <input
                                    required
                                    type='password'
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    id='password2'
                                    name='password2'
                                    value={password2}
                                    placeholder='Confirm password'
                                    onChange={onChange}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible-offset-2 focus-visible:outline-indigo-600"
                            >
                                {isLoading ? "Please Wait..." : "Register"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
