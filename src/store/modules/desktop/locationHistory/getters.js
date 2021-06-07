import { date } from 'quasar'

export const history = state => state.history

export const totalTransactionToday = (state) => {
	var today = new Date();
	var bu = today.getDate();
	var timeStamp = Date.now()
	var formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD')

	var orders = state.history.filter(x => x.status == 'complete' && x.date == formattedString)

	var arraySum = orders.reduce((a, b) => {
		console.log(b.total)
		return a + b.total 

	}, 0).toFixed(2)

	return arraySum
}
