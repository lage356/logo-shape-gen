const inquirer = require("inquirer");
const { Circle, Triangle, Square } = require("./shape");
const fs = require('fs');

class SVG {
  constructor() {
    this.textElement = "";
    this.shapeElement = "";
  }
  render() {
    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`;
  }

  setTextElement(text, color) {
    this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`;
  }
  setShapeElement(shape) {
    this.shapeElement = shape.render();
  }
}

class CLI {
  constructor() {
    this.title = "";
  }
  async inputShape() {
    const validateInput = (input) =>
      input.length === 3 ? true : "Input must be three characters long";
    var svgString = "";
    var fileName = "logo.svg";

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
          name: "colorText",
          message: "Enter color for text?",
        },
        {
          type: "input",
          name: "colorShape",
          message: "Enter color for shape",
        },
        {
          type: "list",
          name: "shape",
          message: "choose a shape",
          choices: ["Circle", "Triangle", "Square"],
        },
      ];
      const answers = await inquirer.prompt(questions);
      

      let userText = answers.text;
      let colorShape = answers.colorShape;
      let shapeType = answers.shape;
      let colorText = answers.colorText;

      let userShape;

      switch (shapeType) {
        case "Square":
          userShape = new Square();
          break;
        case "Circle":
          userShape = new Circle();
          break;

        case "Triangle":
          userShape = new Triangle();
          break;

        default:
          console.log("select shape");
      }
      if (userShape) {
        userShape.setColor(colorShape);
      }

      var svg = new SVG();
      svg.setTextElement(userText, colorText);
      svg.setShapeElement(userShape);
      svgString = svg.render();
      
      fs.writeFile(fileName, svgString,(err) =>
      err ? console.error(err) : console.log('Success!')
    );
    
    };
    promptUser();
  }
}

module.exports = CLI;
