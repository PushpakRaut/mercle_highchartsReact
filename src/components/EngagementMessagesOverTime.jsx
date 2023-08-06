import React from "react";
import engagementHelper from "./EngagementHelper";
import { messageCountList } from "../data/messageCounLit";
import { channels } from "../data/channels";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

function EngagementMessagesOverTime() {
  let options = engagementHelper.engagementMessageOverTimeChartOptions(
    messageCountList,
    channels
  );

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
}

export default EngagementMessagesOverTime;
