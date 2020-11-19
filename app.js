const TAB_SIZE = 4;
const getSpaceForLevel = (level) => new Array(TAB_SIZE * level).fill(" ").join("");

class Node {
  constructor(name) {
    this.name = name;
    this.innerHTML = "";
    this.childNodes = [];
  }

  createElement(name) {
    return new Node(name);
  }

  appendChild(child) {
    this.childNodes.push(child);
  }

  querySelectorByTag(name) {
    for (let i = 0; i < this.childNodes.length; i++) {
      let child = this.childNodes[i];
      if (child.name === name) {
        return child;
      };
    }
    for (let i = 0; i < this.childNodes.length; i++) {
      let child = this.childNodes[i];
      return child.querySelectorByTag(name);
    }
  }
}

class VDocument extends Node {
  constructor() {
    super('html');
    this.renderItemsByLevel = this.renderItemsByLevel.bind(this);
    this.querySelectorByTag = this.querySelectorByTag.bind(this);
  }

  renderItemsByLevel(node, level) {
    let output;
    let currentLevel = level + 1;
    let currentTabSpacing = getSpaceForLevel(level);
    output = `${currentTabSpacing}<${node.name}>\n`;
    if (node.innerHTML) {
      output += `${currentTabSpacing}${getSpaceForLevel(1)}${node.innerHTML}\n`;
     }
    node.childNodes.forEach((child, index) => {
      output += `${this.renderItemsByLevel(child, currentLevel)}`;
    })
    output += `${currentTabSpacing}</${node.name}>\n`;
    return output;
  }

  render() {
    let tree = this.renderItemsByLevel(this, 0);
    console.log(tree);
  }
}

const vdocument = new VDocument();

const body = vdocument.createElement('body');

const div1 = vdocument.createElement('div1');
div1.innerHTML = "oh I am div1!";

const div2 = vdocument.createElement('div2');
const childDivofDiv2 = vdocument.createElement('div');
childDivofDiv2.innerHTML = " I am child of div 2!"
div2.appendChild(childDivofDiv2);

body.appendChild(div1);
body.appendChild(div2);

vdocument.appendChild(body);
vdocument.render();
console.log('-------------- Created Document Rendering Ends --------------\n');

let querySelectedDiv2 = vdocument.querySelectorByTag('div2');

const div4 = vdocument.createElement('div4');
div4.innerHTML = "Query selector success!";
querySelectedDiv2.appendChild(div4);
vdocument.render();

// output: 
//   <html>
//       <body>
//           <div1>
//               oh I am div1!
//           </div1>
//           <div2>
//               <div>
//                   I am child of div 2!
//               </div>
//           </div2>
//       </body>
//   </html>

//   -------------- Created Document Rendering Ends --------------

//   <html>
//       <body>
//           <div1>
//               oh I am div1!
//           </div1>
//           <div2>
//               <div>
//                   I am child of div 2!
//               </div>
//               <div4>
//                   Query selector success!
//               </div4>
//           </div2>
//       </body>
//   </html>