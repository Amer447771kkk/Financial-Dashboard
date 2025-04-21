class CurrencyConverter {
    constructor() {
        this.rates = {};
        this.fromSelect = document.getElementById('fromCurrency');
        this.toSelect = document.getElementById('toCurrency');
        this.amountInput = document.getElementById('amount');
        this.resultDiv = document.getElementById('result');
        this.convertBtn = document.getElementById('convertBtn');
        
        this.init();
    }

    async init() {
        this.rates = await APIService.fetchExchangeRates();
        if (this.rates) {
            this.populateCurrencyDropdowns();
            this.setupEventListeners();
        }
    }

    populateCurrencyDropdowns() {
        const currencies = Object.keys(this.rates);
        currencies.forEach(currency => {
            this.fromSelect.add(new Option(currency, currency));
            this.toSelect.add(new Option(currency, currency));
        });
    }

    setupEventListeners() {
        this.convertBtn.addEventListener('click', () => this.convert());
    }

    convert() {
        const amount = parseFloat(this.amountInput.value);
        const fromCurrency = this.fromSelect.value;
        const toCurrency = this.toSelect.value;

        if (isNaN(amount)) {
            this.resultDiv.textContent = 'Please enter a valid amount';
            return;
        }

        const convertedAmount = this.calculateConversion(amount, fromCurrency, toCurrency);
        this.resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    }

    calculateConversion(amount, fromCurrency, toCurrency) {
        const fromRate = this.rates[fromCurrency];
        const toRate = this.rates[toCurrency];
        return (amount / fromRate) * toRate;
    }
}