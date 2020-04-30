const app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: async function() {
        const result = await fetch(API_URL).then(res => res.json()).catch(err => alert(err));
        if(!result) {
            return;
        }
        const randomArrayString = result.random;
        const infinityScroll = new InfinityScroll(randomArrayString);
        infinityScroll.init();
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        const parentElement = document.getElementById(id);
        const listeningElement = parentElement.querySelector('.listening');
        const receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    
};

app.initialize();