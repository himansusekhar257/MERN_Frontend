import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../reducer/authreducer/AuthSlice'; // Import the signup action

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const { loading, error, status, token } = useSelector((state) => state.auth);
console.log("status",status);
  const onSubmit = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'profilePicture') {
        formData.append(key, data[key][0]); // Append the first file in the FileList
      } else {
        formData.append(key, data[key]);
      }
    });
  
    console.log("FormData", formData.get('profilePicture')); // This should log the file object
    dispatch(signup(formData));
  };

  const handleGoogleLogin = async () => {
    window.open(`http://localhost:5000/auth/google`, "_self")
  }
  

  return (
    <div style={{ maxWidth: '28rem', margin: 'auto', padding: '1.5rem', backgroundColor: '#ffffff', borderRadius: '0.5rem', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>Create Your Account</h2>
      
      {/* Signup Form */}
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#4a5568' }}>First Name:</label>
          <input
            type="text"
            {...register('firstName', { required: 'First name is required' })}
            style={{ padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.375rem', width: '100%' }}
          />
          {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName.message}</p>}
        </div>
        <div>
          <label style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#4a5568' }}>Last Name:</label>
          <input
            type="text"
            {...register('lastName', { required: 'Last name is required' })}
            style={{ padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.375rem', width: '100%' }}
          />
          {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName.message}</p>}
        </div>
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
          <label style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#4a5568' }}>Phone Number:</label>
          <input
            type="text"
            {...register('phoneNumber', { required: 'Phone number is required' })}
            style={{ padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.375rem', width: '100%' }}
          />
          {errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber.message}</p>}
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
        <div>
          <label style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#4a5568' }}>Confirm Password:</label>
          <input
            type="password"
            {...register('confirmPassword', { required: 'Confirm password is required' })}
            style={{ padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.375rem', width: '100%' }}
          />
          {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>}
        </div>
        <div>
          <label style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#4a5568' }}>Profile Picture:</label>
          <input
            type="file"
            {...register('profilePicture')}
            style={{ padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.375rem', width: '100%' }}
          />
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
          {loading ? 'Signing up...' : 'Signup'}
        </button>
        {error && <p style={{ color: 'red' }}>{error.message}</p>}
      </form>

      {/* Other options */}
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', flexDirection: "column" }}>
        <span style={{ fontSize: '0.875rem', color: '#4a5568' }}>or</span>
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
          Signup with Google
        </button>
      </div>

      {/* Login */}
      <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.875rem', color: '#4a5568' }}>
        <span>Already signed up?</span>{' '}
        <a href="/account/login" style={{ color: '#3182ce', textDecoration: 'underline', cursor: 'pointer' }}>Login</a>
      </div>
    </div>
  );
};

export default Signup;
