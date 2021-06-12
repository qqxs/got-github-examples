# got-github-examples

```bash
# get example01 template
yarn run dev
```

```ts
import got from "got";
import tar from "tar";
import path from "path";
import { Stream } from "stream";
import { promisify } from "util";
import { makeDir } from "./make-dir";

const pipeline = promisify(Stream.pipeline);

// tar extract 内容放置的路径
const root = path.resolve("data-fetch-app");

async function downloadExample() {
  await makeDir(root);
  process.chdir(root);
  return pipeline(
    got.stream(
    // `https://codeload.github.com/${user}/${repo}/tar.gz/${branch}`
      `https://codeload.github.com/qqxs/got-github-examples/tar.gz/main`
    ),
    tar.extract(
      {
        cwd: root,
        strip: 3
      },
    // [`${repo}-${branch}/${examplePath}`]
      [`got-github-examples-main/examples/example01`]
    )
  );
}

downloadExample();
```