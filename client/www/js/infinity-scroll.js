class InfinityScroll {
    loadItemsPerScroll = 10;
    data = [];
    lastDataIndexOnPage = 0;
    scrollBox;
    loadItemsEveryScroll = 50;

    constructor(data) {
        this.data = data;
    }

    init() {
        this.scrollBox = document.querySelector(SCROLL_BOX_ID);
        this.initIntersectionObservers();
    }

    initIntersectionObservers() {
        const LOAD_FLAG_DOWN = document.querySelector(SCROLL_BOX_LOAD_FLAG_DOWN_ID);
        const LOAD_FLAG_UP = document.querySelector(SCROLL_BOX_LOAD_FLAG_UP_ID);

        const INTERSECTION_OBSERVER_DOWN = new IntersectionObserver(element => {
            if (element[FIRST_ELEMENT].intersectionRatio > 0) {
                this.loadItemsDown(this.loadItemsPerScroll);
                this.scrollBox.appendChild(LOAD_FLAG_DOWN);
            }
        });

        const INTERSECTION_OBSERVER_UP = new IntersectionObserver(element => {
            if (element[FIRST_ELEMENT].intersectionRatio > 0) {
                const CURRENT_ELEMENT = document.querySelector(SCROLL_BOX_ITEM_HTML_CLASS_NAME);
                this.loadItemsUp(this.loadItemsPerScroll);
                this.scrollBox.prepend(LOAD_FLAG_UP);
                CURRENT_ELEMENT?.scrollIntoView();
            
            }
        });

        INTERSECTION_OBSERVER_DOWN.observe(LOAD_FLAG_DOWN);
        INTERSECTION_OBSERVER_UP.observe(LOAD_FLAG_UP);
    }

    loadItemsDown(amount) {
            const LAST_ELEMENT_INDEX = this.getLastLoadedIndex();
            for (let i = 0; i < amount; i++) {
                if(this.data.length === this.lastDataIndexOnPage){
                    continue;
                }
                const NEW_ITEM = document.createElement(SCROLL_BOX_ELEMENT_HTML_NAME);
                NEW_ITEM.classList.add(SCROLL_BOX_ITEM_HTML_NAME);
                NEW_ITEM.textContent = this.data[this.lastDataIndexOnPage];
                this.lastDataIndexOnPage++;
                this.scrollBox.appendChild(NEW_ITEM);

            }
            if(LAST_ELEMENT_INDEX > this.loadItemsEveryScroll){
                this.removeFirstItems(this.loadItemsPerScroll);
            }
    }

    loadItemsUp(amount) {
        const LAST_ELEMENT_INDEX = this.getLastLoadedIndex();
        for (let i = 0; i < amount; i++) {
            if(this.lastDataIndexOnPage - this.loadItemsEveryScroll <= 0){
                continue;
            }    
            const NEW_ITEM = document.createElement(SCROLL_BOX_ELEMENT_HTML_NAME);
            NEW_ITEM.classList.add(SCROLL_BOX_ITEM_HTML_NAME);
            NEW_ITEM.textContent = this.data[this.lastDataIndexOnPage - (this.loadItemsEveryScroll + 1)];
            this.lastDataIndexOnPage--;
            this.scrollBox.prepend(NEW_ITEM);

        }

        if(LAST_ELEMENT_INDEX > this.loadItemsEveryScroll){
            this.removeLastItems(this.loadItemsPerScroll);
        }
    }
    
    removeFirstItems (amount) {
        for(let i = 0; i < amount; i++){
            document.querySelector(SCROLL_BOX_ITEM_HTML_CLASS_NAME).remove();
        }
    }

    getLastLoadedIndex() {
        return document.querySelectorAll(SCROLL_BOX_ITEM_HTML_CLASS_NAME).length;
    }

    removeLastItems (amount) {
        for(let i = 0; i < amount; i++){
            const LAST_LOADED_INDEX = this.getLastLoadedIndex();
            document.querySelectorAll(SCROLL_BOX_ITEM_HTML_CLASS_NAME)[LAST_LOADED_INDEX-1].remove();
        }
    }
}