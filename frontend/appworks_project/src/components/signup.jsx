"use client"

import useSignUp from '@/hooks/useSignUp';

export default function SignUp() {
  const { signup } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.Username.value;
    const email = e.target.Email.value;
    const password = e.target.Password.value;

    await signup(name, email, password);
  };
  return (
    <div className=" text-black ">
      <p className="mb-3 text-[2rem] font-bold">User Sign Up</p>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="Username" className="mb-2">
          Username:
        </label>
        <input
          name="Username"
          className="mb-2 w-[20rem] rounded-[0.625rem] border p-2"
          placeholder="Username"
          required
        />

        <label htmlFor="Email" className="mb-2">
          Email:
        </label>
        <input
          name="Email"
          className="mb-2 w-[20rem] rounded-[0.625rem] border p-2"
          placeholder="Email"
          type="email"
          required
        />

        <label htmlFor="Password" className="mb-2">
          Password:
        </label>
        <input
          name="Password"
          className="mb-2 w-[20rem] rounded-[0.625rem] border p-2"
          placeholder="Password"
          type="password"
          required
        />

        <button
          className="mt-2 w-[8rem] rounded-[0.625rem] bg-[#D9D9D9] p-2 hover:bg-[#B0B0B0]"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}