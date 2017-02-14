# git-bomb

An electron-based application which will run `git reset --hard`
on a specified directory every X minutes.

## Wha-? I don't even...

Why would anyone ever want to do this?
Adding this constraint to your development flow may help you
think in smaller units and make atomic commits.
Instead of thinking about "losing work," consider it a way to
experiment with code until you get something really good.
What you've learned is more important than specific lines of code,
and sometimes you can write better code faster after the reset.

Running `git reset --hard` every X minutes is sometimes used
during Global Day of Code Retreat exercises.
Give it a try with a code kata!

## Build It

To build the git-bomb application, run `npm install` and then
run the appropriate build for your platform:

* `npm run build-win`
* `npm run build-mac`

The output will be found in the `/dist` directory.

## Icon Credit

The icon used for git-bomb was created by [Everaldo Coelho](http://www.everaldo.com) and obtained from [Icon Easy](http://www.iconeasy.com/icon/app-core-bomb-icon/) under a "Free for non-commercial use" license.

## License

This code is provided under the under the [MIT license](LICENSE)
