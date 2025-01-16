
function getExpiry(){
	const div = document.getElementById("eq-derivatives-historical-expiryDate");
	const select = div.querySelector("select");
	const options = select.querySelectorAll("option");
	const exp_values = Array.from(options).map(option => option.value);
	return exp_values;
}
function getStrikeprice(){
	const strike_price = document.getElementById("eq-derivatives-historical-strikePrice");
	const select = strike_price.querySelector("select");
	const options = select.querySelectorAll("option");
	const strike_values = Array.from(options).map(option => option.value);
	return strike_values;
}

function settype(strtyp){
	const div = document.getElementById("eq-derivatives-historical-optionType");
	const select = div.querySelector("select");
	const options = select.querySelectorAll("option");
	const typ = Array.from(options).map(option => option.value);
	return typ;
}

function downloadTableAsCSV(tableId, filename) {
    const table = document.getElementById(tableId);
    if (!table) {
        console.error("Table with the specified ID not found.");
        return;
    }
    let csvData = [];
    for (let row of table.rows) {
        let rowData = [];
        for (let cell of row.cells) {
            let cellText = cell.innerText.replace(/"/g, '""');
            rowData.push(`"${cellText}"`); // Wrap text in quotes
        }
        csvData.push(rowData.join(",")); // Join the cells with commas
    }
    const csvString = csvData.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename || "table.csv"; // Default filename if not specified
    link.click();
    URL.revokeObjectURL(link.href);
}
// function sleep(ms) {
//     const start = Date.now();
//     while (Date.now() - start < ms) {
//         // Blocking loop
//     }
//     document.getElementById("filter").click();
// }
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function setYear(str_year){
	const year = document.getElementById('eq-derivatives-historical-year');
	year.querySelector("select").value = str_year;
}

function setstartenddate(exp_date){
	const timestamp = Date.parse(exp_date);
	const enddateObj = new Date(timestamp);
	const startdateObj = new Date(timestamp);
	startdateObj.setMonth(startdateObj.getMonth() - 3);
	const formattedstartDate = `${String(startdateObj.getDate()).padStart(2, '0')}-${String(startdateObj.getMonth() + 1).padStart(2, '0')}-${startdateObj.getFullYear()}`;
	const formattedendtDate = `${String(enddateObj.getDate()).padStart(2, '0')}-${String(enddateObj.getMonth() + 1).padStart(2, '0')}-${enddateObj.getFullYear()}`;
	document.getElementById("startDatederivatives").value = formattedstartDate;
	document.getElementById("endDatederivatives").value = formattedendtDate;
}

async  function download(year, expdV, typ, stkp){
	setYear(year);
	await sleep(1000);

	setstartenddate(expdV);
	document.getElementById(
		'eq-derivatives-historical-expiryDate'
		).querySelector("select").value = expdV;
	await sleep(2000);
	document.getElementById(
		'eq-derivatives-historical-optionType'
		).querySelector("select").value = typ;
	await sleep(2000);
	document.getElementById(
		'eq-derivatives-historical-strikePrice'
		).querySelector("select").value = stkp;
	document.getElementById("filter").click();
	await sleep(10000);

	downloadTableAsCSV(
		'eqderivativesHistoricalTable',
		year+'_' + expdV+'_'+typ+'_'+stkp+'.csv');
}
// download('2024', '04-Jan-2024','CE','12,000.00');await sleep(10000);download('2024', '04-Jan-2024','CE','12,000.00')
// got to NSE landing page -> Market_data -> derivatives -> Nifty -> wait to load -> all_historic_data -> open console
// there is a ready made parameter file in the repo for call and put options names call_js.csv and put_csv
// use console to automate the download manually.