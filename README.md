# rability
Simple authorization library inspired by cancancan

## Installation
```
npm install rability
```

## Usage

```js
import { can, cannot, define, read, view } from "rability";

const eat = (something) => `eat${something}`;

const permission = define(
  can([read, view], "Book"),
  cannot(eat, "Candies"),
  can(view, ["TV", "YouTube"])
);

permission.readBook() // true
permission.viewTV() // true
permission.viewYouTube() // true
permission.eatCandies() // false
```
