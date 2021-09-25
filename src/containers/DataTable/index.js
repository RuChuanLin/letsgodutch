import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { Table, Tooltip } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";

import { removeRecord, updateRecord } from "../../actions/recordAction";
import { fixNumber } from "../../utils/common";

import { filterParticipants } from "../../utils/common";
import AddNewRecordModal from "../_common/CURDRecordModal";

import Popconfirm from "../../components/Popconfirm";
import IconButton from "../../components/IconButton";

const generateColumns = (events) => {
  const totalCostAmount = generateTotalCostAmount(events);
  const participants = Object.keys(totalCostAmount).map((participant) => {
    return {
      title: participant,
      render: (cost) => cost || 0,
      children: [
        {
          title: fixNumber(totalCostAmount[participant]),
          dataIndex: participant,
          key: participant,
        },
      ],
    };
  });
  participants.sort((a, b) => a.children[0].title - b.children[0].title);
  return [
    {
      title: "日期",
      dataIndex: "date",
      key: "date",
    },
    { title: "付款人", dataIndex: "payer", key: "payer" },
    { title: "運費", dataIndex: "deliveryFee", key: "deliveryFee" },
    { title: "優惠", dataIndex: "discountAmount", key: "discountAmount" },
    ...participants,
    { title: "總額", dataIndex: "totalAmount", key: "totalAmount" },
    { title: "備註", dataIndex: "note", key: "note" },
    { title: "Action", dataIndex: "action", key: "action", width: "100px" },
  ];
};

const generateDataSource = (events, dispatch) => {
  return events.map((event, i) => {
    const { date, participants, payer, delivery, discount, note, id } = event;
    const deliveryFee = delivery?.fee || 0;
    const discountAmount = discount?.amount || 0;
    return {
      key: `${i + 1}`,
      date: moment(date).format("M / D"),
      payer,
      discountAmount,
      ...filterParticipants(participants).reduce(
        (acc, [name, obj]) => ({
          ...acc,
          ...{ [name]: obj?.cost || 0 },
        }),
        {}
      ),
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
              <Tooltip title="編輯此筆紀錄" placement="bottomLeft">
                <IconButton>
                  <EditTwoTone twoToneColor="#5b0" />
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
            popconfirmTitle="即將刪除此筆紀錄"
            onConfirm={() => dispatch(removeRecord(id))}
          >
            <Tooltip title="刪除此筆紀錄" placement="bottomLeft">
              <IconButton>
                <DeleteTwoTone twoToneColor="#f50" />
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
  const records = useSelector((state) => state.records);
  const columns = generateColumns(records);
  const dataSource = generateDataSource(records, dispatch);
  return <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }}></Table>;
};
export default DataTable;
