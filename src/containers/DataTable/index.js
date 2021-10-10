import moment from "moment";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Table, Tooltip, Typography, Spin } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";

import { removeRecord, updateRecord } from "../../redux/record/action";
import { fixNumber, filterParticipants } from "../../utils/common";

import AddNewRecordModal from "../_common/CURDRecordModal";

import Popconfirm from "../../components/Popconfirm";
import IconButton from "../../components/IconButton";
import { volcano, green } from "@ant-design/colors";
import colors from "../../utils/colors";

const BalanceSpan = styled.span`
  position: absolute;
  background: ${(props) => props.bgc};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 16px;
`;

const { Text, Link } = Typography;

const generateColumns = (events) => {
  const totalCostAmount = generateTotalCostAmount(events);
  const participants = Object.keys(totalCostAmount).map((participant) => {
    const balance = fixNumber(totalCostAmount[participant]);
    return {
      title: participant,
      render: (cost) => cost || 0,
      children: [
        {
          title: <BalanceSpan bgc={colors.getbalanceColor(balance)}>{balance}</BalanceSpan>,
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
    },
    { title: "付款人", dataIndex: "payer", key: "payer", width: 100, fixed: "left" },
    { title: "共享", dataIndex: "sharingFee", key: "sharingFee", width: 80, fixed: "left" },
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

const generateDataSource = (events, dispatch) => {
  return events.map((event, i) => {
    const { date, participants, payer, delivery, discount, note, id } = event;
    const deliveryFee = delivery?.fee || 0;
    const discountAmount = discount?.amount || 0;
    const sharingFee = discountAmount - deliveryFee;
    const arrangedParticipants = Object.entries(participants)
      .map(([name, { cost, targeted }]) => ({
        name,
        cost: targeted ? cost : <Text type="secondary">無參加</Text>,
      }))
      .reduce(
        (acc, { name, cost }) => ({
          ...acc,
          ...{ [name]: cost },
        }),
        {}
      );
    return {
      key: `${i + 1}`,
      date: moment(date).format("M / D"),
      sharingFee: (
        <Tooltip
          title={
            <div>
              <p style={{ color: volcano[1], margin: 0 }}>運費：{deliveryFee}</p>
              <p style={{ color: green[1], margin: 0 }}>優惠：{discountAmount}</p>
            </div>
          }
        >
          <Link>{sharingFee}</Link>
        </Tooltip>
      ),
      payer,
      discountAmount,
      ...arrangedParticipants,
      deliveryFee,
      totalAmount: filterParticipants(participants).reduce(
        (acc, [_, { cost = 0 }]) => acc + cost,
        deliveryFee - discountAmount
      ),
      note,
      action: (
        <div>
          <AddNewRecordModal
            initialValues={event}
            button={
              <Tooltip title="編輯此筆記錄" placement="bottomLeft">
                <IconButton>
                  <EditTwoTone twoToneColor={green[5]} />
                </IconButton>
              </Tooltip>
            }
            onSubmit={(record) => {
              dispatch(updateRecord(record.id, record));
            }}
          >
            Update
          </AddNewRecordModal>
          <Popconfirm
            popconfirmTitle="即將刪除此筆記錄"
            onConfirm={() => dispatch(removeRecord(id))}
          >
            <Tooltip title="刪除此筆記錄" placement="bottomLeft">
              <IconButton>
                <DeleteTwoTone twoToneColor={volcano[5]} />
              </IconButton>
            </Tooltip>
          </Popconfirm>
        </div>
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

const DataTable = () => {
  const dispatch = useDispatch();
  const {data: records, isLoading} = useSelector((state) => state.records);
  const columns = generateColumns(records);
  const dataSource = generateDataSource(records, dispatch);
  return (
    <Spin spinning={isLoading}>
      <Table
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: 1000 }}
        pagination={{ pageSize: 4 }}
      ></Table>
    </Spin>
  );
};
export default DataTable;
