# CONTRIBUTING

## Fork this repository

To start contributing, it is recommended that you [fork this repository](https://github.com/koopers/koopers/fork). Then you can clone your fork into your machine and follow [the steps described down below](#github-workflow).

## Sync Your Fork with the Original Repo

It is important to keep your repo in sync with the original repo to make sure you're working always with the latest changes, here's some simple steps you can follow to keep your fork always up to date:

```bash
# Add a new remote upstream repository (this is necessary only the first time)
git remote add upstream https://github.com/koopers/koopers.git

# Sync your fork
git fetch upstream
git checkout develop
git merge upstream/develop
```

## Git(Hub) Workflow

If you would like to submit a pull request, please follow the below Git
process/workflow. It helps to give us a better paper-trail, and allows us to
follow work through the issue/pull request process.

1. **Create a new issue for the proposed addition/change/fix.** This allows us
   to discuss the suitability of the proposal before you begin work.
2. **Create or sync your fork from `develop`.** To ensure that you're working
   with the latest changes. you can [fork this repository](#fork-this-repository)
   or you can [sync current your fork](#sync-your-fork-with-the-original-repo)
3. **Create a new branch entitled `<fix|add|feature>/<short-description>`.**
   Create a branch for example called `feature/login`. Do all of your work
   in this branch.
4. **Start all commit messages with `[FRONT|BACK][refs #<issue-number>]`.**
   If you’re working on issue 99, all of your commits should begin with
   `[FRONT|BACK][refs #99]`. This allows us to link every commit back to
   an issue.
5. **Open a pull request into `develop`.** Our main branch is `develop`, and
   this is where we want new work to be merged into. `master` is a release
   branch only.
