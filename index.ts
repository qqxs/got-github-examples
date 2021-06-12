// const got = require("got");

import got from "got";
import tar from "tar";
import path from "path";
import { Stream } from "stream";
import { promisify } from "util";
import { makeDir } from "./make-dir";

const pipeline = promisify(Stream.pipeline);

const root = path.resolve("data-fetch-app");

async function downloadExample() {
  await makeDir(root);
  process.chdir(root);
  return pipeline(
    got.stream(
      `https://codeload.github.com/qqxs/got-github-examples/tar.gz/main`
    ),
    tar.extract(
      {
        cwd: root,
        strip: 3
      },
      [`got-github-examples-develop/examples/example01`]
    )
  );
}

downloadExample();
