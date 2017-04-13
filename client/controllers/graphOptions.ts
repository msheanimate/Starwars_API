export let graphOptions = {
    chart: {
        type: 'discreteBarChart',
        height: 450,
        margin: {
            top: 20,
            right: 20,
            bottom: 50,
            left: 55
        },
        x: function (d: any) { return d.label; },
        y: function (d: any) { return d.value; },
        showValues: true,
        duration: 500,
        xAxis: {
            axisLabel: 'Title'
        },
        yAxis: {
            axisLabel: 'Crawl Count',
            axisLabelDistance: -10
        }
    }
};