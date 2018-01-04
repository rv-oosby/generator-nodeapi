const Generator = require('yeoman-generator');
const path = require('path');

module.exports = class extends Generator{
  constructor(args, opts) {
    super(args, opts);
    this.props = {};
  }

  prompting() {
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: 'project name here',
    }]).then((answers) => {
      this.props = Object.assign(answers);
      this.log('name', answers.name)
    })
  }

  default() {
    console.log(this.props);
    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'),
      { name: this.props.name }
    );
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      { name: this.props.name }
    );
    this.fs.copyTpl(
      this.templatePath('_server.js'),
      this.destinationPath('bin/www/server.js'),
      { name: this.props.name }
    );
    this.fs.copy(
      this.templatePath('_app.js'),
      this.destinationPath('app.js')
    );
    this.fs.copy(
      this.templatePath('_.gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('_.npmignore'),
      this.destinationPath('.npmignore')
    );
    this.fs.copy(
      this.templatePath('_route.js'),
      this.destinationPath('components/example/route.js')
    );
    this.fs.copy(
      this.templatePath('_.env'),
      this.destinationPath('.env')
    );
  }

  end() {
    this.installDependencies();
  }
}