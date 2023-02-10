const inquirer = require("inquirer");
const fs = require("fs");
const generateTeam = require("./src/page-template.js");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const teamMemberInformation = [];

const questions = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      message: "Input name?",
      name: "name",
      validate: (input) => {
        if (/[0-9!@#%^&*]+/.test(input)) {
          return "Name can only contain letters. Type correct name.";
        }
        return true;
      },
    },
    {
      type: "input",
      message: "Input ID number?",
      name: "id",
      validate: (input) => {
        if (/[a-zA-Z!@#%^&*]+/.test(input)) {
          return "ID number cannot contain letters or symbols. Type correct id.";
        }
        return true;
      },
    },
    {
      type: "input",
      message: "Input email?",
      name: "email",
    },
    {
      type: "list",
      message: "Input role?",
      name: "role",
      choices: ["Engineer", "Intern", "Manager"],
    },
  ]);

  // const regex = /^[a-zA-Z]+$/;
  // if (!regex.test(answers.name)) {
  //   console.log("Name must contain only letters. Please try again.");
  //   return questions();
  // }

  if (answers.role === "Manager") {
    const managerAns = await inquirer.prompt([
      {
        type: "input",
        message: "Input office number",
        name: "officeNumber",
        validate: (input) => {
          if (/[a-zA-Z!@#%^&*]+/.test(input)) {
            return "office number can only contain numbers. Type correct office number.";
          }
          return true;
        },
      },
    ]);
    const newManager = new Manager(
      answers.name,
      answers.id,
      answers.email,
      managerAns.officeNumber
    );
    teamMemberInformation.push(newManager);
  } else if (answers.role === "Engineer") {
    const githubAns = await inquirer.prompt([
      {
        type: "input",
        message: "Input GitHub user name?",
        name: "github",
      },
    ]);
    const newEngineer = new Engineer(
      answers.name,
      answers.id,
      answers.email,
      githubAns.github
    );
    teamMemberInformation.push(newEngineer);
  } else if (answers.role === "Intern") {
    const internAns = await inquirer.prompt([
      {
        type: "input",
        message: "What university did you attend?",
        name: "school",
        validate: (input) => {
          if (/[0-9!@#%^&*]+/.test(input)) {
            return "Name can only contain letters. Type correct university name.";
          }
          return true;
        },
      },
    ]);

    const newIntern = new Intern(
      answers.name,
      answers.id,
      answers.email,
      internAns.school
    );
    teamMemberInformation.push(newIntern);
  }
};

async function promptQuestion() {
  await questions();

  const addMemberAns = await inquirer.prompt([
    {
      name: "addMember",
      type: "list",
      choices: ["Add another team member.", "Finished! Create my team."],
      message:
        "Would you like to add further team members or complete your team build",
    },
  ]);

  if (addMemberAns.addMember === "Add another team member.") {
    return promptQuestion();
  }
  return buildTeam();
}

promptQuestion();

function buildTeam() {
  console.log("Member Information", teamMemberInformation);
  fs.writeFileSync(
    "./dist/index.html",
    generateTeam(teamMemberInformation),
    "utf-8"
  );
}
