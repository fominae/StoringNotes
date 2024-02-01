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
        }}
})