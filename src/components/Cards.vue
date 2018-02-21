<template>
	<el-card v-loading="data === null && currentPrice === null">
		<div  slot="header" class="header" v-if="data !== null && currentPrice !== null">
			<span> Stock Price ${{symbol.toUpperCase()}} ({{currentPrice}}) </span>
			<el-button class="delete-button" type="info" round size="mini"  @click="deleteClicked" icon="el-icon-delete"></el-button>
		</div>
		<div slot="header" class="header" v-else>
			Loading....
		</div>
		<div class="card-body">
			<div class="side-bar">
				<el-button class="date-button" round size="mini" @click="oneMonthClicked">1M</el-button>
				<el-button class="date-button" round size="mini" @click="oneYearClicked">1Y</el-button>
				<el-button class="date-button" round size="mini" @click="fiveYearClicked">5Y</el-button>
			</div>
			<div class="graph-holder" :id="'stock_graph_' + symbol"/>
		</div>
	</el-card>
</template>

<script>
import store from '../store';
import Highcharts from 'highcharts';
import { EventBus } from '../store/event_bus.js'
export default {
  name: 'Card',
  props: {
    symbol: String,
  },
  methods: {
    changeStockGraph(range) {
      store.getStockTimeSeries(this.symbol, range).then((stockData) => {
        this.data = stockData;
        let timeSeries = [];
        this.data.forEach((item) => {
          const date = new Date(item.date);
          const data = [Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()), item.close];
          timeSeries.push(data);
        });
        timeSeries = timeSeries.sort((a, b) => {
          if (a[0] > b[0]) {
            return 1;
          } else if (a[0] < b[0]) {
            return -1;
          }
          return 0;
        });
        const myChart = Highcharts.chart(`stock_graph_${this.symbol}`, {
			        chart: {
			            type: 'line',
			        },
			        title: {
			        	text: '',
			        },
			        xAxis: {
			            type: 'datetime',
			            dateTimeLabelFormats: {
	            			second: '%Y-%m-%d<br/>%H:%M:%S',
			                minute: '%Y-%m-%d<br/>%H:%M',
			                hour: '%Y-%m-%d<br/>%H:%M',
			                day: '%Y<br/>%m-%d',
			                week: '%Y<br/>%m-%d',
			                month: '%Y-%m',
			                year: '%Y',
	          			},
			        },
			        yAxis: {
			            title: {
			                text: 'Price',
			            },
			        },
			        series: [{
			        	name: 'Stock Price',
			        	data: timeSeries,
			        },
			       ],
		    	});
      }, (error) => {
       EventBus.$emit('error-card', { symbol: this.symbol, error });
      });
    },
    deleteClicked() {
      EventBus.$emit('delete-card', this.symbol);
    },
    oneYearClicked() {
      this.changeStockGraph('1y');
    },
    oneMonthClicked() {
      this.changeStockGraph('1m');
    },
    fiveYearClicked() {
      this.changeStockGraph('5y');
    },
  },
  data() {
    return {
      data: null,
      currentPrice: null
    };
  },
  created() {
  	store.getStockPrice(this.symbol).then(priceData => {
    	this.currentPrice = priceData.latestPrice;
   	});
    this.changeStockGraph('1m');
  },
};
</script>

<style>
.side-bar {
	grid-column-start: 1;
	grid-column-end: 1;
	grid-row-start: 1;
	grid-row-end: 1;
}
.card-body {
	display: grid;
	grid-template-rows: 100%;
	grid-template-columns: 10% 90%;
	width: 100%;
	height: 300px;
}
.graph-holder {
	grid-column-start: 2;
	grid-column-end: 2;
	grid-row-start: 1;
	grid-row-end: 1;
	height: 100%;
	width: 100%;
}
.delete-button {
	float: right;
}
.date-button {
	margin: 30px 30px 30px 10px;
}
</style>
