wejay.player
============

##Install

###Mac
```shell
brew update
brew upgrade
brew install homebrew/binary/libspotify
```
####If linking fails
Run ```sudo chown -R `whoami` /usr/local/share/man/man3``` or whatever directory the linking function is complaining about,
and then ```brew link libspotify```

###All
```shell
npm install
```
####If install fails
Run ```sudo chown -R `whoami` ~/.npm/```

Create an app key at https://devaccount.spotify.com/my-account/keys/

Download key as [Binary] and save it as ```spotify_appkey.key``` in app root

##Run
###Authentication
####Development
Create an .env file in app root and add your credentials:
```yml
SPOTIFY_LOGIN=[your username]
SPOTIFY_PASSWORD=[your password]
```
Run with ```node app```

####Production
Run with ```SPOTIFY_USERNAME=[your username] SPOTIFY_PASSWORD=[your password] node app```


The MIT License (MIT)
----------------------

Copyright (c) 2014 Iteam Solutions

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.