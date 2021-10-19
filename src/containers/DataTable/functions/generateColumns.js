import styled from "styled-components";
import { Tooltip } from "antd";
import moment from "moment";
import colors from "../../../utils/colors";
import { fixNumber, filterParticipants } from "../../../utils/common";

const BalanceSpan = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 16px;
`;

const generateTotalCostAmount = (records) =>
  records.reduce((acc, { participants, payer, delivery, discount }) => {
    if (Object.keys(participants).length === 0) {
      return acc;
    }
    const deliveryFee = delivery?.fee || 0;
    const discountAmount = discount?.amount || 0;
    const initValue = deliveryFee - discountAmount;
    const participantEntries = filterParticipants(participants);
    const averageDeliveryFee = initValue / participantEntries.length;
    let totalAmount = initValue;
    participantEntries.forEach(([name, { cost = 0 }]) => {
      acc[name] = (acc[name] || 0) - cost - averageDeliveryFee;
      totalAmount += cost;
    });
    acc[payer] += totalAmount;
    return acc;
  }, {});

const generateColumns = (records) => {
  const totalCostAmount = generateTotalCostAmount(records);
  const participants = Object.keys(totalCostAmount).map((participant) => {
    const balance = fixNumber(totalCostAmount[participant]);
    return {
      title: participant,
      render: (cost) => cost || 0,
      children: [
        {
          title: (
            <BalanceSpan style={{ background: colors.getbalanceColor(balance) }}>
              {balance}
            </BalanceSpan>
          ),
          dataIndex: participant,
          key: participant,
        },
      ],
      balance,
    };
  });
  participants.sort((a, b) => a.balance - b.balance);
  return [
    {
      title: "日期",
      dataIndex: "date",
      key: "date",
      width: 80,
      fixed: "left",
      render: ({ date }) => {
        const $moment = moment(date);
        return <Tooltip title={$moment.format("yyyy-M-D H:mm")}>{$moment.format("M/D")}</Tooltip>;
      },
    },
    {
      title: "付款人",
      dataIndex: "payer",
      key: "payer",
      width: 100,
      fixed: "left",
      render: ({payer}) => payer,
    },
    {
      title: "共享",
      dataIndex: "sharingFee",
      key: "sharingFee",
      width: 80,
      fixed: "left",
    },
    ...participants,
    { title: "總額", dataIndex: "totalAmount", key: "totalAmount", fixed: "right", width: 75 },
    {
      title: "備註",
      dataIndex: "note",
      key: "note",
      ellipsis: {
        showTitle: false,
      },
      render: (note) => <Tooltip title={note}>{note}</Tooltip>,
      width: 175,
      fixed: "right",
    },
    { title: "Action", dataIndex: "action", key: "action", width: 100, fixed: "right" },
  ];
};

export default generateColumns;
