import rp from 'request-promise';

class Store {
  constructor() {
    this.config = {
      url: 'https://api.iextrading.com/1.0/stock',
    };
  }
  getStockTimeSeries(symb, range) {
    const options = {
      uri: `${this.config.url}/${symb}/chart/${range}`,
      json: true,
    };
    return rp(options);
  }
  getStockPrice(symb) {
    const options = {
      uri: `${this.config.url}/${symb}/book`,
      json: true,
    };
    return rp(options);
  }
}

export default new Store();
