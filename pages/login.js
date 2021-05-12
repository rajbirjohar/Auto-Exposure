import Router from "next/dist/next-server/lib/router/router";
import { getCookieParser } from "next/dist/next-server/server/api-utils";
import Layout from "../components/Layout";
import cookie from 'js-cookie';

export default function Login() {
  const [loginError, setLoginError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

function handleSubmit(error) {
  error.preventDefault();
  fetch('/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((ret) => {
      return ret.json();
    })
    .then((data) => {
      if(data && data.error) {
        setLoginError(data.message);
      }
      if(data && data.token) {
        getCookieParser.set('token', data.token, {expires: 2});
        Router.push('/');
      }
    });
}

  return (
    <Layout>
      {/* <section className="mx-auto">
        <h1>Login Page</h1>
      </section> */}
      <form onSubmit = {handleSubmit}>
        <p>Login</p>
        <input
          name="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Submit" />
        {loginError && <p style={{color:'red'}}>{loginError}</p>}
      </form>
    </Layout>
  );
}
