// expressjs.com
// tutorials etc.


// commands
npm init
npm install express --save

// an express view engine

// handlesbars view engine for expressjs
// templates
// handlebarsjs.com
// npmjs.com/packages/hbs
npm install hbs --save


// pass in the file name extensions you want to monitor changes for
$ nodemon server.js -e js, hbs


// github
ls -al ~/.ssh
ssh-keygen -t rsa -b 4096 -C 'oliverfmurphy@gmail.com'
// get the ssh agent id
eval "$(ssh-agent -s)"
// Agent pid 74060
// tell the ssh agent where the file is
ssh-add ~/.ssh/id_rsa

// copy the key to your clipboard
// https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/
clip < ~/.ssh/id_rsa.pub

git remote add origin https://github.com/oliverfmurphy/node-course-web-server.git
git push -u origin master

//
git add .
git commit -m "message"
git push
// makes a new app in the heroku web app, adds a new remote to your git repo
// origin remote points to our git repository, heroku remote points to our heroku repository
heroku create
git push heroku
heroku open
