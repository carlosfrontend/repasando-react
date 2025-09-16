import "./App.css";
import { TwitterFollowCard } from "./TwitterFollowCard.jsx";
import { v4 as uuidv4 } from "uuid";

const users = [
  {
    id: uuidv4(),
    userName: "midudev",
    name: "Miguel Ángel Durán",
    isFollowing: true,
  },
  {
    id: uuidv4(),
    userName: "carlosazaustre",
    name: "Carlos Azaustre",
    isFollowing: false,
  },
  {
    id: uuidv4(),
    userName: "program_es",
    name: "Programación en Español",
    isFollowing: false,
  },
  {
    id: uuidv4(),
    userName: "G_Programming",
    name: "Gentleman Programming",
    isFollowing: true,
  },
];

const App = () => {
  return (
    // Separacion entre compoenntes de tarjeta a nivel de App
    // creando una seccción con la clase App
    <section className="App">
      {users.map(({ id, userName, name, isFollowing }) => {
        return (
          <TwitterFollowCard
            userName={userName}
            initialIsFollowing={isFollowing}
            key={id}
          >
            {name}
          </TwitterFollowCard>
        );
      })}
    </section>
  );
};

export default App;
