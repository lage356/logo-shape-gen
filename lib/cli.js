const inquirer = require("inquirer");
const shape = require('./shapes');
const Shape = require("./shapes");

class CLI {
  constructor() {
    this.title = "";
  }
  async inputShape() {
    const validateInput = (input) =>
      input.length === 3 ? true : "Input must be three characters long";

    const promptUser = async () => {
      const questions = [
        {
          type: "input",
          name: "text",
          message: "Enter three characters",
          validate: validateInput,
        },
        {
          type: "input",
          name: "color",
          message: "Enter color for text?",
        },
        {
          type: "input",
          name: "colorshape",
          message:"Enter color for shape"

        },
        {
          type: "list",
          name: "shape",
          message: "choose a shape",
          choices: ["cricle", "triangle", "square"],
        }
      
      ];
      const answers = await inquirer.prompt(questions);
      console.log(answers);
      const svgText= answers.text;
      console.log(svgText)

      const newShape = new Shape(shape);
      newShape.setColor(answers.color);
      console.log(newShape)
    }
    promptUser();
  
  }
  
}


module.exports = CLI;
