export default function SignUp() {
  return (
    <div className=" text-black ">
      <p className="mb-3 text-[2rem] font-bold">User Sign Up</p>
      <form className="flex flex-col  ">
        <label htmlFor="Username" className="mb-2">
          Username:
        </label>
        <input
          className="mb-2 w-[20rem] rounded-[0.625rem] border p-2"
          placeholder="Username"
        />

        <label htmlFor="Email" className="mb-2">
          Email:
        </label>
        <input
          className="mb-2 w-[20rem] rounded-[0.625rem] border p-2"
          placeholder="Email"
          type="email"
        />

        <label htmlFor="Password" className="mb-2">
          Password:
        </label>
        <input
          className="mb-2 w-[20rem] rounded-[0.625rem] border p-2"
          placeholder="Password"
          type="password"
        />

        <button className="mt-2 w-[8rem] rounded-[0.625rem] bg-[#D9D9D9] p-2 hover:bg-[#B0B0B0]">
          Sign Up
        </button>
      </form>
    </div>
  );
}
