import Header from "./../containers/Header";
export default function Info() {
  return (
    <>
      <Header />
      <div className="Info">
        <div className="Backend">
          <h1>
            Backend{" "}
            <a href="https://github.com/december-ok/trablog-back">
              <i className="fab fa-github" />
            </a>
          </h1>
          <h2>tech stacks</h2>
          <ul>
            <li>Nest.js</li>
            <li>Typescript</li>
            <li>Graphql</li>
            <li>TypeORM</li>
            <li>PostgreSQL</li>
            <li>JWT</li>
          </ul>
        </div>
        <div className="Frontend">
          <h1>
            Frontend{" "}
            <a href="https://github.com/december-ok/trablog-front">
              <i className="fab fa-github" />
            </a>
          </h1>
          <h2>tech stacks</h2>
          <ul>
            <li>React</li>
            <li>Typescript</li>
            <li>Apollo Graphql</li>
            <li>JWT</li>
            <li>SCSS</li>
          </ul>
        </div>
      </div>
    </>
  );
}
