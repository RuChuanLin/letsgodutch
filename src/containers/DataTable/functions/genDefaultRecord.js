import moment from "moment";
import { Tooltip, Typography } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";

import { removeRecord, updateRecord } from "../../../redux/record/action";
import { filterParticipants } from "../../../utils/common";

import AddNewRecordModal from "../../_common/CURDRecordModal";

import Popconfirm from "../../../components/Popconfirm";
import IconButton from "../../../components/IconButton";
import { volcano, green } from "@ant-design/colors";

const { Text, Link } = Typography;

const genDefaultRecord = (record, index, dispatch) => {
  const { participants, payer, delivery, discount, note, id } = record;
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
    key: `${index + 1}`,
    date: record,
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
    payer: record,
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
          initialValues={record}
          button={
            <Tooltip title="編輯此筆記錄" placement="bottomLeft">
              <IconButton>
                <EditTwoTone twoToneColor={green[5]} />
              </IconButton>
            </Tooltip>
          }
          onSubmit={(record) => {
            dispatch(updateRecord({ recordId: record.id, updatedRecord: record }));
          }}
        >
          Update
        </AddNewRecordModal>
        <Popconfirm
          popconfirmTitle="即將刪除此筆記錄"
          onConfirm={() => dispatch(removeRecord({ removingId: id }))}
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
};

export default genDefaultRecord;
