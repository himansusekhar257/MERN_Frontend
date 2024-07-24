import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../reducer/authreducer/AuthSlice'; // Import the login action
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { loading, error, status } = useSelector((state) => state.auth);

if(status === 200){
  navigate('/home')
}

  const onSubmit = (data) => {
    dispatch(signin(data)); // Dispatch login action with form data
  };

  const handleGoogleLogin = async () => {
    window.open(`http://localhost:5000/auth/google`, "_self")
  }

  return (
    <div style={{ maxWidth: '28rem', margin: 'auto', padding: '1.5rem', backgroundColor: '#ffffff', borderRadius: '0.5rem', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>Welcome Back</h2>
      
      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#4a5568' }}>Email:</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            style={{ padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.375rem', width: '100%' }}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>
        <div>
          <label style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#4a5568' }}>Password:</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            style={{ padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.375rem', width: '100%' }}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* <label style={{ fontSize: '0.875rem', color: '#4a5568', cursor: 'pointer' }}>
            <input
              type="checkbox"
              {...register('rememberMe')}
              style={{ marginRight: '0.5rem' }}
            />
            Remember me
          </label> */}
          <a href="/forgot-password" style={{ fontSize: '0.875rem', color: '#3182ce', textDecoration: 'underline' }}>Forgot Password?</a>
        </div>
        <button
          type="submit"
          style={{ 
            backgroundColor: '#1a202c',
            color: '#ffffff',
            padding: '0.75rem',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            border: 'none',
            marginTop: '0.75rem'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#2d3748'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#1a202c'}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p style={{ color: 'red' }}>{error.message}</p>}
      </form>

      {/* Other options */}
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', flexDirection: "column" }}>
        <button
          style={{ 
            backgroundColor: '#dd4b39',
            color: '#ffffff',
            padding: '0.75rem',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            border: 'none',
          }}
          onClick={handleGoogleLogin}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#e53e3e'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#dd4b39'}
        >
          Sign in with Google
        </button>
        <span style={{ fontSize: '0.875rem', color: '#4a5568' }}>or</span>
      </div>

      {/* Signup */}
      <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.875rem', color: '#4a5568' }}>
        <span>Don't have an account?</span>{' '}
        <a href="/account/signup" style={{ color: '#3182ce', textDecoration: 'underline', cursor: 'pointer' }}>Signup</a>
      </div>
    </div>
  );
};

export default Login;
