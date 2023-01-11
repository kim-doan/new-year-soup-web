'use client';
import { useRecoilState } from 'recoil';
import { authState } from './core/states/authState';

const Home = () => {
  const [user] = useRecoilState(authState);

  return (
    <div>
      <h1>홈페이지</h1>
      {user && <p>{user}님 어서오세요</p>}
    </div>
  );
};

export default Home;
