class Screens {

    constructor () {
        this.screens = [];
    }

    addscreen (id, name, room) {
        var screen = {id, name, room};
        this.screens.push(screen);
        return screen;
    }

    removeScreen (id) {

        var screen = this.getScreen(id);
        if (screen) {
            this.screens = this.screens.filter((screen) => screen.id !== id);
        }
        return screen;

    }

    getScreen (id) {
        return this.screens.filter((screen) => screen.id === id)[0]
    }

    getScreenList (room) {

        var screens = this.screens.filter((screen) => screen.room === room);
        var namesArray = screens.map((screen) => screen.name);

        return namesArray;
    }

    getScreenByRoomAndName( room , name ){

        console.log( `Screens - ${JSON.stringify( this.screens )}` );
        var screen = this.screens.filter((screen) => (screen.room === room && screen.name === name) )[0];
        console.log( `Room  - ${room} , Name - ${name}` );
        return screen;

    }
}

module.exports = {Screens};
