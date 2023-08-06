const engagementMessageOverTimeChartOptions = (messageCountList,
  channels) => {
  const groupedMessages = {};

  messageCountList.map((message) => {
    const { count, timeBucket, channelId } = message;
    if (!groupedMessages[channelId]) {
      groupedMessages[channelId] = {};
    }
    groupedMessages[channelId][timeBucket] = parseInt(count);
  });

  const validChannels = channels.filter((channel) => {
    const channelId = channel.id;
    return groupedMessages[channelId]
      ? Object.keys(groupedMessages[channelId]).length > 1
      : "";
  });

  const chartData = validChannels.map((channel) => {
    const channelId = channel.id;
    const data = Object.keys(groupedMessages[channelId]).map((timeBucket) => {
      return [
        Date.parse(timeBucket),
        groupedMessages[channelId][timeBucket]
      ];
    });
    data.sort((a, b) => a[0] - b[0]);
    return { name: channel.name, data };
  });

  const options = {
    chart: {
      type: "spline",
    },
    title: {
      text: "Engagement Messgaes Over Time",
    },
    xAxis: {
      type: "datetime",
      title: {
        text: "Date",
      },
      crosshair: true,
    },
    yAxis: {
      title: {
        text: "Message Count",
      },
      gridLineColor: "transparent",
      crosshair: false,
    },
    series: chartData,
    tooltip: {
      formatter: function () {
        const date = new Date(this.x).toDateString().split(" ");
        return `<strong>${this.series.name}</strong><br>${this.y} messages on ${date[2]} ${date[1]}`;
        
      },
      borderWidth: 1,
      borderColor: '#2caffe'
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: false,
        }
      }
    }
  };

  return options;
};

export default { engagementMessageOverTimeChartOptions };
