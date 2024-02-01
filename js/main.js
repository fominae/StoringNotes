new Vue({
    el: '#app',
    data() {
        return {
            column1: [],
            column2: [],
            column3: [],
            newCardTitle: '',
            newItemText: '',
            disable: true
        }
    },
    methods: {
        addCard() {
            if (this.newCardTitle !== '' && this.column1.length < 3) {
                const newCard = {
                    id: Date.now(),
                    title: this.newCardTitle,
                    items: this.newItemText.split('\n').filter(item => item.trim() !== '').map(item => ({ text: item, completed: false }))
                };
                if (this.newCardTitle !== '' && newCard.items.length >= 3 && newCard.items.length <= 5) {
                    this.column1.push(newCard);
                }
                else alert("Количество пунктов должно быть от 3-х до 5-и!!!")
                {

                }
                this.handleCardPosition(newCard);
                this.newCardTitle = '';
                this.newItemText = '';
                this.saveLocalStorage();
            }
        },
        handleCardPosition(card) {
            const totalItems = card.items.length;
            const completedItems = card.items.filter(item => item.completed).length;

            if (completedItems / totalItems > 0.5 && this.column1.includes(card)) {
                if (this.column2.length ===5 && completedItems / totalItems > 0.5 && this.column1.includes(card)) {
                    this.disable = false;
                } else {
                    this.column1.splice(this.column1.indexOf(card), 1);
                    this.column2.push(card);
                    this.saveLocalStorage();
                }
            } else if (completedItems / totalItems === 1 && this.column2.includes(card)) {
                this.column2.splice(this.column2.indexOf(card), 1);
                this.disable = true;
                this.column3.push(card);
                card.completedDate = new Date().toLocaleString();
                this.saveLocalStorage();
            }
        },
        saveLocalStorage() {
            const parsed = JSON.stringify(this.column1);
            const parsed1 = JSON.stringify(this.column2);
            const parsed2 = JSON.stringify(this.column3);
            localStorage.setItem('column1', parsed);
            localStorage.setItem('column2', parsed1);
            localStorage.setItem('column3', parsed2);
        },
        removeCard(card) {
            this.column3.splice(this.column3.indexOf(card), 1);
            this.saveLocalStorage();
        },
    },
    mounted(){
        if (localStorage.getItem('column1')) {
            try {
                this.column1 = JSON.parse(localStorage.getItem('column1'));
            } catch(e) {
                localStorage.removeItem('column1');
            }
        }
        if (localStorage.getItem('column2')) {
            try {
                this.column2 = JSON.parse(localStorage.getItem('column2'));
            } catch(e) {
                localStorage.removeItem('column2');
            }
        }
        if (localStorage.getItem('column3')) {
            try {
                this.column3 = JSON.parse(localStorage.getItem('column3'));
            } catch(e) {
                localStorage.removeItem('column3');
            }
        }

    },
    computed:{
        column2Length(){
            return this.column2.length
        },
        disableCheck(){
            return this.disable
        }
    },
})