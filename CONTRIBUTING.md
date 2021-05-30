# Contributing to EasyTicket

> Please read the [PRIORITY LIST](https://github.com/samiulhsohan/easyticket/issues/1) before contributing.

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting an issue
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Code of Conduct

The code of conduct is described in [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).

## Our Development Process

All changes happen through pull requests. Pull requests are the best way to propose changes. We actively welcome your pull requests and invite you to submit pull requests directly [here](https://github.com/samiulhsohan/easyticket/pulls), and after review, these can be merged into the project.

## Using the Project's Standard Commit Messages

This project is using the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) standard. Please follow these steps to ensure your
commit messages are standardized:

1. Make sure your shell path is in the root of the project (not inside any of the packages).
2. Run `yarn`.
3. Stage the files you are committing with `git add [files]`.
4. Run `yarn commit`. This will start an interactive prompt that generates your commit message:
   1. Select the type of change.
   2. Type the scope. This is either `global` for project-wide changes or one of the packages (bogi, engine).
   3. Write a short, imperative tense description of the change.
   4. If the above was not sufficient, you may now write a longer description of your change (otherwise press enter to leave blank).
   5. y or n for whether there are any breaking changes (e.g. changing the props of a component, changing the JSON structure of an API response).
   6. y or n for whether this change affects an open issue, if positive you will be prompted to enter the issue number.
5. Your commit message has now been created, you may push to your fork and open a pull request (read below for further instructions).

## Pull Requests

1. Fork the repo and create your branch (usually named `patch-%the number of PRs you've already made%`) from `staging`.
2. If you've added code that should be tested, add some test examples.
3. Ensure to describe your pull request.

## Quickstart Local Development

### Run

#### `engine`

```shell
yarn
yarn start:dev
```

#### `bogi`

```shell
yarn
yarn start
```

Please note that the `bogi` uses `192.168.0.4` to talk with the `engine` in the `dev` environment.

## Issues

We use GitHub issues to track public bugs. Please ensure your description is
clear and has sufficient instructions to be able to reproduce the issue. Report a bug by <a href="https://github.com/samiulhsohan/easyticket/issues">opening a new issue</a>; it's that easy!

## Feature Request

Great Feature Requests tend to have:

- A quick idea summary.
- What & why you wanted to add the specific feature.
- Additional context like images, links to resources to implement the feature etc, etc.

## License

By contributing to EasyTicket, you agree that your contributions will be licensed
under the [LICENSE file](LICENSE).
