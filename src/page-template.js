// create the team
const generateTeam = (team) => {
  // create the manager html
  const generateManager = (manager) => {
    return `
    <div class="card-body">
            <h5 class="card-title">${manager.getName()}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${manager.getRole()}</h6>
            <div class="card" style="width: 18rem">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${manager.getId()}</li>
                <li class="list-group-item">
                  Email:
                  <a href="mailto: ${manager.getEmail()}"
                    >${manager.getEmail()}</a
                  >
                </li>
                <li class="list-group-item">
                  Office number: ${manager.getOfficeNumber()}
                </li>
              </ul>
            </div>
          </div>`;
  };

  // create the html for engineers
  const generateEngineer = (engineer) => {
    return `<div class="card-body">
    <h5 class="card-title">${engineer.getName()}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${engineer.getRole()}</h6>
    <div class="card" style="width: 18rem">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">ID: ${engineer.getId()}</li>
        <li class="list-group-item">
          Email:
          <a href="mailto: ${engineer.getEmail()}"
            >${engineer.getEmail()}</a
          >
        </li>
        <li class="list-group-item">
          GitHub:
          <a
            href="https://github.com/${engineer.getGithub()}"
            target="_blank"
            >${engineer.getGithub()}</a
          >
        </li>
      </ul>
    </div>
  </div>`;
  };

  // create the html for interns
  const generateIntern = (intern) => {
    return `<div class="card-body">
    <h5 class="card-title">${intern.getName()}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${intern.getRole()}</h6>
    <div class="card" style="width: 18rem">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">ID: ${intern.getId()}</li>
        <li class="list-group-item">
          Email:
          <a href="mailto: ${intern.getEmail()}"
            >${intern.getEmail()}</a
          >
        </li>
        <li class="list-group-item">School: ${intern.getSchool()}</li>
      </ul>
    </div>
  </div>`;
  };

  const html = [];

  html.push(
    team
      .filter((employee) => employee.getRole() === "Manager")
      .map((manager) => generateManager(manager))
  );
  html.push(
    team
      .filter((employee) => employee.getRole() === "Engineer")
      .map((engineer) => generateEngineer(engineer))
      .join("")
  );
  html.push(
    team
      .filter((employee) => employee.getRole() === "Intern")
      .map((intern) => generateIntern(intern))
      .join("")
  );

  return html.join("");
};

// export function to generate entire page
module.exports = (team) => {
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Command-line Generated Team Cards</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
      crossorigin="anonymous"
    />
  </head>
  <body>
    <nav class="navbar bg-body-tertiary">
      <div class="container-fluid">
        <span class="navbar-brand mb-0 h1">My Team</span>
      </div>
    </nav>

    <div class="container">
      <div class="row">
        <div
          class="card col-12 d-flex justify-content-center"
          style="width: 18rem"
        >
          ${generateTeam(team)}
        </div>
      </div>
    </div>
  </body>
</html>`;
};
