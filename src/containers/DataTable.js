import { Table } from "antd";
import { useSelector } from "react-redux";

import moment from "moment";

const generateColumns = (events) => {
  const totalCostAmount = generateTotalCostAmount(events);
  const participants = Object.keys(totalCostAmount);
  return [
    {
      title: "日期",
      dataIndex: "date",
      key: "date",
    },
    { title: "付款人", dataIndex: "payer", key: "payer" },
    { title: "運費", dataIndex: "deliveryFee", key: "deliveryFee" },
    { title: "優惠", dataIndex: "discountAmount", key: "discountAmount" },
    ...participants.map((participant) => {
      const lowerCaseName = participant.toLocaleLowerCase();
      return {
        title: participant,
        render: (cost) => cost || 0,
        children: [
          {
            title: totalCostAmount[participant],
            dataIndex: lowerCaseName,
            key: lowerCaseName,
          },
        ],
      };
    }),
    { title: "總額", dataIndex: "totalAmount", key: "totalAmount" },
  ];
};

const generateDataSource = (events) => {
  return events.map((event, i) => {
    const { date, participants, payer, delivery, discount } = event;
    const deliveryFee = delivery?.fee || 0;
    const discountAmount = discount?.amount || 0;
    return {
      key: `${i + 1}`,
      date: moment(date).format("M / D"),
      payer,
      discountAmount,
      ...Object.entries(participants).reduce(
        (acc, [name, cost]) => ({
          ...acc,
          ...{ [name.toLocaleLowerCase()]: cost },
        }),
        {}
      ),
      deliveryFee,
      totalAmount: Object.entries(participants).reduce(
        (acc, [_, cost]) => acc + cost,
        deliveryFee - discountAmount
      ),
    };
  });
};

const generateTotalCostAmount = (events) =>
  events.reduce((acc, { participants, payer, delivery, discount }) => {
    if (Object.keys(participants).length === 0) {
      return acc;
    }
    const deliveryFee = delivery?.fee || 0;
    const discountAmount = discount?.amount || 0;
    const initValue = deliveryFee - discountAmount;
    const averageDeliveryFee = initValue / Object.keys(participants).length;
    let totalAmount = initValue;
    Object.entries(participants).forEach(([name, cost]) => {
      acc[name] = (acc[name] || 0) - cost - averageDeliveryFee;
      totalAmount += cost;
    });
    acc[payer] += totalAmount;
    return acc;
  }, {});

const DataTable = () => {
  ;
  const records = useSelector((state) => state.records);
  const columns = generateColumns(records);
  const dataSource = generateDataSource(records);
  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        scroll={{ y: 500 }}
      ></Table>
    </>
  );
};
export default DataTable;
