import axios from 'axios';
import Swal from 'sweetalert2';

export default function useSignUp() {
  const signup = async (name, email, password) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        name,
        email,
        password,
      });

      Swal.fire({
        title: '註冊成功',
        text: `ID: ${response.data.data.user.id}\nName: ${response.data.data.user.name}\nEmail: ${response.data.data.user.email}`,
        icon: 'success',
        confirmButtonText: '確定',
      });
    } catch (err) {
      if (err.response && err.response.status === 409) {
        Swal.fire({
          title: '錯誤',
          text: 'Email 已被使用過',
          icon: 'error',
          confirmButtonText: '確定',
        });
      } else {
        Swal.fire({
          title: '錯誤',
          text: '伺服器錯誤',
          icon: 'error',
          confirmButtonText: '確定',
        });
      }
    }
  };

  return { signup };
}
