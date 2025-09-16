import { useState } from "react";

// Componente
export const TwitterFollowCard = ({
  children,
  userName,
  initialIsFollowing,
}) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const IMAGE_SRC = `https://unavatar.io/${userName}`;
  // Elemento
  const FORMATED_USER_NAME = (
    <span className=".ca-followCard-infoUsername">@{userName}</span>
  );

  const text = isFollowing ? "Siguiendo" : "Seguir";

  const buttonClassName = isFollowing
    ? "ca-followCard-button is-following"
    : "ca-followCard-button";

  const handleClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <article className="ca-followCard">
      <header className="ca-followCard-header">
        <img
          className="ca-followCard-avatar "
          src={IMAGE_SRC}
          alt="El avatar de midudev"
        />
        <div className="ca-followCard-info">
          <strong>{children}</strong>
          {/*  Renderiza un elemento */}
          {FORMATED_USER_NAME}
        </div>
      </header>
      <aside>
        <button className={buttonClassName} onClick={handleClick}>
          <span className="ca-followCard-text">{text}</span>
          <span className="ca-followCard-stopFollow">Dejar de Seguir</span>
        </button>
      </aside>
    </article>
  );
};
