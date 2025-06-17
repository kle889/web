import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/slices/userSlice';
import { useLoginMutation } from '../store/apis/userApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();
    const user = useSelector(state => state.user);

    const onChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(formData);
            if (response.error) {
                toast.error(response.error.data?.message || response.error.error || 'Login failed');
            } else {
                dispatch(setUser(response.data));
                localStorage.setItem('user', JSON.stringify(response.data))
                navigate('/');
                toast.success(`Welcome ${response.data.name}!`);
            }
        } catch (err) {
            console.error('Login failed', err);
        }
    }

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <div className='h-full bg-cover bg-center' style={{ backgroundImage: "url('/images/2.jpg')" }}>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={onSubmit} className="space-y-6">
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
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {isLoading ? "Please Wait..." : "Login"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;