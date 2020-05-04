
# Working on the app
* make sure you pull from the repo you are working in before doing any actual coding
* if you are working on a new feature/area, create a new branch from test
* if you are finished working on a feature/area submit a PR to test

# Structure of app
* use hooks(no class-based components)
* not using router for express. only make routes with full route name for easier reading

# General linting rules
* 4 spaces on tab
* single quotes on everything except template literal
* if you're not sure if you should use `const` or `let`...use `const`
..* ...but absolutely no `var`'s
* snake-case everything that isn't a variable name
..* variable names will be camelCased
* props go on subsequent lines with no indentation regardless of how many are being passed in
..* Ex:
.... ```javascript
<Home
name={name}
>
```