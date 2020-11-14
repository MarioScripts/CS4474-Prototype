const fs = window.require("fs");
const mm = window.require("music-metadata");

const extensionRegex = /\.[a-z0-9]+/g;
const songNameRegex = "(?<=\\\\)[A-Za-z0-9_\\-]*(?=\\$1)";
const supportedSongExtensions = new Set([".mp4", ".mp3", ".m4a", ".flac", ".wav", ".wma", ".aac"]);

export const expandSongs = async (songList) => {
    const dict = {};
    songList.forEach((song) => {
        dict[song] = {};
    });

    return await expandSongsRec(dict);
};

const expandSongsRec = async (songList) => {
    let expanded = {};
    for (const song of Object.keys(songList)) {
        try {
            const isDir = fs.lstatSync(song).isDirectory();
            if(isDir) {
                // Recursively go down
                const readFiles = (fs.readdirSync(song)).map((f) => `${song}\\${f}`);
                const dict = {};
                readFiles.forEach((f) => dict[f] = {});

                expanded = Object.assign({}, expanded, await expandSongsRec(dict));
            } else if (!(song in expanded)){
                // Base case
                const extension = song.match(extensionRegex);
                if (extension && supportedSongExtensions.has(extension[0])) {
                    const defaultName = song.match(new RegExp(songNameRegex.replace("$1", extension[0]), "g"))[0];
                    const metadata = await mm.parseFile(song);

                    expanded[song] = {
                        name: metadata.common.title || defaultName,
                        album: metadata.common.album,
                        genre: metadata.common.genre,
                        artist: metadata.common.albumartist,
                        duration: formatTime(metadata.format.duration),
                    };
                }

            }
        } catch (err) {
            console.log("Error reading file, skipping...");
        }
    }

    return expanded;
};

export const formatTime = (time) => {
    const seconds = Math.trunc(time % 60);
    const minutes = Math.trunc(time / 60);
    const hours = Math.trunc(minutes / 60);

    if(hours) {
        return `${hours}:${minutes}:${seconds >= 0 && seconds <= 9 ? "0" : ""}${seconds}`
    }

    return `${minutes}:${seconds >= 0 && seconds <= 9 ? "0" : ""}${seconds}`
};

export const PLAYING = true;
export const PAUSED = false;
