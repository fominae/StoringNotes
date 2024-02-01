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
            if (this.newCardTitle !== '') {
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
        },}
})