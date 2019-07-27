import { readdirSync } from 'fs';
import { Default } from './items/Default';

export class ItemSelection {
  itemClasses = {};

  constructor() {
    try {
      const files = readdirSync('./app/items');
      files.filter(file => /\.ts/.test(file)).forEach(file => {
        console.log('Hi Edward A, file:', file);
        const className = file.replace(/\.ts$/, '');
        console.log('Hi Edward B, className:', className);
        import(`./app/items/${className}.js`).then(TheClass => {
          console.log('Hi Edward C, TheClass:', TheClass);
          this.itemClasses[className] = TheClass[`${className}Regexp`];
        });
        console.log('Hi Edward D');
      });
      console.log('Hi Edward, itemClasses:', this.itemClasses);
    } catch (err) {
      console.log(`Unable to read typescript files from items subdirectory: ${err}`);
      process.exit(-1);
    }
  }

  select(name, item): Default {
    let classes = Object.keys(this.itemClasses);

    let className = 'Default';
    classes.forEach(aClassName => {
      if (this.itemClasses[aClassName].test(name)) {
        className = aClassName;
      }
    });

    const newInstance = eval(`new ${className}(item)`);
    return newInstance;
  };
}