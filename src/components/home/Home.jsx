// import useChengeDocumentTitle from "../hooks/useSetDocumentTitle";

import Header from "../header/Header";
import Nav from "../nav/Nav";
import Aside from "../aside/aside";
import Main from "../main/main";

const Home = () => {
  // useChengeDocumentTitle('خانه');

  return (
    <div className="home">
      <Header />
      <Nav/>
      <Aside />
      <Main />
    </div>
  );
};

export default Home;
