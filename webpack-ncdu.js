const fs = require("fs");

class NcduEntry {
  /** @type {string} */
  name;
  /** @type {number} */
  asize;
  /** @type {number} */
  dsize;
  /** @type {number} */
  ino;
  /** @type {number} */
  dev;
}

class NcduDirectory {
  /** @type {name} */
  name;
  /** @type {NcduEntry} */
  entry;
  /** @type {Record<string, NcduDirectory} */
  children = {};

  /**
   * @param {string} name
   */
  constructor(name) {
    this.name = name;
  }

  /**
   * @param {string} name
   * @returns {NcduDirectory}
   */
  getOrCreate(name) {
    return (this.children[name] =
      this.children[name] || new NcduDirectory(name));
  }

  toJSON() {
    const entry = this.entry || { name: this.name };
    const children = Object.values(this.children).map((c) => c.toJSON());
    return children.length ? [entry, ...children] : entry;
  }
}

class Ncdu {
  root = new NcduDirectory("/");

  toJSON() {
    return [
      1,
      1,
      { progname: __filename, progver: "1.15.1", timestamp: Date.now() },
      this.root,
    ];
  }
}

const ncdu = new Ncdu();

const stdinBuffer = fs.readFileSync(0); // STDIN_FILENO = 0
/** @type {webpack.Stats} */
const stats = JSON.parse(stdinBuffer.toString());

stats.modules.forEach((module) => {
  const path = module.name.split("/");
  const entry = path.reduce((dir, name) => dir.getOrCreate(name), ncdu.root);
  entry.entry = new NcduEntry();
  entry.entry.name = path[path.length - 1];
  entry.entry.dsize = module.size;
  entry.entry.ino = module.id;
});

console.log(JSON.stringify(ncdu, undefined, 2));
