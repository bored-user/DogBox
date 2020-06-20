# DogBox

My local server to serve media files (movies, books, musics, etc).

### Running
* run `npm install`;
* add some files on the assets/media/<media> folder;
* run `node server.js`;

That's it! The server is running on **localhost:7777**.


### Caveats
By the time I'm writting this README file, the server supports only one level nesting.<br>
That means that this: <media>/<folder1>/<folder2> works, but this: <media>/<folder1>/<folder2>/<folder3> (or further nesting) does not.

However, I already have a plan in mind to support multiple nesting levels.
